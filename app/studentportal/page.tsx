"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

interface MessageItem {
  id: number;
  text: string;
}

export default function StudentPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState("");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState("");
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);

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
        throw new Error(result.message || "Courses could not be fetched.");
      }

      setCourses(result.products || result.courses || []);
    } catch (error) {
      console.error("Fetch courses error:", error);

      setCoursesError(
        error instanceof Error ? error.message : "Courses load nahi ho sake.",
      );
    } finally {
      setCoursesLoading(false);
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

  const openEnrollForm = (course?: Course) => {
    setActivePage("Enroll");

    setEnrollMessage("");
    setEnrollSuccess(false);

    if (course) {
      setSelectedCourse(course);
    } else {
      setSelectedCourse(null);
    }

    setSidebarOpen(false);
  };

  const handleEnroll = async () => {
    setEnrollMessage("");
    setEnrollSuccess(false);

    if (!selectedCourse) {
      setEnrollMessage("Please select a course first.");
      return;
    }

    setEnrollLoading(true);

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
        setEnrollSuccess(true);
        setEnrollMessage(data.message || "Course enrolled successfully.");
      } else {
        setEnrollSuccess(false);
        setEnrollMessage(data.message || "Course enrollment failed.");
      }
    } catch (error) {
      console.error("ENROLL ERROR:", error);

      setEnrollSuccess(false);
      setEnrollMessage("Something went wrong. Please try again.");
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmedMessage,
      },
    ]);

    setMessage("");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: "🏠",
      type: "button",
    },
    {
      name: "Courses",
      icon: "📚",
      type: "button",
    },
    {
      name: "Enroll",
      icon: "📝",
      type: "button",
    },
    {
      name: "Live Classroom",
      icon: "🎥",
      type: "button",
    },
    {
      name: "Schedule",
      icon: "📅",
      type: "button",
    },
    {
      name: "Messages",
      icon: "💬",
      type: "button",
    },
  ];

  const handleMenuClick = (name: string) => {
    setActivePage(name);

    if (name === "Courses") {
      fetchCourses();
    }

    if (name === "Enroll") {
      setSelectedCourse(null);
      setEnrollMessage("");
      setEnrollSuccess(false);
    }

    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#071b3a]">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#0b5ed7] flex items-center justify-center text-white font-bold">
            KH
          </div>

          <h1 className="font-bold text-lg">KnowledgeHub</h1>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen
          bg-[#071b3a]
          text-white
          transition-all duration-300
          ${sidebarOpen ? "w-72" : "w-20"}
          hidden lg:block
        `}
      >
        <div className="h-20 flex items-center px-5 border-b border-white/10">
          <div className="w-11 h-11 rounded-xl bg-[#0b5ed7] flex items-center justify-center font-bold text-lg">
            KH
          </div>

          {sidebarOpen && (
            <div className="ml-3">
              <h1 className="font-bold text-lg">KnowledgeHub</h1>

              <p className="text-xs text-gray-400">Student Portal</p>
            </div>
          )}
        </div>

        <nav className="px-3 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item.name)}
              className={`
                w-full
                flex
                items-center
                gap-4
                px-4
                py-3
                rounded-xl
                transition
                text-left
                ${
                  activePage === item.name
                    ? "bg-[#0b5ed7] text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>

              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="w-72 h-full bg-[#071b3a] text-white p-5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#0b5ed7] flex items-center justify-center font-bold">
                KH
              </div>

              <div>
                <h1 className="font-bold">KnowledgeHub</h1>

                <p className="text-xs text-gray-400">Student Portal</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.name)}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-4
                    px-4
                    py-3
                    rounded-xl
                    text-left
                    ${
                      activePage === item.name
                        ? "bg-[#0b5ed7]"
                        : "hover:bg-white/10"
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>

                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <main
        className={`
          min-h-screen
          transition-all duration-300
          ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}
          pt-16 lg:pt-0
        `}
      >
        <header className="bg-white border-b border-gray-200 px-5 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{activePage}</h1>

              <p className="text-gray-500 text-sm mt-1">
                Welcome to your KnowledgeHub student portal.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200">
                🔔
              </button>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#0b5ed7] text-white flex items-center justify-center font-bold">
                  KH
                </div>

                <div className="hidden md:block">
                  <p className="font-semibold text-sm">Student</p>

                  <p className="text-xs text-gray-500">Student Account</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-8">
          {activePage === "Dashboard" && (
            <>
              <div className="bg-gradient-to-r from-[#071b3a] to-[#0b5ed7] rounded-3xl p-6 lg:p-8 text-white mb-8">
                <div className="max-w-2xl">
                  <p className="text-blue-200 mb-2">Welcome 👋</p>

                  <h2 className="text-2xl lg:text-3xl font-bold">
                    Start your learning journey!
                  </h2>

                  <p className="text-blue-100 mt-3">
                    Explore available courses and enroll in the course you want
                    to learn.
                  </p>

                  <button
                    onClick={() => handleMenuClick("Courses")}
                    className="mt-5 bg-white text-[#071b3a] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
                  >
                    Browse Courses
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                    📚
                  </div>

                  <h2 className="text-xl font-bold mt-5">Courses</h2>

                  <p className="text-gray-500 mt-2">
                    View available courses and start learning.
                  </p>

                  <button
                    onClick={() => handleMenuClick("Courses")}
                    className="mt-5 text-[#0b5ed7] font-semibold"
                  >
                    View Courses →
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                    📝
                  </div>

                  <h2 className="text-xl font-bold mt-5">Enroll in Course</h2>

                  <p className="text-gray-500 mt-2">
                    Choose a course and submit your enrollment.
                  </p>

                  <button
                    onClick={() => handleMenuClick("Enroll")}
                    className="mt-5 text-[#0b5ed7] font-semibold"
                  >
                    Enroll Now →
                  </button>
                </div>
              </div>
            </>
          )}

          {activePage === "Courses" && (
            <div>
              <div className="text-center mb-10">
                <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
                  Explore Our Courses
                </span>

                <h2 className="mt-4 text-3xl lg:text-4xl font-extrabold text-[#071b3a]">
                  Find the Right Course for You
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                  Learn from experienced teachers and choose the course that
                  matches your learning goals.
                </p>
              </div>

              {coursesLoading && (
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
                </div>
              )}

              {!coursesLoading && coursesError && (
                <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-md">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                    ⚠️
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-gray-800">
                    Courses Could Not Be Loaded
                  </h2>

                  <p className="mt-2 text-gray-600">{coursesError}</p>

                  <button
                    onClick={fetchCourses}
                    className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!coursesLoading && !coursesError && courses.length === 0 && (
                <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-md">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
                    📚
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-[#071b3a]">
                    No Courses Available
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Abhi database mein koi course available nahi hai.
                  </p>
                </div>
              )}

              {!coursesLoading && !coursesError && courses.length > 0 && (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#071b3a]">
                      Available Courses
                    </h2>

                    <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                      {courses.length}{" "}
                      {courses.length === 1 ? "Course" : "Courses"}
                    </span>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                      <article
                        key={course.id}
                        className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      >
                        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                          <img
                            src={getImageUrl(course.image)}
                            alt={course.courseName}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = "/course-placeholder.jpg";
                            }}
                          />

                          <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 shadow-md">
                            <span className="font-bold text-blue-700">
                              Rs. {Number(course.fees).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="line-clamp-1 text-2xl font-bold text-[#071b3a]">
                            {course.courseName}
                          </h3>

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

                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                            {course.description}
                          </p>

                          <Link href={`/view?id=${course.id}`}>
                            <button className="mt-6 w-full rounded-xl border border-blue-600 py-3.5 font-bold text-blue-600 transition hover:bg-blue-50">
                              View Course
                            </button>
                          </Link>

                          <button
                            onClick={() => openEnrollForm(course)}
                            className="mt-3 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700"
                          >
                            Enroll Now
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activePage === "Enroll" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-[#071b3a] to-[#0b5ed7] text-white p-8">
                  <p className="text-blue-200 text-sm mb-2">KnowledgeHub</p>

                  <h2 className="text-3xl font-bold">Enroll in Course</h2>

                  <p className="text-blue-100 mt-2">
                    Select a course and complete your enrollment.
                  </p>
                </div>

                <div className="p-8">
                  {/* COURSE SELECT */}

                  <div className="mb-7">
                    <label className="block text-sm font-bold text-[#071b3a] mb-2">
                      Select Course
                    </label>

                    <select
                      value={selectedCourse?.id || ""}
                      onChange={(e) => {
                        const courseId = Number(e.target.value);

                        const course = courses.find(
                          (item) => item.id === courseId,
                        );

                        setSelectedCourse(course || null);

                        setEnrollMessage("");
                        setEnrollSuccess(false);
                      }}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0b5ed7]"
                    >
                      <option value="">Select a course</option>

                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.courseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SELECTED COURSE */}

                  {selectedCourse && (
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-7">
                      <p className="text-sm text-gray-500">Selected Course</p>

                      <h2 className="text-2xl font-bold text-[#071b3a] mt-1">
                        {selectedCourse.courseName}
                      </h2>

                      <div className="mt-4 grid sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Instructor</p>

                          <p className="font-semibold">
                            {selectedCourse.teacher}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Course Timing</p>

                          <p className="font-semibold">
                            {selectedCourse.timing}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Course Fees</p>

                          <p className="font-semibold text-blue-700">
                            Rs. {Number(selectedCourse.fees).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACCOUNT */}

                  <div className="bg-gray-50 border rounded-2xl p-5 mb-6">
                    <h3 className="font-bold text-[#071b3a]">Your Account</h3>

                    <p className="text-sm text-gray-600 mt-2">
                      Your registered account will be used for this course
                      enrollment.
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      You do not need to enter your Student ID manually.
                    </p>
                  </div>

                  {/* INFORMATION */}

                  <div className="bg-gray-50 border rounded-2xl p-5 mb-6">
                    <h3 className="font-bold text-[#071b3a]">
                      Enrollment Information
                    </h3>

                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      <li>✓ You must have a registered student account.</li>

                      <li>✓ Your account will be automatically identified.</li>

                      <li>✓ You will be added to the selected course.</li>

                      <li>
                        ✓ Your enrollment will be submitted to KnowledgeHub.
                      </li>
                    </ul>
                  </div>

                  {/* MESSAGE */}

                  {enrollMessage && (
                    <div
                      className={`mb-5 p-4 rounded-xl text-sm font-medium ${
                        enrollSuccess
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {enrollMessage}
                    </div>
                  )}

                  {/* CONFIRM */}

                  <button
                    onClick={handleEnroll}
                    disabled={enrollLoading || !selectedCourse}
                    className="w-full bg-[#0b5ed7] hover:bg-[#084db2] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition"
                  >
                    {enrollLoading ? "Enrolling..." : "Confirm Enrollment"}
                  </button>

                  {/* CLEAR */}

                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      setEnrollMessage("");
                      setEnrollSuccess(false);
                    }}
                    className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================= */}
          {/* LIVE CLASSROOM */}
          {/* ================================================= */}

          {activePage === "Live Classroom" && (
            <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                🎥
              </div>

              <h2 className="text-2xl font-bold mt-5">Live Classroom</h2>

              <p className="text-gray-500 mt-2">
                No live classes are available right now.
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Your upcoming classes will appear here.
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* SCHEDULE */}
          {/* ================================================= */}

          {activePage === "Schedule" && (
            <div className="bg-white rounded-2xl border shadow-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                📅
              </div>

              <h2 className="text-2xl font-bold mt-5">Class Schedule</h2>

              <p className="text-gray-500 mt-2">
                No schedule is available yet.
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Your class schedule will appear here.
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* MESSAGES */}
          {/* ================================================= */}

          {activePage === "Messages" && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* SEND MESSAGE */}

              <div className="lg:col-span-1 bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-bold">Send Message</h2>

                <p className="text-gray-500 text-sm mt-1 mb-5">
                  Write a message.
                </p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={7}
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    resize-none
                    focus:border-[#0b5ed7]
                  "
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="
                    mt-4
                    w-full
                    bg-[#0b5ed7]
                    disabled:bg-gray-300
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  Send Message
                </button>
              </div>

              {/* MESSAGES */}

              <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-bold mb-5">Messages</h2>

                {messages.length === 0 ? (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                      💬
                    </div>

                    <h3 className="font-bold text-lg mt-4">No Messages</h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Your messages will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 border rounded-xl p-4"
                      >
                        <div className="w-12 h-12 shrink-0 rounded-full bg-[#071b3a] text-white flex items-center justify-center font-bold">
                          You
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold">Your Message</h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
