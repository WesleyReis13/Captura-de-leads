import React from "react";
import Container from '../components/Container'
import ContainerForm from '../components/ContainerForm'


export default function Home(){
    return(
    <div className="min-h-screen flex justify-center items-center gap-6 bg-gray-100">
      <Container/>
      <ContainerForm/>
    </div>
    )
}