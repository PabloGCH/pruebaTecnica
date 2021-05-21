'use strict'

//NUMBER_OF_TABLE_ROWS debe ser el numero de ciudades
const NUMBER_OF_TABLE_ROWS = 5;
const NUMBER_OF_TABLE_COLUMNS = 6;
const CELL_WIDTH = 180;
const CELL_HEIGHT = 40;
//Contenido primera linea de la tabla, debe coincidir con numero de columnas
var firstTableElements = ["Country","City", "Temperature in C°", "Precipitation in MM", "Pressure in MB", "Wind Speed in K/H"];
//Ciudades de las cuales busca la informacion, debe coincidir con numero de filas
var city = ['La Plata', 'Buenos Aires', 'Ushuaia', 'Cordoba', 'Ezeiza'];




//Agrega a la tabla los elementos de la primera fila
function writeFirstRow(){
  var table = document.getElementById("weatherTable");
  for(var i = 0; i < NUMBER_OF_TABLE_COLUMNS; i++){
    var element = document.createElement("DIV");
    element.className = "table-item tableColor1";
    element.innerText = firstTableElements[i];
    table.appendChild(element);
  }
}

//Fija el tamaño de la tabla
function setTableSize(){
  var rows = NUMBER_OF_TABLE_ROWS + 1;
  var table = document.getElementById("weatherTable");
  table.style.gridTemplateColumns = `repeat(${NUMBER_OF_TABLE_COLUMNS}), 1fr`;
  table.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  var size_width = NUMBER_OF_TABLE_COLUMNS * CELL_WIDTH;
  table.style.width = size_width.toString() + "px";
  var size_height = NUMBER_OF_TABLE_ROWS * CELL_HEIGHT;
  table.style.height = size_height.toString() + "px";
}


//Recibe un array de datos, y escribe una fila de la tabla con ellos
function writeRow(arr, cn){
  var color;
  if(cn == 0){
    color = "tableColor1";
  } else {
    color = "tableColor2";
  }
  console.log("cn es = " + cn.toString());
  var table = document.getElementById("weatherTable");
  console.log(table);
  for(var j = 0; j < NUMBER_OF_TABLE_COLUMNS; j++){
    var element = document.createElement("DIV");
    element.className = "table-item " + color;
    element.innerText = arr[j];
    table.appendChild(element);
  }
}

setTableSize();
writeFirstRow();
//Es necesario usar un ciclo porque debido a que se esta usando
//una licencia gratuita de weatherstack API, no se pueden usar
//multiples parametros en query para que devuelva un array (lo cual seria mas eficiente
//que llamarlo multiples veces)
//IMPORTANTE: La cuenta gratuita solo permite 250 usos, en caso
//de que haya llegado al limite de usos cambiar el access key por uno
//de otra cuenta 
var numColor = 0;
for(var i = 0; i < city.length; i++){
  $.ajax({
    url: 'http://api.weatherstack.com/current',
    data: {
      access_key: '92b2855fd15ff20b2953a83ab4153306',
      query: city[i],
    },
    dataType: 'json',
    success: function(apiResponse) {
      if(numColor == 0){
        numColor = 1;
      } else{
        numColor = 0;
      }
      var weatherData = [];
      weatherData.push(`${apiResponse.location.country}`);
      weatherData.push(`${apiResponse.location.name}`);
      weatherData.push(`${apiResponse.current.temperature}`);
      weatherData.push(`${apiResponse.current.precip}`);
      weatherData.push(`${apiResponse.current.pressure}`);
      weatherData.push(`${apiResponse.current.wind_speed}`);
      console.log(weatherData);
      writeRow(weatherData, numColor);
    }
  });
}
