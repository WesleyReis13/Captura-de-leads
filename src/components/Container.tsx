
import React from "react";
import ProfileCard from "./ProfileCard";

const Container: React.FC = () => {
  return (
    <div className="w-auto bg-[#F3EDE2] p-6 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-[#49543A] ">Descubra em minutos</h1>
      <p className="text-[#49543A] ">Se o nosso serviço é para você</p>
      <ul className="list-disc pl-4">
        <li className="text-[#49543A] pr-15">Um plano 100% personalizado para o seu corpo e seus objetivos.</li>
        <li className="text-[#49543A] pr-17">Acesso direto ao seu personal via WhatsApp para tirar dúvidas.</li>
        <li className="text-[#49543A]">Aumente sua confiança e mude seus hábitos com suporte especializado.</li>
      </ul>
      <ProfileCard
        photo="/assets/personalTrainer.jpg"
        name="John Doe"
        role="PERSONAL TRAINER"
        social1="https://linkedin.com"
        social2="https://twitter.com"
      />

    </div>
  );
};

export default Container;
