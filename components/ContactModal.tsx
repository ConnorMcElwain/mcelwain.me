import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setIsOpen(false); // Close modal after submission
        setFormData({ name: "", phone: "", email: "", message: "" }); // Reset form
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
        className="block w-full rounded-lg border border-blue-500 bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-700 sm:w-auto">
        Contact Me
      </button>

      {/* Modal with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-black text-white p-6 rounded-lg shadow-lg w-96 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>

              {/* Form */}
              <h2 className="text-xl font-bold mb-4">Contact Me</h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded-md focus:ring focus:ring-blue-300 bg-black text-white border-gray-600"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border p-2 rounded-md focus:ring focus:ring-blue-300 bg-black text-white border-gray-600"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 rounded-md focus:ring focus:ring-blue-300 bg-black text-white border-gray-600"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border p-2 rounded-md focus:ring focus:ring-blue-300 bg-black text-white border-gray-600"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}