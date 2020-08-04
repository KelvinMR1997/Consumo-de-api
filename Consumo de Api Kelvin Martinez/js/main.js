// Variables globales
let countriesList = document.getElementById("countries");
let countries; //Esto contendrá los datos obtenidos

// Event Listeners
// countriesList.addEventListener("change", function (event) {
// Se hace el console.log para verificar que obtenga el alpha3Code
// console.log(event.target.value);
// Se pasa el alpha3Code obtenido del "Event.target.value" como parametro para la funcion displayCountryInfo
//   displayCountryInfo(event.target.value);
// });

// Event listener con arrow Function
// En este caso el arrow Function simplifica la manera de hacer un event listener
countriesList.addEventListener("change", (event) =>
  displayCountryInfo(event.target.value)
);

// // Otra forma de hacerlo es añadiendo el eventListener con el parametro del evento y segundo parametro la funcion luego se crea la funcion.
// countriesList.addEventListener("change",newCountrySelection);
// function newCountrySelection(event){
//   displayCountryInfo(event.target.value);
// }


// fetch("https://restcountries.eu/rest/v2/all")
// .then(function(res){
//   // console.log(res.json());
//   // console.log(2);
//   return res.json();
// })
// .then(function(data){
//   // console.log(data);
//   // Llamado a la funcion initialize
//   initialize(data);
// })
// .catch(function(err){
//   console.log("Error: " ,err);
// })

// Funcion initialize
// Forma de hacerlo con Arrow Functions
fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => initialize(data))
  .catch((err) => console.log("Error: ", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  //==================== ESTRUCTURA ANTIGUA===============
  //   for(let i=0; i<countries.length; i++){
  //      options += ` <option value="${countries[i].alpha3Code}">${countries[i].name }</option>`
  //     options += ` <option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`
  //   }
  //   document.getElementById("countries").innerHTML= options;
  // }

  countries.forEach(
    (country) =>
      (options += `<option value="${country.alpha3Code}">${country.name}</option>`)
  );

  countriesList.innerHTML = options;
  // Llamado a funcion para mostrar la informacion
  // console.log(countriesList);
  // console.log(countriesList.value);
  // console.log(countriesList.length);
  // console.log(countriesList.selectedIndex);
  // console.log(countriesList[10]);
  // console.log(countriesList[10].value);
  // console.log(countriesList[10].text);

  //Una maricaita ahi para mostrar paises random al recargar 
    countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
    displayCountryInfo(countriesList[countriesList.selectedIndex].value);
    
}

//Creacion de  funcion para mostrar la informacion
function displayCountryInfo(countryByAlpha3Code) {
  // La variable countryData obtiene el pais mediante su alpha3Code ("COL")
  const countryData = countries.find(
    (country) => country.alpha3Code === countryByAlpha3Code
  );
  // Se hace un log de countryData para comprobar que efectivamente trae los datos
  // console.log(countryData);
  // Se obtiene el elemento de id "flag-container" con su etiqueta img y se pone dentro de este el atributo "flag"
  document.querySelector("#flag-container img").src = countryData.flag;
  // alt de la imagen
  document.querySelector(
    "#flag-container img"
  ).alt = `Bandera de ${countryData.name}`;
  // Se obtiene el elemento de id "capital" y se pone dentro de este el atributo "capital"
  document.getElementById("capital").innerHTML = countryData.capital;
  // Se obtiene el elemento de id "dialing-code" y se pone dentro de este el atributo "callingCodes"
  document.getElementById(
    "dialing-code"
  ).innerHTML = `+${countryData.callingCodes[0]}`;
  // Se obtiene el elemento de id "population" y se pone dentro de este el atributo "population"
  document.getElementById(
    "population"
  ).innerHTML = countryData.population.toLocaleString("en-US");
  // Se obtiene el elemento de id "currencies" y se pone dentro de este el atributo "currencies", luego se usa filter del atributo name y un map para recorrerlos
  document.getElementById("currencies").innerHTML = countryData.currencies
    .filter((c) => c.name)
    .map((c) => `${c.name} (${c.code})`)
    .join(", ");
  // Se obtiene el elemento de id "region" y se pone dentro de este el atributo "region"
  document.getElementById("region").innerHTML = countryData.region;
  // Se obtiene el elemento de id "subregion" y se pone dentro de este el atributo "subregion"
  document.getElementById("subregion").innerHTML = countryData.subregion;
}
