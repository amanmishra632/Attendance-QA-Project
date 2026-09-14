const { test, expect } = require("@playwright/test");
const db = require("../database");
test("Student ID input is visible", async ({page}) => {
    await page.goto("http://localhost:3000");
    await expect(page.locator("#studentId")).toBeVisible();
});
test("Teacher can mark attendance through UI",async ({page}) => {
    await page.goto("http://localhost:3000");
    await page.locator("#studentId").fill("102");
    await page.locator("#attendanceStatus").selectOption("Absent");
    await page.locator("#saveAttendanceButton").click();
    await expect(page.locator("#attendanceMessage")).toHaveText("Attendance saved successfully");
});
test("Teacher can mark attendance as Present through UI",async ({page}) => {
    await page.goto("http://localhost:3000");
    await page.locator("#studentId").fill("102");
    await page.locator("#attendanceStatus").selectOption("Present");
    await page.locator("#saveAttendanceButton").click();
    await expect(page.locator("#attendanceMessage")).toHaveText("Attendance saved successfully");
    const record = db.prepare("SELECT * FROM attendance WHERE student_id = ?").get(102);
    expect(record.status).toBe("Present");
});
test("Student cannot modify attendance through UI",async ({page}) => {
    await page.goto("http://localhost:3000");
    await page.locator("#userRole").selectOption("student");
    await page.locator("#studentId").fill("102");
    await page.locator("#attendanceStatus").selectOption("Present");
    await page.locator("#saveAttendanceButton").click();
    await expect(page.locator("#attendanceMessage")).toHaveText("Only teachers can modify attendance");
    const record = db.prepare(
    "SELECT * FROM attendance WHERE student_id = ?"
    ).get(102);

    expect(record.status).toBe("Present");
});
test("Teacher cannot submit attendance without student ID", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.locator("#userRole").selectOption("teacher");
    await page.locator("#studentId").fill("");
    await page.locator("#attendanceStatus").selectOption("Present");

    const responsePromise = page.waitForResponse(
        response => response.url().includes("/attendance")
    );

    await page.locator("#saveAttendanceButton").click();

    const response = await responsePromise;

    expect(response.status()).toBe(400);

    await expect(page.locator("#attendanceMessage"))
        .toHaveText("student_id and status are required");
});
test("Student can view attendance", async ({ request }) => {
    const response = await request.get("http://localhost:3000/attendance/102");

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.student_id).toBe(102);
    expect(data.status).toBe("Present");
});
test("Teacher can change attendance from Present to Absent", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.locator("#userRole").selectOption("teacher");
    await page.locator("#studentId").fill("102");
    await page.locator("#attendanceStatus").selectOption("Absent");

    const responsePromise = page.waitForResponse(
        response => response.url().includes("/attendance")
    );

    await page.locator("#saveAttendanceButton").click();

    const response = await responsePromise;

    expect(response.status()).toBe(200);

    await expect(page.locator("#attendanceMessage"))
        .toHaveText("Attendance saved successfully");
      const record = db.prepare(
    "SELECT * FROM attendance WHERE student_id = ?"
    ).get(102);

    expect(record.status).toBe("Absent");
});
