
import React from "react";
import ProfileCard from "./ProfileCard";

const Container: React.FC = () => {
  return (
    <div className="w-auto bg-[#F3EDE2] p-6 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-[#49543A] ">Descubra em minutos</h1>
      <p className="text-[#49543A] ">Se o nosso serviço é para você</p>
      <ul className="list-disc  pl-6 pr-50">
        <li className="text-[#49543A]">Teste teste testes testes testes testes </li>
        <li className="text-[#49543A]">Teste teste testes testes testes testes</li>
        <li className="text-[#49543A]">Teste teste testes testes testes testes</li>
      </ul>
      <ProfileCard
        photo="https://picsum.photos/300/200"
        name="John Doe"
        role="CEO"
        social1="https://linkedin.com"
        social2="https://twitter.com"
      />

    </div>
  );
};

export default Container;
