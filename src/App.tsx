
import { useState } from 'react';
import Form from './components/Form';
import { useForm } from "react-hook-form";


function App() {


  const [userMsg, setUserMsg] = useState("");

  const { register, handleSubmit } = useForm();

    const onSubmit = (data: String) => {
        console.log(data);
    };


  return (
    <>
      <div className="h-screen bg-black flex flex-col">


        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 text-white">

          </div>
        </main>

        <footer className="sticky bottom-0 bg-linear-to-t from-black via-black to-transparent pb-6">
            <Form  {...{register, handleSubmit, onSubmit, userMsg, setUserMsg}} />
        </footer>
      </div>
    </>
  );
}

export default App;
