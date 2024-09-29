"use client"
import Banner from "@/components/pages/portraits/Banner";
import { Metadata } from "next";
import React, { useState } from "react";

type pageProps = {};

const Page: React.FC<pageProps> = () => {
  // State hooks to manage form input values and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    // Validate name
    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // Validate message
    if (!message) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/V1/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result); 
    
      setName(""); 
      setEmail(""); 
      setPhone(""); 
      setMessage(""); 
      setErrors({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.error("Error submitting form:", error);
      
    }
  };

  return (
    <main>
      <Banner text="Contact" />
      <section>
        <div className="container mx-auto py-12">
          <div className="contact-des pb-12">
            <h3 className="text-2xl font-semibold pb-5">Need to get in touch?</h3>
            <p className="text-base text-black font-light leading-6 pb-4">
              Live Chat: &#xFEFF;The best way to get in touch is to launch the chat service on the website - ACTIVE ONLINE MOST OF THE DAY
            </p>
            <p className="text-base text-black font-light leading-6 pb-4">
              Address: 27 Old Gloucester Street, London, United Kingdom, WC1N 3AX
            </p>
            <p className="text-base text-black font-light leading-6 pb-4">
              EMAIL - We now have one centralised email to contact us on
            </p>
            <p className="text-base text-black font-light leading-6 pb-4">
              contact@markdrawing.com
            </p>
          </div>
          <div className="contact-form flex flex-wrap">
            <div className="w-full lg:w-1/2 px-4">
              <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="mb-3">
                    <label htmlFor="name" className="text-xs font-medium">Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control border border-gray-400 w-full p-2"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {errors.name && <span className="text-red-600">{errors.name}</span>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="text-xs font-medium">Email*</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control border border-gray-400 w-full p-2"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && <span className="text-red-600">{errors.email}</span>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="text-xs font-medium">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      className="form-control border border-gray-400 w-full p-2"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    
                    />
                  
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="text-xs font-medium">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      className="form-control border border-gray-300 w-full p-2"
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    {errors.message && <span className="text-red-600">{errors.message}</span>}
                  </div>
                </div>
                <button
                  className="btn-theme text-base font-medium bg-[#2bb573] border border-gray-600 text-white py-3 px-12 transition duration-1000 ease-out hover:bg-[#218c59]"
                  type="submit"
                >
                  SEND
                </button>
              </form>
            </div>
            <div className="w-full lg:w-1/2 px-4 mt-6 lg:mt-0">
              <div className="map">
                <iframe
                  width="100%"
                  height="488"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  id="gmap_canvas"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15763.916564828944!2d-0.10472392542143824!3d51.519429472064346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b36a3aa5ded%3A0x90a050fd9a50b27b!2s27%20Old%20Gloucester%20St%2C%20Holborn%2C%20London%20WC1N%203AF%2C%20UK!5e0!3m2!1sen!2sbd!4v1616924334112!5m2!1sen!2sbd"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
