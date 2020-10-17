/* Global Variables */
const apiKey = "daf58025f1fc3ecff14e6e1f1aeea51d";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather"

const entryDataDiv = document.getElementById('entryHolder');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');
const input = document.getElementById('zip');
const feelingText = document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// helper functions
const getTemp = async (url='') => {
    const res = await fetch(url);
    try {
      const data = await res.json();
      console.log(data);
      const entryData = {date: newDate, temp: data.main.temp, content: feelingText.value};
      return entryData;
    } catch(err) {
      console.log(err);
    }
}
const setEntryData = async (url='', data = {}) => {
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

    try {
        const data = await response.json();
        console.log(data);
    }catch(error) {
    console.log("error: ", error);
    }
}

const getData = async(url) => {
    const res = await fetch(url);
    try {
      const data = await res.json();
      console.log(data);
      return data;
    } catch(err) {
      console.log(err);
    }
  }
// DOM content update

const updateOnEntry  = async () => {
    try {
        const data = await getData('/getData');
        entryDataDiv.style.display = "none";
        dateElement.innerText = data.date;
        tempElement.innerText = data.temp;
        contentElement.innerText = data.content;
        entryDataDiv.style.display = "block";
    } catch(error) {
        console.log(error);
    }
}

const btn = document.getElementById('generate');
function generateEntry(event)  {
    event.preventDefault();
    
    console.log(input);
    if(input.value != "") {
        console.log(feelingText);
        const fullURL = baseUrl + "?zip=" + input.value + "&apiKey=" + apiKey + "&units=metric";
        // getTemp.then((temp) = > setEntryData())
        getTemp(fullURL).then((entryData) => 
            setEntryData("/saveData", entryData)).then(() => updateOnEntry());
    } else {alert("Please enter a ZipCode!")}
  }
  btn.addEventListener('click', generateEntry);
