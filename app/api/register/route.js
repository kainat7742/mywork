import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("REGISTER BODY:", body);

    const { name, fatherName, email, faculty, phone, address, password, role } =
      body;

    if (!name || !email || !phone || !address || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        { status: 400 },
      );
    }

    if (role !== "student" && role !== "tutor") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid role",
        },
        { status: 400 },
      );
    }

    const [existingUsers] = await pool.query(
      "SELECT id, email FROM users WHERE email = ?",
      [email],
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users
      (name, father_name, email, faculty, phone, address, password, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        fatherName || null,
        email,
        faculty || null,
        phone,
        address,
        hashedPassword,
        role,
      ],
    );

    const token = jwt.sign(
      {
        id: result.insertId,
        email: email,
        role: role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // Response
    const response = NextResponse.json(
      {
        success: true,
        message:
          role === "student"
            ? "Student account created successfully"
            : "Tutor account created successfully",

        user: {
          id: result.insertId,
          name,
          email,
          role,
        },
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("REGISTER API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
