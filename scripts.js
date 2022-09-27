import data from "./data.js";
// This imports the information from data.js
//data.js constains an array of objects that are the items for sale in the shop.
// All of these items will be displayed in div#items.
//use the document.querySelector() function by passing the id of the element.

const itemsContainer = document.querySelector("#items");
const itemList = document.getElementById("item-list");
const cartQty = document.getElementById("cart-qty");
const cartTotal = document.getElementById("cart-total");

// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
  // Here we are looping through each object and for each of them, we create a div element:
  //   This will create an HTML div element
  const newDiv = document.createElement("div");
  // assigns a class name to div we created
  newDiv.className = "item";
  // create an image element
  //This creats an <img> tag/element. store it in a variable so we can use it.
  const img = document.createElement("img");
  // this will change each time we go through the loop
  img.src = data[i].image;
  img.width = 300;
  img.height = 300;
  // Add the image to the div
  newDiv.appendChild(img);
  console.log(img);
  itemsContainer.appendChild(newDiv);
  // create a paragraph element for a description
  // After creating the element, use element.InnerText to add the text description and price.
  const desc = document.createElement("P");
  // give the paragraph text from the data
  desc.innerText = data[i].desc;
  // append the paragraph to the div
  newDiv.appendChild(desc);
  // same thing for price
  const price = document.createElement("P");
  price.innerText = data[i].price;
  newDiv.appendChild(price);
  // Make a button
  const button = document.createElement("button");
  //add an id name to button
  button.id = data[i].name;
  // creates a custom attribute called data-price. That will hold price for each element in the button
  button.dataset.price = data[i].price;
  button.innerHTML = "Add to Cart";
  newDiv.appendChild(button);
}

//Created an empty array to hold cart items
const cart = [];

//Handle change events on update input
itemList.onchange = function (e) {
  if (e.target && e.target.classList.contains("update")) {
    const name = e.target.dataset.name;
    //parseInt takes in a string and makes it a number
    const qty = parseInt(e.target.value);
    updateCart(name, qty);
  }
};

//Handle clicks on list
//event handler, so it takes an events object (e)
itemList.onclick = function (e) {
  //&& means both have to be true
  //e is event object for event that just occured, target is what triggered, class list checks to see if the class has 'remove'
  if (e.target && e.target.classList.contains("remove")) {
    const name = e.target.dataset.name; // data-name that we added to the button
    removeItem(name);
  } else if (e.target && e.target.classList.contains("add-one")) {
    const name = e.target.dataset.name;
    addItem(name);
  } else if (e.target && e.target.classList.contains("remove-one")) {
    const name = e.target.dataset.name;
    //remove only one item
    removeItem(name, 1);
  }
};

// Add item to cart
function addItem(name, price) {
  for (let i = 0; i < cart.length; i += 1) {
    //checking to see if an added item is already in cart to increase the qty
    if (cart[i].name === name) {
      cart[i].qty += 1;
      //now we need to stop here so it won't push the item
      //return stops the function from running
      showItems();
      return;
    }
  }
  //created an object called item
  //quantity will default to starting at 1
  const item = { name, price, qty: 1 };
  // push is a method of array, it adds an item to the end of array
  cart.push(item);
}

//show items
function showItems() {
  //calling the getQty function to return the total qty
  const qty = getQty();
  cartQty.innerHTML = `You have ${qty} items in your cart.`;

  let itemStr = "";
  for (let i = 0; i < cart.length; i += 1) {
    //cart[i] will show us whichever item we are currently at in the loop
    const { name, price, qty } = cart[i];
    let priceRounded = (qty * price).toFixed(2);
    itemStr += `<li>${name} 
    $${price} x ${qty} 
    = ${priceRounded}
    <button class="remove" data-name="${name}">Remove</button>
    <button class="add-one" data-name="${name}"> + </button>
    <button class="remove-one" data-name="${name}"> - </button>
    <input class="update" type="number" data-name="${name}" value="${qty}">
    </li>`;
    //custom attribute is made by starting with data
  }
  itemList.innerHTML = itemStr;

  const total = getTotal();
  cartTotal.innerHTML = `Total in cart: $${total}`;
}

//get quantity
function getQty() {
  //this will get the total number of all items in the cart
  let qty = 0;
  for (let i = 0; i < cart.length; i += 1) {
    qty += cart[i].qty;
  }
  return qty;
}

//get total
function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty;
  }
  return total.toFixed(2);
  //.toFixed() will round a number off to however many decimal places you define
}

//remove item - identify by name and remove
function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i += 1) {
    //this reduces quantity by one if there are multiple items in cart
    if (cart[i].name === name) {
      if (qty > 0) {
        cart[i].qty -= 1;
      }
      //this allows us to remove the item if there was only one in the cart
      if (cart[i].qty < 1 || qty === 0) {
        cart.splice(i, 1);
      }
      showItems();
      return;
    }
  }
}

//update cart
function updateCart(name, qty) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      if (qty < 1) {
        removeItem(name);
      }
      cart[i].qty = qty;
      showItems();
      return;
    }
  }
}

//call functions
getTotal();
getQty();
addItem();
showItems();
removeItem();
showItems();

//This function gives you all the elements in the document that matches the query.
//Modify the variable all_items_button using Array.from to convert the node lists into an array
const all_items_button = Array.from(document.querySelectorAll("button"));

all_items_button.forEach((elt) =>
  elt.addEventListener("click", () => {
    addItem(elt.getAttribute("id"), elt.getAttribute("data-price"));
    showItems();
  })
);
