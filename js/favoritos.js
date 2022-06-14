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
  dataObject.favoriteProducts.map((product) => {   
    
   
    let classCheck;
    //Condional para cambiar el estado del icono cuando esta en la lista de la compra o no 
    if(product.class == "fa-solid fa-circle-check"){
      classCheck = "fa-solid fa-circle-check";
    }
    else{
      classCheck = "fa-solid fa-circle-plus";
    }
    const app = document.querySelector("#list");
    const list = document.createElement("li");
    list.classList.add("listOptions")
    list.innerHTML += `
    <div style="display: flex; justify-content: space-between">
      <div class="icon-plus"><i class="${classCheck}" onclick="addProductList(event)">
       </i>${product.name}
      </div>
      <div class="icon-delete">
      <button onclick="options(event)"><i class="fa-regular fa-pen-to-square"></i></button>     
       
      </div>
      </div>
      <div class="divOptions">
      <button onclick="openPopupMarket()"> Supermercado </button>
      <button onclick="editFavorite(event)"> Editar </button>
      <button onclick="deleteFavorite(event)"> Eliminar </button>
      
      </div>
      
      `;

    app.insertAdjacentElement("beforeend", list);
  });
};

const editFavorite = (event) => //esta función se ejecuta cuando se hace clic en el icono de editar
{
  console.log(event.path[2].children[0].innerText)
  nameFavoriteProduct = event.path[2].children[0].innerText; //se recoge el nombre que está guardado ahora  
  console.log(event.path[3].lastElementChild);
  event.path[2].children[0].innerHTML = `<div><input type=text value='${nameFavoriteProduct}' class='changeMarket'><button id="change" onclick="commitEdit(event, nameFavoriteProduct)">Ok</button></div>
  <div class="icon-delete">

  </div>`; //se sustituye el cuadro de texto con el nombre del supermercado por un input y un botón para poder editarlo
  closeOptions();
  
}

const commitEdit = (event, nameFavoriteProduct) => //esta función se ejecuta cuando se hace clic en Ok
{
  let favoriteProduct = event.path[1].firstChild.value; //en el div el input es el primer hijo y su valor es el nuevo nombre del supermercado
                        //como no hay iconos a la izquierda, el input será el primer hijo del div
  for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
    if (nameFavoriteProduct.trim() == dataObject.favoriteProducts[i].name.trim()) { //se busca el anterior valor del nombre y se quita del array
      console.log('hola entre al if');
      dataObject.favoriteProducts[i].name = favoriteProduct;
    }
  }

  localStorage.setItem("data", JSON.stringify(dataObject)); //se guarda el objeto en el localStorage
  resetMarkets(); //con esta función se borra los elementos listados
  listMarkets(); //se vuelven a imprimir todos los objetos y automáticamente vuelve el nombre a ser texto y no input
}

const addProductList = (event) => {
  let index = getProductIndex(event.path[1].innerText.trim())
  let infoProduct = {
    name: '',
    class: "fa-star fa-solid star "
  }
  let indexObjectProduct;

  for (let i = 0; i < dataObject.products.length; i++) {
    if (dataObject.products[i].name.trim() == dataObject.favoriteProducts[index].name.trim()) {
      console.log('somos iguales');
      indexObjectProduct = i;
    }
    
  }

  if(event.path[0].className == "fa-solid fa-circle-plus"){
 
    dataObject.favoriteProducts[index].class = "fa-solid fa-circle-check"  
    infoProduct.name = dataObject.favoriteProducts[index].name
    dataObject.products.push(infoProduct)
   
   
    //console.log( dataObject.products);
    localStorage.setItem("data", JSON.stringify(dataObject));
  }else{
    dataObject.favoriteProducts[index].class = "fa- solid fa-circle-plus"
    dataObject.products.splice(indexObjectProduct, 1)
    localStorage.setItem("data", JSON.stringify(dataObject));
  }

 

  resetMarkets();
  listMarkets()

}

//Esta funcion es para obtener el indice del producto
const getProductIndex = (name) => {
  for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
    if (name == dataObject.favoriteProducts[i].name){
      return i

    }
  }
}

const deleteFavorite = (event) => {
  if(confirm('¿Deseas eliminar el producto?'))
  {
    let nameFavorite = event.path[2].children[0].innerText;
    let indexObjectProduct;

    for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
      if (dataObject.favoriteProducts[i].name.trim() == nameFavorite.trim()) {
        console.log('somos iguales');
        indexObjectProduct = i;
      }
      
    }
    
    //console.log(event.path[2].innerText);
  for (let i = 0; i < dataObject.favoriteProducts.length; i++) {
      if (nameFavorite.trim() == dataObject.favoriteProducts[i].name.trim()) {
        dataObject.favoriteProducts.splice(i, 1);
        
        dataObject.products[indexObjectProduct].class = 'fa-star fa-regular'
      }
    }
    localStorage.setItem("data", JSON.stringify(dataObject));
    resetMarkets();
    listMarkets();
    let background = document.getElementsByClassName("background-options")[0];
    background.style.display = 'none';
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
    class: "fa-solid fa-circle-plus"
  }
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

  nameProductSelected = event.path[3].innerText
  let divOptions = event.path[4].lastElementChild



  for (let a = 0; a < dataObject.favoriteProducts.length; a++) {

    if (dataObject.favoriteProducts[a].name.trim() == nameProductSelected.trim()) {
      indiceProduct = a
    }
  }


  let background = document.getElementsByClassName("background-options")[0];
  if (divOptions.style.display == "") {
    for (let i = 0; i < event.path[5].children.length; i++) {

      if (event.path[5].children[i].lastElementChild.style.display == 'flex') {
        event.path[5].children[i].lastElementChild.style.display = ""
      }

      console.log(event.path[5].children[i].lastElementChild);
    }
    divOptions.style.display = 'flex'

    background.style.display = 'block';
  } else {
    divOptions.style.display = '';
    background.style.display = 'none';
  }


}

const closeOptions = () => {
  let background = document.getElementsByClassName("background-options")[0];
  background.style.display = 'none';

  let lista = document.getElementsByClassName("listOptions");
  for (let i = 0; i < lista.length; i++) {

    if (lista[i].lastElementChild.style.display == 'flex') {
      lista[i].lastElementChild.style.display = ""
    }

    console.log(lista[i].lastElementChild);
  }
}


const openPopupMarket = (event) => {

  //console.log(dataObject.favoriteProducts[indiceProduct].market[0].price);

  //activar el div de fondo
  let background = document.getElementsByClassName("favoriteMarket")[0];
  background.style.display = "flex";
  //crear el div
  let app = document.getElementsByClassName("favoriteMarket")[0];
  let divMarket = document.createElement("div");
  divMarket.classList.add("marketPopup");
  //crear lista
  let texto =
    `<div id='iconClose' onclick='closeAll()'><i class="fa-solid fa-xmark"></i></div><ul id='favoriteListMarket'>`;
  
  //coger la lista de supermercados
  dataObject.nameMarket.map((market, indice) => {
    texto +=
      `<li><div class='contentCheck'><input id='check${indice}' type='checkbox' value=${market}> <p>${market}</p></div> <div class='price'><input type='number' id='price${indice}' style='width: 70px;'>€</div></li>`
  })
  //crear botones aceptar y cancelar
  if (dataObject.nameMarket.length ==  0) {
    texto += '<div id="alertEmptyMarket"><i class="fa-solid fa-triangle-exclamation"></i><p >No tienes agregado ningun supermercado favorito por favor agrega uno</p></div>'
    texto += "</ul><div id='saveMarketsDiv'><button onclick='redirect()' id='saveMarketsButton'>Agregar Supermercado</button></div>";
      }else{
        texto += "</ul><div id='saveMarketsDiv'><button onclick='saveMarkets(event)' id='saveMarketsButton'>Guardar</button></div>";
      }
 
  divMarket.innerHTML = texto;

  //añadirlo al div
  app.insertAdjacentElement("beforeend", divMarket);
}

const redirect = () => {
  window.location.href="../pages/paginaSupermercado.html"
}

const closeAll = () => {
  let closePopUpMarket = document.getElementsByClassName('favoriteMarket')[0];
  closePopUpMarket.style.display = 'none';
  closePopUpMarket.innerHTML = "";
}

const saveMarkets = (event) => {
  console.log(document.getElementById('favoriteListMarket').children);
  let listMarket = document.getElementById('check0')


  for (let i = 0; i < document.getElementById('favoriteListMarket').children.length; i++) {
    if (document.getElementById(`check${i}`).checked === true) {
      let objectMarket = {
        nameMarket: dataObject.nameMarket[i],
        price: document.getElementById(`price${i}`).value
      }
      dataObject.favoriteProducts[indiceProduct].market.push(objectMarket)

    }
    //console.log(event);
  }

  localStorage.setItem("data", JSON.stringify(dataObject));
  //ver los mercados que están checkeados
  //guardarlos en el objeto
  //si tienen precio guardarlos
  //cerrar el div
  closeAll();
}

listMarkets();
