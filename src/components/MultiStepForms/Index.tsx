import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import type { FormData } from "./types";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    whatsapp: "",
    idade: "",
    cidade: "",
    profissao: "",
    aceitaTermos: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-sm mx-auto rounded shadow">
      {step === 1 && <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />}
      {step === 2 && <Step2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 formData={formData} handleChange={handleChange} prevStep={prevStep} />}
    </div>
  );
}
