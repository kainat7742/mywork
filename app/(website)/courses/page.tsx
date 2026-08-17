"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  courseName: string;
  fees: number;
  teacher: string;
  timing: string;
  description: string;
  image: string;
  created_at?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/product", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Courses could not fetch.");
      }

      setCourses(result.products || result.courses || []);
    } catch (error) {
      console.error("Fetch courses error:", error);
      setError(
        error instanceof Error ? error.message : "Courses load nahi ho sake.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const getImageUrl = (image: string) => {
    if (!image) {
      return "/course-placeholder.jpg";
    }

    if (
      image.startsWith("/") ||
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `/uploads/${image}`;
  };

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-12 py-30 md:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl text-center">
        <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
          Explore Our Courses
        </span>

        <h1 className="mt-4 text-4xl font-extrabold text-[#071b3a] md:text-5xl">
          Find the Right Course for You
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Learn from experienced teachers and choose the course that matches
          your learning goals.
        </p>
      </section>

      {/* Loading */}
      {loading && (
        <section className="mx-auto mt-12 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
            >
              <div className="h-56 bg-gray-200"></div>

              <div className="space-y-4 p-6">
                <div className="h-6 rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-10 rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Error */}
      {!loading && error && (
        <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
            ⚠️
          </div>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Courses Could not loaded
          </h2>

          <p className="mt-2 text-gray-600">{error}</p>

          <button
            onClick={fetchCourses}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </section>
      )}

      {/* No Courses */}
      {!loading && !error && courses.length === 0 && (
        <section className="mx-auto mt-12 max-w-xl rounded-2xl bg-white p-10 text-center shadow-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
            📚
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#071b3a]">
            No Courses Available
          </h2>

          <p className="mt-2 text-gray-500">
            Abhi database mein koi course available nahi hai.
          </p>
        </section>
      )}

      {/* Courses */}
      {!loading && !error && courses.length > 0 && (
        <section className="mx-auto mt-12 max-w-7xl">
          {/* Course count */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#071b3a]">
              Available Courses
            </h2>

            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              {courses.length} {courses.length === 1 ? "Course" : "Courses"}
            </span>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(course.image)}
                    alt={course.courseName}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/course-placeholder.jpg";
                    }}
                  />

                  {/* Price Badge */}
                  <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 shadow-md">
                    <span className="font-bold text-blue-700">
                      Rs. {Number(course.fees).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="line-clamp-1 text-2xl font-bold text-[#071b3a]">
                    {course.courseName}
                  </h3>

                  {/* Teacher */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">
                      👨‍🏫
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Instructor
                      </p>

                      <p className="font-semibold text-gray-800">
                        {course.teacher}
                      </p>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="mt-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg">
                      🕒
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Course Timing
                      </p>

                      <p className="font-medium text-gray-700">
                        {course.timing}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {course.description}
                  </p>
                  <Link href={`/view?id=${course.id}`}>
                    <button className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700">
                      View Course
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
