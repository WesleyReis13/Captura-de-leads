import React from "react";
import Container from '../components/Container'
import ContainerForm from '../components/ContainerForm'


export default function Home(){
    return(
    <div className="min-h-screen flex justify-between items-center gap-6 ">
      <Container/>
      <ContainerForm/>
    </div>
    )
}