import './App.css'
import { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

function App() {
  const [phoneAmount, setPhoneAmount] = useState(150);
  const [age, setAge] = useState(24);
  const [extraAge, setExtraAge] = useState(6)
  const [savings, setSavings] = useState("yearly");
  const [calcIsOpen, setCalcIsOpen] = useState(false);
  const [adjIsOpen, setAdjIsOpen] = useState(false);
  const [phonePrice, setPhonePrice] = useState(8764);
  const [refurbishedPhones, setRefurbishedPhones] = useState(0.1);
  const [phonePriceRefurbished, setPhonePriceRefurbished] = useState(4370)
  const [avgEmissions, setAvgEmissions] = useState(64)
  const [avgEmissionsRefurbished, setAvgEmissionsRefurbished] = useState(20)
  const [promptAnswer, setPromptAnswer] = useState('');

  const handleCalcClick = () => {
    setCalcIsOpen(!calcIsOpen)
  }
  const handleAdjClick = () => {
    setAdjIsOpen(!adjIsOpen)
  
  }
//Takes a number, transforms it into a string and splits it into even numerical formatting based on the length of the string. Caps out at length 8. Length 9 logs an error and returns the number as a string unformatted. 
  const transformNumberIntoString = (number) => {
    if(typeof number !== "number"){
      alert("Please enter a valid number")
      return;
    }
    const numberAsString = Math.floor(number).toString();
    const stringLength = numberAsString.length;
    switch(stringLength) {
      case 1:
        return numberAsString;
      case 2: 
        return numberAsString;
      case 3:
        return numberAsString;
      case 4:
        {
          console.log(`The length of ${numberAsString} is ${stringLength}`)
          return numberAsString; 
        }
      case 5:
        {
           console.log(`The length of ${numberAsString} is ${stringLength}`)
           const newString = numberAsString.slice(0, 2) + " " + numberAsString.slice(2)
           return newString; 
        }
        case 6:
        {
          console.log(`The length of ${numberAsString} is ${stringLength}`)
          const newString = numberAsString.slice(0, 3) + " " + numberAsString.slice(3)
          return newString;
        }
        case 7:
        {
          console.log(`The length of ${numberAsString} is ${stringLength}`)
          const newString = numberAsString.slice(0, 1) + " " + numberAsString.slice(1,4) + " " + numberAsString.slice(4)
          return newString;
        }
        case 8:
        {
          console.log(`The length of ${numberAsString} is ${stringLength}`)
          const newString = numberAsString.slice(0, 2) + " " + numberAsString.slice(2,5) + " " + numberAsString.slice(5)
          return newString;
        }
        case 9: {
          console.error("This string is to long for current formatting code", numberAsString);
          return numberAsString;
        }
    }
  }

  const calculateMonetarySavings = () => {
    const newPhones = 1 - refurbishedPhones;

    const costTotal = phonePrice * phoneAmount
    const totalAge = Number(age) + Number(extraAge)
    const costEachYearTotal= Math.floor(phonePrice * phoneAmount)
    
    //Newbuys Cost Montly
    const costCurrentLifespanUnit = phonePrice / age;
    const costCurrentLifespanTotal = costTotal / age;
    //Newbuys Cost Montly(Slutt) 24 mnd 90% === 327,-
    
    //Refurbished Cost Monthly
    const costRefurbishedTotal = (refurbishedPhones * phoneAmount * phonePriceRefurbished) / age;
    const costRefurbishedUnit = costRefurbishedTotal / phoneAmount;
    //Refurbished Cost Monthly(Slutt) 24mnd 10% === 18,- pr mnd per telefon

    const adjustedCostPerUnit = (phonePrice / totalAge) * newPhones + costRefurbishedUnit;
    const adjustedCostTotal = adjustedCostPerUnit * phoneAmount;

    const savingsPerMonthPerUnit = costCurrentLifespanUnit - adjustedCostPerUnit; 
    const savingsPerMonthTotal = savingsPerMonthPerUnit * phoneAmount;
    
    const savingsPerYearPerUnit = savingsPerMonthPerUnit * 12;
    const savingsPerYearTotal = savingsPerYearPerUnit * phoneAmount
    const savingsLifeTime = savingsPerMonthPerUnit * totalAge;
    const savingsLifeTimeTotal = savingsLifeTime * phoneAmount;

    return {
      costEachYearPerUnit: transformNumberIntoString(phonePrice),
      costEachYearTotal: transformNumberIntoString(costEachYearTotal),
      
      costCurrentLifespanUnit: transformNumberIntoString(costCurrentLifespanUnit),
      costCurrentLifespanTotal:transformNumberIntoString(costCurrentLifespanTotal),

      adjustedCostPerUnit: transformNumberIntoString(adjustedCostPerUnit),
      adjustedCostTotal: transformNumberIntoString(adjustedCostTotal),
      
      savingsPerMonthPerUnit: transformNumberIntoString(savingsPerMonthPerUnit),  
      savingsPerMonthTotal: transformNumberIntoString(savingsPerMonthTotal),  

      savingsPerYearPerUnit: transformNumberIntoString(savingsPerYearPerUnit), 
      savingsPerYearTotal: transformNumberIntoString(savingsPerYearTotal),

      savingsLifeTime: transformNumberIntoString(savingsLifeTime),
      savingsLifeTimeTotal: transformNumberIntoString(savingsLifeTimeTotal)
    }
  }

  const calculations = calculateMonetarySavings();

  const { 
    costEachYearTotal,
    savingsPerMonthPerUnit,
    savingsPerMonthTotal,
    savingsLifeTime,
    savingsLifeTimeTotal,
    savingsPerYearPerUnit, 
    savingsPerYearTotal,
    costCurrentLifespanUnit, 
    costCurrentLifespanTotal, 
    adjustedCostPerUnit, 
    adjustedCostTotal,
    } = calculations;

  const handlePdfClick = () => {
    const answer = prompt("Hva heter bedriften din?")
    setPromptAnswer(answer);
  }


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
      <main className="pb-12">
        <section id="slider" className="flex items-center flex-col justify-center p-12">
          <CircularSlider
            label="Mobiltelefoner i din bedrift"
            labelColor="#000000"
            labelFontSize="12px"
            knobColor="#06620A"
            width={400}
            initialValue={150}
            dataIndex={phoneAmount - 1}
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
        <section id="savings" className="py-23 flex flex-col gap-4">
          <div className="bg-gray-100 p-4 flex flex-col gap-4">
            <h2>Dine besparelser</h2>
            <button onClick={handlePdfClick}>Generer PDF</button>
            {promptAnswer ? <p>{promptAnswer}</p> : null}
            <div className="flex gap-4">
              <input
                    className="hidden peer/savingsYearly"
                    type="radio"
                    id='savingsYearly'
                    name="savings"
                    defaultChecked={true}
                    value={"yearly"}
                    onChange={(e) => setSavings(e.target.value)}  />
                     <label
                    className="peer-checked/savingsYearly:bg-green-800 px-2 peer-checked/savingsYearly:text-white flex  w-fit items-center justify-center bg-green-100 hover:cursor-pointer"
                    htmlFor="savingsYearly">
                    Per år
                  </label>
              <input
                    className="hidden peer/savingsLifetime"
                    type="radio"
                    id='savingsLifetime'
                    name="savings"
                    value={"lifetime"}
                    onChange={(e) => setSavings(e.target.value)}  />
                     <label
                  className="peer-checked/savingsLifetime:bg-green-800 px-2 w-fit peer-checked/savingsLifetime:text-white flex  items-center justify-center bg-green-100 hover:cursor-pointer"
                  htmlFor="savingsLifetime">
                    Levetid
                  </label>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>NOK</p>
                <p className="text-xl font-semibold"> kr  
                  {savings === 'yearly' ? ` ${savingsPerYearTotal}` : null}
                  {savings === 'lifetime' ?` ${savingsLifeTimeTotal}` : null}

                  </p>
              </div>
              <div className="flex justify-between">
                <p>Kg CO2e</p>
                <p className="text-xl font-semibold">{Math.floor(((phoneAmount * 8500) - (phoneAmount * 4500))/12)} kg</p>
              </div>
              <div  className="flex items-center gap-4">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#06620A">
                    <path d="M283.33-80v-88.67L406-254v-162.67L80-285.33v-108L406-622v-184q0-30.33 21.83-52.17Q449.67-880 480-880q30.33 0 52.17 21.83Q554-836.33 554-806v184l326 228.67v108L554-416.67V-254l122 85.33V-80l-196-59.33L283.33-80Z"/>
                  </svg>
                </div>
                <p>Dette tilsvarer {Math.floor(phoneAmount / 8)} flyreiser tur/retur Oslo/Bergen</p>
              </div>
            </div>
          </div>
          <div onClick={handleCalcClick} className="flex active:bg-gray-100 flex-col justify-between items-start border-gray-500 hover:cursor-pointer px-6 py-8 border">
            <div className="flex justify-between items-center w-full">
              <p>Se detaljert utregning</p>
                        <svg className={`${calcIsOpen ? "rotate-90" : null } transition-all`} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#06620A"><path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z"/></svg>
            </div>
          <div className={`${calcIsOpen ? "h-fit" : "h-0"} w-full overflow-hidden flex flex-col transition-all`}>
            <table>
              <tbody>
                <tr>
                  <th className="text-start">Penger (NOK)</th>
                  <th  className="text-end" >Pr enhet</th>
                  <th className="text-end">Totalt:</th>
                            </tr>
                            <tr>
                <td className="text-start">Dagens kostnader per år</td>
                  <td  className="text-end" >kr {phonePrice}</td>
                  <td  className="text-end" >kr {costEachYearTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Dagens kostnad per mnd</td>
                  <td  className="text-end" >kr {costCurrentLifespanUnit}</td>
                  <td  className="text-end" >kr {costCurrentLifespanTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Justert kostnad per mnd</td>
                  <td  className="text-end" >kr {adjustedCostPerUnit}</td>
                  <td  className="text-end" >kr {adjustedCostTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Besparelse per mnd:</td>
                  <td  className="text-end" >kr {savingsPerMonthPerUnit}</td>
                  <td  className="text-end" >kr {savingsPerMonthTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Besparelse per år:</td>
                  <td  className="text-end" >kr {savingsPerYearPerUnit}</td>
                  <td  className="text-end" >kr {savingsPerYearTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Besparelse levetid {Number(age) + Number(extraAge)} år:</td>
                  <td  className="text-end" >kr {savingsLifeTime}</td>
                  <td  className="text-end" >kr {savingsLifeTimeTotal}</td>
                            </tr>
              </tbody>

            </table>
            </div>
          </div>
        </section>
        <section id="adjustments" className="flex flex-col gap-4">
          <h2 className="font-semibold text-2xl">Justér sparetiltak</h2>
          <fieldset className="flex flex-col gap-4 mt-12">
          <legend className=" mb-4 ">Gjennomsnittlig levetid per telefon:</legend>
                <input
                  className="hidden peer/18"
                  type="radio"
                  id='18'
                  name="age"
                  value={18}
                  onChange={(e) => setAge(e.target.value)} />
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
                  defaultChecked={true}
                  value={24}
                  onChange={(e) => setAge(e.target.value)}
                  />
                   <label
                    htmlFor="24"
                    className="peer-checked/24:bg-green-800 peer-checked/24:text-white h-[56px] flex w-full items-center justify-center bg-green-100 hover:cursor-pointer " >
                  24 mnd
                </label>
                <input
                  className="hidden peer/30"
                  type="radio"
                  id='30'
                  name="age"
                  value={30}
                  onChange={(e) => setAge(e.target.value)}
                  />
                   <label
                    htmlFor="30"
                    className="peer-checked/30:bg-green-800 peer-checked/30:text-white h-[56px] flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer" >
                  32 mnd
                  </label>
          </fieldset>
          <fieldset className="flex gap-4 mt-12">
          <legend className="mb-4">Forleng levetid på telefonene</legend>
                <input
                  className="hidden peer/phoneAgeIncreaseNone"
                  type="radio"
                  id='phoneAgeIncreaseNone'
                  name="phoneAgeIncrease"
                  value={0}
                  onChange={(e) => setExtraAge(e.target.value)} />
                <label
                className="peer-checked/phoneAgeIncreaseNone:bg-green-800 h-[56px] peer-checked/phoneAgeIncreaseNone:text-white flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer"
                htmlFor="phoneAgeIncreaseNone">
                  Ingen
                </label>
                <input
                  className="hidden peer/phoneAgeIncrease6mth"
                  type="radio"
                  id='phoneAgeIncrease6mth'
                  name="phoneAgeIncrease"
                  defaultChecked={true}
                  value={6}
                  onChange={(e) => setExtraAge(e.target.value)}
                  />
                   <label
                    htmlFor="phoneAgeIncrease6mth"
                    className="peer-checked/phoneAgeIncrease6mth:bg-green-800 peer-checked/phoneAgeIncrease6mth:text-white h-[56px] flex w-full items-center justify-center bg-green-100 hover:cursor-pointer " >
                  + 6 mnd
                </label>
                <input
                  className="hidden peer/phoneAgeIncrease12mth"
                  type="radio"
                  id='phoneAgeIncrease12mth'
                  name="phoneAgeIncrease"
                  value={12}
                  onChange={(e) => setExtraAge(e.target.value)}
                  />
                   <label
                    htmlFor="phoneAgeIncrease12mth"
                    className="peer-checked/phoneAgeIncrease12mth:bg-green-800 peer-checked/phoneAgeIncrease12mth:text-white h-[56px] flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer" >
                  + 12 mnd
                  </label>
          </fieldset>
          <fieldset className="flex gap-4 mt-12">
          <legend className="mb-4 ">Øk andel gjenbrukte telefoner</legend>
                <input
                  className="hidden peer/amountPhoneIncreaseNone"
                  type="radio"
                  id='amountPhoneIncreaseNone'
                  name="phoneIncrease"
                  value={0}
                  onChange={(e) => setRefurbishedPhones(e.target.value)} />
                <label
                className="peer-checked/amountPhoneIncreaseNone:bg-green-800 h-[56px] peer-checked/amountPhoneIncreaseNone:text-white flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer"
                htmlFor="amountPhoneIncreaseNone">
                  Ingen
                </label>
                <input
                  className="hidden peer/amountPhoneIncrease10"
                  type="radio"
                  id='amountPhoneIncrease10'
                  name="phoneIncrease"
                  defaultChecked={true}
                  value={0.1}
                  onChange={(e) => setRefurbishedPhones(e.target.value)}
                  />
                   <label
                      htmlFor="amountPhoneIncrease10"
                    className="peer-checked/amountPhoneIncrease10:bg-green-800 peer-checked/amountPhoneIncrease10:text-white h-[56px] flex w-full items-center justify-center bg-green-100 hover:cursor-pointer " >
                  10%
                </label>
                <input
                  className="hidden peer/amountPhoneIncrease25"
                  type="radio"
                  id='amountPhoneIncrease25'
                  name="phoneIncrease"
                  value={0.25}
                  onChange={(e) => setRefurbishedPhones(e.target.value)}
                  />
                   <label
                    htmlFor="amountPhoneIncrease25"
                    className="peer-checked/amountPhoneIncrease25:bg-green-800 peer-checked/amountPhoneIncrease25:text-white h-[56px] flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer" >
                  25%
                  </label>
          </fieldset>
          <div  className="flex flex-col  justify-between items-start border-gray-500 border">
            <div onClick={handleAdjClick} className="flex px-8 py-10 active:bg-gray-100 hover:cursor-pointer justify-between items-center w-full">
              <p>Detaljerte instillinger</p>
                        <svg className={`${adjIsOpen ? "rotate-90" : null } transition-all`} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#06620A"><path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z"/></svg>
            </div>
          <div className={`${adjIsOpen ? "h-fit" : "h-0"} overflow-hidden flex flex-col gap-8 w-full`}>
          {/* Average Price Per New Phone */}
          <div className="flex flex-col px-8 gap-2 h-full justify-start items-start  w-full">
            <p className=" text-gray-500 text-xs">Gjennomsnittlig pris per telefon:</p>
            <p className="text-base font-semibold">{phonePrice} kr</p>
              <RangeSlider
                      className="single-thumb"
                      defaultValue={[0,phonePrice]}
                      value={[0, phonePrice]}
                      min={1}
                      max={20000}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      onInput={(e) => setPhonePrice(e[1])}
                    />
                <div className="flex justify-between text-gray-500 w-full">
                  <p className="text-xs">1 kr</p>
                  <p className="text-xs">20 000 kr</p>
                </div>
          </div>
          {/* Average Emssions Per New Phone */}
          <div className="flex flex-col px-8 gap-2 h-full justify-start items-start  w-full">
            <p className=" text-gray-500 text-xs">Gjennomsnittlig CO2e avtrykk pr mobiltelefon:</p>
            <p className="text-base font-semibold">{avgEmissions} kg</p>
              <RangeSlider
                      className="single-thumb"
                      defaultValue={[0,avgEmissions]}
                      value={[0, avgEmissions]}
                      min={1}
                      max={100}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      onInput={(e) => setAvgEmissions(e[1])}
                    />
                <div className="flex justify-between text-gray-500 w-full">
                  <p className="text-xs">1 kg</p>
                  <p className="text-xs">100 kg</p>
                </div>
          </div>
          {/* Average Price Per Refurbished Phone */}
          <div className="flex flex-col px-8 gap-2 h-full justify-start items-start  w-full">
            <p className=" text-gray-500 text-xs">Gjennomsnittlig pris pr refurbished mobiltelefon:</p>
            <p className="text-base font-semibold">{phonePriceRefurbished} kr</p>
              <RangeSlider
                      className="single-thumb"
                      defaultValue={[0,phonePriceRefurbished]}
                      value={[0, phonePriceRefurbished]}
                      min={1}
                      max={20000}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      onInput={(e) => setPhonePriceRefurbished(e[1])}
                    />
                <div className="flex justify-between text-gray-500 w-full">
                  <p className="text-xs">1 kr</p>
                  <p className="text-xs">20 000 kr</p>
                </div>
          </div>
          {/* Average Emissions Per Refurbished Phone */}
          <div className="flex flex-col px-8 gap-2 h-full justify-start items-start  w-full">
            <p className=" text-gray-500 text-xs">Gjennomsnittlig CO2e avtrykk perr refurbished mobiltelefon:</p>
            <p className="text-base font-semibold">{avgEmissionsRefurbished} kg</p>
              <RangeSlider
                      className="single-thumb"
                      defaultValue={[0,avgEmissionsRefurbished]}
                      value={[0, avgEmissionsRefurbished]}
                      min={1}
                      max={100}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      onInput={(e) => setAvgEmissionsRefurbished(e[1])}
                    />
                <div className="flex justify-between text-gray-500 w-full">
                  <p className="text-xs">1 kg</p>
                  <p className="text-xs">100 kg</p>
                </div>
          </div>
            </div>
          </div>
          
        </section>
   
      </main>
    </>
  )
}

export default App
