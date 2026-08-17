"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnrollFormPage() {
  const router = useRouter();

  // =========================
  // ROLE
  // =========================

  const [role, setRole] = useState("");

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    qualification: "",
    experience: "",
    timing: "",
    message: "",
  });

  // =========================
  // STATUS
  // =========================

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SELECT STUDENT / TUTOR
  // =====================================================

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);

    setSuccess("");
    setError("");

    setFormData((previous) => ({
      ...previous,
      phone: "",
      subject: "",
      qualification: "",
      experience: "",
      timing: "",
      message: "",
    }));
  };

  // =====================================================
  // CHANGE ROLE
  // =====================================================

  const handleChangeRole = () => {
    setRole("");
    setError("");
    setSuccess("");

    setFormData((previous) => ({
      ...previous,
      phone: "",
      subject: "",
      qualification: "",
      experience: "",
      timing: "",
      message: "",
    }));
  };

  // =====================================================
  // SUBMIT ENROLLMENT
  // =====================================================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Role check
    if (!role) {
      setError("Please select Student or Tutor.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enrollForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Enrollment could not be submitted.");
        return;
      }

      setSuccess(data.message || "Enrollment submitted successfully!");

      setRole("");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        qualification: "",
        experience: "",
        timing: "",
        message: "",
      });
    } catch (error) {
      console.error("Enrollment error:", error);

      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-16 pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            KnowledgeHub Enrollment
          </span>

          <h1 className="mt-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
            Join Knowledge
            <span className="text-blue-600">Hub</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose how you want to join KnowledgeHub and complete your
            enrollment form.
          </p>
        </div>

        <div className="mb-8 flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/courses")}
            className="rounded-xl border-2 border-blue-600 bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-600"
          >
            Courses
          </button>
        </div>

        {success && (
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 text-center font-semibold text-green-700">
            ✅ {success}
          </div>
        )}

        {error && !role && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-center font-semibold text-red-700">
            ❌ {error}
          </div>
        )}

        {!role && (
          <div className="grid gap-8 md:grid-cols-2">
            <button
              type="button"
              onClick={() => handleRoleSelect("student")}
              className="group rounded-3xl border border-blue-100 bg-white p-8 text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                🎓
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                Enroll as Student
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Join KnowledgeHub as a student and discover courses, tutors and
                learning opportunities.
              </p>

              <div className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition group-hover:bg-blue-700">
                Continue as Student
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect("tutor")}
              className="group rounded-3xl border border-blue-100 bg-white p-8 text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                👨‍🏫
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                Enroll as Tutor
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Become a tutor on KnowledgeHub and share your knowledge with
                students.
              </p>

              <div className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition group-hover:bg-blue-700">
                Continue as Tutor
              </div>
            </button>
          </div>
        )}

        {role && (
          <div className="rounded-3xl bg-white p-7 shadow-2xl md:p-10">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  {role === "student"
                    ? "Student Enrollment"
                    : "Tutor Enrollment"}
                </span>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {role === "student" ? "Enroll as Student" : "Enroll as Tutor"}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleChangeRole}
                className="w-fit rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-blue-600 hover:text-blue-600"
              >
                Change Role
              </button>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {role === "student"
                      ? "Interested Subject"
                      : "Teaching Subject"}
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mathematics"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {role === "student" ? "Current Education" : "Qualification"}
                  </label>

                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder={
                      role === "student"
                        ? "e.g. Matric / Intermediate"
                        : "e.g. BS Mathematics"
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {role === "tutor" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Teaching Experience
                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 2 years"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Preferred Timing
                  </label>

                  <select
                    name="timing"
                    value={formData.timing}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select timing</option>

                    <option value="Morning">Morning</option>

                    <option value="Afternoon">Afternoon</option>

                    <option value="Evening">Evening</option>

                    <option value="Night">Night</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      role === "student"
                        ? "Tell us about your learning goals..."
                        : "Tell us about your teaching experience..."
                    }
                    rows={5}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Submitting..."
                  : role === "student"
                    ? "Submit Student Enrollment"
                    : "Submit Tutor Enrollment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
