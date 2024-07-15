let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});
let products = [
  {
    id: 1,
    name: "Pollo con papas",
    image: "1.png",
    price: 2000,
  },
  {
    id: 2,
    name: "Carne con pure",
    image: "2.png",
    price: 2500,
  },
  {
    id: 3,
    name: "Fideos con salsa",
    image: "3.png",
    price: 1500,
  },
  {
    id: 4,
    name: "Pizza",
    image: "4.png",
    price: 2500,
  },
  {
    id: 5,
    name: "Empanadas",
    image: "5.png",
    price: 2000,
  },
  {
    id: 6,
    name: "Milanesa con papas",
    image: "6.png",
    price: 2500,
  },
];

let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
      <div><img src='image/${value.image}'></div>
      <div class='title'>${value.name}</div>
      <div class='price'>$${value.price.toLocaleString()}</div>
      <button onClick='addToCard(${key})'>Add To Cart</button>
    `;
    list.appendChild(newDiv);
  });
}

initApp();

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = products[key];
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity += 1; // Aumentar la cantidad en 1
  }
  // Recalcula el precio total en el carrito
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
        <div><img src='image/${value.image}'></div>
        <div>${value.name}</div>
        <div>$${(value.quantity * value.price).toLocaleString()}</div>
        <div>
        <button onClick='changeQuantity(${key}, ${
        value.quantity - 1
      })'>-</button>
          <div class="count">${value.quantity}</div>
          <button onClick='changeQuantity(${key}, ${
        value.quantity + 1
      })'>+</button>
        </div>
      `;
      listCard.appendChild(newDiv);

      count += value.quantity;
      totalPrice += value.quantity * value.price;
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
}
