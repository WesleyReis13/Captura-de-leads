import React from "react";
import Container from '../components/Container'
import ContainerForm from '../components/ContainerForm'
import MultiStepForm from "../components/MultiStepForms/Index";
import SignUp from "./login/SignUp";



export default function Home(){
    return(
    <div className="min-h-screen flex justify-between items-center gap-6 ">
      <Container/>
      <MultiStepForm/>
    </div>
    )
}