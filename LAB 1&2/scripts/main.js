function refreshCartItems(){
	let keys = Object.keys(localStorage);
	let i = keys.length;
	let counter = 0;
	while(i--){
		if(localStorage.getItem(keys[i]) > 0){
			counter += parseInt(localStorage.getItem(keys[i]));
		}
	}
	document.getElementById('cart-items').textContent = counter;
}

refreshCartItems();