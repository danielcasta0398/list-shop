let stateChevron = false;

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
    document.getElementById("product").focus();
  } else {
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
    <div class="icon-star"><i class="fa-regular fa-star">
     </i>${product}
    </div>
    <div class="icon-delete">
    <button onclick="deleteProduct(event)"><i class="fa-regular fa-trash-can"></i></button>     
     <i id="chevron" class="fa-solid fa-chevron-down" onclick="changeChevron()"></i>
    </div>`;

    app.insertAdjacentElement("beforeend", list);
  });
};

const changeChevron = () => {
  stateChevron
    ? (chevron.style.transform = "matrix(1, 0, 0, 1, 0, 0)")
    : (chevron.style.transform = "matrix(-1, 0, 0, -1, 0, 0)");
  stateChevron = !stateChevron;
};

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

const resetProducts = () => {
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

const viewMenu = () => {
  let menu = document.getElementById("menu");

  if (menu.style.left == "" || menu.style.left == "-100%") {
    menu.style.left = "0";
  } else {
    menu.style.left = "-100%";
  }
};

listProduct();
