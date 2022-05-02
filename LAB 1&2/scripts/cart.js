function getCart() {
    //INSERT CODE HERE - Zadatak
    var cartdict = {};
    for (var i = 0; i < localStorage.length; i++) {
        cartdict[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
    }
    return cartdict;
   //END INSERT CODE - Zadatak
}

let refreshCart = async function () {
    let cart = getCart();
    if(cart){
        let ids = Object.keys(cart);
        if(ids.length < 1) return;
        let container = document.querySelector('.cart');
        container.innerHTML = "";

        let cartHeaderTemplate = document.querySelector('#cart-template-header');
        let cartHeader = cartHeaderTemplate.content.cloneNode(true);
        container.appendChild(cartHeader);
        
        //INSERT CODE HERE - Zadatak
        let response = await fetch("data/lab2.json");
        //END INSERT CODE - Zadatak
        
        let data = await response.json();
        let cartItemTemplate = document.querySelector('#cart-template-item');
        for(const id of ids){
            let product = data.products.find(p => p.id == id);
            console.log(product);
            
            let cartItem = cartItemTemplate.content.cloneNode(true);
            
            cartItem.querySelector(".cart-item").dataset.id = id;
            cartItem.querySelector(".cart-item-price").textContent = product.price + " kn";
            let title = cartItem.querySelector('.cart-item-title');
            title.textContent = product.name;
            let quantity = cartItem.querySelector('.cart-item-quantity');
            quantity.value = cart[id];

            container.appendChild(cartItem);
        }
    }
}

refreshCart();
