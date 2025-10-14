import React from 'react';
import { NavLink } from 'react-router-dom';
import bg from '../assets/background/Backgroud.jpeg';

const ContactUs: React.FC = () => {

  return (
    <div className='my-text flex relative min-h-screen text-2xl text-white'>
     <div className="fixed inset-0 bg-black">
      <img src={bg} alt='bg' className="absolute inset-0 w-screen h-full object-cover filter brightness-50" />
    </div>

      <div className="relative w-full z-10 mt-32 sm:mt-40 p-4 sm:p-12 lg:p-24">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Contact Us</h2>
        </div>

        <ul className="flex flex-wrap gap-4 mb-8">
          <li>
            <NavLink className="text-gray-300 hover:text-white font-semibold transition" to="/">
              Home
            </NavLink>
          </li>
         
          <li>
            <NavLink className="text-gray-300 hover:text-white font-semibold transition" to="/account">
              My Account
            </NavLink>
          </li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
            <p className="mb-6">We'd love to hear from you! Please fill out the form and we'll get back to you as soon as possible.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contact@40god.com</span>
              </div>
              
              {/* <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>+1 99999999999</span>
              </div> */}
              
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>Pune</span>
              </div>
            </div>
            
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {/* <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a> */}
              <a href="https://www.instagram.com/40.g.o.d?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a> */}
              {/* <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a> */}
            </div>
          </div>

          {/* <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow">
            {submitted ? (
              <div className="bg-green-500 bg-opacity-20 border border-green-300 text-white p-4 rounded mb-6">
                Thank you for your message! We'll get back to you shortly.
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 p-3 w-full bg-white bg-opacity-80 text-black rounded"
                    placeholder="Your Name"
                  />
                </label>
                
                <label className="block">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 p-3 w-full bg-white bg-opacity-80 text-black rounded"
                    placeholder="your.email@example.com"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  Phone (Optional):
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full bg-white bg-opacity-80 text-black rounded"
                    placeholder="(555) 123-4567"
                  />
                </label>
                
                <label className="block">
                  Order Number :
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="mt-1 p-3 w-full bg-white bg-opacity-80 text-black rounded"
                    placeholder="e.g. ORD-12345"
                  />
                </label>
              </div>

              <label className="block">
                Subject:
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 p-3 w-full bg-white bg-opacity-80 text-black rounded"
                >
                  <option value="">Select a subject</option>
                  <option value="order-status">Order Status</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="product-question">Product Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="block">
                Message:
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-1 p-3 w-full bg-white bg-opacity-80 text-black rounded"
                  placeholder="How can we help you?"
                ></textarea>
              </label>

              <button 
                type="submit" 
                className="bg-black hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded transition w-full sm:w-auto"
              >
                Send Message
              </button>
            </form>
          </div> */}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">What is your return policy?</h4>
              <p className="text-gray-300">We offer a 30-day return policy for all unworn items with original tags attached. Please visit our Returns page for more details.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">How long does shipping take?</h4>
              <p className="text-gray-300">Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) is also available at checkout.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Do you ship internationally?</h4>
              <p className="text-gray-300">Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days depending on the destination.</p>
            </div>
            
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">How can I track my order?</h4>
              <p className="text-gray-300">Once your order ships, you'll receive a confirmation email with tracking information. You can also check your order status in your account dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;