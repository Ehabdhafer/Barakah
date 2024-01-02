import React from "react";
import ContactForm from "../components/ContactForm";

const Contactus = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <div className="bg-background">
      <ContactForm />
    </div>
  );
};

export default Contactus;
