
import './App.css'

//Määritellään funktionaalinen komponentti Viesti
//Tekstin sisältö määritellään App.jsx tiedostossa <Viesti teksti= "Viesti.jsx-> app komponentista terve!" /> 
//Eli tämä tieto tulee propsina App.jsx tiedostosta tänne. Täällä se käsitellään ja renderöidään.
//Propsit ovat tapa siirtää tietoa komponentilta toiselle React-sovelluksessa.
//Ne ovat komponentin ulkopuolelta tulevaa dataa, joka voi olla esimerkiksi tekstiä, funktioita,
//ViewBagia taas käytetään tiedon välittämiseen controllerista view-komponentille ASP.NET MVC:ssä.
//Se on dynaaminen, eli voit luoda ViewBagiin uusia kenttiä lennossa, 
//mutta tiedot välittyvät vain yhden requestin ajan.
//numeroita tai objekteja, kuten tässä esimerkissä, jossa tälle Viesti komponentille välitetään teksti:
//Viesti.jsx-> app komponentista terve! ,joka tulee siis App.jsx tiedostosta.
const Viesti = ({teksti, teksti2}) => {

    // Palautetaan JSX,
    return (
        <>
            <h3>{teksti}</h3>
            <h4>{teksti2}</h4>
            
        </>

    )
}
// Exportataan Viesti-komponentti, jotta sitä voidaan käyttää muualla sovelluksessa
export default Viesti 