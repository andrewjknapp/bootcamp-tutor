const templates = {
    confirmation_email: `<div>%<br>
<br>
<b>Email Subject Line:</b> Coding Boot Camp - Tutorial Confirmation  - %<br>
<br>
Hi %!<br>
<br>
Thank you for scheduling your session with me. I am looking forward to our session on %<br>
<br>
If something comes up and the scheduled time will not work, <b>let me know a minimum of 6 hours before the appointment time</b> and we’ll figure something out.<br>
<br>    
This session will take place <a href="%">here</a> (%)<br>
<br> 
(If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.)<br>
<br> 
Again, all I need from you:
<ul>
    <li>Be on Tutors & Students Slack 5 minutes before your time slot.</li>
    <li>Make sure your computer/mic/internet connection are working.</li>
    <li>Make sure your workspace is quiet and free from interruptions.</li>
    <li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li>
</ul>
<br>
Slack or email me with any questions.  I’m looking forward to our meeting!<br>
<p style="font-weight:bold; font-size: 0.8em;">
    Please Reply All to this email so that I know you have seen it.
</p>
<p style="font-weight:bold; font-size: 0.9em;">
    (CC Central Support on all tutor email by always using REPLY ALL).
</p>
Sincerely,<br>
Andrew Knapp<br>
    </div>`,
    adp: 
`1. %
2. %
3. %`,
     google_sheets_entry: `%        	%	%        	%	%	%`,
    weekly_email: `
    <div>
    <b>Email Subject Line:</b> Coding Boot Camp - Tutorial available<br>
    <br>
    Hi Everyone!<br>
    <br>
    I hope you had a great week! I have attached a link below to schedule another tutoring session if you wish. <b>If you are already scheduled, please ignore this email.</b><br>
    <br>
    <a href="https://calendly.com/andrewjknapp/tutorial-session">https://calendly.com/andrewjknapp/tutorial-session</a><br>
    <b><mark>On the Calendly page, be sure you have the correct time zone selected in the section labeled "Times are in"</mark></b> <br>
    <b>If our availability doesn’t sync, let me know and I'll see if we can figure something out.</b><br>
    <br>
    <b>Maximum tutorial sessions per week - our week is Monday - Sunday.
    <ul>
        <li>Part-time (6 month boot camp) students are entitled to 1 session per week.</li>
        <li>Full-time (3 month boot camp) students are entitled to 2 sessions per week.</li>
    </ul>
    </b> 
    
    If you have any questions or none of the times available work for you please let me know and I would be happy to help.<br>
    <br>
    If you would like to schedule regular, recurring sessions at the same day/time each week, just let me know by REPLY ALL and we can work it out.  This is particularly useful if you have a strict schedule so you won't have to compete for time on my calendar.<br>
    <br>
    <b style="font-size:0.8em">CC Central Support on all email by always using REPLY ALL.</b><br>
    <br>
    <b style="font-size:0.8em">Boot camp tip! - Our Learning Assistant team is available to help you every day with your curriculum-based questions.  We think you’ll find this resource very helpful as a supplement to tutor support, TA office hours, and class time.  If you’re unsure how to utilize that resource please speak to your TAs, Instructor, or Success Manager (SSM / PSM).</b><br>
    <br>    
    Sincerely,<br>
    Andrew Knapp
    
    
    
    </div>
    `
}