import React, { useState, useEffect } from "react";
import bg from "../assets/background/Backgroud.jpeg";

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const ContactUs: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const faqs: FAQItem[] = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn items with original tags attached. Please visit our Returns page for more details.",
      isOpen: false,
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) is also available at checkout.",
      isOpen: false,
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination.",
      isOpen: false,
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also check your order status in your account dashboard.",
      isOpen: false,
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, PayPal, and other secure payment methods. All transactions are encrypted and secure.",
      isOpen: false,
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. After that, please contact our customer service team for assistance.",
      isOpen: false,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError("");
  };

  const validateForm = (): boolean => {
    if (!contactFormData.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    if (!contactFormData.email.trim()) {
      setFormError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactFormData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    if (!contactFormData.message.trim()) {
      setFormError("Message is required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log("Form submitted:", contactFormData);
      setFormSubmitted(true);
      setContactFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:contact@40god.com?subject=Contact%20from%2040GOD%20Website`;
  };

  const handleInstagramClick = () => {
    window.open(
      "https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="relative text-lg text-white">
      <div className="fixed inset-0">
        <img
          src={bg}
          alt="40.G.O.D rose background"
          className="absolute inset-0 w-screen h-full object-cover brightness-50"
        />
      </div>

      <div className="flex flex-col gap-4 relative w-full mt-32 sm:mt-40 p-4 sm:p-12 lg:p-24">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">GET IN TOUCH</div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="bg-white bg-opacity-10 p-3 rounded-full hover:bg-opacity-20 transition cursor-pointer" onClick={handleEmailClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="hover:text-gray-300 cursor-pointer transition" onClick={handleEmailClick}>
                contact@40god.com
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-white bg-opacity-10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span>Pune, Maharashtra, India</span>
            </div>
          </div>

          <div className="text-2xl font-semibold">FOLLOW US</div>

          <div className="flex gap-4 items-center">
            <a
              href="https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              onClick={handleInstagramClick}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition cursor-pointer"
              aria-label="Follow us on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <span className="hover:text-gray-300 transition cursor-pointer" onClick={handleInstagramClick}>
              40.g.o.d
            </span>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-6">SEND US A MESSAGE</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
            <div>
              <input
                type="text"
                name="name"
                value={contactFormData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-opacity-40 transition"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={contactFormData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-opacity-40 transition"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={contactFormData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows={5}
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-opacity-40 transition resize-none"
              />
            </div>
            {formError && (
              <p className="text-red-400 text-sm">{formError}</p>
            )}
            {formSubmitted && (
              <p className="text-green-400 text-sm">
                Thank you! Your message has been sent successfully.
              </p>
            )}
            <button
              type="submit"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-6 rounded-lg transition self-start"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-6">FAQs</h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-4 rounded-lg cursor-pointer hover:bg-opacity-15 transition"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold">{faq.question}</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${
                      expandedFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {expandedFAQ === index && (
                  <p className="text-gray-300 mt-2 animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
