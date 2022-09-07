import { productData } from './product.js';
import { menuData } from './product.js';
import { commentData } from './product.js';
import { chefData } from './product.js';

// display to dom
const sliderCardDom = document.querySelector('.swiper-wrapper');
const regularMenuDom = document.querySelector('.menu__list');
const commentSliderDom = document.querySelector('.comment');
const chefSliderDom = document.querySelector('.chef');
// shopping cart
const cartItem = document.querySelector('.cart-item');
const cartTotalPrice = document.querySelector('.cart-total-price');
const cartContentDom = document.querySelector('.cart-content');
const modalClearBtn = document.querySelector('.clear-cart');

// hamburger menu
const toggler = document.querySelector('.nav__toggler');
const navbar = document.querySelector('.nav');
toggler.addEventListener('click', (e) => {
  navbar.classList.toggle('nav__expanded');
});
// modal
const shoppingBtn = document.querySelector('.shopping-card');
const shoppingLargeBtn = document.querySelector('.shopping-card-large');
const cartModal = document.querySelector('.cart');
const backDrop = document.querySelector('.backdrop');
const closeModal = document.querySelector('.confirm-cart');
//regular menu
const menuItem = document.querySelectorAll('.menu__item');
const menuDropDownBtns = document.querySelectorAll('.select-btn');
const menuBtn = document.querySelectorAll('.menu-btn');

let buttonsDOM = [];
let cart = [];

function showModalFunction() {
  backDrop.style.display = 'block';
  cartModal.style.opacity = '1';
  cartModal.style.top = '20%';
}

function closeModalFunction() {
  backDrop.style.display = 'none';
  cartModal.style.opacity = '0';
  cartModal.style.top = '-100%';
}

shoppingBtn.addEventListener('click', showModalFunction);
shoppingLargeBtn.addEventListener('click', showModalFunction);
closeModal.addEventListener('click', closeModalFunction);
backDrop.addEventListener('click', closeModalFunction);

// get product from api
function getProduct() {
  return productData;
}
function getMenuProduct() {
  return menuData;
}
function chefDataProduct() {
  return chefData;
}
function commentDataProduct() {
  return commentData;
}

// food slider
function displaySliderProduct(products) {
  let result = '';
  products.forEach((product) => {
    result += `  
    <div class="swiper-slide">
    <div class="slider-card">
      <div class="slider-image">
        <img class="img-slide" src=${product.image} alt="#" />
      </div>
      <div class="slide-info">
        <p class="slide-title">${product.name}</p>
        <div class="slide-star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <p class="slide-description">${product.description}</p>
        <div class="slide-card-footer">
          <span class="slide-price">$ ${product.price}</span>
          <button class="btn btn--secondary add-to-cart" data-id=${product.id}>Add To Card</button>
        </div>
      </div>
    </div>
  </div>`;
  });
  sliderCardDom.innerHTML = result;
}
// regular menu
function displayRegularMenu(products) {
  let result = '';
  products.forEach((product) => {
    result += `
    <div class="slider-card ${product.class} " >
    <div class="slider-image">
      <img class="img-slide" src=${product.image} alt="#" />
    </div>
    <div class="slide-info">
      <p class="slide-title">${product.name}</p>
      <div class="slide-star">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <p class="slide-description">${product.description}</p>
      <div class="slide-card-footer">
        <span class="slide-price">$ ${product.price}</span>
        <button class="btn btn--secondary add-to-cart" data-id=${product.id}>Add To Card</button>
      </div>
    </div>
  </div>
`;
  });
  regularMenuDom.innerHTML = result;
}
// customer comment says
function displayCommentSlider(products) {
  let commentResult = '';
  products.forEach((commentProduct) => {
    commentResult += `  
    <div class="swiper-slide">
    <div class="slider-card customer-card">
      <p class="customer__text">
         ${commentProduct.comment}
      </p>
      <div class="customer__avatar">
        <img src=${commentProduct.avatar} alt="can't show" />
      </div>
      <h2>${commentProduct.name}</h2>
    </div>
  </div>
`;
  });
  commentSliderDom.innerHTML = commentResult;
}

// chef slider
function displayChefSlider(products) {
  let chefResult = '';
  products.forEach((chefProduct) => {
    chefResult += `  
    <div class="swiper-slide">
    <div class="slider-card chef-slide">
      <div class="chef__image">
        <img src=${chefProduct.image} alt="can't show" />
      </div>
      <p>${chefProduct.name}</p>
    </div>
  </div>
`;
  });
  chefSliderDom.innerHTML = chefResult;
}
// add to cart
function getAddToCartBtn() {
  // add to cart btns
  const addToCartBtn = [...document.querySelectorAll('.add-to-cart')];
  buttonsDOM = addToCartBtn;
  addToCartBtn.forEach((btn) => {
    const id = btn.dataset.id;
    // in the cart
    const isIncart = cart.find((item) => item.id === parseInt(id));
    if (isIncart) {
      btn.innerText = 'In Cart';
      // btn.disabeld = true;
      btn.style.opacity = '0.5';
    }

    // not in the cart and want add to cart
    btn.addEventListener('click', (event) => {
      event.target.innerText = 'In Cart';
      // event.target.disabeld = true;
      btn.style.opacity = '0.5';
      // get product from products
      const addedProduct = { ...getProductStorage(id), ...getMenuProductStorage(id), quantity: 1 };
      //  add to cart
      cart = [...cart, addedProduct];
      //  save cart to local storage
      saveCart(cart);
      //update cart value
      setCartValue(cart);
      // add to cart item
      addCartItem(addedProduct);
      // get cart from storage
    });
  });
}
// set cart value
function setCartValue(cart) {
  let tempItem = 0;
  const totalPrice = cart.reduce((acc, curr) => {
    tempItem += curr.quantity;
    return curr.quantity * curr.price + acc;
  }, 0);
  cartTotalPrice.innerText = `total price: ${parseFloat(totalPrice).toFixed(2)} $`;
  cartItem.innerText = tempItem;
}
// add cart item func
function addCartItem(cart) {
  const div = document.createElement('div');
  div.classList.add('cart-item');
  div.innerHTML = `
  <img src=${cart.image} alt="" class="cart-item-img" />
     <div class="cart-item-info">
        <h3>${cart.name}</h3>
        <h4>$ ${cart.price} </h4>
      </div>
      <div class="cart-item-conteoller">
        <i class="fa-solid fa-chevron-up" data-id=${cart.id}></i>
         <p>${cart.quantity}</p>
         <i class="fa-solid fa-chevron-down" data-id=${cart.id}></i>
      </div>
      <i class="fa-solid fa-trash-alt" data-id=${cart.id}></i>`;
  cartContentDom.appendChild(div);
}
// set up for save data vto reload
function setUpApp() {
  // get cart from storage
  cart = getCart() || [];
  // add cart item
  cart.forEach((item) => addCartItem(item));
  //  set values : price + item
  setCartValue(cart);
}
// cart logic :modal options
function modalCartLogic() {
  modalClearBtn.addEventListener('click', () => {
    clearCart();
  });
  // cart functionality
  cartContentDom.addEventListener('click', (event) => {
    // remove with trash
    if (event.target.classList.contains('fa-trash-alt')) {
      const remove = event.target;
      const id = remove.dataset.id;
      cartContentDom.removeChild(remove.parentElement);
      // remove item from cart not DOM !
      removeItem(id);
    } else if (event.target.classList.contains('fa-chevron-up')) {
      // increament
      const increament = event.target;
      const id = increament.dataset.id;
      const addedItem = cart.find((c) => c.id == id);
      addedItem.quantity++;
      setCartValue(cart);
      saveCart(cart);
      increament.nextElementSibling.innerText = addedItem.quantity;
    } else if (event.target.classList.contains('fa-chevron-down')) {
      // decreament
      const decreament = event.target;
      const id = decreament.dataset.id;
      const substractedItem = cart.find((c) => c.id == id);
      if (substractedItem.quantity === 1) {
        removeItem(id);
        cartContentDom.removeChild(decreament.parentElement.parentElement);
      }
      substractedItem.quantity--;
      setCartValue(cart);
      saveCart(cart);
      decreament.previousElementSibling.innerText = substractedItem.quantity;
    }
  });
}
// clear cart item
function clearCart() {
  modalClearBtn.addEventListener('click', () => {
    // remove
    cart.forEach((item) => removeItem(item.id));
    // clear btn and remove item
    while (cartContentDom.children.length) {
      cartContentDom.removeChild(cartContentDom.children[0]);
    }
    closeModalFunction();
  });
}

// cart logic : remove part clear price
function removeItem(id) {
  // resuable method for signle remove and clear all
  cart = cart.filter((cartItem) => cartItem.id != id);
  setCartValue(cart);
  saveCart(cart);
  // change btn innerText to add to cart
  const button = getSingleButton(id);
  button.innerText = 'Add To Card';
  button.style.opacity = '1';
}
function getSingleButton(id) {
  // change btn innerText to add to cart
  return buttonsDOM.find((btn) => parseInt(btn.dataset.id) === parseInt(id));
}
// save to storage
function saveToStorage(products, menuProducts, commentDataProducts, chefDatas) {
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('menuProducts', JSON.stringify(menuProducts));
  localStorage.setItem('commentDataProducts', JSON.stringify(commentDataProducts));
  localStorage.setItem('chefDatas', JSON.stringify(chefDatas));
}
// get product from storage
function getProductStorage(id) {
  const _products = JSON.parse(localStorage.getItem('products'));
  return _products.find((p) => p.id === parseInt(id));
}
function getMenuProductStorage(id) {
  const _menu = JSON.parse(localStorage.getItem('menuProducts'));
  return _menu.find((p) => p.id === parseInt(id));
}
// save cart to storage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
// get from cart
function getCart() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}
// addeventlistener to dom show products
document.addEventListener('DOMContentLoaded', () => {
  // set up :get cart and set up app
  setUpApp();
  const products = new getProduct();
  const menuProducts = new getMenuProduct();
  const commentDataProducts = new commentDataProduct();
  const chefDatas = new chefDataProduct();
  displaySliderProduct(products);
  displayRegularMenu(menuProducts);
  displayCommentSlider(commentDataProducts);
  displayChefSlider(chefDatas);
  // save storage
  saveToStorage(products, menuProducts, commentDataProducts, chefDatas);
  getAddToCartBtn();
  modalCartLogic();
  filterBtn();
  // filter
});

// filter product active btn
// filter by btns
function filterBtn() {
  menuBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const productsFilter = [...document.querySelectorAll('.slider-card')];
      const filter = e.target.dataset.filter;

      productsFilter.forEach((product) => {
        if (filter === 'all') {
          product.style.display = 'block';
        } else if (product.classList.contains(filter)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });

  // menu dropdown btn
  menuDropDownBtns.forEach((item) => {
    item.addEventListener('click', (e) => {
      const productsFilter = [...document.querySelectorAll('.slider-card')];
      const filter = e.target.value;
      productsFilter.forEach((product) => {
        if (filter === 'all') {
          product.style.display = 'block';
        } else if (product.classList.contains(filter)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}
//active btn style
function resetActiveBtn() {
  menuBtn.forEach((btn) => {
    btn.classList.remove('active-btn');
  });
}
