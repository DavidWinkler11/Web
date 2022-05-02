function addToCart(id) {
	if(localStorage.getItem(id)){
		let count = localStorage.getItem(id);
		localStorage.setItem(id, ++count);
	} else {
		localStorage.setItem(id, 1);
	}
	refreshCartItems();
}

let getData = async function () {
	let response = await fetch("data/lab2.json");
	let data = await response.json();
	addCategories(data);
}

let dataset = async function () {
	let response = await fetch("data/lab2.json");
	let data = await response.json();
	return data;
}

function likeItem(id, event){
	let ide = id + "like";
	if (localStorage.getItem(ide) == "true") {
		localStorage.setItem(ide, false);
		event.target.classList.add('like-btn-enabled');
		event.target.parentElement.style.opacity = 1;

	} else {
		localStorage.setItem(ide, true);
		event.target.classList.remove('like-btn-enabled');
		event.target.parentElement.style.opacity = 0;
	}
	console.log(event.target.parentElement)
	checkLiked();
}

function checkLiked(){
	console.log(dataset);
	console.log(products)
}

function checkLike(id){
	let ide = id + "like";
	let productsTemplate = document.querySelector('#product-template');
	let product = productsTemplate.content.cloneNode(true);
	let el = product.querySelector('.like-btn');
	if (el) {
		console.log(el);
		if (localStorage.getItem(ide) == "false") {
			el.classList.add('like-btn-active');
			console.log("false");
		} else {
			el.classList.remove('like-btn-active');
			console.log("true");
		}
	}
}

let addCategories = async function (data) {
	let categories = data.categories;
	let main = document.querySelector('main');
	let categoryTemplate = document.querySelector('#category-template');

	for (let index = 0; index < categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = categories[index].name;
		
		let products = data.products.filter(p => p.categoryId ==  categories[index].id);
		let productsTemplate = document.querySelector('#product-template');
		for(let i = 0; i < products.length; i++){
			let product = productsTemplate.content.cloneNode(true);
			let productTitleElement = product.querySelector('.photo-box-title');
			productTitleElement.textContent = products[i].name;
			product.querySelector(".photo-box").dataset.id = products[i].id;
			product.querySelector('.photo-box-image').src = products[i].imageUrl;
			let et = product.querySelector('.like-btn');
			if (et) {
				et.onclick = function (event) {
					likeItem(products[i].id, event);
				}
			}
			let el = product.querySelector('.cart-btn');
			if (el) {
				el.onclick = function () {
					addToCart(products[i].id);
				}
			}
			category.querySelector('.gallery').appendChild(product);
			checkLike(products[i].id);
		}
		main.appendChild(category);
	}
};
getData();
checkLiked();