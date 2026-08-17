import React from "react";
import Image from "next/image";
import Link from "next/link";


export default function about() {
  return (
    <div className="w-full bg-white py-10 px-6 pt-25 lg:px-16">
      <div className="relative w-full h-[650px] overflow-hidden rounded-[40px]">
        <Image
          src="/about-image.png"
          alt="About"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute left-10 bottom-10 bg-white rounded-3xl shadow-2xl p-8 w-[90%] md:w-[600px]">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-4 py-2 rounded-full">
            ABOUT KNOWLEDGEHUB
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold mt-6 leading-tight text-gray-900">
            Empowering Minds,
            <br />
            <span className="text-blue-600">One Connection at a Time.</span>
          </h1>

          <p className="mt-6 text-gray-600 leading-8">
            We believe every student deserves access to exceptional guidance.
            KnowledgeHub connects learners with experienced tutors from around
            the world, helping students achieve their academic goals.
          </p>
        </div>
      </div>
      <div className="bg-white mt-32 px-8 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-900">Our Missions</h2>

            <div className="w-20 h-1 bg-blue-600 rounded-full mt-2 mb-8"></div>

            <p className="text-gray-700 leading-8 mb-6 text-base">
              At{" "}
              <span className="font-semibold text-blue-600">KnowledgeHub</span>,
              our mission is to make quality education accessible to every
              student, regardless of location or background. We connect learners
              with experienced tutors who inspire confidence, encourage
              curiosity, and support academic success.
            </p>

            <p className="text-gray-700 leading-8 text-base">
              Through modern technology and one-on-one learning experiences, we
              help students achieve their goals while creating opportunities for
              tutors to share their expertise with learners around the world.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[500px] h-[350px] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/Mission-image.png"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 px-6 lg:px-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            A Platform Built for Both
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-7">
            Whether you're seeking knowledge or looking to share it,
            KnowledgeHub provides the tools and environment for success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-10 hover:-translate-y-2 duration-300">
        

            <h3 className="text-2xl font-bold mt-6">For Students</h3>

            <p className="text-gray-500 mt-4 leading-7">
              Take control of your learning journey. Find the perfect tutor,
              schedule sessions, and achieve your academic goals.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                Access expert tutors
              </li>

              <li className="flex items-center gap-3">
                 Interactive live classes
              </li>

              <li className="flex items-center gap-3">
                 Flexible scheduling
              </li>

              <li className="flex items-center gap-3"> Progress tracking</li>
            </ul>

            
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-10 hover:-translate-y-2 duration-300">
            

            <h3 className="text-2xl font-bold mt-6">For Tutors</h3>

            <p className="text-gray-500 mt-4 leading-7">
              Share your expertise and inspire students while building your
              professional teaching career.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                 Teach from anywhere
              </li>

              <li className="flex items-center gap-3">
                 Manage your schedule
              </li>

              <li className="flex items-center gap-3"> Earn online</li>

              <li className="flex items-center gap-3"> Build your profile</li>
            </ul>

           
          </div>
        </div>
      </div>

      <div className="mt-24 px-6 lg:px-20 mb-20">
        <div className="bg-blue-700 rounded-[35px] py-16 px-8 text-center text-white">
          <h2 className="text-4xl font-bold">
            Ready to Ignite Your Learning Journey?
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-blue-100 leading-8">
            Join thousands of students and tutors who are already transforming
            education on KnowledgeHub.
          </p>

          <Link href="/register"><button className="mt-10 bg-white text-blue-700 px-10 py-4 rounded-xl font-semibold hover:bg-blue-100 duration-300">
            Join Today 
          </button></Link>
        </div>
      </div>
    </div>
  );
}
