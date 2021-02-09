$(document).ready(() => {
    initializePage()
})

const EMAIL_DATE_FORMAT = 'dddd / MMM D / h:mm A';
const GOOGLE_SHEETS_DATE_FORMAT = 'MMM D yyyy, h:mm A';
const DATE_INPUT_FORMAT = 'M/D/YYYY';
const TIME_INPUT_FORMAT = 'h:mm A';

var generatedHTMLRange = document.createRange();

const filter = {
    student: ''
}
const state = {
    selectedStudent: null,
    confirmation_email_txt: null,
    adp_txt: null,
    google_sheets_entry: null,
    google_sheets_finish: null,
    google_forms_eval: null,
    B2B: null,
    sessionDate: moment(),
    sessionTime: moment().hour(12).minutes(0),
    allStudents: []
}

function initializePage() {
    getAllStudents()
    .then(() => {
        displayStudents();
    })
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/students',
            method: 'GET'
        })
        .then(studentData => {
            state.allStudents = studentData;
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}

function displayStudents() {
    const allStudentsDIV = $('#student-names-list')
    allStudentsDIV.empty();
    for(const student of state.allStudents) {
        if (filter.student == '' || 
            student.first_name.includes(filter.student) ||
            student.last_name.includes(filter.student)) {
            allStudentsDIV.append($(`
                <p id="${student.id}" class="student-name">${student.first_name} ${student.last_name}</p>
            `))
        }
    }
}

function showPopupSessionPlanner() {
    $('#screen-popup-blur').removeClass('hide')
    $('#date-entry').removeClass('hide')
    $('#session-planner').removeClass('hide')

    if (state.selectedStudent.upcomingSession.sessionDate != '') {
        $('#finish-session').removeClass('hide');
        $('#upcoming-date').text(state.selectedStudent.upcomingSession.sessionDate)
    }

    $('#session-date').val(state.sessionDate.format(DATE_INPUT_FORMAT))
    $('#session-time').val(state.sessionTime.format(TIME_INPUT_FORMAT))
}

function showPopupWeeklyEmail() {
    $('#generated-weekly-email').append($(templates.weekly_email))

    let studentEmails = ''
    for (const student of state.allStudents) {
        studentEmails += student.email + '\t';
    }
    $('#weekly-email-student-emails').val(studentEmails);

    $('#screen-popup-blur').removeClass('hide')
    $('#weekly-email-popup').removeClass('hide')
}

function hidePopup(event) {
    console.log(event.target.id)
    if (event.target.id != 'exit-icon' &&
        event.target.id != 'screen-popup-blur') {
        return
    }

    $('#screen-popup-blur').addClass('hide')
    $('#date-entry').addClass('hide')
    $('#session-planner').addClass('hide')
    $('#finish-session').addClass('hide');
    $('#generated-results').addClass('hide')
    $('#weekly-email-popup').addClass('hide')
    $('#generated-session-finish').addClass('hide');

    state.selectedStudent = null
}

$('#student-names-list').on('click', 'p', function() {
    const studentId = $(this).attr('id');
    $.ajax({
        url: '/api/students/' + studentId,
        method: "GET"
    })
    .then(response => {
        state.selectedStudent = response
        showPopupSessionPlanner()
    })
})

$('#weekly-email').on('click', showPopupWeeklyEmail)
$('#exit-icon').on('click', hidePopup)
$('#screen-popup-blur').on('click', hidePopup)

$('#session-time-btn').on('click', function() {
    const date = $('#session-date').val()
    const time = $('#session-time').val()
    const isB2B = $('#back-to-back').is(":checked")
    
    state.B2B = isB2B ? 'B2B-yes' : 'B2B-no';

    const timezone = state.selectedStudent.timezone

    const sessionDate = moment(date + " " + time + " " + timezone)

    const studentName = state.selectedStudent.first_name + " " + state.selectedStudent.last_name;

    // ADP
    let adp_text = templates.adp;
    adp_text = adp_text.replace('%', state.selectedStudent.id)
    adp_text = adp_text.replace('%', studentName)
    adp_text = adp_text.replace('%', state.B2B)
    state.adp_txt = adp_text;
    
    // Google Sheets Entry
    const gs_time = sessionDate.format(GOOGLE_SHEETS_DATE_FORMAT);    
    let gs_entry = templates.google_sheets_entry;
    gs_entry = gs_entry.replace('%', state.selectedStudent.id);
    gs_entry = gs_entry.replace('%', state.selectedStudent.graduation_date);
    gs_entry = gs_entry.replace('%', studentName);
    gs_entry = gs_entry.replace('%', state.selectedStudent.email);
    gs_entry = gs_entry.replace('%', gs_time);
    gs_entry = gs_entry.replace('%', state.selectedStudent.timezone);
    state.google_sheets_entry = gs_entry;

    // Confirmation Email
    const email_time = sessionDate.format(EMAIL_DATE_FORMAT)
    let email_txt = templates.confirmation_email;
    email_txt = email_txt.replace('%', state.selectedStudent.email);
    email_txt = email_txt.replace('%', email_time)
    email_txt = email_txt.replace('%', state.selectedStudent.first_name)
    email_txt = email_txt.replace('%', email_time)
    email_txt = email_txt.replace('%', state.selectedStudent.zoom_link)
    email_txt = email_txt.replace('%', state.selectedStudent.zoom_link)
    state.email_txt = email_txt;

    $('#date-entry').addClass('hide')
    $('#finish-session').addClass('hide')
    $('#generated-results').removeClass('hide')

    $.ajax({
        url: '/api/students',
        method: 'PUT',
        data: {
            ...state.selectedStudent,
            upcomingSession: {
                sessionDate: sessionDate.format(GOOGLE_SHEETS_DATE_FORMAT),
                isB2B: isB2B
            }
        }
    })
    .then(studentData => {
        // console.log(studentData)
        // console.log(state)
    })
})

$('#finish-session-btn').on('click', function() {
    const sessionDate = moment(state.selectedStudent.upcomingSession.sessionDate);
    const isB2B = state.selectedStudent.upcomingSession.isB2B;

    const adpB2Btext = isB2B ? 'B2B-yes' : 'B2B-no'
    const gsB2Btext = isB2B ? 'Y' : 'N'

    const studentName = state.selectedStudent.first_name + " " + state.selectedStudent.last_name;

    // ADP
    let adp_text = templates.adp;
    adp_text = adp_text.replace('%', state.selectedStudent.id)
    adp_text = adp_text.replace('%', studentName)
    adp_text = adp_text.replace('%', state.B2B)
    state.adp_txt = adp_text;

    // Google Sheets Finish
    let gs_finish_text = templates.google_sheets_finish
    gs_finish_text = gs_finish_text.replace('%', sessionDate.format('H:mm A'))
    sessionDate.add(1, 'hours')
    gs_finish_text = gs_finish_text.replace('%', sessionDate.format('H:mm A'))
    sessionDate.subtract(1, 'hours')
    gs_finish_text = gs_finish_text.replace('%', gsB2Btext)
    gs_finish_text = gs_finish_text.replace('%', 'Y')
    gs_finish_text = gs_finish_text.replace('%', 'Show') // TODO Ask if no show
    gs_finish_text = gs_finish_text.replace('%', '')     // TODO Ask for topic
    gs_finish_text = gs_finish_text.replace('%', '')     // TODO Ask for notes
    gs_finish_text = gs_finish_text.replace('%', 'Y')
    state.google_sheets_finish = gs_finish_text

    $('#date-entry').addClass('hide')
    $('#finish-session').addClass('hide')
    $('#generated-session-finish').removeClass('hide');
})

$('#session-complete').on('click', function() {
    console.log({
        ...state.selectedStudent,
        upcomingSession: {
            sessionDate: '',
            isB2B: false
        }
    })
    $.ajax({
        url: '/api/students',
        method: 'PUT',
        data: {
            ...state.selectedStudent,
            upcomingSession: {
                sessionDate: '',
                isB2B: false
            }
        }
    }).then(() => {
        console.log('Marked session as complete')
    })
})

$('#generated-results').on('click', 'button', function() {
    const buttonText = $(this).attr('id')
    const textareaEl = $('#generated-text');
    const htmlareaEl = $('#generated-html');
    
    switch (buttonText) {
        case 'confirmation-email':
            textareaEl.addClass('hide');
            htmlareaEl.removeClass('hide');
            htmlareaEl.empty();
            htmlareaEl.append($(state.email_txt));
            break;
        case 'adp-text':
            textareaEl.removeClass('hide');
            htmlareaEl.addClass('hide');
            textareaEl.val(state.adp_txt);
            break;
        case 'google-sheets-entry':
            textareaEl.removeClass('hide');
            htmlareaEl.addClass('hide');
            textareaEl.val(state.google_sheets_entry);
            break;
        default:
            textareaEl.val('');
    }
})

$('#generated-session-finish').on('click', 'button', function() {
    const buttonText = $(this).attr('id')
    const textAreaEl = $('#generated-finish')

    switch (buttonText) {
        case 'adp-text':
            textAreaEl.val(state.adp_txt);
            break;
        case 'google-sheets-finish':
            textAreaEl.val(state.google_sheets_finish)
            break;
        case 'google-forms-finish':
            textAreaEl.val("google forms")
            break;
        
    }
})

$('#session-date').on('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp': 
            state.sessionDate.add(1, 'days');
            break;
        case 'ArrowDown':
            state.sessionDate.subtract(1, 'days');
            break;
    }
    
    $('#session-date').val(state.sessionDate.format(DATE_INPUT_FORMAT));
})

$('#session-time').on('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp': 
            state.sessionTime.add(30, 'minutes');
            break;
        case 'ArrowDown':
            state.sessionTime.subtract(30, 'minutes');
            break;
    }
    
    $('#session-time').val(state.sessionTime.format(TIME_INPUT_FORMAT));
})

$('#student-filter').on('keyup', function(event) {
    filter.student = $(this).val();
    displayStudents();
})