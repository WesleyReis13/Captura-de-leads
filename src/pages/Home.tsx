import React from "react";
import Container from '../components/Container'
import ContainerForm from '../components/ContainerForm'
import MultiStepForm from "../components/MultiStepForms/Index";


export default function Home(){
    return(
    <div className="min-h-screen flex justify-between items-center gap-6 ">
      <Container/>
      <MultiStepForm/>
    </div>
    )
}