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
          <fieldset>
          <legend>Gjennomsnittlig levetid per telefon:</legend>
            <label 
              htmlFor="18">
                18 mnd
            </label>
              <input 
                className="hidden" 
                type="radio" 
                id='18' 
                name="age" 
                value={18} 
                onClick={() => console.log("I've been clicked")} />
            <label 
              htmlFor="24">
                24 mnd
            </label>
              <input 
                className="hidden" 
                type="radio" 
                id='24' 
                name="age" 
                value={24} 
                />
            <label 
              htmlFor="32">
                32 mnd
            </label>
              <input 
                className="hidden" 
                type="radio" 
                id='32' 
                name="age" 
                value={32} 
                />
          </fieldset>
           
        </section>
      </main>
    </>
  )
}

export default App
