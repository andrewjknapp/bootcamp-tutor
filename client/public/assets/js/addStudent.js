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
