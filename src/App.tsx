import './App.css'
import { useState,  } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {MyDocument} from "./PDFDocument"
import { useWindowSize } from "@uidotdev/usehooks";
  

function App() {
  const [phoneAmount, setPhoneAmount] = useState<number>(150);
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

  const size = useWindowSize();
  const windowWidth: number | null = size.width;
  const setCircularSliderWidth = (number: number | null) => {
    if(number === null) {
      return 0;
    } else if (number > 768 ) {
    return 400;
    } else if (number > 420) {
      return number - 120
    } else {
      return number - 64
    }
  }

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



//Takes a number, transforms it into a string and splits it into even numerical formatting based on the length of the string. Caps out at length 8. Length 9 logs an error and returns the number as a string unformatted. 
  const transformNumberIntoString = (number: number): string | undefined => {
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
  const transformNumberIntoString20 = (number: number): string => {
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
      <header className="flex flex-col w-full bg-gray-100 p-4 m-auto  max-w-[768px]">  
        <div className="flex items-center justify-between">
          <h1 className="text-green-500 text-sm font-bold uppercase">Klimakalkulator</h1>
        <img src="/mobility_logo_black.svg" alt="logo"/>
        {/* Bytt ut m. img og logo */}
        </div>
        <p className="w-2/3 text-start text-xs text-gray-600">Se hvor mye penger og
          CO2-utslipp din bedrift kan spare</p>
      </header>
      <main className="pb-12 ">
        <section id="slider" className="flex items-center flex-col justify-center py-12">
          <CircularSlider
            label="Mobiltelefoner i din bedrift"
            labelColor="#000000"
            labelFontSize="12px"
            knobColor="#06620A"
            width={setCircularSliderWidth(windowWidth)}
            initialValue={150}
            dataIndex={phoneAmount - 1}
            knobSize={48}
            min={1}
            max={1000}
            progressColorFrom="#DCF9DD"
            labelBottom={true}
            progressColorTo="#0CC814"
            valueFontSize={size.width !== null && size.width < 420 ? " 48px" : "64px"}
            progressSize={24}
            trackColor="#D9D9D9"
            trackSize={24}
            onChange={value => setPhoneAmount(typeof value === "string" ? parseFloat(value) : value)}
            
        />
        </section>
        <section id="savings" className=" flex flex-col w-[calc(100vw_-_40px)] m-auto max-w-[768px] gap-4">
          <div className="bg-gray-100 p-8 flex flex-col  gap-8">
            <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
            <h2 className="sm:text-xl text-md font-semibold">Dine besparelser</h2>
            <div className="flex items-center gap-1 text-sm text-nowrap hover:underline underline-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#06620A"><path d="M480-336 288-528l51-51 105 105v-342h72v342l105-105 51 51-192 192ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72h432v-72h72v72q0 29.7-21.16 50.85Q725.68-192 695.96-192H263.72Z"/></svg>
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
                refurbishedPhones = {refurbishedPhones}
                avgEmissions = {avgEmissions}
                avgEmissionsRefurbished={avgEmissionsRefurbished}
                createNewDate = {createCurrentDate}
                  />
                } 
                fileName={`${createCurrentDate()} - Mobility Klimakalkulator`}>
              {({ loading }) =>
              loading ? 'Last ned PDF' : "Last ned PDF"
            }
            </PDFDownloadLink>
              </div>
            </div>
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
                      className="peer-checked/savingsYearly:bg-green-800 px-2 py-1 font-semibold peer-checked/savingsYearly:text-white flex  w-fit items-center justify-center bg-green-100 hover:cursor-pointer"
                      onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                      tabIndex={0}
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
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
                    className="peer-checked/savingsLifetime:bg-green-500 py-1 font-semibold px-2 w-fit peer-checked/savingsLifetime:text-white flex  items-center justify-center bg-green-100 hover:cursor-pointer"
                    htmlFor="savingsLifetime">
                    Levetid
                  </label>
            </div>
          </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center  justify-between">
                <p className="w-full">NOK</p>
                <p className="text-2xl  w-full text-left text-nowrap font-semibold"> kr  
                  {savings === 'yearly' ? ` ${savingsPerYearTotal}` : null}
                  {savings === 'lifetime' ?` ${savingsLifeTimeTotal}` : null}

                  </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-nowrap w-full">Kg CO2e</p>
                <p className="text-2xl w-full text-left text-nowrap font-semibold"> kg
                  {savings === 'yearly' ? ` ${co2SavingsPerYearTotal}` : null}
                  {savings === 'lifetime' ?` ${co2SavingsLifeTimeTotal}` : null}
                  </p>
              </div>
              <div  className="flex items-center gap-4 mt-4">
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
          <div tabIndex={0} onKeyDown={(e) => e.key === "Enter" ? handleCalcClick() : null} onClick={handleCalcClick} className="flex active:bg-gray-100 flex-col justify-between items-start border-gray-500 hover:cursor-pointer px-6 py-8 border mt-2">
            <div className="flex justify-between items-center w-full">
              <p>Se detaljert utregning</p>
                        <svg className={`${calcIsOpen ? "rotate-90" : null } transition-all`} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#06620A"><path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z"/></svg>
            </div>
          <div className={`${calcIsOpen ? "h-fit" : "h-0"} w-full overflow-hidden flex flex-col transition-all`}>
            <table>
              <tbody>
                <tr>
                  <th className="pt-2 text-start w-3/5">Penger (NOK)</th>
                  <th  className="pt-2 text-end w-1/5 text-nowrap" >Pr enhet</th>
                  <th className="pt-2 text-end w-1/5 text-nowrap">Totalt:</th>
                            </tr>
                            <tr>
                <td className="pt-2 text-sm sm:text-base text-start">Dagens kostnader per år</td>
                  <td  className="pt-2 text-sm sm:text-base text-end text-nowrap" >kr {phonePrice}</td>
                  <td  className="pt-2 text-sm pl-2 sm:text-base text-end text-nowrap" >kr {costEachYearTotal}</td>
                            </tr>
                            <tr>
                <td className="pt-2 text-sm sm:text-base text-start">Dagens kostnad per mnd</td>
                  <td  className="pt-2 text-sm sm:text-base text-end" >kr {costCurrentLifespanUnit}</td>
                  <td  className="pt-2 text-sm pl-2 sm:text-base text-end" >kr {costCurrentLifespanTotal}</td>
                            </tr>
                            <tr>
                <td className="pt-2 text-sm sm:text-base text-start">Justert kostnad per mnd</td>
                  <td  className="pt-2 text-sm sm:text-base text-end" >kr {adjustedCostPerUnit}</td>
                  <td  className="pt-2 text-sm pl-2 sm:text-base text-end" >kr {adjustedCostTotal}</td>
                            </tr>
                            <tr>
                <td className="pt-2 text-sm sm:text-base text-start">Besparelse per mnd:</td>
                  <td  className="pt-2 text-sm sm:text-base text-end" >kr {savingsPerMonthPerUnit}</td>
                  <td  className="pt-2 text-sm pl-2 sm:text-base text-end" >kr {savingsPerMonthTotal}</td>
                            </tr>
                            <tr>
                <td className="pt-2 text-sm sm:text-base text-start">Besparelse per år:</td>
                  <td  className="pt-2 text-sm sm:text-base text-end" >kr {savingsPerYearPerUnit}</td>
                  <td  className="pt-2 text-sm pl-2 sm:text-base text-end" >kr {savingsPerYearTotal}</td>
                            </tr>
                            <tr>
                <td className="pt-2 text-sm sm:text-base text-start">Besparelse levetid {Number(age) + Number(extraAge)} år:</td>
                  <td  className="pt-2 text-sm sm:text-base text-end" >kr {savingsLifeTime}</td>
                  <td  className="pt-2 text-sm pl-2 sm:text-base text-end" >kr {savingsLifeTimeTotal}</td>
                            </tr>
              </tbody>

            </table>
            <table>
              <tbody>
                <tr>
                  <th className="text-start w-3/5 pt-2">Utslipp (CO2e)</th>
                  <th  className="text-end w-1/5 text-nowrap pt-2" >Pr enhet</th>
                  <th className="text-end w-1/5 text-nowrap pt-2">Totalt:</th>
                            </tr>
                            <tr>
                  <td  className=" pt-2 text-sm sm:text-base text-start">Dagens utslipp per år</td>
                  <td  className="text-nowrap pt-2 text-sm sm:text-base text-end" >kg {co2EachYearPerUnit}</td>
                  <td  className="text-nowrap pt-2 pl-2 text-sm sm:text-base text-end" >kg {co2Total}</td>
                            </tr>
                            <tr>
                  <td  className=" pt-2 text-sm sm:text-base text-start">Dagens utslipp per mnd</td>
                  <td  className="text-nowrap pt-2 text-sm sm:text-base text-end" >kg {co2CurrentLifespanUnit}</td>
                  <td  className="text-nowrap pt-2 pl-2 text-sm sm:text-base text-end" >kg {co2CurrentLifespanTotal}</td>
                            </tr>
                            <tr>
                  <td  className=" pt-2 text-sm sm:text-base text-start">Justert utslipp per mnd</td>
                  <td  className="text-nowrap pt-2 text-sm sm:text-base text-end" >kg {adjustedEmissionsPerUnit}</td>
                  <td  className="text-nowrap pt-2 pl-2 text-sm sm:text-base text-end" >kg {adjustedEmissionsTotal}</td>
                            </tr>
                            <tr>
                  <td  className=" pt-2 text-sm sm:text-base text-start">Besparelse per mnd:</td>
                  <td  className="text-nowrap pt-2 text-sm sm:text-base text-end" >kg {co2SavingsPerMonthPerUnit}</td>
                  <td  className="text-nowrap pt-2  pl-2 text-sm sm:text-base text-end" >kg {co2SavingsPerMonthTotal}</td>
                            </tr>
                            <tr>
                  <td  className=" pt-2 text-sm sm:text-base text-start">Besparelse per år:</td>
                  <td  className="text-nowrap pt-2 text-sm sm:text-base text-end" >kg {co2SavingsPerYearPerUnit}</td>
                  <td  className="text-nowrap pt-2  pl-2 text-sm sm:text-base text-end" >kg {co2SavingsPerYearTotal}</td>
                            </tr>
                            <tr>
                  <td  className=" pt-2 text-sm sm:text-base text-start">Besparelse levetid {Number(age) + Number(extraAge)} år:</td>
                  <td  className="text-nowrap pt-2 text-sm sm:text-base text-end" >kg {co2SavingsLifeTime}</td>
                  <td  className="text-nowrap pt-2 text-sm pl-2 sm:text-base text-end" >kg {co2SavingsLifeTimeTotal}</td>
                            </tr>
              </tbody>

            </table>
            </div>
          </div>
        </section>
        <section id="adjustments" className=" flex flex-col w-[calc(100vw_-_40px)] m-auto max-w-[768px] gap-4 py-16">
          <h2 className="font-semibold text-2xl">Justér sparetiltak</h2>
          <fieldset className="flex flex-col mt-4 gap-4">
          <legend className="text-gray-500 mb-4 ">Gjennomsnittlig levetid per telefon:</legend>
                <input
                  className="hidden peer/18"
                  type="radio"
                  id='18'
                  name="age"
                  value={18}
                  onChange={(e) => setAge(parseFloat(e.target.value))} />
                <label
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                tabIndex={0}
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
                  onChange={(e) => setAge(parseFloat(e.target.value))}
                  />
                   <label
                    htmlFor="24"
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
                    className="peer-checked/24:bg-green-800 peer-checked/24:text-white h-[56px] flex w-full items-center justify-center bg-green-100 hover:cursor-pointer " >
                  24 mnd
                </label>
                <input
                  className="hidden peer/30"
                  type="radio"
                  id='30'
                  name="age"
                  value={30}
                  onChange={(e) => setAge(parseFloat(e.target.value))}
                  />
                   <label
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
                    htmlFor="30"
                    className="peer-checked/30:bg-green-800 peer-checked/30:text-white h-[56px] flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer" >
                  32 mnd
                  </label>
          </fieldset>
          <fieldset className="flex gap-4 mt-4">
          <legend className="text-gray-500 mb-4">Forleng levetid på telefonene</legend>
                <input
                  className="hidden peer/phoneAgeIncreaseNone"
                  type="radio"
                  id='phoneAgeIncreaseNone'
                  name="phoneAgeIncrease"
                  value={0}
                  onChange={(e) => setExtraAge(parseFloat(e.target.value))} />
                <label
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
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
                  onChange={(e) => setExtraAge(parseFloat(e.target.value))}
                  />
                   <label
                    htmlFor="phoneAgeIncrease6mth"
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
                    className="peer-checked/phoneAgeIncrease6mth:bg-green-800 peer-checked/phoneAgeIncrease6mth:text-white h-[56px] flex w-full items-center justify-center bg-green-100 hover:cursor-pointer " >
                  + 6 mnd
                </label>
                <input
                  className="hidden peer/phoneAgeIncrease12mth"
                  type="radio"
                  id='phoneAgeIncrease12mth'
                  name="phoneAgeIncrease"
                  value={12}
                  onChange={(e) => setExtraAge(parseFloat(e.target.value))}
                  />
                   <label
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
                    htmlFor="phoneAgeIncrease12mth"
                    className="peer-checked/phoneAgeIncrease12mth:bg-green-800 peer-checked/phoneAgeIncrease12mth:text-white h-[56px] flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer" >
                  + 12 mnd
                  </label>
          </fieldset>
          <fieldset className="flex gap-4 mt-4">
          <legend className="text-gray-500 mb-4 ">Øk andel gjenbrukte telefoner</legend>
                <input
                  className="hidden peer/amountPhoneIncreaseNone"
                  type="radio"
                  id='amountPhoneIncreaseNone'
                  name="phoneIncrease"
                  value={0}
                  onChange={(e) => setRefurbishedPhones(parseFloat(e.target.value))} />
                <label
                className="peer-checked/amountPhoneIncreaseNone:bg-green-800 h-[56px] peer-checked/amountPhoneIncreaseNone:text-white flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer"
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
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
                  onChange={(e) => setRefurbishedPhones(parseFloat(e.target.value))}
                  />
                   <label
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
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
                  onChange={(e) => setRefurbishedPhones(parseFloat(e.target.value))}
                  />
                   <label
                  onKeyDown={(e) => e.key === "Enter" ? e.currentTarget.click() : null}
                  tabIndex={0}
                    htmlFor="amountPhoneIncrease25"
                    className="peer-checked/amountPhoneIncrease25:bg-green-800 peer-checked/amountPhoneIncrease25:text-white h-[56px] flex  w-full items-center justify-center bg-green-100 hover:cursor-pointer" >
                  25%
                  </label>
          </fieldset>
          <div  className="flex flex-col mt-4 justify-between items-start border-gray-500 border">
            <div tabIndex={0} onKeyDown={(e) => e.key === "Enter" ? handleAdjClick() : null} onClick={handleAdjClick} className="flex px-6 py-8 active:bg-gray-100 hover:cursor-pointer justify-between items-center w-full ">
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
          <div className="flex flex-col px-8 gap-2 h-full justify-start items-start  mb-8 w-full">
            <p className=" text-gray-500 text-xs">Gjennomsnittlig CO2e avtrykk per refurbished mobiltelefon:</p>
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
<p className="text-gray-500 mt-4">Eksemplene over er basert på gjennomsnittlig pris og utslipp på en Iphone. Refurbished enheter vil variere på utslipp etter hva som gjøres, gjennomsnitt er satt til 20kg CO2e.

Ta kontakt om du ønsker en detaljert oversikt over ditt firmas utslipp og besparelses muligheter, da vi har en avansert kalkulator med oversikt over utslipp og muligheter på alle telefoner.</p>          
        </section>
  <section className=" bg-[#f4f4f4] py-8 px-6 flex flex-col w-[calc(100vw_-_40px)] m-auto max-w-[768px] gap-8">
    <h2 className="text-green-500 text-xl font-semibold">Klar for å spare?</h2>
    <p>Besparelsene oppnås ved hjelp av konkrete tiltak som er <b>enkle</b> å gjennomføre. Ta kontakt så viser vi deg hvordan!</p>
    <a href="tel:22278800" className="flex items-center border py-8 px-6 bg-green-500 text-white gap-4 hover:bg-green-700">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fdfdfd"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg> 
      Ta kontakt nå!</a>
    </section> 
      </main>
      <footer className=" flex flex-col w-[calc(100vw_-_40px)]  py-8 m-auto max-w-[768px] gap-6">
      <p className="text-center text-gray-500">Kilde utslipp standard mobiltelefon er hentet fra <a href="https://framtiden.no" className="underline underline-offset-2" target="_blank">framtiden.no.</a> Alle beløp eks mva.</p>
      <div className="flex items-center justify-center gap-4">
        <span>2025</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-320h160q17 0 28.5-11.5T600-360v-80h-80v40h-80v-160h80v40h80v-80q0-17-11.5-28.5T560-640H400q-17 0-28.5 11.5T360-600v240q0 17 11.5 28.5T400-320Zm80 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        <img src="/mobility_logo_black.svg" alt="logo"/>
      </div>
      </footer  >
    </>
  )
}



export default App
