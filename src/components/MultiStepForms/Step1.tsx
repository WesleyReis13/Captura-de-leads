
import React from "react";
import Input from "../Input";
import Button from "../Button";
import type { StepProps } from "./types";

const Step1: React.FC<StepProps> = ({ formData, handleChange, nextStep }) => {
  return (
    <div className="w-[400px] bg-[#F3EDE2] rounded-xl shadow-md p-6 flex flex-col items-center gap-5">
      <Input 
        type="text" 
        placeholder="Nome Completo" 
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        />
      <Input 
        type="email" 
        placeholder="E-mail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        />
      <Input 
        type="number" 
        placeholder="Whatsapp" 
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
        />
      <Button title="Proximo" color="bg-green-700" onClick={nextStep}/>
    </div>
  );
};

export default Step1;
