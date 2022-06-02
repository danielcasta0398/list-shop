//La primera funcion hace funcionar el boton de + para agregar un producto 
//const es una manera distinta de escribir una funcion (similar al function ()) y se llama funcion flecha
const changeState = (event) => {
    //El evento se encarga de capturar el click
    //event.stopPropagation lo que hace es detener el evento del hijo
    //event.stopPropagation
   
    let popUp= document.getElementById('addPopUp');
    //El if es para hacer que el boton de + abra el popUp y el else es para que se cierre
    if(popUp.style.display == ''){
        popUp.style.display= "flex";
        document.getElementById('product').focus()
    }
    else{
        popUp.style.display= "";
    }

    
}
//La segunda funcion hace funcionar el boton de agregar producto dentro del popUp
const addProduct = () => {
    let product = document.getElementById('product').value;
    
    console.log(product);
    changeState();
    document.getElementById('product').value = "";
}

