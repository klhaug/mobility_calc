import './App.css'
import { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';

function App() {

  const [phoneAmount, setPhoneAmount] = useState(150)
  const [age, setAge] = useState(24)

  return (
    <>
      <header className="flex flex-col bg-gray-100">  
        <div className="flex items-center justify-between">
          <h1>Klimakalkulator</h1>
          <p>Mobility</p>
        {/* Bytt ut m. img og logo */}
        </div>
        <p className="w-2/3 text-start">Se hvor mye penger og
          CO2-utslipp din bedrift kan spare</p>
      </header>
      <main>
        <section className="flex items-center flex-col justify-center p-12">
          <CircularSlider
            label="Mobiltelefoner i din bedrift"
            labelColor="#000000"
            labelFontSize="12px"
            knobColor="#06620A"
            width={400}
            knobSize={48}
            min={1}
            max={1000}
            progressColorFrom="#DCF9DD"
            labelBottom={true}
            progressColorTo="#0CC814"
            valueFontSize="64px"
            progressSize={24}
            trackColor="#D9D9D9"
            trackSize={24}
            onChange={value => setPhoneAmount(value)}
        />
        </section>
        <section>
          <fieldset className="flex flex-col gap-4 mt-12">
          <legend className="text-center mb-4 ">Gjennomsnittlig levetid per telefon:</legend>
                <input
                  className="hidden peer/18"
                  type="radio"
                  id='18'
                  name="age"
                  value={18}
                  onChange={(e) => setAge(e.target.value)}  />
                   <label
                className="peer-checked/18:bg-green-800 h-[56px] peer-checked/18:text-white flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer"
                htmlFor="18">
                  18 mnd
                </label>
                <input
                  className="hidden peer/24"
                  type="radio"
                  id='24'
                  name="age"
                  value={24}
                  onChange={(e) => setAge(e.target.value)}
                  />
                   <label
                    htmlFor="24"
                    className="peer-checked/24:bg-green-800 peer-checked/24:text-white h-[56px] flex w-full items-center justify-center bg-green-100 hover:cursor-pointer " >
                  24 mnd
                </label>
                <input
                  className="hidden peer/32"
                  type="radio"
                  id='32'
                  name="age"
                  value={32}
                  onChange={(e) => setAge(e.target.value)}
                  />
                   <label
                    htmlFor="32"
                    className="peer-checked/32:bg-green-800 peer-checked/32:text-white h-[56px] flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer" >
                  32 mnd
                  </label>
          </fieldset>
           {/* <span>{age}</span> */}
        </section>
      </main>
    </>
  )
}

export default App
