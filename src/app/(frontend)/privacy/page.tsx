import Banner from "@/components/pages/portraits/Banner";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <main>
      <Banner text="PRIVACY POLICY" />
      <section className="py-[50px]">
        <div className="container mx-auto px-10">
          <div className="max-w-[900px]">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">
                    What Information do we collect?
                  </h5>
                  <p className="text-sm text-[#69727B]">
                    When commissioning our service for a personalized drawing,
                    as appropriate, we collect information from you such as your
                    real name, address, phone number, email address including
                    details of your form of payment. You may however, visit our
                    website anonymously.
                  </p>
                </div>
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">
                    What do we use your information for?
                  </h5>
                  <p className="text-sm text-[#69727B]">
                    We treat any information we collect from you with the
                    strictest confidentiality. Your information, whether public
                    or private, will not be sold, exchanged, transferred or
                    given to any other company for any reason whatsoever without
                    your consent, other than the express purpose of delivering
                    your commissioned artwork or service requested by the
                    customer.
                  </p>
                  <p className="text-sm text-[#69727B] py-5">
                    The email address you provide may be used to send you
                    information and updates pertaining to your commissioned
                    artwork, in addition to receiving occasional company news,
                    updates, related products or service information, etc.
                  </p>
                  <p className="text-sm text-[#69727B]">
                    Note: You may unsubscribe from receiving any future emails
                    at any point and a link at the bottom of each email is
                    provided.
                  </p>
                </div>
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">
                    How do we protect your information?
                  </h5>
                  <p className="text-sm text-[#69727B]">
                    Our business utilizes secured online platforms with proven
                    track record in data protection and is among the leading
                    brand in the industry.
                  </p>
                </div>
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">
                    Do we use cookies?
                  </h5>
                  <p className="text-sm text-[#69727B]">
                    We do not use cookies.
                  </p>
                </div>
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">
                    Do we disclose information to outside parties?
                  </h5>
                  <p className="text-sm text-[#69727B]">
                    We do not sell, trade or otherwise transfer to outside
                    parties your personal identifiable information. This does
                    not include trusted third parties who assist us in operating
                    our website, conducting or business, or servicing you, as
                    long as those parties agree to keep this information
                    confidential. We may also release your information when we
                    believe release is appropriate to comply with the law,
                    enforce our site policies, or protect ours or others rights,
                    property or safety.
                  </p>
                </div>
                <div className="mb-9">
                  <h5 className="text-lg font-semibold mb-3">REFUND</h5>
                  <p className="text-sm text-[#69727B]">
                    A full refund is available or if you would like to get a
                    replacement then we have that option too if there are any
                    unfortunate issues you found to our product such as the
                    Frame is not properly made or broken. But to avail any
                    replacement or full refund, you must provide any proof of
                    documents of purchase which can be either the money receipt,
                    etc. Also, during receiving the package or our product you
                    must check it immediately and confirm with us. A full refund
                    option or replacement option will be available for 3
                    business days after receiving our product.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default page;
