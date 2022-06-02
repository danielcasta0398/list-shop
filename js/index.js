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

const objetcList = {
  products: ["Agua", "Leche"],
  nameMarket: "Mercadona",
};

const listProsuct = () => {
  objetcList.products.map((e) => {
    const app = document.querySelector("#list");
    const list = document.createElement("li");
    list.innerHTML = `<div class="icon-star"><i class="fa-regular fa-star"></i>${e}</div>
    <div class="icon-delete"><i class="fa-regular fa-trash-can"></i><i class="fa-solid fa-chevron-down"></i></div>`;

    app.insertAdjacentElement("beforeend", list);
  });
};

const deleteProducts = () => {
  const element = document.getElementById("list");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const addProduct = () => {
  const app = document.querySelector("#list");
  let product = document.getElementById("product").value;
  objetcList.products.push(product);
  changeState();
  document.getElementById("product").value = "";
  deleteProducts()
  listProsuct()
};

listProsuct();
