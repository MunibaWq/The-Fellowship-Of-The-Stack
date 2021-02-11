const pool = require("./db");

const emailsSent = async (day) => {
    const response = await pool.query("SELECT sent FROM sendgrid where day = $1", [
        day,
    ]);
    return response.rows[0];
};
exports.emailsSent = emailsSent;
const sendReminder = async () => {
    const events = await pool.query("SELECT * from events");
    for (event of events.rows) {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (new Date(events.start_time).getDate() = tomorrow.getDate()) {
            attendees = await pool.query(
                "SELECT e.*, a.event_id, u.email, u.name from events_attendees a INNER JOIN users u ON a.attendee = u.id INNER JOIN events e ON e.id=a.event_id WHERE a.event_id = " +
                event.id
            );
            collabs = await pool.query(`SELECT u.username FROM users u INNER JOIN events_attendees a ON u.id = a.attendee WHERE a.type = 'collab' AND a.event_id =` + event.id);
            for (attendee of attendees.rows) {
                reminderForEvent('reminder', attendee, collabs);
            }
        }
    }
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    pool.query("UPDATE sendgrid SET sent = true;");
    const response = await pool.query(
        "INSERT INTO sendgrid(sent, day) VALUES($1, $2)",
        [
            false,
            tomorrow.toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            }),
        ]
    );
};
exports.sendReminder = sendReminder;
