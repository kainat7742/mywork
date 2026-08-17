import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    console.log("================================");
    console.log("PRODUCT API START");
    console.log("================================");

    const formData = await request.formData();

    const courseName = formData.get("courseName");
    const fees = formData.get("fees");
    const teacher = formData.get("teacher");
    const timing = formData.get("timing");
    const description = formData.get("description");

    const image = formData.get("image");

    console.log("Course Name:", courseName);
    console.log("Fees:", fees);
    console.log("Teacher:", teacher);
    console.log("Timing:", timing);
    console.log("Description:", description);
    console.log("Image:", image?.name);

    if (!courseName || !fees || !teacher || !timing || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Fill all fields.",
        },
        {
          status: 400,
        },
      );
    }

    if (!image || typeof image === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Select course image.",
        },
        {
          status: 400,
        },
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Upload only image files.",
        },
        {
          status: 400,
        },
      );
    }

    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image should be 5Mb.",
        },
        {
          status: 400,
        },
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, {
      recursive: true,
    });

    const extension = path.extname(image.name) || ".jpg";

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}${extension}`;

    const filePath = path.join(uploadDir, fileName);

    const bytes = await image.arrayBuffer();

    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    console.log("Image saved successfully");

    const imageUrl = `/uploads/${fileName}`;

    const [result] = await pool.execute(
      `
      INSERT INTO courses
      (
        courseName,
        fees,
        teacher,
        timing,
        description,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [courseName, Number(fees), teacher, timing, description, imageUrl],
    );

    console.log("Course saved in MySQL");

    return NextResponse.json(
      {
        success: true,
        message: "Course successfully Added.",

        course: {
          id: result.insertId,
          courseName,
          fees: Number(fees),
          teacher,
          timing,
          description,
          image: imageUrl,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("================================");
    console.error("COURSE API ERROR:");
    console.error(error);
    console.error("================================");

    return NextResponse.json(
      {
        success: false,
        message: "Server Error.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    const [courses] = await pool.execute(
      `
      SELECT *
      FROM courses
      ORDER BY id DESC
      `,
    );

    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("GET COURSES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Courses could not fetch.",
      },
      {
        status: 500,
      },
    );
  }
}
