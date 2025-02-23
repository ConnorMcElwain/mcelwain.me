import { useState } from "react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ field1: "", field2: "", field3: "" });
  const apiKey = "891e9f79-5752-478e-9551-14d1c24d1e56"; // Replace with your actual FormBee API key

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.formbee.dev/formbee/${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setIsOpen(false); // Close the modal after submission
        setFormData({ field1: "", field2: "", field3: "" }); // Reset form fields
      } else {
        alert("Form submission failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Form submission failed.");
    }
  };

  return (
    <>
      {/* Contact Me Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Contact Me
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Form */}
            <h2 className="text-xl font-bold mb-4">Contact Me</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="field1"
                placeholder="Your Name"
                value={formData.field1}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="email"
                name="field2"
                placeholder="Your Email"
                value={formData.field2}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring focus:ring-blue-300"
                required
              />
              <textarea
                name="field3"
                placeholder="Your Message"
                value={formData.field3}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring focus:ring-blue-300"
                rows={4}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
