$(document).ready(() => {
    displayAllStudents()
})

const EMAIL_DATE_FORMAT = 'dddd / MMM D / h:mm A';
const GOOGLE_SHEETS_DATE_FORMAT = 'MMM D yyyy, h:mm A';

const ADP_TEMPLATE = '../assets/templates/adp.txt';
const CONFIRMATION_EMAIL_TEMPLATE = '../assets/templates/confirmation_email.txt';
const GOOGLE_SHEETS_ENTRY_TEMPLATE = '../assets/tempates/google_sheets_entry.txt';

const state = {
    selectedStudent: null,
    confirmation_email_txt: null,
    adp_txt: null,
    google_sheets_entry: null,
    B2B: null,
}

function displayAllStudents() {
    const allStudentsDIV = $('#student-names-list')

    $.ajax({
        url: '/api/students',
        method: 'GET'
    })
    .then(studentData => {
        for(const student of studentData) {
            allStudentsDIV.append($(`
                <p id="${student.id}">${student.first_name} ${student.last_name}</p>
            `))
        }
    })
}

function showPopup() {
    $('#screen-popup-blur').removeClass('hide')
    $('#date-entry').removeClass('hide')
}

function hidePopup() {
    $('#screen-popup-blur').addClass('hide')
    $('#date-entry').addClass('hide')
    $('#generated-results').addClass('hide')
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
        console.log(state)
    })
    showPopup()
})

$('#exit-icon').on('click', hidePopup)
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
    email_txt = email_txt.replace('%', email_time)
    email_txt = email_txt.replace('%', state.selectedStudent.first_name)
    email_txt = email_txt.replace('%', email_time)
    email_txt = email_txt.replace('%', state.selectedStudent.zoom_link)
    state.email_txt = email_txt;

    $('#date-entry').addClass('hide')
    $('#generated-results').removeClass('hide')
    
})

$('#generated-results').on('click', 'button', function() {
    const buttonText = $(this).attr('id')
    const textareaEl = $('#generated-text');
    console.log(state)
    switch (buttonText) {
        case 'confirmation-email':
            textareaEl.val(state.email_txt);
            break;
        case 'adp-text':
            textareaEl.val(state.adp_txt);
            break;
        case 'google-sheets-entry':
            textareaEl.val(state.google_sheets_entry);
            break;
        default:
            textareaEl.val('');
    }
})