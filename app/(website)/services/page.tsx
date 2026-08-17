"use client";

import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-25 text-gray-800">

      
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20 md:px-12 lg:px-20">

        {/* Background circles */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"></div>

        <div className="relative mx-auto max-w-6xl text-center">

          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            KnowledgeHub Learning Platform
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Professional Online Teaching
            <span className="block text-blue-600">
              For Everyone
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Learn from experienced tutors, improve your skills and achieve
            your academic goals with KnowledgeHub.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/courses"
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-700"
            >
              Explore Courses
            </Link>

            <Link
              href="/register"
              className="rounded-xl border-2 border-blue-600 bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Get Started
            </Link>

          </div>

        </div>
      </section>


      {/* ================= SERVICES ================= */}
      <section className="px-6 py-20 md:px-12 lg:px-20">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="font-semibold uppercase tracking-wider text-blue-600">
              Our Services
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Everything You Need To Learn
            </h2>

            <p className="mt-4 text-gray-600">
              KnowledgeHub provides simple and effective learning solutions
              for students and tutors.
            </p>

          </div>


          <div className="mt-12 grid gap-7 md:grid-cols-3">

            
            <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-lg shadow-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">

             
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Personalized Learning
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Find suitable courses and learn from qualified tutors
                according to your learning needs.
              </p>

              <Link
                href="/courses"
                className="mt-5 inline-block font-semibold text-blue-600 hover:text-blue-800"
              >
                Explore Learning 
              </Link>

            </div>


            
            <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-lg shadow-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">

              

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Expert Tutors
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Connect with experienced tutors who can help you understand
                difficult subjects and improve your skills.
              </p>

              <Link
                href="/tutors"
                className="mt-5 inline-block font-semibold text-blue-600 hover:text-blue-800"
              >
                Find Tutors 
              </Link>

            </div>


           
            <div className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-lg shadow-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-xl">

              
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Quality Resources
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Access useful learning materials, courses and resources
                designed to make learning easier.
              </p>

              <Link
                href="/courses"
                className="mt-5 inline-block font-semibold text-blue-600 hover:text-blue-800"
              >
                View Courses 
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* ================= LEARNING SECTION ================= */}
      <section className="bg-gray-50 px-6 py-20 md:px-12 lg:px-20">

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

         
          <div>

            <span className="font-semibold uppercase  text-blue-600">
              Learn Better
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Learning Made Simple With KnowledgeHub
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              We believe that quality education should be accessible,
              simple and convenient. KnowledgeHub connects students with
              tutors and learning resources in one place.
            </p>


            <div className="mt-8 space-y-5">

              <div className="flex gap-4">

                
                <div>
                  <h3 className="font-bold text-gray-900">
                    Qualified Tutors
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Learn from tutors who are experienced in their subjects.
                  </p>
                </div>

              </div>


              <div className="flex gap-4">

                
                <div>
                  <h3 className="font-bold text-gray-900">
                    Flexible Learning
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Learn at your own pace and choose courses according to
                    your requirements.
                  </p>
                </div>

              </div>


              <div className="flex gap-4">

                

                <div>
                  <h3 className="font-bold text-gray-900">
                    Student Focused
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Our platform is designed to make your learning journey
                    easier and more effective.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="px-6 py-20 md:px-12 lg:px-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <span className="font-semibold uppercase tracking-wider text-blue-600">
              Why KnowledgeHub?
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Our Platform?
            </h2>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-blue-50 p-6 text-center transition hover:-translate-y-1">
              

              <h3 className="mt-4 font-bold">
                Online Learning
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Learn from anywhere using your laptop or mobile.
              </p>
            </div>


            <div className="rounded-2xl bg-blue-50 p-6 text-center transition hover:-translate-y-1">
             

              <h3 className="mt-4 font-bold">
                Expert Tutors
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Connect with knowledgeable and helpful tutors.
              </p>
            </div>


            <div className="rounded-2xl bg-blue-50 p-6 text-center transition hover:-translate-y-1">
             

              <h3 className="mt-4 font-bold">
                Useful Courses
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Discover courses designed for your learning goals.
              </p>
            </div>


            <div className="rounded-2xl bg-blue-50 p-6 text-center transition hover:-translate-y-1">
              
              <h3 className="mt-4 font-bold">
                Easy Experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Simple interface that makes learning comfortable.
              </p>
            </div>

          </div>

        </div>

      </section>


    
      <section className="px-6 py-16 md:px-12 lg:px-20">

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-blue-700 px-8 py-14 text-center shadow-2xl md:px-16">

       
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


      <footer className="bg-[#062b5c] px-6 py-12 text-white md:px-12 lg:px-20">

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">

         
          <div>

            <h2 className="text-2xl font-extrabold">
              Knowledge<span className="text-blue-300">Hub</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-blue-100">
              Your online learning platform connecting students with
              quality tutors and useful educational resources.
            </p>

          </div>


          
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


          
          <div>

            <h3 className="font-bold">
              Contact Us
            </h3>

            <div className="mt-4 space-y-3 text-sm text-blue-100">

              <p>📧 info@knowledgehub.com</p>

              <p> +92 300 1234567</p>

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