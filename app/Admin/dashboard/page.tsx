"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Enrollment {
  id: number;
  student_id: number;
  course_id: number;
  status: string;
  enrolled_at: string;

  student_name: string;
  student_email: string;

  courseName: string;
  fees: number;
  teacher: string;
  timing: string;
  description: string;
  image: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // ==========================================
  // LOAD ENROLLMENTS
  // ==========================================

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "/api/admin/enrollments",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (response.status === 401 || response.status === 403) {
          router.push("/login");
          return;
        }

        throw new Error(
          data.message || "Enrollments could not be loaded."
        );
      }

      setEnrollments(data.enrollments || []);
    } catch (error) {
      console.error("FETCH ENROLLMENTS ERROR:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ON PAGE
  // ==========================================

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // ==========================================
  // UPDATE ENROLLMENT STATUS
  // ==========================================

  const updateStatus = async (
    enrollmentId: number,
    status: "active" | "cancelled"
  ) => {
    try {
      setUpdatingId(enrollmentId);
      setMessage("");

      const response = await fetch(
        "/api/admin/enrollments",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: enrollmentId,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Status update failed."
        );
      }

      // Update UI without dummy data
      setEnrollments((previous) =>
        previous.map((enrollment) =>
          enrollment.id === enrollmentId
            ? {
                ...enrollment,
                status,
              }
            : enrollment
        )
      );

      setMessage(
        status === "active"
          ? "Enrollment confirmed successfully."
          : "Enrollment cancelled successfully."
      );
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Could not update enrollment."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    router.push("/login");
  };

  // ==========================================
  // COUNTS FROM REAL DATABASE DATA
  // ==========================================

  const totalEnrollments = enrollments.length;

  const pendingEnrollments = enrollments.filter(
    (item) => item.status === "pending"
  ).length;

  const activeEnrollments = enrollments.filter(
    (item) => item.status === "active"
  ).length;

  const cancelledEnrollments = enrollments.filter(
    (item) => item.status === "cancelled"
  ).length;

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

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

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#f5f8fc] flex">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#071b3a] text-white flex flex-col shadow-xl">

        {/* LOGO */}

        <div className="px-6 py-7 border-b border-blue-900">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-[#0b5ed7] flex items-center justify-center text-xl font-bold">
              K
            </div>

            <div>
              <h1 className="text-lg font-bold">
                KnowledgeHub
              </h1>

              <p className="text-xs text-blue-300">
                Admin Panel
              </p>
            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 px-4 py-6 space-y-2">

          {/* DASHBOARD */}

          <button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0b5ed7] text-white font-semibold"
          >
            <span className="text-lg">▦</span>
            Dashboard
          </button>

          {/* ENROLLMENTS */}

          <button
            onClick={() => {
              document
                .getElementById("enrollments")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-blue-900 transition"
          >
            <span className="text-lg">🎓</span>
            Enrollments
          </button>

          {/* COURSES */}

          <button
            onClick={() => router.push("/courses")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-blue-900 transition"
          >
            <span className="text-lg">📚</span>
            Courses
          </button>

          {/* HOME */}

          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-blue-900 transition"
          >
            <span className="text-lg">🏠</span>
            Website
          </button>

        </nav>

        {/* LOGOUT */}

        <div className="p-4 border-t border-blue-900">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <section className="ml-64 w-[calc(100%-16rem)] min-h-screen">

        {/* ==================================================
            TOP BAR
        ================================================== */}

        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20">

          <div>
            <p className="text-sm text-gray-500">
              KnowledgeHub
            </p>

            <h2 className="text-2xl font-bold text-[#071b3a]">
              Admin Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0b5ed7] font-bold">
              A
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-800">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                Admin
              </p>
            </div>

          </div>

        </header>

        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="p-8">

          {/* PAGE TITLE */}

          <div className="mb-7">

            <h1 className="text-3xl font-bold text-[#071b3a]">
              Enrollment Management
            </h1>

            <p className="text-gray-500 mt-1">
              Review and manage student course enrollments.
            </p>

          </div>

          {/* ==================================================
              MESSAGE
          ================================================== */}

          {message && (
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-medium text-blue-700">
              {message}
            </div>
          )}

          {/* ==================================================
              STAT CARDS
          ================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* TOTAL */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Total Enrollments
                  </p>

                  <p className="text-3xl font-bold text-[#071b3a] mt-2">
                    {totalEnrollments}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                  🎓
                </div>

              </div>

            </div>

            {/* PENDING */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Pending
                  </p>

                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {pendingEnrollments}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-xl">
                  ⏳
                </div>

              </div>

            </div>

            {/* ACTIVE */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Confirmed
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {activeEnrollments}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                  ✓
                </div>

              </div>

            </div>

            {/* CANCELLED */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Cancelled
                  </p>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {cancelledEnrollments}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-xl">
                  ✕
                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              ENROLLMENTS
          ================================================== */}

          <div
            id="enrollments"
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
          >

            {/* TABLE HEADER */}

            <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <h2 className="text-xl font-bold text-[#071b3a]">
                  Student Enrollments
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Approve or cancel student course requests.
                </p>
              </div>

              <button
                onClick={fetchEnrollments}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-[#0b5ed7] hover:bg-[#084db2] text-white text-sm font-semibold transition disabled:bg-gray-400"
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>

            </div>

            {/* LOADING */}

            {loading ? (
              <div className="py-20 text-center">

                <div className="inline-block w-10 h-10 border-4 border-blue-200 border-t-[#0b5ed7] rounded-full animate-spin" />

                <p className="text-gray-500 mt-4">
                  Loading enrollments...
                </p>

              </div>
            ) : enrollments.length === 0 ? (

              /* NO DATA */

              <div className="py-20 text-center px-6">

                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
                  📭
                </div>

                <h3 className="text-lg font-bold text-gray-800 mt-4">
                  No enrollments found
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  When a student submits an enrollment,
                  it will appear here.
                </p>

              </div>

            ) : (

              /* ENROLLMENT CARDS */

              <div className="divide-y divide-gray-100">

                {enrollments.map((enrollment) => (

                  <div
                    key={enrollment.id}
                    className="p-6 hover:bg-gray-50 transition"
                  >

                    <div className="flex flex-col xl:flex-row gap-6">

                      {/* COURSE IMAGE */}

                      <div className="w-full xl:w-44 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">

                        <img
                          src={getImageUrl(
                            enrollment.image
                          )}
                          alt={enrollment.courseName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/course-placeholder.jpg";
                          }}
                        />

                      </div>

                      {/* DETAILS */}

                      <div className="flex-1">

                        {/* TOP */}

                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">

                          <div>

                            <p className="text-xs text-gray-500">
                              Enrollment #{enrollment.id}
                            </p>

                            <h3 className="text-xl font-bold text-[#071b3a] mt-1">
                              {enrollment.courseName}
                            </h3>

                          </div>

                          {/* STATUS */}

                          <span
                            className={`w-fit px-3 py-1.5 rounded-full text-xs font-bold ${
                              enrollment.status ===
                              "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : enrollment.status ===
                                  "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {enrollment.status ===
                            "pending"
                              ? "PENDING"
                              : enrollment.status ===
                                "active"
                              ? "CONFIRMED"
                              : "CANCELLED"}
                          </span>

                        </div>

                        {/* STUDENT */}

                        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

                          <div className="rounded-xl bg-gray-50 border p-3">

                            <p className="text-xs text-gray-500">
                              Student
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                              {enrollment.student_name}
                            </p>

                          </div>

                          <div className="rounded-xl bg-gray-50 border p-3">

                            <p className="text-xs text-gray-500">
                              Email
                            </p>

                            <p className="font-semibold text-gray-800 mt-1 break-all">
                              {enrollment.student_email}
                            </p>

                          </div>

                          <div className="rounded-xl bg-gray-50 border p-3">

                            <p className="text-xs text-gray-500">
                              Instructor
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                              {enrollment.teacher}
                            </p>

                          </div>

                          <div className="rounded-xl bg-gray-50 border p-3">

                            <p className="text-xs text-gray-500">
                              Course Fees
                            </p>

                            <p className="font-semibold text-blue-700 mt-1">
                              Rs.{" "}
                              {Number(
                                enrollment.fees
                              ).toLocaleString()}
                            </p>

                          </div>

                        </div>

                        {/* COURSE INFO */}

                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">

                          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg">
                            🕒 {enrollment.timing}
                          </span>

                          <span className="bg-gray-100 px-3 py-1.5 rounded-lg">
                            Course ID:{" "}
                            {enrollment.course_id}
                          </span>

                          <span className="bg-gray-100 px-3 py-1.5 rounded-lg">
                            Student ID:{" "}
                            {enrollment.student_id}
                          </span>

                          <span className="bg-gray-100 px-3 py-1.5 rounded-lg">
                            {formatDate(
                              enrollment.enrolled_at
                            )}
                          </span>

                        </div>

                        {/* DESCRIPTION */}

                        {enrollment.description && (
                          <p className="text-sm text-gray-500 mt-4 leading-6">
                            {enrollment.description}
                          </p>
                        )}

                      </div>

                      {/* ACTIONS */}

                      <div className="xl:w-36 flex xl:flex-col gap-3 justify-end">

                        {/* APPROVE */}

                        <button
                          onClick={() =>
                            updateStatus(
                              enrollment.id,
                              "active"
                            )
                          }
                          disabled={
                            updatingId ===
                              enrollment.id ||
                            enrollment.status ===
                              "active"
                          }
                          title="Confirm enrollment"
                          className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          <span className="text-xl">
                            ✓
                          </span>

                          <span>
                            {enrollment.status ===
                            "active"
                              ? "Confirmed"
                              : "Approve"}
                          </span>
                        </button>

                        {/* CANCEL */}

                        <button
                          onClick={() =>
                            updateStatus(
                              enrollment.id,
                              "cancelled"
                            )
                          }
                          disabled={
                            updatingId ===
                              enrollment.id ||
                            enrollment.status ===
                              "cancelled"
                          }
                          title="Cancel enrollment"
                          className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          <span className="text-xl">
                            ✕
                          </span>

                          <span>
                            {enrollment.status ===
                            "cancelled"
                              ? "Cancelled"
                              : "Cancel"}
                          </span>
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}