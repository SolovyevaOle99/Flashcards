import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "159Qw33296",
    database: "study_web_app"
})