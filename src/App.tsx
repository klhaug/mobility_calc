import './App.css'
import { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import {PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';





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

  const handleCalcClick = () => {
    setCalcIsOpen(!calcIsOpen)
  }
  const handleAdjClick = () => {
    setAdjIsOpen(!adjIsOpen)
  
  }
  const createCurrentDate = () => {
    const date = new Date;
    return date.toLocaleDateString();
  }
  console.log(createCurrentDate())
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
          return numberAsString; 
        }
      case 5:
        {
           const newString = numberAsString.slice(0, 2) + " " + numberAsString.slice(2)
           return newString; 
        }
        case 6:
        {
          const newString = numberAsString.slice(0, 3) + " " + numberAsString.slice(3)
          return newString;
        }
        case 7:
        {
          const newString = numberAsString.slice(0, 1) + " " + numberAsString.slice(1,4) + " " + numberAsString.slice(4)
          return newString;
        }
        case 8:
        {
          const newString = numberAsString.slice(0, 2) + " " + numberAsString.slice(2,5) + " " + numberAsString.slice(5)
          return newString;
        }
        case 9: {
          console.error("This string is to long for current formatting code", numberAsString);
          return numberAsString;
        }
    }
  }
  //and then I found out about this method...
  const transformNumberIntoString20 = (number) => {
    return number.toLocaleString("nn-NO", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1, 
    })
  }

  const calculateEmissions = () => {
    const newPhones = 1 - refurbishedPhones;

    const co2Total = avgEmissions * phoneAmount
    const totalAge = Number(age) + Number(extraAge)

    //New Phone Emissions Montly
    const co2CurrentLifespanUnit = avgEmissions / age;
    const co2CurrentLifespanTotal = co2Total  / age;
    //Newbuys Cost Montly(Slutt) 24 mnd 90% === 327,-
    
    //Refurbished Emission Monthly
    const co2RefurbishedTotal = (refurbishedPhones * phoneAmount * avgEmissionsRefurbished) / age;
    const co2RefurbishedUnit = co2RefurbishedTotal / phoneAmount;
    //Refurbished Emissions Monthly(Slutt) 24mnd 10% === 18,- pr mnd per telefon

    const adjustedEmissionsPerUnit = (avgEmissions / totalAge) * newPhones + co2RefurbishedUnit;
    const adjustedEmissionsTotal = adjustedEmissionsPerUnit * phoneAmount;

    const co2SavingsPerMonthPerUnit = co2CurrentLifespanUnit - adjustedEmissionsPerUnit; 
    const co2SavingsPerMonthTotal = co2SavingsPerMonthPerUnit * phoneAmount;
    
    const co2SavingsPerYearPerUnit = co2SavingsPerMonthPerUnit * 12;
    const co2SavingsPerYearTotal = co2SavingsPerYearPerUnit * phoneAmount
    const co2SavingsLifeTime = co2SavingsPerMonthPerUnit * totalAge;
    const co2SavingsLifeTimeTotal = co2SavingsLifeTime * phoneAmount;

    const flightComparison = co2SavingsLifeTimeTotal / 81.1;
    const flightComparisonAnnual = (flightComparison / totalAge) * 12


  

    return {
      co2EachYearPerUnit: transformNumberIntoString20(avgEmissions),
      co2Total: transformNumberIntoString(co2Total),
      
      co2CurrentLifespanUnit: transformNumberIntoString20(co2CurrentLifespanUnit),
      co2CurrentLifespanTotal:transformNumberIntoString(co2CurrentLifespanTotal),

      adjustedEmissionsPerUnit: transformNumberIntoString20(adjustedEmissionsPerUnit),
      adjustedEmissionsTotal: transformNumberIntoString(adjustedEmissionsTotal),
      
      co2SavingsPerMonthPerUnit: transformNumberIntoString20(co2SavingsPerMonthPerUnit),  
      co2SavingsPerMonthTotal: transformNumberIntoString(co2SavingsPerMonthTotal),  

      co2SavingsPerYearPerUnit: transformNumberIntoString20(co2SavingsPerYearPerUnit), 
      co2SavingsPerYearTotal: transformNumberIntoString(co2SavingsPerYearTotal),

      co2SavingsLifeTime: transformNumberIntoString20(co2SavingsLifeTime),
      co2SavingsLifeTimeTotal: transformNumberIntoString(co2SavingsLifeTimeTotal),

      flightComparisonAnnual: transformNumberIntoString(flightComparisonAnnual),
      flightComparison: transformNumberIntoString(flightComparison)
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
  const emissions = calculateEmissions();

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

    const {
      co2EachYearPerUnit,
      co2Total,
      co2CurrentLifespanUnit,
      co2CurrentLifespanTotal,
      adjustedEmissionsPerUnit,
      adjustedEmissionsTotal,
      co2SavingsPerMonthPerUnit,
      co2SavingsPerMonthTotal,
      co2SavingsPerYearPerUnit,
      co2SavingsPerYearTotal,
      co2SavingsLifeTime,
      co2SavingsLifeTimeTotal,
      flightComparison,
      flightComparisonAnnual
    } = emissions;


 
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
            <PDFDownloadLink 
              document= {
                <MyDocument 
                age = {age}
                phoneAmount = {phoneAmount}
                extraAge={extraAge}
                phonePrice = {phonePrice}
                costEachYearTotal={costEachYearTotal}
                costCurrentLifespanUnit={costCurrentLifespanUnit}
                costCurrentLifespanTotal={costCurrentLifespanTotal}
                adjustedCostPerUnit={adjustedCostPerUnit}
                adjustedCostTotal={adjustedCostTotal}
                savingsPerMonthPerUnit={savingsPerMonthPerUnit}
                savingsPerMonthTotal={savingsPerMonthTotal}
                savingsPerYearPerUnit={savingsPerYearPerUnit}
                savingsPerYearTotal={savingsPerYearTotal}
                savingsLifeTime={savingsLifeTime}
                savingsLifeTimeTotal={savingsLifeTimeTotal}
                co2EachYearPerUnit={co2EachYearPerUnit}
                co2Total={co2Total}
                co2CurrentLifespanUnit={co2CurrentLifespanUnit}
                co2CurrentLifespanTotal={co2CurrentLifespanTotal}
                adjustedEmissionsPerUnit={adjustedEmissionsPerUnit}
                phonePriceRefurbished={phonePriceRefurbished}
                adjustedEmissionsTotal={adjustedEmissionsTotal}
                co2SavingsPerMonthPerUnit={co2SavingsPerMonthPerUnit}
                co2SavingsPerMonthTotal={co2SavingsPerMonthTotal}
                co2SavingsPerYearPerUnit={co2SavingsPerYearPerUnit}
                co2SavingsPerYearTotal={co2SavingsPerYearTotal}
                co2SavingsLifeTime={co2SavingsLifeTime}
                co2SavingsLifeTimeTotal={co2SavingsLifeTimeTotal}
                flightComparison={flightComparison}
                flightComparisonAnnual={flightComparisonAnnual}
                refurbishedPhones = {refurbishedPhones}
                avgEmissions = {avgEmissions}
                avgEmissionsRefurbished={avgEmissionsRefurbished}
                createNewDate = {createCurrentDate}
                  />
                } 
                fileName={`${createCurrentDate()} - Mobility Klimakalkulator`}>
              {({ blob, url, loading, error }) =>
              loading ? 'Last ned PDF' : "Last ned PDF"
            }
            </PDFDownloadLink>
            {/*<PDFViewer>
              <MyDocument 
              age= {age}
              extraAge = {extraAge}
                phoneAmount = {phoneAmount}
                createNewDate = {createCurrentDate}
                phonePrice = {phonePrice}
                costEachYearTotal={costEachYearTotal}
                costCurrentLifespanUnit={costCurrentLifespanUnit}
                costCurrentLifespanTotal={costCurrentLifespanTotal}
                adjustedCostPerUnit={adjustedCostPerUnit}
                adjustedCostTotal={adjustedCostTotal}
                savingsPerMonthPerUnit={savingsPerMonthPerUnit}
                savingsPerMonthTotal={savingsPerMonthTotal}
                savingsPerYearPerUnit={savingsPerYearPerUnit}
                savingsPerYearTotal={savingsPerYearTotal}
                savingsLifeTime={savingsLifeTime}
                savingsLifeTimeTotal={savingsLifeTimeTotal}
                avgEmissions={avgEmissions}
                avgEmissionsRefurbished={avgEmissionsRefurbished}
                phonePriceRefurbished={phonePriceRefurbished}
                refurbishedPhones={refurbishedPhones}
                co2EachYearPerUnit={co2EachYearPerUnit}
                co2Total={co2Total}
                co2CurrentLifespanUnit={co2CurrentLifespanUnit}
                co2CurrentLifespanTotal={co2CurrentLifespanTotal}
                adjustedEmissionsPerUnit={adjustedEmissionsPerUnit}
                adjustedEmissionsTotal={adjustedEmissionsTotal}
                co2SavingsPerMonthPerUnit={co2SavingsPerMonthPerUnit}
                co2SavingsPerMonthTotal={co2SavingsPerMonthTotal}
                co2SavingsPerYearPerUnit={co2SavingsPerYearPerUnit}
                co2SavingsPerYearTotal={co2SavingsPerYearTotal}
                co2SavingsLifeTime={co2SavingsLifeTime}
                co2SavingsLifeTimeTotal={co2SavingsLifeTimeTotal}
                flightComparison={flightComparison}
                flightComparisonAnnual={flightComparisonAnnual}
                />
            </PDFViewer>*/}
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
                <p className="text-xl font-semibold"> kg
                  {savings === 'yearly' ? ` ${co2SavingsPerYearTotal}` : null}
                  {savings === 'lifetime' ?` ${co2SavingsLifeTimeTotal}` : null}
                  </p>
              </div>
              <div  className="flex items-center gap-4">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#06620A">
                    <path d="M283.33-80v-88.67L406-254v-162.67L80-285.33v-108L406-622v-184q0-30.33 21.83-52.17Q449.67-880 480-880q30.33 0 52.17 21.83Q554-836.33 554-806v184l326 228.67v108L554-416.67V-254l122 85.33V-80l-196-59.33L283.33-80Z"/>
                  </svg>
                </div>
                <p>Dette tilsvarer 
                    {savings === "yearly" ? ` ${flightComparisonAnnual} ` : null}
                    {savings === "lifetime" ? ` ${flightComparison} ` : null}
                 flyreiser tur/retur Oslo/Bergen</p>
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
            <table>
              <tbody>
                <tr>
                  <th className="text-start">Utslipp (CO2e)</th>
                  <th  className="text-end" >Pr enhet</th>
                  <th className="text-end">Totalt:</th>
                            </tr>
                            <tr>
                <td className="text-start">Dagens utslipp per år</td>
                  <td  className="text-end" >kg {co2EachYearPerUnit}</td>
                  <td  className="text-end" >kg {co2Total}</td>
                            </tr>
                            <tr>
                <td className="text-start">Dagens utslipp per mnd</td>
                  <td  className="text-end" >kg {co2CurrentLifespanUnit}</td>
                  <td  className="text-end" >kg {co2CurrentLifespanTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Justert utslipp per mnd</td>
                  <td  className="text-end" >kg {adjustedEmissionsPerUnit}</td>
                  <td  className="text-end" >kg {adjustedEmissionsTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Besparelse per mnd:</td>
                  <td  className="text-end" >kg {co2SavingsPerMonthPerUnit}</td>
                  <td  className="text-end" >kg {co2SavingsPerMonthTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Besparelse per år:</td>
                  <td  className="text-end" >kg {co2SavingsPerYearPerUnit}</td>
                  <td  className="text-end" >kg {co2SavingsPerYearTotal}</td>
                            </tr>
                            <tr>
                <td className="text-start">Besparelse levetid {Number(age) + Number(extraAge)} år:</td>
                  <td  className="text-end" >kg {co2SavingsLifeTime}</td>
                  <td  className="text-end" >kg {co2SavingsLifeTimeTotal}</td>
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

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingHorizontal: 48,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 6
  },
  logo: {
    fontSize: 32,
  },
    text: {
      width: "100%",
      fontSize: 12,
      textAlign: 'left'
    },
    settingsText: {
      fontSize: 12,
      textAlign: 'left'
    },
    table: {
      display: "flex",
      flexDirection: "row",
      fontSize: 12,
      justifyContent: "space-between",
    },
    tableLast: {
      borderBottom: "1px solid black",
      fontWeight: 700,
      paddingBottom: 4,
      marginBottom: 8,
      display: "flex",
      flexDirection: "row",
      fontSize: 12,
      justifyContent: "space-between",
    },
    tableDescriptions: {
      borderBottom: "1px solid lightgray",
      marginTop: 8,
      display: "flex",
      fontStyle: "italic",
      flexDirection: "row",
      fontSize: 12,
      justifyContent: "space-between",
    },

    tableHeader: {
      color: "#023C05",
      paddingBottom: 2,
      fontWeight: 700,
      display: "flex",
      flexDirection: "row",
      fontSize: 12,
      justifyContent: "space-between",
    }
});

Font.register({family: "Montserrat", src:"https://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf"})



// Create Document Component
const MyDocument = ({
    age,
    extraAge,
    phonePrice,
    costEachYearTotal,
    costCurrentLifespanUnit,
    costCurrentLifespanTotal,
    adjustedCostPerUnit,
    adjustedCostTotal,
    savingsPerMonthPerUnit,
    savingsPerMonthTotal,
    savingsPerYearPerUnit,
    savingsPerYearTotal,
    savingsLifeTime,
    savingsLifeTimeTotal,
    co2EachYearPerUnit,
    co2Total,
    co2CurrentLifespanUnit,
    co2CurrentLifespanTotal,
    adjustedEmissionsPerUnit,
    avgEmissions,
    avgEmissionsRefurbished,
    refurbishedPhones,
    adjustedEmissionsTotal,
    co2SavingsPerMonthPerUnit,
    phoneAmount,
    co2SavingsPerMonthTotal,
    co2SavingsPerYearPerUnit,
    co2SavingsPerYearTotal,
    co2SavingsLifeTime,
    phonePriceRefurbished,
    co2SavingsLifeTimeTotal,
    flightComparison,
    flightComparisonAnnual,
                createNewDate 

  }) => {
 

  return (
  <Document>
    <Page size="A4" style={styles.body}>
      <View style={styles.header}>
        <View>
          <Text style={{fontSize: 24}}>Klimakalkulator</Text>
          <Text style={{fontSize: 12}}>{createNewDate()}</Text>
        </View>
        <View style={{width: 225, display: "flex", flexDirection: "column", gap: 4}}>
          <Text style={{fontSize: 12, fontWeight: 700}}>Mobility AS</Text>
          <Text style={styles.text}>Trelastgata 17, Barcode Bjørvika</Text>
          <Text style={styles.text}>0191 Oslo</Text>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
            <Text style={styles.text}>Foretaksregisteret:</Text>
            <Text style={styles.text}>NO 923786260 MVA</Text>
          </View>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.text}>Telefon:</Text>
          <Text style={styles.text}>22 27 88 00</Text>
        </View>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.text}>E-post:</Text>
          <Text style={styles.text}>ordre@mobility.no</Text>
        </View>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.text}>Nettside:</Text>
          <Text style={styles.text}>mobility.no</Text>
        </View>
        </View>
      </View>
      <View>
        <Text style={styles.tableHeader}>Innstillinger:</Text>
        <View style={{display:  "flex", flexDirection:"column", gap: 6, paddingBottom: 16, paddingTop:8}}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.settingsText}>Antall mobiltelefoner i din bedrift:</Text>
              <Text style={styles.settingsText}>{phoneAmount} stk</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.settingsText}>Gjennomsnittlig pris per telefon:</Text>
              <Text style={styles.settingsText}>kr {phonePrice}</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.settingsText}>Gjennomsnittlig levetid per telfon:</Text>
              <Text style={styles.settingsText}>{age} mnd</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.settingsText}>Forlenget levetid per telefon:</Text>
              <Text style={styles.settingsText}>{extraAge} mnd</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.settingsText}>Andel gjenbrukte telefoner</Text>
              <Text style={styles.settingsText}>{refurbishedPhones * 100}%</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.settingsText}>Gjennomsnittlig pris per refurbished telefon:</Text>
              <Text style={styles.settingsText}>kr {phonePriceRefurbished}</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.settingsText}>Gjennomsnittlig CO2e avtrykk pr mobiltelefon:</Text>
              <Text style={styles.settingsText}>kg {avgEmissions}</Text>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
              <Text style={styles.settingsText}>Gjennomsnittlig CO2e avtrykk per refurbished mobiltelefon:</Text>
              <Text style={styles.settingsText}>kg {avgEmissionsRefurbished}</Text>
            </View>
          </View>
          </View>
      <View style={styles.section}>

          <View style={styles.tableDescriptions}>
            <Text>Beskrivelse</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>Per enhet:</Text>
              <Text style={{textAlign: "right", width: 96}}>Totalt:</Text>
            </View>
          </View>
          <View style={styles.tableHeader}>
            <Text>Utregning - Penger (NOK)</Text>
          </View>
          <View style={styles.table}>
            <Text>Dagens kostnader per år:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kr {phonePrice}</Text>
              <Text style={{textAlign: "right", width: 96}}>kr {costEachYearTotal}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Dagens kostnad per mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kr {costCurrentLifespanUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kr {costCurrentLifespanTotal}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Justert kostnad per mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kr {adjustedCostPerUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kr {adjustedCostTotal}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Besparelse per mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kr {savingsPerMonthPerUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kr {savingsPerMonthTotal}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Besparelse per år:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kr {savingsPerYearPerUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kr {savingsPerYearTotal}</Text>
            </View>
          </View>
          <View style={styles.tableLast}>
            <Text>Besparelse levetid {Number(age) + Number(extraAge)} mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kr {savingsLifeTime}</Text>
              <Text style={{textAlign: "right", width: 96}}>kr {savingsLifeTimeTotal}</Text>
            </View>
          </View>
 <View style={styles.tableHeader}>
            <Text>Utregning - Utslipp (CO2e)</Text>
          </View>
          <View style={styles.table}>
            <Text>Dagens utslipp per år:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kg {co2EachYearPerUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kg {co2Total}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Dagens utslipp per mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kg {co2CurrentLifespanUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kg {co2CurrentLifespanTotal}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Justert utslipp per mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kg {adjustedEmissionsPerUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kg {adjustedEmissionsTotal}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Besparelse per mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kg {co2SavingsPerMonthPerUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kg {co2SavingsPerMonthTotal}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text>Besparelse per år:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kg {co2SavingsPerYearPerUnit}</Text>
              <Text style={{textAlign: "right", width: 96}}>kg {co2SavingsPerYearTotal}</Text>
            </View>
          </View>
          <View style={styles.tableLast}>
            <Text>Besparelse levetid {Number(age) + Number(extraAge)} mnd:</Text>
            <View style={{display: "flex", flexDirection: "row", gap: 24}}>
              <Text style={{textAlign: "right", width: 96}}>kg {co2SavingsLifeTime}</Text>
              <Text style={{textAlign: "right", width: 96}}>kg {co2SavingsLifeTimeTotal}</Text>
            </View>
          </View>
          <Text style={{ fontSize:12, fontWeight: 600 }}>Dette tilsvarer {flightComparison} flyreiser tur/retur Oslo/Bergen.</Text>
      </View>

    </Page>
  </Document>
)};


export default App
