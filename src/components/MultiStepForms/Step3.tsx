import React, { useState } from "react";
import Button from "../Button";
import type { StepProps } from "./types";

const Step3: React.FC<StepProps> = ({ formData, handleChange, prevStep }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.aceitaTermos) {
      alert("Você precisa aceitar os termos e condições!");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome, 
          email: formData.email,
          whatsapp: formData.whatsapp,
          objective: formData.objective, 
          routine: formData.routine
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }

      const result = await response.json();
      alert('Formulário enviado! Em breve entraremos em contato via WhatsApp.');
      
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <Button title="Voltar" color="bg-[#49543A]" onClick={prevStep} />
        <Button
          title={isLoading ? "Enviando..." : "Enviar"}
          color="bg-[#49543A]"
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Step3;