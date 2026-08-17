import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { cookies } from "next/headers";

async function checkAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Please login first.",
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return {
        success: false,
        status: 403,
        message: "Only admin can access this page.",
      };
    }

    return {
      success: true,
      decoded,
    };
  } catch (error) {
    console.error("ADMIN JWT ERROR:", error);

    return {
      success: false,
      status: 401,
      message: "Invalid or expired session.",
    };
  }
}

export async function GET() {
  try {
    const admin = await checkAdmin();

    if (!admin.success) {
      return NextResponse.json(
        {
          success: false,
          message: admin.message,
        },
        {
          status: admin.status,
        },
      );
    }

    const [enrollments] = await pool.execute(`
      SELECT
        ce.id,
        ce.student_id,
        ce.course_id,
        ce.status,
        ce.enrolled_at,

        u.name AS student_name,
        u.email AS student_email,

        c.courseName,
        c.fees,
        c.teacher,
        c.timing,
        c.description,
        c.image

      FROM course_enrollments ce

      INNER JOIN users u
        ON ce.student_id = u.id

      INNER JOIN courses c
        ON ce.course_id = c.id

      ORDER BY ce.enrolled_at DESC
    `);

    return NextResponse.json({
      success: true,
      enrollments,
    });
  } catch (error) {
    console.error("GET ADMIN ENROLLMENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Could not fetch enrollments.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(request) {
  try {
    const admin = await checkAdmin();

    if (!admin.success) {
      return NextResponse.json(
        {
          success: false,
          message: admin.message,
        },
        {
          status: admin.status,
        },
      );
    }

    const body = await request.json();

    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Enrollment ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (status !== "active" && status !== "cancelled") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enrollment status.",
        },
        {
          status: 400,
        },
      );
    }

    const [existing] = await pool.execute(
      `
      SELECT id
      FROM course_enrollments
      WHERE id = ?
      `,
      [id],
    );

    if (existing.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Enrollment not found.",
        },
        {
          status: 404,
        },
      );
    }

    await pool.execute(
      `
      UPDATE course_enrollments
      SET status = ?
      WHERE id = ?
      `,
      [status, id],
    );

    return NextResponse.json({
      success: true,

      message:
        status === "active"
          ? "Enrollment confirmed successfully."
          : "Enrollment cancelled successfully.",

      status,
    });
  } catch (error) {
    console.error("UPDATE ENROLLMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Could not update enrollment.",
      },
      {
        status: 500,
      },
    );
  }
}
