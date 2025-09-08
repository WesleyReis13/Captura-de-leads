
import React from "react";
import ProfileCard from "./ProfileCard";

const Container: React.FC = () => {
  return (
    <div className="w-auto bg-[#F3EDE2] rounded-xl shadow-md p-6 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Descubra em minutos</h1>
      <p>Se o nosso produto é para você</p>
      <ul className="list-disc pl-6">
        <li>Primeiro item</li>
        <li>Segundo item</li>
        <li>Terceiro item</li>
      </ul>
      <ProfileCard
        photo="https://via.placeholder.com/150"
        name="John Doe"
        role="CEO"
        social1="https://linkedin.com"
        social2="https://twitter.com"
      />

    </div>
  );
};

export default Container;
