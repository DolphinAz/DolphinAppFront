import React, { useEffect, useState } from "react";
import CustomerForm from "../../components/CustomerForm/CustomerForm";
import { Button, Flex } from "antd";
import PaymentMethodsForm from "../../components/PaymentMethodsForm/PaymentMethodsForm";
import VerificationForm from "../../components/VerificationForm/VerificationForm";
import PaymentToast from "../../components/PaymentToast/PaymentToast";

function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeStep]);
  const steps = [
    {
      label: "Customer details",
      form: <CustomerForm />,
    },
    {
      label: "Payment methods",
      form: <PaymentMethodsForm />,
    },
    {
      label: "Verification",
      form: <VerificationForm />,
    },
  ];

  return (
    <section className="px-5 desktop:px-10 flex flex-col gap-[50px] pt-28 pb-40">
      <PaymentToast
        isOrderPlaced={isOrderPlaced}
        setIsOrderPlaced={setIsOrderPlaced}
      />
      <div
        className={`relative w-full bg-gray-950 h-[1px] grid grid-cols-3 place-items-center`}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={`h-[1px] w-full flex justify-center ${
              index < activeStep
                ? "bg-black-100"
                : index === activeStep
                ? "bg-half-red"
                : ""
            }`}
          >
            <div
              className="relative w-[10px] h-[10px] desktop:w-6 desktop:h-6 flex justify-center"
              key={index}
            >
              <div
                className={`border border-transparent rounded-full -translate-y-2/4 ${
                  index === activeStep
                    ? "w-full desktop:w-6 h-full desktop:h-6 !border-black-100 bg-white before:absolute before:w-2/4 before:h-2/4 before:bg-black-100 before:top-2/4 before:left-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full"
                    : index < activeStep
                    ? "w-[5px] h-[5px] desktop:w-[10px] desktop:h-[10px] bg-black-100"
                    : index > activeStep
                    ? "w-2 h-2 desktop:w-4 desktop:h-4 bg-white !border-gray-950"
                    : ""
                }`}
              ></div>
              <p
                className={`absolute -top-5 desktop:-top-12 left-2/4 -translate-x-2/4 text-center text-nowrap text-[8px] desktop:text-lg ${
                  index < activeStep ? "text-black-100" : "text-gray-950"
                }`}
              >
                {step.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      {steps.map(
        (step, index) =>
          index === activeStep && <div key={index}>{step.form}</div>
      )}
      <Flex vertical className="gap-5">
        <Button
          className="bg-skyBlue-500 py-[14px] h-14 text-white text-lg"
          type="submit"
          onClick={() => setActiveStep((prev) => prev + 1)}
        >
          Davam et
        </Button>
        {activeStep === 2 && (
          <Button
            type="submit"
            className="border-skyBlue-500 bg-gray-1000 py-[14px] h-14 text-lg text-skyBlue-500"
          >
            Yenidən yoxla
          </Button>
        )}
        {activeStep !== 0 && (
          <Button
            onClick={() => setActiveStep((prev) => prev - 1)}
            className="border-skyBlue-500 bg-gray-1000 py-[14px] h-14 text-lg text-skyBlue-500"
            type="submit"
          >
            Geri
          </Button>
        )}
      </Flex>
    </section>
  );
}

export default Payment;
