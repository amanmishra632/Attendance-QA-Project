const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());
app.use(express.static("public"));


const users = [
    {
        email: "teacher@test.com",
        password: "Teacher@123",
        role: "teacher"
    },
    {
        email: "student@test.com",
        password: "Student@123",
        role: "student"
    }
];


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        role: user.role
    });
});
app.post("/attendance", (req, res) => {
    const { role, student_id, status } = req.body;

    if (role !== "teacher") {
        return res.status(403).json({
            message: "Only teachers can modify attendance"
        });
    }

    if (!student_id || !status) {
        return res.status(400).json({
            message: "student_id and status are required"
        });
    }

    if (status !== "Present" && status !== "Absent") {
        return res.status(400).json({
            message: "Status must be Present or Absent"
        });
    }

const existing = db.prepare("SELECT * FROM attendance WHERE student_id =?").get(student_id);
if (existing) {
    db.prepare("UPDATE attendance SET status = ? WHERE student_id = ?")
      .run(status, student_id);
} else {
    db.prepare("INSERT INTO attendance(status, student_id) VALUES(?, ?)")
      .run(status, student_id);
}

    res.json({
        message: "Attendance saved successfully",
        student_id,
        status
    });
});
app.get("/attendance/:student_id", (req, res) => {
    const student_id = req.params.student_id;

    const record = db.prepare(
        "SELECT * FROM attendance WHERE student_id = ?"
    ).get(student_id);

    if (!record) {
        return res.status(404).json({
            message: "Attendance not found"
        });
    }

    res.status(200).json(record);
});



app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});