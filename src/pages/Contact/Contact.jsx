import { Flex } from "antd";
import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import contactImage from "../../assets/images/contact-image.jpg";
function Contact() {
  return (
    <section className="px-5 desktop:px-10 pt-16 pb-10 flex flex-col desktop:grid desktop:grid-cols-[2fr_1fr] gap-[47px]">
      <Flex>
        <Flex vertical gap={48} className="w-full">
          <Flex vertical className="gap-4 desktop:gap-5">
            <h1 className="text-4xl font-semibold text-black-100">
              Əlaqəyə keç!
            </h1>
            <p className="text-black-300 text-[18px] desktop:text-xl">
              Bizim mehriban komandamız sizdən eşitmək istərdi.
            </p>
          </Flex>
          <ContactForm />
        </Flex>
      </Flex>
      <img
        className="hidden desktop:block object-cover h-full"
        src={contactImage}
        alt="Contact image"
      />
    </section>
  );
}

export default Contact;
