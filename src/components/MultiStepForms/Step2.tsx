import React from "react";
import Button from "../Button";
import type { StepProps } from "./types";

const Step2: React.FC<StepProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <div className="w-[400px] bg-[#F3EDE2] rounded-xl shadow-md p-6 flex flex-col items-center gap-5">
      
      
      <h2 className="text-md font-bold text-[#49543A] text-left w-full">Qual seu principal objetivo?</h2>
      <div className="flex flex-col w-full gap-2">
        {["Emagrecer", "Ganhar massa muscular", "Melhorar desempenho esportivo", "Melhorar hábitos e qualidade de vida"].map((option) => (
          <label key={option} className="flex items-center gap-2 text-[#49543A]">
            <input
              type="radio"
              name="objetivo"
              value={option}
              checked={formData.objetivo === option}
              onChange={handleChange}
              className="accent-[#49543A]"
            />
            {option}
          </label>
        ))}
      </div>

      
      <h2 className="text-md font-bold text-[#49543A] text-left w-full mt-4">Como está sua rotina de exercícios atualmente?</h2>
      <div className="flex flex-col w-full gap-2">
        {["Não pratico exercícios", "Pratico ocasionalmente (1-2x na semana)", "Pratico regularmente (3x+ na semana)"].map((option) => (
          <label key={option} className="flex items-center gap-2 text-[#49543A]">
            <input
              type="radio"
              name="rotinaExercicio"
              value={option}
              checked={formData.rotinaExercicio === option}
              onChange={handleChange}
              className="accent-[#49543A]"
            />
            {option}
          </label>
        ))}
      </div>

      
      <div className="flex w-full justify-between mt-6">
        <Button title="Voltar" color="bg-[#49543A]" textColor="text-white" onClick={prevStep} />
        <Button title="Próximo" color="bg-[#49543A]" textColor="text-white" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step2;
