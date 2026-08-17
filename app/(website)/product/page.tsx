"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    courseName: "",
    fees: "",
    teacher: "",
    timing: "",
    description: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);

 

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Sirf image file upload karein.");
      return;
    }

    
    if (file.size > 5 * 1024 * 1024) {
      alert("Image maximum 5MB ki honi chahiye.");
      return;
    }

    setImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!image) {
      alert("Please course image select karein.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("courseName", formData.courseName);
      data.append("fees", formData.fees);
      data.append("teacher", formData.teacher);
      data.append("timing", formData.timing);
      data.append("description", formData.description);

     
      data.append("image", image);

     
      const response = await fetch("/api/product", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Course successfully add ho gaya!");

        // Form reset
        setFormData({
          courseName: "",
          fees: "",
          teacher: "",
          timing: "",
          description: "",
        });

        setImage(null);
        setImagePreview("");

       
        
        router.push("/courses");
      } else {
        alert(" " + result.message);
      }
    } catch (error) {
      console.error("Course add error:", error);

      alert(" Course add nahi ho saka.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 pt-30">

      <div className="mx-auto max-w-4xl">

       

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-blue-700">
            Add New Course
          </h1>

          <p className="mt-2 text-gray-600">
            Admin panel se new course add karein
          </p>

        </div>


        <div className="rounded-2xl bg-white p-6 shadow-xl md:p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

           

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Course Name
              </label>

              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="Enter course name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>

           

            <div className="grid gap-6 md:grid-cols-2">


              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Course Fees
                </label>

                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  placeholder="Enter course fees"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </div>

             

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Teacher Name
                </label>

                <input
                  type="text"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                  placeholder="Enter teacher name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

           

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Course Timing
              </label>

              <input
                type="text"
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                placeholder="Monday - Wednesday | 6:00 PM - 7:30 PM"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Course Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description"
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Course Image
              </label>

              <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center">

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImageChange}
                  required
                  className="mx-auto block w-full max-w-md text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-5 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700"
                />

                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG - Maximum 5MB
                </p>

              </div>

            </div>

           
            {imagePreview && (

              <div>

                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Image Preview
                </p>

                <img
                  src={imagePreview}
                  alt="Course preview"
                  className="h-64 w-full rounded-xl object-cover shadow-md"
                />

              </div>

            )}

          
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3.5 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loading
                ? "Adding Course..."
                : "Add Course"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}