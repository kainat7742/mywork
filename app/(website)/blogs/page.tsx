"use client";

import Link from "next/link";

const blogs = [
  {
    title: "How Technology Is Changing Education",
    category: "Education",
    date: "August 10, 2026",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover how modern technology is transforming classrooms and creating new opportunities for students.",
  },
  {
    title: "Learning Strategies for Better Results",
    category: "Study Tips",
    date: "August 7, 2026",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
    description:
      "Simple and effective study strategies that can help students improve their learning experience.",
  },
  {
    title: "The Future of Online Learning",
    category: "Online Learning",
    date: "August 5, 2026",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore the future of digital education and how online learning is becoming more accessible.",
  },
  {
    title: "Why Choose Online Tutors?",
    category: "Tutoring",
    date: "August 2, 2026",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn why working with an online tutor can make difficult subjects easier to understand.",
  },
  {
    title: "Building Better Study Habits",
    category: "Study Tips",
    date: "July 30, 2026",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
    description:
      "Develop consistent study habits and create a learning routine that works for you.",
  },
  {
    title: "Making Learning More Engaging",
    category: "Education",
    date: "July 27, 2026",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn how interactive learning methods can make education more enjoyable and effective.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white pt-25 text-gray-800">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">

            <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
              KnowledgeHub Blog
            </span>

            <h1 className="mt-5 text-4xl font-extrabold text-gray-900 md:text-5xl">
              KnowledgeHub
              <span className="text-blue-600"> Insights</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              Explore helpful articles, study tips, education trends and useful
              ideas to make your learning journey better.
            </p>

          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">

          {/* Featured Article */}
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">

            <div className="grid md:grid-cols-2">

              <div className="h-72 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                  alt="Students learning together"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-7 md:p-9">

                <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Featured Article
                </span>

                <h2 className="mt-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                  The Future of Education:
                  <span className="text-blue-600"> Digital Learning</span>
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  Digital education is changing the way students learn. From
                  online courses to personalized tutoring, discover how
                  technology is creating new possibilities for education.
                </p>

                <div className="mt-5 flex items-center gap-3 text-xs text-gray-500">
                  <span>August 12, 2026</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>

                <Link
                  href="/blog"
                  className="mt-6 w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Read Article
                </Link>

              </div>
            </div>
          </div>

          {/* Latest Articles */}
          <div className="mt-14">

            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Latest Articles
              </span>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                From Our Blog
              </h2>
            </div>

            {/* Blog Cards */}
            <div className="mt-8 grid w-full gap-7 md:grid-cols-2 lg:grid-cols-3">

              {blogs.map((post, index) => (
                <article
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">

                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                      {post.category}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.date}</span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold leading-snug text-gray-900 transition group-hover:text-blue-600">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>

                    <Link
                      href="/blog"
                      className="mt-5 inline-block text-sm font-bold text-blue-600 hover:text-blue-800"
                    >
                      Read More →
                    </Link>

                  </div>
                </article>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:px-12 lg:px-20">

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue-700 px-8 py-14 text-center shadow-2xl md:px-16">

          {/* Decorative Circles */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border-[30px] border-blue-500/30"></div>

          <div className="absolute -bottom-24 -left-16 h-60 w-60 rounded-full border-[30px] border-blue-500/30"></div>

          <div className="relative">

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Ready to Start Learning?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-blue-100">
              Join KnowledgeHub today and take the next step toward your
              learning goals.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/register"
                className="rounded-xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Create Account
              </Link>

            </div>

          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#062b5c] px-6 py-12 text-white md:px-12 lg:px-20">

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">

          {/* About */}
          <div>

            <h2 className="text-2xl font-extrabold">
              Knowledge<span className="text-blue-300">Hub</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-blue-100">
              Your online learning platform connecting students with
              quality tutors and useful educational resources.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="font-bold">
              Quick Links
            </h3>

            <div className="mt-4 space-y-3 text-sm text-blue-100">

              <Link
                href="/"
                className="block hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/courses"
                className="block hover:text-white"
              >
                Courses
              </Link>

              <Link
                href="/tutors"
                className="block hover:text-white"
              >
                Tutors
              </Link>

              <Link
                href="/services"
                className="block hover:text-white"
              >
                Services
              </Link>

            </div>
          </div>

          {/* For Users */}
          <div>

            <h3 className="font-bold">
              For Users
            </h3>

            <div className="mt-4 space-y-3 text-sm text-blue-100">

              <Link
                href="/register"
                className="block hover:text-white"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="block hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/courses"
                className="block hover:text-white"
              >
                Find a Course
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>

            <h3 className="font-bold">
              Contact Us
            </h3>

            <div className="mt-4 space-y-3 text-sm text-blue-100">

              <p>📧 info@knowledgehub.com</p>

              <p>+92 300 1234567</p>

              <p>Pakistan</p>

            </div>
          </div>

        </div>

      
        <div className="mx-auto mt-10 max-w-6xl border-t border-blue-400/30 pt-6 text-center text-sm text-blue-200">
          © {new Date().getFullYear()} KnowledgeHub. All Rights Reserved.
        </div>

      </footer>

    </main>
  );
}