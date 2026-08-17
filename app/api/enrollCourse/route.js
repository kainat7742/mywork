import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    console.log("================================");
    console.log("COURSE ENROLLMENT API START");
    console.log("================================");

    const body = await request.json();

    const { courseId } = body;

    console.log("Course ID:", courseId);

    if (!courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Course ID is required.",
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please register first before enrolling in a course.",
        },
        { status: 401 },
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("JWT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Your session has expired. Please register again.",
        },
        { status: 401 },
      );
    }

    const studentId = decoded.id;
    const role = decoded.role;

    console.log("Student ID:", studentId);
    console.log("Role:", role);

    if (role !== "student") {
      return NextResponse.json(
        {
          success: false,
          message: "Only students can enroll in courses.",
        },
        { status: 403 },
      );
    }

    const [users] = await pool.execute(
      `
      SELECT id, name, email, role
      FROM users
      WHERE id = ?
      `,
      [studentId],
    );

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Student account not found.",
        },
        { status: 404 },
      );
    }

    const [courses] = await pool.execute(
      `
      SELECT
        id,
        courseName,
        fees,
        teacher,
        timing,
        description,
        image
      FROM courses
      WHERE id = ?
      `,
      [courseId],
    );

    console.log("Course found:", courses);

    if (courses.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 },
      );
    }

    const [existingEnrollment] = await pool.execute(
      `
        SELECT id
        FROM course_enrollments
        WHERE student_id = ?
        AND course_id = ?
        `,
      [studentId, courseId],
    );

    if (existingEnrollment.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already enrolled in this course.",
        },
        { status: 409 },
      );
    }

    const [result] = await pool.execute(
      `
      INSERT INTO course_enrollments
      (
        student_id,
        course_id,
        status
      )
      VALUES (?, ?, ?)
      `,
      [studentId, courseId, "active"],
    );

    console.log("Enrollment ID:", result.insertId);

    console.log("================================");
    console.log("COURSE ENROLLMENT SUCCESS");
    console.log("================================");

    return NextResponse.json(
      {
        success: true,

        message: `Successfully enrolled in ${courses[0].courseName}!`,

        enrollmentId: result.insertId,

        course: {
          id: courses[0].id,
          courseName: courses[0].courseName,
          fees: courses[0].fees,
          teacher: courses[0].teacher,
          timing: courses[0].timing,
          description: courses[0].description,
          image: courses[0].image,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("================================");
    console.error("COURSE ENROLLMENT API ERROR");
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR CODE:", error.code);
    console.error("ERROR SQL:", error.sql);
    console.error("FULL ERROR:", error);
    console.error("================================");

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error. Course enrollment failed.",
      },
      { status: 500 },
    );
  }
}
