class Student {
    constructor(id, graduation_date, first_name, last_name, email, timezone, zoom_link) {
        this.id = id;
        this.graduation_date = graduation_date;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.timezone = timezone;
        this.zoom_link = zoom_link;
        this.lastSession = {
            sessionDate: null
        }
    }
}

module.exports = Student