import React from "react";
import Button from "../Button";
import type { StepProps } from "./types";

const Step3: React.FC<StepProps> = ({ formData, handleChange, prevStep }) => {
  return (
    <div className="w-[400px] bg-[#F3EDE2] rounded-xl shadow-md p-6 flex flex-col items-center gap-5">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="aceitaTermos"
          checked={formData.aceitaTermos}
          onChange={handleChange}
        />
        Aceito os termos e condições
      </label>
      <div className="flex w-full justify-between">
        <Button title="Voltar" color="bg-gray-500" onClick={prevStep} />
        <Button
          title="Enviar"
          color="bg-green-700"
          onClick={() => alert("Formulário finalizado!")}
        />
      </div>
    </div>
  );
};

export default Step3;
