import { Flex } from "antd";
import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";

function Contact() {
  return (
    <section className="px-10">
      <Flex vertical gap={48}>
        <Flex vertical>
          <h1>Əlaqəyə keç!</h1>
          <p>Bizim mehriban komandamız sizdən eşitmək istərdi.</p>
        </Flex>
        <ContactForm />
      </Flex>
    </section>
  );
}

export default Contact;
