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
  created_at?: string;
}

export default function EnrollCoursePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // =====================================
  // COURSE DATA
  // =====================================

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");

  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  // =====================================
  // ENROLLMENT STATES
  // =====================================

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // =====================================
  // GET IMAGE URL
  // =====================================

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

  // =====================================
  // GET COURSES
  // =====================================

  const fetchCourses = async () => {
    try {
      setCoursesLoading(true);
      setCoursesError("");

      const response = await fetch("/api/product", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Courses could not be fetched."
        );
      }

      const courseList =
        result.products || result.courses || [];

      setCourses(courseList);

      // =====================================
      // IF COURSE ID COMES FROM URL
      // =====================================

      const courseIdFromURL =
        searchParams.get("courseId");

      if (courseIdFromURL) {
        const course = courseList.find(
          (item: Course) =>
            item.id === Number(courseIdFromURL)
        );

        if (course) {
          setSelectedCourse(course);
        }
      }
    } catch (error) {
      console.error("Fetch courses error:", error);

      setCoursesError(
        error instanceof Error
          ? error.message
          : "Courses load nahi ho sake."
      );
    } finally {
      setCoursesLoading(false);
    }
  };

  // =====================================
  // LOAD COURSES
  // =====================================

  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  // =====================================
  // HANDLE COURSE CHANGE
  // =====================================

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const courseId = Number(e.target.value);

    const course = courses.find(
      (item) => item.id === courseId
    );

    setSelectedCourse(course || null);

    setMessage("");
    setSuccess(false);
  };

  // =====================================
  // ENROLL
  // =====================================

  const handleEnroll = async () => {
    setMessage("");
    setSuccess(false);

    if (!selectedCourse) {
      setMessage("Please select a course first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enrollCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          courseId: Number(selectedCourse.id),
        }),
      });

      const data = await response.json();

      console.log("ENROLL RESPONSE:", data);

      if (data.success) {
        setSuccess(true);
        setMessage(
          data.message ||
            "Course enrolled successfully."
        );

        setTimeout(() => {
          router.push("/studentportal");
        }, 1500);
      } else {
        setSuccess(false);
        setMessage(
          data.message ||
            "Course enrollment failed."
        );
      }
    } catch (error) {
      console.error("ENROLL ERROR:", error);

      setSuccess(false);
      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // PAGE
  // =====================================

  return (
    <main className="min-h-screen bg-[#f5f8fc] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-3xl">

        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

          {/* =====================================
              HEADER
          ===================================== */}

          <div className="bg-gradient-to-r from-[#071b3a] to-[#0b5ed7] text-white p-8">

            <p className="text-blue-200 text-sm mb-2">
              KnowledgeHub
            </p>

            <h1 className="text-3xl font-bold">
              Enroll in Course
            </h1>

            <p className="text-blue-100 mt-2">
              Select your course and review the
              course details before enrollment.
            </p>

          </div>

          {/* =====================================
              CONTENT
          ===================================== */}

          <div className="p-6 md:p-8">

            {/* =====================================
                COURSE SELECT
            ===================================== */}

            <div className="mb-7">

              <label className="block text-sm font-bold text-[#071b3a] mb-2">
                Select Course
              </label>

              {coursesLoading ? (
                <div className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-500">
                  Loading courses...
                </div>
              ) : coursesError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {coursesError}

                  <button
                    onClick={fetchCourses}
                    className="ml-3 font-bold underline"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <select
                  value={selectedCourse?.id || ""}
                  onChange={handleCourseChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white focus:border-[#0b5ed7] focus:ring-2 focus:ring-blue-100 transition"
                >

                  <option value="">
                    Select a course
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course.id}
                      value={course.id}
                    >
                      {course.courseName}
                    </option>
                  ))}

                </select>
              )}

            </div>

            {/* =====================================
                SELECTED COURSE DETAILS
            ===================================== */}

            {selectedCourse && (
              <div className="mb-7 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">

                {/* COURSE IMAGE */}

                <div className="relative h-52 w-full bg-gray-100">

                  <img
                    src={getImageUrl(
                      selectedCourse.image
                    )}
                    alt={selectedCourse.courseName}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/course-placeholder.jpg";
                    }}
                  />

                  {/* FEES */}

                  <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 shadow-md">

                    <span className="font-bold text-blue-700">
                      Rs.{" "}
                      {Number(
                        selectedCourse.fees
                      ).toLocaleString()}
                    </span>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="p-6">

                  <p className="text-sm text-gray-500">
                    Selected Course
                  </p>

                  <h2 className="text-2xl font-bold text-[#071b3a] mt-1">
                    {selectedCourse.courseName}
                  </h2>

                  {/* COURSE INFORMATION */}

                  <div className="grid sm:grid-cols-2 gap-4 mt-6">

                    {/* TEACHER */}

                    <div className="bg-white rounded-xl border p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                          👨‍🏫
                        </div>

                        <div>

                          <p className="text-xs text-gray-500">
                            Instructor
                          </p>

                          <p className="font-bold text-gray-800">
                            {selectedCourse.teacher}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* TIMING */}

                    <div className="bg-white rounded-xl border p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                          🕒
                        </div>

                        <div>

                          <p className="text-xs text-gray-500">
                            Course Timing
                          </p>

                          <p className="font-bold text-gray-800">
                            {selectedCourse.timing}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* FEES */}

                    <div className="bg-white rounded-xl border p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                          💰
                        </div>

                        <div>

                          <p className="text-xs text-gray-500">
                            Course Fees
                          </p>

                          <p className="font-bold text-blue-700">
                            Rs.{" "}
                            {Number(
                              selectedCourse.fees
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* COURSE ID */}

                    <div className="bg-white rounded-xl border p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                          🆔
                        </div>

                        <div>

                          <p className="text-xs text-gray-500">
                            Course ID
                          </p>

                          <p className="font-bold text-gray-800">
                            {selectedCourse.id}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <div className="mt-5 bg-white rounded-xl border p-4">

                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Course Description
                    </p>

                    <p className="text-sm leading-6 text-gray-700">
                      {selectedCourse.description ||
                        "No course description available."}
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* =====================================
                ACCOUNT INFORMATION
            ===================================== */}

            <div className="bg-gray-50 border rounded-2xl p-5 mb-6">

              <h3 className="font-bold text-[#071b3a]">
                Your Account
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                Your registered account will be used
                for this course enrollment.
              </p>

              <p className="text-sm text-gray-600 mt-2">
                You do not need to enter your Student
                ID manually.
              </p>

            </div>

            {/* =====================================
                ENROLLMENT INFORMATION
            ===================================== */}

            <div className="bg-gray-50 border rounded-2xl p-5 mb-6">

              <h3 className="font-bold text-[#071b3a]">
                Enrollment Information
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">

                <li>
                  ✓ You must have a registered student
                  account.
                </li>

                <li>
                  ✓ Your account will be automatically
                  identified.
                </li>

                <li>
                  ✓ Your selected course will be added
                  to your account.
                </li>

                <li>
                  ✓ The course will appear in My Courses.
                </li>

              </ul>

            </div>

            {/* =====================================
                MESSAGE
            ===================================== */}

            {message && (
              <div
                className={`mb-5 p-4 rounded-xl text-sm font-medium ${
                  success
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* =====================================
                CONFIRM ENROLLMENT
            ===================================== */}

            <button
              onClick={handleEnroll}
              disabled={
                loading ||
                !selectedCourse ||
                coursesLoading
              }
              className="w-full bg-[#0b5ed7] hover:bg-[#084db2] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition"
            >
              {loading
                ? "Enrolling..."
                : "Confirm Enrollment"}
            </button>

            {/* =====================================
                BACK
            ===================================== */}

            <button
              onClick={() => router.back()}
              className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Go Back
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}