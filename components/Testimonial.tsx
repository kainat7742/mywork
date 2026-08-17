export default function Testimonial() {
  return (
    <section className="px-5 pb-8 pt-7">
      <div className="text-center">
        
        
        <p className="mx-auto max-w-320px] text-[12px] italic leading-[12px] text-gray-500">
          "Tutorly transformed how I approach exams.
          My tutor didn't just teach me biology; they taught
          me how to learn. My grades jumped from a C
          to an A in three months!"
        </p>

        
        <div className="mx-auto mt-5 h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md">
          <img
            src="/images/testimonial-student.jpg"
            alt="Student"
            className="h-full w-full object-cover"
          />
        </div>

       
        <h3 className="mt-2 text-[12px] font-semibold text-gray-700">
          Jenny D
        </h3>

   
        <p className="mt-1 text-[9px] text-gray-400">
          Medical Student
        </p>

      </div>
    </section>
  );
}