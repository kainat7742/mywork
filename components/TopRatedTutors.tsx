import React from "react";
import Image from "next/image";
const tutors = [
  {
    id: 1,
    name: "Sir Najeebullah",
    subject: "Advanced Mathematics",
    price: "$45/hr",
    image: "/tutors/sirnajeeb.png",
    
  },
  {
    id: 2,
    name: "Miss Kainat",
    subject: "Advanced Biology",
    price: "$60/hr",
    image: "/tutors/misskainat.png",
   
  },
  {
    id: 3,
    name: "Miss Moattar",
    subject: "Advanced Physics",
    price: "$50/hr",
    image: "/tutors/missmoattar.png",
    
  },
];

export default function TopRatedTutors() {
  return (
    <section className="w-3px-5 pt-7">
      
      
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-gray-700">
          Top Rated Tutors
        </h2>

        <button className="text-[20px] leading-none text-blue-600">
          
        </button> 
      </div>

      <div className="flex gap-20 ml-10 overflow-x-auto pb-2 scrollbar-hide">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="min-w-[120px] overflow-hidden rounded-xl bg-white shadow-sm"
          >
           
            <div className="relative h-[190px] w-[250px]  overflow-hidden">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="h-full w-full object-cover"
              />

              
            </div>

          
            <div className="p-2">
              <h3 className="truncate text-[12px] font-semibold text-gray-800">
                {tutor.name}
              </h3>

              <p className="mt-1 h-[18px] overflow-hidden text-[10px] leading-[8px] text-gray-500">
                {tutor.subject}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[15px] font-semibold text-blue-600">
                  {tutor.price}
                </span>

                <button className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-medium hover:bg-blue-600 hover:text-white text-blue-600">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}