import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "login",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      role,
      name,
      email,
      phone,
      subject,
      qualification,
      experience,
      timing,
      message,
    } = body;

    if (
      !role ||
      !name ||
      !email ||
      !phone ||
      !subject ||
      !qualification ||
      !timing
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 },
      );
    }

    if (role !== "student" && role !== "tutor") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enrollment role.",
        },
        { status: 400 },
      );
    }

    if (role === "tutor" && !experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Teaching experience is required for tutors.",
        },
        { status: 400 },
      );
    }

    const [user] = await pool.execute("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please register first before enrolling.",
        },
        { status: 401 },
      );
    }

    const sql = `
      INSERT INTO enrollments
      (
        role,
        name,
        email,
        phone,
        subject,
        qualification,
        experience,
        timing,
        message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      role,
      name,
      email,
      phone,
      subject,
      qualification,
      experience || null,
      timing,
      message || null,
    ];

    const [result] = await pool.execute(sql, values);

    return NextResponse.json(
      {
        success: true,
        message:
          role === "student"
            ? "Student enrollment submitted successfully!"
            : "Tutor enrollment submitted successfully!",
        enrollmentId: result.insertId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Enrollment API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error. Enrollment could not be submitted.",
      },
      { status: 500 },
    );
  }
}
