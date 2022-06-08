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
    const app = document.querySelector("#list");
    const list = document.createElement("li");
    list.classList.add("listOptions")
    list.innerHTML += `
    <div style="display: flex; justify-content: space-between">
      <div class="icon-plus"><i class="fa-solid fa-circle-plus">
       </i>${product.name}
      </div>
      <div class="icon-delete">
      <button onclick="options(event)"><i class="fa-regular fa-pen-to-square"></i></button>     
       
      </div>
      </div>
      <div class="divOptions">
      <button> Supermercado </button>
      <button> Editar </button>
      <button> Eliminar </button>
      
      </div>
      
      `;
      
    app.insertAdjacentElement("beforeend", list);
  });
};

const deleteFavProduct = (event) => {
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
  console.log(event);
}


listMarkets();
