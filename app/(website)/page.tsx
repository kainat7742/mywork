"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full bg-white text-[#071b3a]">
      <section className="relative overflow-hidden bg-[#f5faff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
                <span className="w-2 h-2 bg-[#159bd7] rounded-full"></span>

                <span className="text-sm font-medium text-gray-600">
                  Learn Without Limits
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#06204a]">
                Empower Your
                <span className="block text-[#159bd7]">Education Journey</span>
              </h1>

              <p className="mt-6 text-gray-600 text-base lg:text-lg leading-8 max-w-xl">
                Discover expert tutors, interactive courses, and personalized
                learning experiences designed to help you achieve your goals and
                build a brighter future.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/register"
                  className="bg-[#06204a] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#0c326c] transition shadow-lg"
                >
                  Register Yourself 
                </Link>

                <Link
                  href="/enrollForm"
                  className="bg-white border border-gray-200 text-[#06204a] px-7 py-3.5 rounded-xl font-semibold hover:border-[#159bd7] transition"
                >
                  Enroll Yourself
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#159bd7]/10 rounded-full"></div>

              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#06204a]/5 rounded-full"></div>

              <div className="relative bg-white rounded-[30px] p-3 shadow-2xl">
                <div className="relative w-full h-[350px] sm:h-[430px] rounded-[22px] overflow-hidden">
                  <Image
                    src="/hero.png"
                    alt="Online learning"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                <div className="absolute -left-5 bottom-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#e8f7fd] flex items-center justify-center">
                    🎓
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Students Learning</p>

                    <p className="font-bold text-[#06204a]">10,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#06204a]">
                10K+
              </h3>

              <p className="text-sm text-gray-500 mt-1">Active Students</p>
            </div>

            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#06204a]">
                500+
              </h3>

              <p className="text-sm text-gray-500 mt-1">Expert Tutors</p>
            </div>

            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#06204a]">
                100+
              </h3>

              <p className="text-sm text-gray-500 mt-1">Courses</p>
            </div>

            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#06204a]">
                98%
              </h3>

              <p className="text-sm text-gray-500 mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#159bd7] text-sm font-bold uppercase tracking-wider">
              Why Choose Us
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-[#06204a] mt-3">
              Everything You Need to Learn Better
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              We bring students and qualified tutors together to create a
              simple, flexible and effective learning experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7faff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div>
              <span className="text-[#159bd7] text-sm font-bold uppercase tracking-wider">
                Explore Learning
              </span>

              <h2 className="text-3xl lg:text-4xl font-bold text-[#06204a] mt-3">
                Learn Something New Every Day
              </h2>

              <p className="text-gray-500 mt-3 max-w-xl">
                Explore our learning resources and discover new ways to grow
                your knowledge and skills.
              </p>
            </div>

            <Link href="/courses" className="text-[#159bd7] font-semibold">
              View All Courses →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="relative h-[220px] lg:h-[280px] rounded-2xl overflow-hidden">
              <Image
                src="/technology.png"
                alt="Technology learning"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <h3 className="text-white font-bold">Technology</h3>
              </div>
            </div>

            <div className="relative h-[220px] lg:h-[280px] rounded-2xl overflow-hidden">
              <Image
                src="/online-classes.png"
                alt="Online classes"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <h3 className="text-white font-bold">Online Classes</h3>
              </div>
            </div>

            <div className="relative h-[220px] lg:h-[280px] rounded-2xl overflow-hidden">
              <Image
                src="/students.png"
                alt="Students"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <h3 className="text-white font-bold">Student Community</h3>
              </div>
            </div>

            <div className="relative h-[220px] lg:h-[280px] rounded-2xl overflow-hidden">
              <Image
                src="/global.png"
                alt="Global education"
                fill
                className="object-cover hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <h3 className="text-white font-bold">Global Learning</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#061b38] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              What Our Students Say
            </h2>

            <p className="text-gray-300 mt-4">
              Real experiences from students who are learning and growing with
              us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto">
            <div className="bg-[#102c50] rounded-2xl p-7 border border-white/5">
              <div className="text-yellow-400 text-lg mb-4">★ ★ ★ ★ ★</div>

              <p className="text-gray-200 leading-7">
                "The tutors are very supportive and the courses are easy to
                understand. I have improved my learning skills a lot."
              </p>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-11 h-11 rounded-full bg-[#159bd7] flex items-center justify-center text-white font-bold">
                  A
                </div>

                <div>
                  <h4 className="text-white font-semibold">Ahmed Khan</h4>

                  <p className="text-gray-400 text-xs">Student</p>
                </div>
              </div>
            </div>

            <div className="bg-[#102c50] rounded-2xl p-7 border border-white/5">
              <div className="text-yellow-400 text-lg mb-4">★ ★ ★ ★ ★</div>

              <p className="text-gray-200 leading-7">
                "Finding a good tutor became much easier. The platform is
                simple, professional and very convenient."
              </p>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-11 h-11 rounded-full bg-[#f3b64d] flex items-center justify-center text-white font-bold">
                  S
                </div>

                <div>
                  <h4 className="text-white font-semibold">Sara Ali</h4>

                  <p className="text-gray-400 text-xs">Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f7faff]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden bg-white border border-gray-100 rounded-[30px] shadow-sm px-6 py-14 lg:px-16 text-center">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#159bd7]/10 rounded-full"></div>

            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#06204a]/5 rounded-full"></div>

            <div className="relative">
              <span className="text-[#159bd7] text-sm font-bold uppercase tracking-wider">
                Start Your Journey
              </span>

              <h2 className="text-3xl lg:text-4xl font-bold text-[#06204a] mt-3">
                Ready to Start Learning?
              </h2>

              <p className="text-gray-500 max-w-xl mx-auto mt-4 leading-7">
                Join our learning community today and connect with expert tutors
                who can help you reach your goals.
              </p>

              <Link
                href="/register"
                className="inline-block mt-7 bg-[#06204a] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#0c326c] transition shadow-lg"
              >
                Get Started Today →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#06204a] flex items-center justify-center">
                  <span className="text-white font-bold text-xl">K</span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#06204a]">
                    Knowledge
                    <span className="text-[#159bd7]">Hub</span>
                  </h3>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-6 max-w-xs">
                Helping students learn better and helping tutors share their
                knowledge with the world.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#06204a] mb-5">Quick Links</h3>

              <div className="flex flex-col gap-3 text-sm text-gray-500">
                <Link href="/" className="hover:text-[#159bd7]">
                  Home
                </Link>

                <Link href="/about" className="hover:text-[#159bd7]">
                  About Us
                </Link>

                <Link href="/courses" className="hover:text-[#159bd7]">
                  Courses
                </Link>

                <Link href="/services" className="hover:text-[#159bd7]">
                  Services
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#06204a] mb-5">Resources</h3>

              <div className="flex flex-col gap-3 text-sm text-gray-500">
                <Link href="/blog" className="hover:text-[#159bd7]">
                  Blog
                </Link>

                <Link href="/privacy" className="hover:text-[#159bd7]">
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#06204a] mb-5">Stay Connected</h3>

              <p className="text-sm text-gray-500 leading-6 mb-4">
                Get the latest learning resources and updates.
              </p>

              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-3 outline-none text-sm"
                />

                <button
                  type="button"
                  className="bg-[#06204a] text-white px-4 text-sm font-semibold hover:bg-[#0c326c] transition"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-400">
            <p>© 2026 KnowledgeHub. All rights reserved.</p>

            <div className="flex gap-5">
              <Link href="/terms" className="hover:text-[#159bd7]">
                Terms
              </Link>

              <Link href="/privacy" className="hover:text-[#159bd7]">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
