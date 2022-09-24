import data from "./data.js";
// This imports the information from data.js. That file constains an array of objects that are the items for sale in the shop.
// All of these items will be displayed in div#items. We can get this element using its id name. In order to do this, we can use the document.querySelector() function by passing the id of the element.

const itemsContainer = document.querySelector("#items");

// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
  // Here we are looping through each object and for each of them, we create a div element:
  //   This will create an HTML div element. Just as if you had written this but you in this case you did it with code!
  const newDiv = document.createElement("div");
  // assigns a class name to div we created
  newDiv.className = "item";
  // create an image element
  //This creats an <img> tag/element. We'll store it in a variable so we can use it.
  const img = document.createElement("img");
  // this will change each time we go through the loop. Can you explain why?
  img.src = data[i].image;
  img.width = 300;
  img.height = 300;
  // Add the image to the div
  newDiv.appendChild(img);
  console.log(img); // Check the console!
  itemsContainer.appendChild(newDiv);
  // create a paragraph element for a description
  // After you create the element, use element.InnerText to add the text description and price.
  const desc = document.createElement("P");
  // give the paragraph text from the data
  desc.innerText = data[i].desc;
  // append the paragraph to the div
  newDiv.appendChild(desc);
  // do the same thing for price
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

// Adding to the shopping cart
//array is defined with square brackets
const cart = []
//object defined with curly brackets

// Whenever you add item to cart, you call add item function
//assuming the quantity you add to card is one
function addItem(name, price) {
  //created an object called item, value on left is always key
  //quantity will default to starting at 1
  const item = {name: name, price: price, qty: 1}
  // push is a method of array, it adds an item to the end of array
  cart.push(item)
}

function showItems() {
  //string literal using back ticks
  console.log(`You have ${cart.length} items in your cart.`)
}
//calling functions
addItem('Apple', 0.99)
addItem('Orange', 1.29)

showItems()