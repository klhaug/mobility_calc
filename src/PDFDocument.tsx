

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
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
export const MyDocument = ({
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
    createNewDate 
    
  }: {
    age: number, 
    extraAge: number, 
    phonePrice: number, 
    costEachYearTotal: string | undefined, 
    costCurrentLifespanUnit: string | undefined, 
    costCurrentLifespanTotal: string | undefined, 
    adjustedCostPerUnit: string | undefined , 
    adjustedCostTotal:string | undefined,
    savingsPerMonthPerUnit:string | undefined, 
    savingsPerMonthTotal:string | undefined, 
    savingsPerYearPerUnit: string | undefined, 
    savingsPerYearTotal: string | undefined, 
    savingsLifeTime:string | undefined, 
    savingsLifeTimeTotal: string | undefined, 
    co2EachYearPerUnit: string | undefined, 
    co2Total:string | undefined, 
    co2CurrentLifespanUnit: string | undefined, 
    co2CurrentLifespanTotal: string | undefined, 
    adjustedEmissionsPerUnit: string | undefined, 
    avgEmissions: number, 
    avgEmissionsRefurbished: number, 
    refurbishedPhones:number, 
    adjustedEmissionsTotal:string | undefined, 
    co2SavingsPerMonthPerUnit: string | undefined, 
    phoneAmount: number,
    co2SavingsPerMonthTotal:string | undefined, 
    co2SavingsPerYearPerUnit: string | undefined, 
    co2SavingsPerYearTotal:string | undefined, 
    co2SavingsLifeTime:string | undefined, 
    phonePriceRefurbished: number,
    co2SavingsLifeTimeTotal:string | undefined, 
    flightComparison: string | undefined, createNewDate: () => string }) => {
 

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