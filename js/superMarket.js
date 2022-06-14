let data = localStorage.getItem("data");

if (!data) {
  const objetcList = {
    products: [],
    nameMarket: [],
    favoriteProducts:[],
  }; 

  localStorage.setItem("data", JSON.stringify(objetcList));
}

let dataObject = JSON.parse(localStorage.getItem("data"));
console.log(dataObject);

const changeStateMarket = (event) => {
  //El evento se encarga de capturar el click
  //event.stopPropagation lo que hace es detener el evento del hijo
// console.log(event.ta);       
    let popUp = document.getElementById("addPopUpMarket");  
    
  //El if es para hacer que el boton de + abra el popUp y el else es para que se cierre
if (popUp.style.display == "") {
    popUp.style.display = "flex";
    document.getElementById("market").focus();      
  } else {
    popUp.style.display = "";
  }
 /* if (popUp.style.display == "") {
    popUp.style.display = "flex";   
  } else {
    popUp.style.display = "";
  }*/

  
};

const listMarkets = () => {
  dataObject.nameMarket.map((market, i) => {
    const app = document.querySelector("#list");
    const list = document.createElement("li");
    list.classList.remove()
    list.classList.add('editMarket')
    list.innerHTML += `
    <div style="display: flex; justify-content: space-between" id="${i}">
       <div>${market}</div>
      </div>
      <div class="icon-delete">
      <button onclick="deleteMarket(event)"><i class="fa-regular fa-trash-can"></i></button>     
      <button onclick="editMarket(event)"><i class="fa-regular fa-pen-to-square"></i></button>  
      </div>
      </div>
      
      `;

    app.insertAdjacentElement("beforeend", list);
  });
};

const deleteMarket = (event) => {
  if(confirm('¿Deseas eliminar el supermercado?'))
  {
    let nameMarket = event.path[3].innerText;
    for (let i = 0; i < dataObject.nameMarket.length; i++) {
      if (nameMarket.trim() == dataObject.nameMarket[i].trim()) {
        dataObject.nameMarket.splice(i, 1);
      }
    }

    localStorage.setItem("data", JSON.stringify(dataObject));
    resetMarkets();
    listMarkets();
  }
  
};


const resetMarkets = () => {
    const element = document.getElementById("list");
    console.log(element);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };


const updateMarket = (market) => {
  dataObject.nameMarket.push(market);
  localStorage.setItem("data", JSON.stringify(dataObject));

  data = localStorage.getItem("data");
  dataObject = JSON.parse(data);
};

const viewMenu = () => {
  let menu = document.getElementById("menu");

  if (menu.style.left == "" || menu.style.left == "-100%") {
    menu.style.left = "0";
  } else {
    menu.style.left = "-100%";
  }
};

const addMarket = () => {
  let market = document.getElementById("market").value;
  if (market) {
    updateMarket(market);
    document.getElementById("market").value = "";
    changeStateMarket();
    resetMarkets();  
    listMarkets();
  }
   
  
};

const editMarket = (event) => //esta función se ejecuta cuando se hace clic en el icono de editar
{
  console.log(event)
  nameMarket = event.path[3].innerText; //se recoge el nombre que está guardado ahora
  event.path[3].lastChild.style
  console.log(event.path[3].lastElementChild);
  event.path[3].innerHTML = `<div><input type=text value='${nameMarket}' class='changeMarket'><button id="change" onclick="commitEdit(event)">Ok</button></div>
  <div class="icon-delete">

  </div>`; //se sustituye el cuadro de texto con el nombre del supermercado por un input y un botón para poder editarlo
  
  console.log(nameMarket);
}

const commitEdit = (event) => //esta función se ejecuta cuando se hace clic en Ok
{
  let market = event.path[1].firstChild.value; //en el div el input es el primer hijo y su valor es el nuevo nombre del supermercado
  console.log(market);                        //como no hay iconos a la izquierda, el input será el primer hijo del div
  for (let i = 0; i < dataObject.nameMarket.length; i++) {
    if (nameMarket.trim() == dataObject.nameMarket[i].trim()) { //se busca el anterior valor del nombre y se quita del array
      dataObject.nameMarket[i] = market
    }
  }

  localStorage.setItem("data", JSON.stringify(dataObject)); //se guarda el objeto en el localStorage
  resetMarkets(); //con esta función se borra los elementos listados
  listMarkets(); //se vuelven a imprimir todos los objetos y automáticamente vuelve el nombre a ser texto y no input
}


listMarkets();
