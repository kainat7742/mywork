import SubjectCard from "./SubjectCard";
import { LuNotebookPen } from "react-icons/lu";


export default function PopularSubjects() {

  return (

    <section className="px-6 mt-10">

      <div className="flex justify-between">

        <h3 className="font-bold">

          Popular Subjects

        </h3>

        <button className="text-blue-600">

          View All

        </button>

      </div>

      <div className="grid grid-cols-3 gap-5 mt-6">

        <SubjectCard
          title="Biology"
          icon="🔬"
        />

        <SubjectCard
          title="Physics"
          icon="⚛️"
        />

        <SubjectCard
          title="Chemistry"
          icon="🧪"
        />

        <SubjectCard
          title="English"
          icon="📚"
        />
        <SubjectCard
          title="Mathematics"
          icon="🧮"
        />
        <SubjectCard
          title="Computer Science"
          icon="💻"
        />

      </div>

    </section>

  );
}