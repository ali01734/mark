import CartComponent from "@/components/pages/carts/CartComponent";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <main>
      <section>
        <div className="container">
          <CartComponent />
        </div>
      </section>
    </main>
  );
};
export default page;
