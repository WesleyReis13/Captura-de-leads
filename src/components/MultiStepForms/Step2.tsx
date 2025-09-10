import React from "react";
import Input from "../Input";
import Button from "../Button";
import type { StepProps } from "./types";

const Step2: React.FC<StepProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className="w-[400px] bg-[#F3EDE2] rounded-xl shadow-md p-6 flex flex-col items-center gap-5">
      <Input
        type="number"
        placeholder="Idade"
        name="idade"
        value={formData.idade}
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Cidade"
        name="cidade"
        value={formData.cidade}
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="Profissão"
        name="profissao"
        value={formData.profissao}
        onChange={handleChange}
      />
      <div className="flex w-full justify-between">
        <Button title="Voltar" color="bg-gray-500" onClick={prevStep} />
        <Button title="Próximo" color="bg-green-700" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step2;
