const gs_entry = $('#google-sheets-student-roster-entry')
const firstNameEl = $('#form-first-name')
const lastNameEl = $('#form-last-name')
const idEl = $('#form-id')
const graduationEl= $('#form-graduation')
const timeZoneEl = $('#form-time-zone')
const emailEl = $('#form-email')
const zoomLinkEl = $('#form-zoom-link')

$('#add-student-button').on('click', () => {
   const id = idEl.val();
   const first_name = firstNameEl.val();
   const last_name = lastNameEl.val();
   const graduation_date = graduationEl.val();
   const email = emailEl.val();
   const timezone = timeZoneEl.val();
   const zoom_link = zoomLinkEl.val();

    const newStudent = {
        id,
        first_name,
        last_name,
        graduation_date,
        email,
        timezone,
        zoom_link,
    }
    console.log(newStudent)
    $.ajax({
        url: "/api/students",
        method: "POST",
        data: {...newStudent},
    })
    .then(response => {
        console.log(response)
    })
})

gs_entry.change(function() {
    const input = $(this).val()
    autoFillForm(input)
})

function gsEntryOnPaste() {
    setTimeout(() => {
        autoFillForm(gs_entry.val())
    }, 1)
}

function autoFillForm(text) {
    
    const input = text.split("\t");
    console.log(input);
    const name = input[2].split(" ");
    firstNameEl.val(name[0]);
    lastNameEl.val(name[1]);

    idEl.val(input[0]);
    graduationEl.val(input[1]);
    timeZoneEl.val(input[5]);
    emailEl.val(input[3]);
    zoomLinkEl.val(input[6]);
}