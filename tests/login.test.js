const { test, expect } = require("@playwright/test");

test("Teacher login with valid credentials", async ({ request }) => {
    const response = await request.post("http://localhost:3000/login", {
        data: {
            email: "teacher@test.com",
            password: "Teacher@123"
        }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.message).toBe("Login successful");
    expect(data.role).toBe("teacher");
});

test("Teacher can mark student as Present", async ({ request }) => {
    const response = await request.post("http://localhost:3000/attendance", {
        data: {
            role: "teacher",
            student_id: 102,
            status: "Present"
        }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.message).toBe("Attendance saved successfully");
    expect(data.student_id).toBe(102);
    expect(data.status).toBe("Present");
});

test("Student cannot modify attendance", async ({ request }) => {
    const response = await request.post("http://localhost:3000/attendance", {
        data: {
            role: "student",
            student_id: 102,
            status: "Present"
        }
    });

    expect(response.status()).toBe(403);

    const data = await response.json();

    expect(data.message).toBe("Only teachers can modify attendance");
});

test("Teacher cannot use invalid attendance status", async ({ request }) => {
    const response = await request.post("http://localhost:3000/attendance", {
        data: {
            role: "teacher",
            student_id: 102,
            status: "Late"
        }
    });

    expect(response.status()).toBe(400);

    const data = await response.json();

    expect(data.message).toBe("Status must be Present or Absent");
});

test("Teacher can change attendance to Absent", async ({ request }) => {
    const response = await request.post("http://localhost:3000/attendance", {
        data: {
            role: "teacher",
            student_id: 102,
            status: "Absent"
        }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.message).toBe("Attendance saved successfully");
    expect(data.student_id).toBe(102);
    expect(data.status).toBe("Absent");
});




    
