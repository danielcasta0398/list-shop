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
     if(document.getElementById("product")!= null){
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
    favoriteProducts:[],
  };

  localStorage.setItem("data", JSON.stringify(objetcList));
}

let dataObject = JSON.parse(localStorage.getItem("data"));
console.log(dataObject);

const updateData = (product) => {
  let infoProduct = {
    name: product,
    class: "fa-regular"
  }
  dataObject.products.push(infoProduct);
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
    <div class="icon-star"><i class="fa-star ${product.class}" onclick="favorite(event)">
     </i>${product.name}
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



const favorite = (event) => {
  let element = event.target 
  let contentClass = event.path[0].className
  let nameClass;
  console.log(contentClass);

  data = localStorage.getItem("data");
  dataObject = JSON.parse(data);
   
   console.log(event.path[2].innerText);    
   if (contentClass == 'fa-star fa-regular') {
    element.classList.remove('fa-regular')
    element.classList.add('fa-solid')
    element.classList.add('star')
    nameClass = 'fa-solid star'
   }else{
    element.classList.remove('fa-solid')
    element.classList.add('fa-regular')
    element.classList.remove('star')
    nameClass = 'fa-star fa-regular'
   }

   for (let i = 0; i < dataObject.products.length; i++) {
    if ( dataObject.products[i].name == event.path[2].innerText ) {
      dataObject.products[i].class = nameClass     
    } 
   
   }
  
   let favoriteProduct = {
    name: event.path[2].innerText,
    class: nameClass
  }
  
  dataObject.favoriteProducts.push(favoriteProduct);

  localStorage.setItem("data", JSON.stringify(dataObject));
  
}


const changeChevron = (event) => {
  let prueba = event.path[0].style.transform;

  if (prueba == "matrix(1, 0, 0, 1, 0, 0)" || prueba == "") {
    event.path[0].style.transform = "matrix(-1, 0, 0, -1, 0, 0)"
    moreInfo(event)      
  }
  
  if(prueba == "matrix(-1, 0, 0, -1, 0, 0)"){
    event.path[0].style.transform = "matrix(1, 0, 0, 1, 0, 0)"
    deleteInfo(event)
  }
};

const moreInfo = (event) => {
  let info = event.path[3]
  const div = document.createElement("div");
  div.innerHTML=`<h5>Supermercado: ${dataObject.nameMarket[0]}</h5>`
  console.log(info)
  info.insertAdjacentElement("afterend", div);
   
}

const deleteInfo = (event) =>{
  let info = event.path[3];
  info.nextSibling.remove()
  console.log(info);  
}

const deleteProduct = (event) => {

  let nameProduct = event.path[3].innerText;
  for (let i = 0; i < dataObject.products.length; i++) {
    if (nameProduct.trim() == dataObject.products[i].name.trim()) {
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
