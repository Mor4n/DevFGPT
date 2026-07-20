
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from './components/Form';

import type { FormData } from "./interfaces/FormInterfaces"
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';


function App() {

  // configuración de Yup
  const schema = yup.object({
        message: yup.string().required("Se requiere mandar un mensaje"),
    });
  
  const { register, handleSubmit,reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  


  function onSubmit(data:FormData) {

    const { message } = data; 

    reset();

     // agregar mensaje del usuario
      setMessages(prev => [
        ...prev,
        {
          role: "user",
          message
        }
      ]);

    sendMessage(message);
}



    // chatbot

    type Message = {
      role: "user" | "assistant";
      message: string;
    };

    const [messages, setMessages] = useState<Message[]>([
      {
        role: "assistant",
        message: "Hola, ¿en qué puedo ayudarte?"
      }
    ]);


    async function sendMessage(message:string) {

    const res = await fetch("http://localhost:3000/chat", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message
      })
    });


    const data = await res.json();


    // agregar respuesta de IA
    setMessages(prev => [
      ...prev,
      {
        role:"assistant",
        message:data.response
      }
    ]);
  }



  return (
  <>
    <div className="h-screen bg-black flex">

      {/* sidebar izq */}
      <Sidebar />

      {/* area der */}
      <div className="flex-1 flex flex-col">

        {/* msjs */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 text-white">

              {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                role={msg.role}
                message={msg.message}
              />
            ))}

          </div>
        </main>

        {/* formulario */}
        <footer className="sticky bottom-0 bg-linear-to-t from-black via-black to-transparent pb-6">
          <Form 
            onSubmit={onSubmit} 
            handleSubmit={handleSubmit} 
            register={register} 
            errors={errors}
          />
        </footer>

      </div>

    </div>
  </>
);
}

export default App;
