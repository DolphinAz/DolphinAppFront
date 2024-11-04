import { Flex } from "antd";
import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import contactImage from "../../assets/images/contact-image.jpg";
function Contact() {
  return (
    <section className="px-10 pt-[72px] pb-10 grid grid-cols-[3fr_2fr] grid-rows-1 gap-16">
      <Flex className="px-24 justify-center">
        <Flex vertical gap={48}>
          <Flex vertical gap={20}>
            <h1 className="text-4xl font-semibold text-black-100">
              Əlaqəyə keç!
            </h1>
            <p className="text-black-300 text-xl">
              Bizim mehriban komandamız sizdən eşitmək istərdi.
            </p>
          </Flex>
          <ContactForm />
        </Flex>
      </Flex>
      <div>
        <img className="object-cover" src={contactImage} alt="Contact image" />
      </div>
    </section>
  );
}

export default Contact;
