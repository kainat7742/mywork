import { Fullscreen } from "lucide-react";
import CTAButton from "./CTAButton";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="px-6 pt-25">

      <div className="rounded-3xl bg-blue-50 p-8 text-center">

        <span className="bg-white px-4 py-2 rounded-full text-xs font-semibold text-blue-600">

          TRUSTED BY 10,000+ STUDENTS

        </span>

        <h2 className="mt-6 text-3xl font-bold">

          Unlock Your Potential with

          <span className="text-blue-600 italic">

            {" "}
            Expert Tutors

          </span>

        </h2>

        <p className="mt-4 text-gray-500">

          Master any subject with flexible 1-on-1 online
          sessions tailored to your unique learning style.

        </p>

        <CTAButton />
        

        

      </div>
      
    </div>
  );
}
