import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from './components/Form';

import type { FormData } from "./interfaces/FormInterfaces";
import Sidebar from './components/Sidebar';
import MessageBubble from './components/MessageBubble';
import { useChatContext } from './context/ChatContext';

function App() {
  const {
    messages,
    isLoading,
    sendMessage
  } = useChatContext();

  // configuración de Yup
  const schema = yup.object({
    message: yup.string().required("Se requiere mandar un mensaje"),
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  

  function onSubmit(data: FormData) {
    const { message } = data; 
    reset();
    sendMessage(message);
  }

  useEffect(() => {
    console.log(messages);
  }, [messages]);


  return (
  <>
    <div className="h-screen bg-black flex">

      {/* sidebar izq con Historial */}
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

            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400 py-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Estoy inventandome la respuesta, espera una unidad de segundo...</span>
              </div>
            )}

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
