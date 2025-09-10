
import React from "react";
import Input from "./Input";
import Button from "./Button";

const Container: React.FC = () => {
  return (
    <div className="w-[400px] bg-[#F3EDE2] rounded-xl shadow-md p-6 flex flex-col items-center gap-5">
      <Input type="text" placeholder="Nome Completo" />
      <Input type="email" placeholder="E-mail" />
      <Input type="number" placeholder="Whatsapp" />
      <Button title="Proximo" color="bg-green-700" />
    </div>
  );
};

export default Container;
