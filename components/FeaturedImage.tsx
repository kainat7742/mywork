import React from "react";
import Image from "next/image";

export default function FeaturedImage() {
  return (
    <section className="px-6 mt-8">
      <div className="relative overflow-hidden rounded-3xl shadow-lg">

        {/* Main Image */}
        <Image
          src="/hero.png"
          width={1500}
          height={800}
          alt="Hero Image"
          className="w-full h-auto rounded-3xl object-cover"
        />

        {/* Bottom Left Avatar Group */}
        <div className="absolute bottom-4 left-4 flex items-center">

          <div className="flex -space-x-3">

            <Image
              src="/student1.png"
              width={60}
              height={30}
              alt="Student 1"
              className="rounded-full border-2 border-white object-cover"
            />

            <Image
              src="/student2.png"
              width={80}
              height={30}
              alt="Student 2"
              className="rounded-full border-2 border-white object-cover"
            />

            <Image
              src="/student3.png"
              width={80}
              height={30}
              alt="Student 3"
              className="rounded-full border-2 border-white object-cover"
            />

            <Image
              src="/student4.png"
              width={80}
              height={30}
              alt="Student 4"
              className="rounded-full border-2 border-white object-cover"
            />

          </div>

         
          <button className="ml-3 w-16 h-10 rounded-full  bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition">
            +1000
          </button>

        </div>

      </div>
    </section>
  );
}