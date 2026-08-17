"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50   md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-1 pt-20 gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Courses</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">—</h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Courses</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">—</h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Teachers</p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">—</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">All Courses</h2>

              <p className="mt-1 text-sm text-gray-500">
                Your uploaded courses will appear here.
              </p>
            </div>
            <Link href="/product">
              <button
                onClick={() => router.push("/products")}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                + Add Course
              </button>
            </Link>
          </div>

          <div className="flex min-h-[400px] items-center justify-center p-8">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
