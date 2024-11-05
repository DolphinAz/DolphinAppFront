import React from "react";
import CartSection from "../../components/CartSection/CartSection";
import PageSection from "../../components/PageSection/PageSection";

function Cart() {
  return (
    <main>
      <CartSection />
      <PageSection title="Complete your look" list={[1, 1, 1, 1, 1, 1]} />
    </main>
  );
}

export default Cart;
