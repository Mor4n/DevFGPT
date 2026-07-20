
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Form from './components/Form';

import type { FormData } from "./interfaces/FormInterfaces"

function App() {

  // configuración de Yup
  const schema = yup.object({
        message: yup.string().required("Se requiere mandar un mensaje"),
    });
  
  const { register, handleSubmit,reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  

  const [userMsg, setUserMsg] = useState("");

  function onSubmit(data:FormData) {

        const { message } = data; 

        setUserMsg(message);

        console.log(`msj-${message}`);
        console.log(`state-${userMsg} (está desfasado por lo asincrono)`);
        
        

        reset() // limpio el input

    }


  return (
    <>
      <div className="h-screen bg-black flex flex-col">


        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 text-white">

          </div>
        </main>

        <footer className="sticky bottom-0 bg-linear-to-t from-black via-black to-transparent pb-6">
            <Form onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} errors={errors}/>
        </footer>
      </div>
    </>
  );
}

export default App;
