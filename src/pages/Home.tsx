import React from "react";
import Container from '../components/Container'
import ContainerForm from '../components/ContainerForm'
import MultiStepForm from "../components/MultiStepForms/Index";
import SignUp from "./login/SignUp";
import CrudDashboard from "./dashboard/painel/CrudDashboard";



export default function Home(){
    return(
      <CrudDashboard/>
    )
}