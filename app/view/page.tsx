"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Course {
  id: number;
  courseName: string;
  fees: number;
  teacher: string;
  timing: string;
  description: string;
  image: string;
}

export default function ViewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const courseId = searchParams.get("id");

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        setError("");

        // =========================
        // CHECK COURSE ID
        // =========================

        if (!courseId) {
          setError("No course selected.");
          setLoading(false);
          return;
        }

        // =========================
        // GET COURSES FROM DATABASE
        // =========================

        const response = await fetch("/api/product", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Courses could not be loaded."
          );
        }

        // =========================
        // FIND SELECTED COURSE
        // =========================

        const selectedCourse = data.courses.find(
          (item: Course) =>
            String(item.id) === String(courseId)
        );

        if (!selectedCourse) {
          setError("Course not found.");
          setLoading(false);
          return;
        }

        setCourse(selectedCourse);
      } catch (error) {
        console.error("Course Details Error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Course could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [courseId]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-blue-50 flex items-center justify-center px-6">
        <div className="text-center">

          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="mt-5 text-lg font-medium text-gray-600">
            Loading course...
          </p>

        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !course) {
    return (
      <main className="min-h-screen bg-blue-50 flex items-center justify-center px-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
            ⚠️
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#071b3a]">
            Course Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            {error || "This course could not be found."}
          </p>

          <button
            onClick={() => router.push("/courses")}
            className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Courses
          </button>

        </div>

      </main>
    );
  }

  // =========================
  // COURSE DETAILS PAGE
  // =========================

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-12 md:px-8 lg:px-16">

      <div className="mx-auto max-w-7xl">

        {/* Back Button */}

        <button
          onClick={() => router.push("/courses")}
          className="mb-8 font-semibold text-blue-600 transition hover:text-blue-800"
        >
          ← Back to Courses
        </button>

        {/* Main Card */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* =========================
                COURSE IMAGE
            ========================= */}

            <div className="h-[350px] bg-gray-100 lg:h-[550px]">

              {course.image ? (
                <img
                  src={course.image}
                  alt={course.courseName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/course-placeholder.jpg";
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}

            </div>

            {/* =========================
                COURSE INFORMATION
            ========================= */}

            <div className="flex flex-col justify-center p-8 lg:p-12">

              <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                KNOWLEDGEHUB COURSE
              </span>

              <h1 className="mt-5 text-4xl font-extrabold text-[#071b3a] md:text-5xl">
                {course.courseName}
              </h1>

              {/* Description */}

              <p className="mt-6 text-base leading-8 text-gray-600">
                {course.description}
              </p>

              {/* Teacher */}

              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl">
                  👨‍🏫
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Instructor
                  </p>

                  <p className="text-lg font-bold text-[#071b3a]">
                    {course.teacher}
                  </p>
                </div>

              </div>

              {/* Timing */}

              <div className="mt-5 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl">
                  🕒
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Course Timing
                  </p>

                  <p className="text-lg font-bold text-[#071b3a]">
                    {course.timing}
                  </p>
                </div>

              </div>

              {/* Fee */}

              <div className="mt-8 rounded-2xl bg-blue-50 p-5">

                <p className="text-sm font-medium text-gray-500">
                  Course Fee
                </p>

                <p className="mt-1 text-3xl font-extrabold text-blue-600">
                  Rs.{" "}
                  {Number(course.fees).toLocaleString()}
                </p>

              </div>

              {/* Enroll Button */}

              <button
                onClick={() => router.push("/enrollCourse")}
                className="mt-7 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
              >
                Enroll Now
              </button>

            </div>
          </div>

          {/* =========================
              DETAILS SECTION
          ========================= */}

          <div className="border-t border-gray-100 p-8 lg:p-12">

            <h2 className="text-3xl font-bold text-[#071b3a]">
              Course Details
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

              {/* Teacher */}

              <div className="rounded-2xl bg-blue-50 p-6">

                <p className="text-sm text-gray-500">
                  Teacher
                </p>

                <p className="mt-2 text-lg font-bold text-[#071b3a]">
                  {course.teacher}
                </p>

              </div>

              {/* Timing */}

              <div className="rounded-2xl bg-blue-50 p-6">

                <p className="text-sm text-gray-500">
                  Timing
                </p>

                <p className="mt-2 text-lg font-bold text-[#071b3a]">
                  {course.timing}
                </p>

              </div>

              {/* Fees */}

              <div className="rounded-2xl bg-blue-50 p-6">

                <p className="text-sm text-gray-500">
                  Course Fee
                </p>

                <p className="mt-2 text-lg font-bold text-blue-600">
                  Rs.{" "}
                  {Number(course.fees).toLocaleString()}
                </p>

              </div>

            </div>

            {/* Full Description */}

            <div className="mt-8 rounded-2xl bg-blue-50 p-6">

              <h3 className="text-xl font-bold text-[#071b3a]">
                About This Course
              </h3>

              <p className="mt-4 leading-8 text-gray-600">
                {course.description}
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}