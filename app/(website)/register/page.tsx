"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [isTutor, setIsTutor] = useState(false);

  const [studentForm, setStudentForm] = useState({
    name: "",
    fatherName: "",
    email: "",
    faculty: "",
    phone: "",
    address: "",
    password: "",
    role: "student",
  });

  const [tutorForm, setTutorForm] = useState({
    name: "",
    fatherName: "",
    email: "",
    faculty: "",
    phone: "",
    address: "",
    password: "",
    role: "tutor",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Student input change
  const handleStudentChange = (e) => {
    const { name, value } = e.target;

    setStudentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tutor input change
  const handleTutorChange = (e) => {
    const { name, value } = e.target;

    setTutorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Student Register
  const handleStudentRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(studentForm),
      });

      const data = await response.json();

      console.log("STUDENT REGISTER RESPONSE:", data);

      if (data.success) {
        setMessage(data.message);

        setStudentForm({
          name: "",
          fatherName: "",
          email: "",
          faculty: "",
          phone: "",
          address: "",
          password: "",
          role: "student",
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("STUDENT REGISTER ERROR:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 
  const handleTutorRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(tutorForm),
      });

      const data = await response.json();

      console.log("TUTOR REGISTER RESPONSE:", data);

      if (data.success) {
        setMessage(data.message);

        setTutorForm({
          name: "",
          fatherName: "",
          email: "",
          faculty: "",
          phone: "",
          address: "",
          password: "",
          role: "tutor",
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("TUTOR REGISTER ERROR:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 pt-30">

      <div className="ml-[10%] mr-[10%] overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div
          className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
            isTutor ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >

        

          <div className="w-1/2 shrink-0">

            <div className="bg-blue-100 p-8">

              <h2 className="text-center text-2xl font-bold">
                Register As Student
              </h2>

              <p className="mt-2 text-center text-sm text-gray-500">
                Create your student account and start learning.
              </p>

              <form
                onSubmit={handleStudentRegister}
                className="form-container mt-6"
              >

                {/* Name */}
                <input
                  name="name"
                  value={studentForm.name}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter your Name"
                  required
                />

                
                <input
                  name="fatherName"
                  value={studentForm.fatherName}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter your Father Name"
                />

                
                <input
                  name="email"
                  value={studentForm.email}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  placeholder="Enter your Email"
                  required
                />

               
                <input
                  name="faculty"
                  value={studentForm.faculty}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter your Faculty"
                />

              
                <input
                  name="phone"
                  value={studentForm.phone}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="tel"
                  placeholder="Enter your Phone Number"
                  required
                />

               
                <input
                  name="address"
                  value={studentForm.address}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter your Address"
                  required
                />

                <input
                  name="password"
                  value={studentForm.password}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  placeholder="Enter your Password"
                  required
                />

                <select
                  name="role"
                  value={studentForm.role}
                  onChange={handleStudentChange}
                  className="mb-3 mt-2 w-full rounded bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                </select>

               
                <div className="mt-5">

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-white hover:text-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>

                </div>

               
                {message && !isTutor && (
                  <p className="mt-4 text-center font-medium text-blue-700">
                    {message}
                  </p>
                )}

                <div className="mt-8 border-t border-blue-200 pt-6 text-center">

                  <p className="text-sm text-gray-600">
                    Are you a tutor?
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsTutor(true);
                      setMessage("");
                    }}
                    className="mt-2 font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
                  >
                    Register As Tutor
                  </button>

                </div>

              </form>

            </div>

          </div>


         

          <div className="w-1/2 shrink-0">

            <div className="bg-blue-100 p-8">

              <h2 className="text-center text-2xl font-bold">
                Register As Tutor
              </h2>

              <p className="mt-2 text-center text-sm text-gray-500">
                Enter your information to continue as a tutor.
              </p>

              <form
                onSubmit={handleTutorRegister}
                className="form-container mt-6"
              >

                {/* Name */}
                <input
                  name="name"
                  value={tutorForm.name}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter your Name"
                  required
                />

                {/* Father Name */}
                <input
                  name="fatherName"
                  value={tutorForm.fatherName}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter your Father Name"
                />

                {/* Email */}
                <input
                  name="email"
                  value={tutorForm.email}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  placeholder="Enter your Email"
                  required
                />

                
                <input
                  name="faculty"
                  value={tutorForm.faculty}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter your Faculty"
                />

                
                <input
                  name="phone"
                  value={tutorForm.phone}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="tel"
                  placeholder="Enter your Phone Number"
                  required
                />

               
                <textarea
                  name="address"
                  value={tutorForm.address}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full resize-none rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  rows={4}
                  placeholder="Enter your Address"
                  required
                />

               
                <input
                  name="password"
                  value={tutorForm.password}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full rounded border-none bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  placeholder="Enter your Password"
                  required
                />

               
                <select
                  name="role"
                  value={tutorForm.role}
                  onChange={handleTutorChange}
                  className="mb-3 mt-2 w-full rounded bg-white/50 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="tutor">Tutor</option>
                  <option value="student">Student</option>
                </select>

               
                <div className="mt-5">

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-white hover:text-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>

                </div>

               
                {message && isTutor && (
                  <p className="mt-4 text-center font-medium text-blue-700">
                    {message}
                  </p>
                )}

                <div className="mt-8 border-t border-blue-200 pt-6 text-center">

                  <p className="text-sm text-gray-600">
                    Are you a student?
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsTutor(false);
                      setMessage("");
                    }}
                    className="mt-2 font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
                  >
                    Register As Student
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}