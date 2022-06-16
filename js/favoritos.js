let data = localStorage.getItem("data");
let nameProductSelected = "";
let indiceProduct;

if (!data) {
  const objetcList = {
    products: [],
    nameMarket: [],
    favoriteProducts: [],
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
    document.getElementById("favProduct").focus();
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
  dataObject.favoriteProducts.map((product, i) => {
    let classCheck;
    //Condional para cambiar el estado del icono cuando esta en la lista de la compra o no
    if (product.class == "fa-solid fa-circle-check") {
      classCheck = "fa-solid fa-circle-check";
    } else {
      classCheck = "fa-solid fa-circle-plus";
    }
    const app = document.querySelector("#list");
    const list = document.createElement("li");
    list.classList.add("listOptions");
    list.innerHTML += `
    <div style="display: flex; justify-content: space-between">
      <div class="icon-plus" id="favoriteProduct${i}"><i class="${classCheck}" onclick="addProductList(event)">
       </i>${product.name}
      </div>
      <div class="icon-delete">
      <button onclick="options(event)"><i class="fa-regular fa-pen-to-square"></i></button>     
       
      </div>
      </div>
      <div class="divOptions">
      <button onclick="openPopupMarket(${i})"> Supermercado </button>
      <button onclick="editFavorite(event)"> Editar </button>
      <button onclick="deleteFavorite(event)"> Eliminar </button>
      
      </div>
      
      `;

    app.insertAdjacentElement("beforeend", list);
  });
};

const editFavorite = (
  event //esta función se ejecuta cuando se hace clic en el icono de editar
) => {
  console.log(event.path[2].children[0].innerText);
  nameFavoriteProduct = event.path[2].children[0].innerText; //se recoge el nombre que está guardado ahora
  console.log(event.path[3].lastElementChild);
  event.path[2].children[0].innerHTML = `<div><input type=text value='${nameFavoriteProduct}' class='changeMarket'><button id="change" onclick="commitEdit(event, nameFavoriteProduct)">Ok</button></div>
  <div class="icon-delete">

  </div>`; //se sustituye el cuadro de texto con el nombre del supermercado por un input y un botón para poder editarlo
  closeOptions();
};

//esta función se ejecuta cuando se hace clic en Ok

const commitEdit = (event, nameFavoriteProduct) => {
  let favoriteProduct = event.path[1].firstChild.value; //en el div el input es el primer hijo y su valor es el nuevo nombre del supermercado
  //como no hay iconos a la izquierda, el input será el primer hijo del div
  let product;

  for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
    if (
      nameFavoriteProduct.trim() == dataObject.favoriteProducts[i].name.trim()
    ) {
      //se busca el anterior valor del nombre y se quita del array
      product = dataObject.favoriteProducts[i].name;
      dataObject.favoriteProducts[i].name = favoriteProduct;
    }

    for (let a = 0; a < dataObject.products.length; a++) {
      console.log(dataObject.products[a].name);
      if (dataObject.products[a].name.trim() === product) {
        dataObject.products[a].name = favoriteProduct;
      }
    }
  }

  localStorage.setItem("data", JSON.stringify(dataObject)); //se guarda el objeto en el localStorage
  resetMarkets(); //con esta función se borra los elementos listados
  listMarkets(); //se vuelven a imprimir todos los objetos y automáticamente vuelve el nombre a ser texto y no input
};

const addProductList = (event) => {
  let index = getProductIndex(event.path[1].innerText.trim());
  let infoProduct = {
    name: "",
    class: "fa-star fa-solid star ",
  };
  let indexObjectProduct;

  for (let i = 0; i < dataObject.products.length; i++) {
    if (
      dataObject.products[i].name.trim() ==
      dataObject.favoriteProducts[index].name.trim()
    ) {
      console.log("somos iguales");
      indexObjectProduct = i;
    }
  }

  if (event.path[0].className == "fa-solid fa-circle-plus") {
    dataObject.favoriteProducts[index].class = "fa-solid fa-circle-check";
    infoProduct.name = dataObject.favoriteProducts[index].name;
    dataObject.products.push(infoProduct);

    //console.log( dataObject.products);
    localStorage.setItem("data", JSON.stringify(dataObject));
  } else {
    dataObject.favoriteProducts[index].class = "fa- solid fa-circle-plus";
    dataObject.products.splice(indexObjectProduct, 1);
    localStorage.setItem("data", JSON.stringify(dataObject));
  }

  resetMarkets();
  listMarkets();
};

//Esta funcion es para obtener el indice del producto
const getProductIndex = (name) => {
  for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
    if (name == dataObject.favoriteProducts[i].name) {
      return i;
    }
  }
};

const deleteFavorite = (event) => {
  //activar el div de fondo
  /*let background = document.getElementsByClassName("favoriteMarket")[0];
  background.style.display = "flex";*/

  if (confirm("¿Deseas eliminar el producto?")) {
    let nameFavorite = event.path[2].children[0].innerText;
    let indexObjectProduct;

    for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
      if (dataObject.favoriteProducts[i].name.trim() == nameFavorite.trim()) {
        console.log("somos iguales");
        indexObjectProduct = i;
      }
    }

    //console.log(event.path[2].innerText);
    for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
      if (nameFavorite.trim() == dataObject.favoriteProducts[i].name.trim()) {
        dataObject.favoriteProducts.splice(i, 1);

        dataObject.products[indexObjectProduct].class = "fa-star fa-regular";
      }
    }
    localStorage.setItem("data", JSON.stringify(dataObject));
    resetMarkets();
    listMarkets();
    let background = document.getElementsByClassName("background-options")[0];
    background.style.display = "none";
  }
};

const resetMarkets = () => {
  const element = document.getElementById("list");
  console.log(element);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const updateFavProduct = (favProduct) => {
  let productObject = {
    name: favProduct,
    market: [],
    class: "fa-solid fa-circle-plus",
  };
  dataObject.favoriteProducts.push(productObject);
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

const addFavorites = () => {
  let favProduct = document.getElementById("favProduct").value.trim();
  console.log(favProduct);

  if (favProduct) {
    updateFavProduct(favProduct);
    document.getElementById("favProduct").value = "";
    changeStateMarket();
    resetMarkets();
    listMarkets();
  }
};

const options = (event) => {
  nameProductSelected = event.path[3].innerText;
  let divOptions = event.path[4].lastElementChild;

  for (let a = 0; a < dataObject.favoriteProducts.length; a++) {
    if (
      dataObject.favoriteProducts[a].name.trim() == nameProductSelected.trim()
    ) {
      indiceProduct = a;
    }
  }

  let background = document.getElementsByClassName("background-options")[0];
  if (divOptions.style.display == "") {
    for (let i = 0; i < event.path[5].children.length; i++) {
      if (event.path[5].children[i].lastElementChild.style.display == "flex") {
        event.path[5].children[i].lastElementChild.style.display = "";
      }

      console.log(event.path[5].children[i].lastElementChild);
    }
    divOptions.style.display = "flex";

    background.style.display = "block";
  } else {
    divOptions.style.display = "";
    background.style.display = "none";
  }
};

const closeOptions = () => {
  let background = document.getElementsByClassName("background-options")[0];
  background.style.display = "none";

  let lista = document.getElementsByClassName("listOptions");
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].lastElementChild.style.display == "flex") {
      lista[i].lastElementChild.style.display = "";
    }
    
  }
};

const openPopupMarket = (i) => {
  //console.log(dataObject.favoriteProducts[indiceProduct].market[0].price);

  console.log(document.getElementById(`favoriteProduct${i}`).innerText);
  let productFavorite = document.getElementById(
    `favoriteProduct${i}`
  ).innerText;
  //activar el div de fondo
  let background = document.getElementsByClassName("favoriteMarket")[0];
  background.style.display = "flex";
  //crear el div
  let app = document.getElementsByClassName("favoriteMarket")[0];
  let divMarket = document.createElement("div");
  divMarket.classList.add("marketPopup");
  //crear lista
  let texto = `<div id='iconClose' onclick='closeAll()'><i class="fa-solid fa-xmark"></i></div><ul id='favoriteListMarket'>`;

  //coger la lista de supermercados

  //console.log(dataObject.favoriteProducts[i].market);

  /*for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
    if (dataObject.favoriteProducts[i].market.length>0) {
      for (let a = 0; a < dataObject.favoriteProducts[i].market.length; a++) {
          console.log(a);
        
      }
        
    }
  
}*/


  dataObject.nameMarket.map((market, indice) => {
    const existMarkets = existMarket(i, market);
    console.log(existMarkets);

    for (let a = 0; a < dataObject.favoriteProducts[i].market.length; a++) {
      if (productFavorite == dataObject.favoriteProducts[i].name) {
      }
    }

    texto += `
    <li>
        <div class='contentCheck'><input id='check${indice}'
         type='checkbox' value=${market} ${
      existMarkets ? "checked" : ""
    }> <p>${market}</p></div> 
         <div class='price'><input type='number' id='price${indice}' value='${existMarkets}' style='width: 70px;'>€</div>
    </li>`;
  });

  //crear botones aceptar y cancelar
  if (dataObject.nameMarket.length == 0) {
    texto +=
      '<div id="alertEmptyMarket"><i class="fa-solid fa-triangle-exclamation"></i><p >No tienes agregado ningun supermercado favorito por favor agrega uno</p></div>';
    texto +=
      "</ul><div id='saveMarketsDiv'><button onclick='redirect()' id='saveMarketsButton'>Agregar Supermercado</button></div>";
  } else {
    texto += `</ul><div id="saveMarketsDiv"><button onclick="saveMarkets(${i})" id="saveMarketsButton">Guardar</button></div>`;
  }

  divMarket.innerHTML = texto;

  //añadirlo al div
  app.insertAdjacentElement("beforeend", divMarket);
};

const existMarket = (i, market) => {
  //console.log(dataObject.favoriteProducts[i].market[1].nameMarket, market);
  for (let a = 0; a < dataObject.favoriteProducts[i].market.length; a++) {
    if (dataObject.favoriteProducts[i].market[a].nameMarket == market) {
      return dataObject.favoriteProducts[i].market[a].price;
    }
  }
  console.log(dataObject.favoriteProducts[i]);
};

const existMarketUpdate = (i, market) => {
  //console.log(dataObject.favoriteProducts[i].market[1].nameMarket, market);
  for (let a = 0; a < dataObject.favoriteProducts[i].market.length; a++) {
    if (dataObject.favoriteProducts[i].market[a].nameMarket == market) {
      return {
        indice : a,
        name : dataObject.favoriteProducts[i].market[a].nameMarket
      };
    }
  }
  console.log(dataObject.favoriteProducts[i]);
};

const redirect = () => {
  window.location.href = "../pages/paginaSupermercado.html";
};

const closeAll = () => {
  let closePopUpMarket = document.getElementsByClassName("favoriteMarket")[0];
  closePopUpMarket.style.display = "none";
  closePopUpMarket.innerHTML = "";
};

const saveMarkets = (i) => {
  console.log(document.getElementById("favoriteListMarket").children);

  for (
    let a = 0;
    a < document.getElementById("favoriteListMarket").children.length;
    a++
  ) {
    console.log(a);
    console.log(dataObject.favoriteProducts[i].market[0]);
    console.log(existMarkets.name);
    if (document.getElementById(`check${a}`).checked === true) {
      let existMarkets = existMarketUpdate(
        i,
        document.getElementById(`check${a}`).value
      );
        
      
      
     if (existMarkets.name ==  document.getElementById(`check${a}`).value) {

      if (dataObject.favoriteProducts[i].market[existMarkets.indice].price) {        
        dataObject.favoriteProducts[i].market[existMarkets.indice].price = document.getElementById(`price${a}`).value;
      }
        // dataObject.favoriteProducts[i].market[a].price = document.getElementById(`price${a}`).value;       
        
      } else {
        let objectMarket = {
          nameMarket: dataObject.nameMarket[a],
          price: document.getElementById(`price${a}`).value,
        };
        dataObject.favoriteProducts[indiceProduct].market.push(objectMarket);
      }
    } 
        //console.log(event);
  }

  localStorage.setItem("data", JSON.stringify(dataObject));
  //ver los mercados que están checkeados
  //guardarlos en el objeto
  //si tienen precio guardarlos
  //cerrar el div
  closeAll();
  closeOptions();
};

listMarkets();
