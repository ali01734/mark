import Banner from "@/components/pages/portraits/Banner";
import { Metadata } from "next";
import React from "react";

type pageProps = {};

export const metadata: Metadata = {
  title:
    " Frequently Asked Questions | Hand Painted Portraits From Photos Near Me ",
  description: "Mark Drawing",
};

const page: React.FC<pageProps> = () => {
  const faqs = [
    {
      question: "How long does your Portraits take to complete",
      answer:
        "The Portraits itself takes approximately 3 to 5 days. Then if you choose to get it printed or on canvas, a further 3 to 5 business days to arrive.",
    },
    {
      question: "Can you draw from separate pictures?",
      answer:
        "Yes I can draw from separate pictures, in fact if you have two clear pictures it's even better for me as I can see the details in the face.",
    },
    {
      question:
        "Do you have a maximum number of people that you can draw in an Artwork?",
      answer:
        "The more the merrier! There's no limit to the number of people in a single artwork. You can have it done with as much people as you want.",
    },
    {
      question: "Can you draw pets?",
      answer: "I love to draw pets, they are priced the same as humans.",
    },
    {
      question: "Do you do bigger sizes?",
      answer:
        "Yes we do bigger size. Our biggest size for frame starts from A2 and for Canvas print the biggest size starts from A0.",
    },
    {
      question: "What types of payment do you accept?",
      answer: "We accept payments through card and PayPal.",
    },
    {
      question: "Can I pay cash when my drawing is delivered?",
      answer:
        "At the moment we do not offer Cash payment upon delivery of your drawing but you can chose from any of our electronic payment options. Payment is required before we commence with the drawing.",
    },
    {
      question: "How are these drawn?",
      answer:
        "These are all hand drawn on paper and then scanned and printed either on photo grade paper or on canvas, to any size you want depending on your preference.",
    },
    {
      question: "Can you edit the picture if I don't like it?",
      answer: "Yes until you are satisfied.",
    },
    {
      question: "How do you deliver at the post?",
      answer:
        "Canvases and Prints are sent using various services including Royal Mail, USPS, UPS, FedEx. This depends on your location.",
    },
    {
      question: "Where do you deliver?",
      answer: "We deliver in Ireland, UK, USA, Canada, and Australia.",
    },
    {
      question: "Do you have any fast or express delivery options?",
      answer:
        "Yes, we do have a 2 business days delivery express option for UK and Ireland only. You need to request it.",
    },
  ];
  return (
    <main>
      <Banner text="FAQ" />

      <section id="faq_part" className="w-full py-12">
        <div className="container mx-auto px-10">
          <div className="w-full">
            <div className="faq_wrap w-full">
              <h2 className="text-2xl font-semibold pb-12">
                Frequently Asked Questions
              </h2>
              {faqs.map((faq, index) => (
                <div key={index} className="faq_set pb-5">
                  <h5 className="text-lg font-semibold pb-2">
                    Q. {faq.question}
                  </h5>
                  <p className="text-base font-normal">A. {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default page;
