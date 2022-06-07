//La primera funcion hace funcionar el boton de + para agregar un producto
//const es una manera distinta de escribir una funcion (similar al function ()) y se llama funcion flecha
const changeState = (event) => {
  //El evento se encarga de capturar el click
  //event.stopPropagation lo que hace es detener el evento del hijo
  //event.stopPropagation

  let popUp = document.getElementById("addPopUp");
  //El if es para hacer que el boton de + abra el popUp y el else es para que se cierre
  if (popUp.style.display == "") {
    popUp.style.display = "flex";
   if (document.getElementById("market")!= null) {
   document.getElementById("market").focus();
   }
   else if(document.getElementById("product")!= null){
    document.getElementById("product").focus();
   }
}
  else {
    popUp.style.display = "";
  }
};
//La segunda funcion hace funcionar el boton de agregar producto dentro del popUp

let data = localStorage.getItem("data");

if (!data) {
  const objetcList = {
    products: [],
    nameMarket: [],
  };

  localStorage.setItem("data", JSON.stringify(objetcList));
}

let dataObject = JSON.parse(localStorage.getItem("data"));

const updateData = (product) => {
  dataObject.products.push(product);
  localStorage.setItem("data", JSON.stringify(dataObject));

  data = localStorage.getItem("data");
  dataObject = JSON.parse(data);
};

const listProduct = () => {
  dataObject.products.map((product) => {
    const app = document.querySelector("#list");
    const list = document.createElement("li");
    list.innerHTML += `
    <div style="display: flex; justify-content: space-between">
    <div class="icon-star"><i class="fa-regular fa-star">
     </i>${product}
    </div>
    <div class="icon-delete">
    <button onclick="deleteProduct(event)"><i class="fa-regular fa-trash-can"></i></button>     
     <i id="chevron" class="fa-solid fa-chevron-down" onclick="changeChevron(event)"></i>
    </div>
    </div>
   `;

    app.insertAdjacentElement("beforeend", list);
    
  });
};

const listMarkets = () => {
  dataObject.nameMarket.map((market) => {
    const app = document.querySelector("#list");
    const list = document.createElement("li");
    list.innerHTML += `
    <div class="icon-star"><i class="fa-regular fa-star">
     </i>${market}
    </div>
    <div class="icon-delete">
    <button onclick="deleteMarket(event)"><i class="fa-regular fa-trash-can"></i></button>     
     <i id="chevron" class="fa-solid fa-chevron-down" onclick="changeChevron(event)"></i>
    </div>
    <div class="icon-delete">
    <button onclick="deleteMarket(event)"><i class="fa-regular fa-trash-can"></i></button>     
     <i id="chevron" class="fa-solid fa-chevron-down" onclick="changeChevron(event)"></i>
    </div>
    `
    ;

    app.insertAdjacentElement("beforeend", list);
  });
};

const changeChevron = (event) => {
  let prueba = event.path[0].style.transform;

  if (prueba == "matrix(1, 0, 0, 1, 0, 0)" || prueba == "") {
    event.path[0].style.transform = "matrix(-1, 0, 0, -1, 0, 0)"
    moreInfo(event)
    console.log('hey');
  }
  
  if(prueba == "matrix(-1, 0, 0, -1, 0, 0)"){
    event.path[0].style.transform = "matrix(1, 0, 0, 1, 0, 0)"
    deleteInfo(event)
  }
};

const moreInfo = (event) => {
  let info = event.path[3]
  const div = document.createElement("div");
  div.innerText='Hola'
  console.log(info)
  info.insertAdjacentElement("afterend", div);
   
}

const deleteInfo = (event) =>{
  let info = event.path[4].children;
  console.log(info);
}

const deleteProduct = (event) => {

  let nameProduct = event.path[3].innerText;
  for (let i = 0; i < dataObject.products.length; i++) {
    if (nameProduct.trim() == dataObject.products[i].trim()) {
      dataObject.products.splice(i, 1);
    }
  }

  localStorage.setItem("data", JSON.stringify(dataObject));
  resetProducts();
  listProduct();
};

const deleteMarket = (event) => {
  let nameMarket = event.path[3].innerText;
  for (let i = 0; i < dataObject.nameMarket.length; i++) {
    if (nameMarket.trim() == dataObject.nameMarket[i].trim()) {
      dataObject.nameMarket.splice(i, 1);
    }
  }

  localStorage.setItem("data", JSON.stringify(dataObject));
  resetMarkets();
  listMarkets();
};

const resetProducts = () => {
  const element = document.getElementById("list");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
const resetMarkets = () => {
  const element = document.getElementById("list");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const addProduct = () => {
  let product = document.getElementById("product").value;
  if (product) {
    updateData(product);
    document.getElementById("product").value = "";
    resetProducts();
    changeState();
    listProduct();
  }
};

const addMarket = () => {
  let market = document.getElementById("market").value;
  if (market) {
    updateMarket(market);
    document.getElementById("market").value = "";
    resetMarkets();
    changeState();
    listMarkets();
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

listProduct();
listMarkets();