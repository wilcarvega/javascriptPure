class person{
  constructor(name,age,city){
    this.name = name;
    this.age = age;
    this.city = city;
  }
}

let tiempos;
document.getElementById("nm").focus();
let table = document.querySelector("#tabla");

document.getElementById("btn").addEventListener("click",adicionar);
document.getElementById("mos").addEventListener("click",mostrar);
document.getElementById("canvas").addEventListener("click",preView);
  
document.getElementById("prn").addEventListener("click",impresionPdf);

function actionDefault(){
  alert("No hay nada para imprimir");
}


function adicionar(e) {
  e.preventDefault()
  let personas = new person(document.getElementById("nm").value.toUpperCase(),
    document.getElementById("ag").value,
    document.getElementById("cy").value.toUpperCase()
    )
  if(norepiteObj(personas.name))
  {
    alert("El cliente ya existe por favor digite otro..");
    document.getElementById("nm").value ="";
    document.getElementById("ag").value ="";
    document.getElementById("cy").value ="";
    document.getElementById("contador").innerHTML="Registros Guardados : "+ (localStorage.length -1); 
    document.getElementById("nm").focus();


  }else{

    localStorage.setItem("arreglo"+localStorage.length,JSON.stringify(personas));
    
    document.getElementById("nm").value ="";
    document.getElementById("ag").value ="";
    document.getElementById("cy").value ="";
    document.getElementById("contador").innerHTML="Registros Guardados : "+ (localStorage.length -1); 
    document.getElementById("mos").click();
    document.getElementById("nm").focus();
  }




}

function mostrar(e) {
 e.preventDefault()
 const arrayperson=[]
 recoverPerson(arrayperson);
 iniciarTable();
 arrayperson.forEach((registros,index) =>{  
  table.innerHTML += `<tr>
  <td>${arrayperson[index].name}</td>
  <td>${arrayperson[index].age}</td>
  <td>${arrayperson[index].city}</td>
  </tr>`
})
 document.getElementById("contador").innerHTML="Registros Guardados : "+ (localStorage.length -1);
 $('#tabla tr').on('click', recuperaDatoTabla);

} 

function iniciarTable() {
 const cuerpo =document.getElementsByTagName('tr');

 for(let indice = (cuerpo.length -1);indice < cuerpo.length;indice--){
  if(indice==0){
    break;
  }else{
   cuerpo[indice].remove();
 }
}
}



let semanaday = {
  0:"Domingo",
  1:"Lunes",
  2:"Martes",
  3:"Miercoles",
  4:"Jueves",
  5:"Viernes",
  6:"Sabado"
};

let horas = {
  1:"1",
  2:"2",
  3:"3",
  4:"4",
  5:"5",
  6:"6",
  7:"7",
  8:"8",
  9:"9",
  10:"10",
  11:"11",
  12:"12",
  13:"1",
  14:"2",
  15:"3",
  16:"4",
  17:"5",
  18:"6",
  19:"7",
  20:"8",
  21:"9",
  22:"10",
  23:"11",
  24:"12"
};



function weekdayName()
{

  let dias =semanaday[tiempos.getDay()];

  return dias;
}

function tiempo()
{
  tiempos = new Date();
  let dia =weekdayName();
  let horaLocal = hourDay();
  console.log(horaLocal);
  document.getElementById("fdate").innerHTML="Fecha: "+dia+" "+tiempos.toLocaleDateString();
  document.getElementById("hora").innerHTML= "Tiempo : "+ horaLocal; 

}

function hourDay() {
  let hour = horas[tiempos.getHours()];

  let minsegun = tiempos.toLocaleTimeString().substring(2,);
  let denomina =((tiempos.getHours())<= 12) ? "a.m":"p.m";
  let horascompleta = hour+":" + minsegun +" "+ denomina;
  return horascompleta;
}


function preView(e) {
  e.preventDefault();
  let canvas =document.getElementById("mireport");
  let context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  let x =canvas.width/2;
  let y =canvas.height/2;
  let margensup =canvas.height/30;
  let margeninf =canvas.height-10;
  let margender = canvas.width-10;
  let margenizq = canvas.width/30;
  let texto="REPORTE CLIENTES";
  context.beginPath();
  context.textAlign="center";
  context.fillStyle="black";
  context.font=" bold 15px calibri";
  context.fillText(texto,x,margensup+10);
//LINEA DIVISORIA TITULO Y CABECERA....................
  context.beginPath();
  context.textAlign="left";
  context.lineWidth = 1;
  context.strokeStyle ="#05057F";
  context.moveTo(0,margensup+22);
  context.lineTo(margender,margensup+22);
  context.lineCap = "round";
  context.stroke();
  //...............................................
  //LINEA DIVISORIA TITULO Y CABECERA....................
  context.beginPath();
  context.textAlign="left";
  context.lineWidth = 1;
  context.strokeStyle ="#05057F ";
  context.moveTo(0,margensup+45);
  context.lineTo(margender,margensup+45);
  context.lineCap = "round";
  context.stroke();
  //...............................................
  const cabecera =["NOMBRE","EDAD","CIUDAD"];
  context.font="bold 14px calibri";
  let lienzo = canvas.width;
  let actualx = lienzo-((lienzo*98)/100);
  let proximox;
  context.fillStyle="#05057F";
  context.fillText(cabecera[0],20,60);
  context.fillText(cabecera[1],200,60);
  context.fillText(cabecera[2],300,60);
  
//ciclo que imprime los datos en el lienzo..........
  context.font=" bold 11px calibri";
  context.textAlign = "left";
  context.textBaseline = "bottom"
  let row =80;
  for(i=0;i< localStorage.length;i++)
  {

    let user =JSON.parse(localStorage.getItem("arreglo"+i));
    context.fillText(user.name,20,row);
    context.fillText(user.age,200,row);
    context.fillText(user.city,300,row);

    row +=15;
  }

  document.getElementById("prn").removeEventListener("click",actionDefault);      
 
}

function recoverPerson(arrayperson) {

  for(i=0;i< localStorage.length;i++)
  {
    arrayperson.push(JSON.parse(localStorage.getItem("arreglo"+i)));
  }
  
}

function norepiteObj(objname) {
  let result;
  objname.toUpperCase();
  for(i=0;i< localStorage.length;i++)
  {
    let user =JSON.parse(localStorage.getItem("arreglo"+i));
    if(objname === user.name.trim())
    {
      result =true;
      break;

    }else{
      result = false;

    }
  }

  return result;
  
}

//create pdf  
function createPDF() {  

  let canvas =document.getElementById("pdf"); 
  img = canvas.toDataURL("image/png"),  
  doc = new jsPDF({ unit: 'px',  
    format: 'a4'  
  });  
  doc.addImage(img, 'JPEG', 20, 20);  
  doc.save('*.pdf');  

}  

function recuperaDatoTabla(){
  var dato = $(this).find('td:first').html();
  let sino= confirm("Desea borrar el cliente "+dato+" ?");
  // console.log(sino);
  if(sino==true){
    borraReg(dato);

  }

}

function borraReg(dato){
  const arrayperson2=[];
  const sonido = cargarSonido("piedras.mp3");
  sonido.play();
  // const arrayperson3=[];
  recoverPerson(arrayperson2);
  const arrayperson3 = arrayperson2.filter((valor)=>
    valor.name !== dato
    )
  /*arrayperson2.forEach((registros,index) =>{  

    if(arrayperson2[index].name !=dato){
       arrayperson3.push(arrayperson2[index]);

    }
        
  })*/

  localStorage.clear();
  for(let i=0; i< arrayperson3.length;i++){

    localStorage.setItem("arreglo"+ i,JSON.stringify(arrayperson3[i]));
  }

  let element= document.getElementById("aviso")
  element.innerHTML="Se borro el cliente :  "+dato;
  element.setAttribute("class","aviso");

  setTimeout(quitaAtribute,6000);
  function quitaAtribute(){
    let element2= document.getElementById("aviso")
    sonido.pause();
    element2.innerHTML="";
    element.removeAttribute("class");

  }
  document.getElementById("mos").click();

}



function impresionPdf(e) {
  e.preventDefault();
  let canvas =document.getElementById("pdf");
  let context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  let x =canvas.width/2;
  let y =canvas.height/2;
  let margensup =canvas.height/30;
  let margeninf =canvas.height-10;
  let margender = canvas.width-10;
  let margenizq = canvas.width/30;
  let texto="REPORTE CLIENTES";
  context.beginPath();
  context.textAlign="center";
  context.fillStyle="black";
  context.font=" bold 20px calibri";
  context.fillText(texto,x,margensup+18);
//LINEA DIVISORIA TITULO Y CABECERA....................
  context.beginPath();
  context.textAlign="left";
  context.lineWidth = 1;
  context.strokeStyle ="#05057F";
  context.moveTo(0,margensup+22);
  context.lineTo(canvas.width-10,margensup+22);
  context.lineCap = "round";
  context.stroke();
  //...............................................
  //LINEA DIVISORIA TITULO Y CABECERA....................
  context.beginPath();
  context.textAlign="left";
  context.lineWidth = 1;
  context.strokeStyle ="#05057F ";
  context.moveTo(0,margensup+45);
  context.lineTo(canvas.width-10,margensup+45);
  context.lineCap = "round";
  context.stroke();
  //...............................................
  const cabecera =["NOMBRE","EDAD","CIUDAD"];
  context.font="bold 20px calibri";
  
  context.fillStyle="#05057F";
  context.fillText(cabecera[0],20,68);
  context.fillText(cabecera[1],300,68);
  context.fillText(cabecera[2],500,68);
  
//ciclo que imprime los datos en el lienzo..........
  context.font="14px calibri";
  context.textAlign = "left";
  context.textBaseline = "bottom"
  let row =95;
  for(i=0;i< localStorage.length;i++)
  {

    let user =JSON.parse(localStorage.getItem("arreglo"+i));
    context.fillText(user.name,20,row);
    context.fillText(user.age,306,row);
    context.fillText(user.city,500,row);

    row +=20;
  }


  createPDF();
}

const cargarSonido = function (fuente) {
  const sonido = document.createElement("audio");
  sonido.src = fuente;
  sonido.setAttribute("preload", "auto");
  sonido.setAttribute("controls", "none");
    sonido.style.display = "none"; // <-- oculto
    document.body.appendChild(sonido);
    return sonido;
  };

  // convierte tabla a hoja de calculo excel xlsx
  const $btnExportar = document.querySelector("#btnExportar"),
    $tabla = document.querySelector("#tabla");

$btnExportar.addEventListener("click", function() {
    let tableExport = new TableExport($tabla, {
        exportButtons: false, // No botones
        filename: "Reporte Clientes", //Nombre del archivo de Excel
        sheetname: "Clientes", //Título de la hoja
    });
    let datos2 = tableExport.getExportData();
    let preferenciasDocumento = datos2.tabla.xlsx;
    tableExport.export2file(preferenciasDocumento.data,
    preferenciasDocumento.mimeType,
    preferenciasDocumento.filename,
    preferenciasDocumento.fileExtension,
    preferenciasDocumento.merges,
    preferenciasDocumento.RTL,
    preferenciasDocumento.sheetname);
});

var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}






  




