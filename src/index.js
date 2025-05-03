// Import CSS so Webpack includes it in the bundle
import "./styles.css";

// Log to console
console.log("Hello from Webpack!");

// Add something to the page
const heading = document.createElement("h2");
heading.textContent = "Webpack is working!";
document.body.appendChild(heading);
// Add a button to the page
const button = document.createElement("button");
button.textContent = "Click me!";
button.addEventListener("click", () => {
  alert("Button clicked!");
});
document.body.appendChild(button);
// Add a form to the page
const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Type something...";
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
form.appendChild(input);
form.appendChild(submitButton);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  alert(`You typed: ${input.value}`);
});
document.body.appendChild(form);
// Add a nav to the page
const nav = document.createElement("nav");
const navList = document.createElement("ul");
const navItems = ["Home", "About", "Contact"];
navItems.forEach((item) => {
  const navItem = document.createElement("li");
  navItem.textContent = item;
  navList.appendChild(navItem);
});
nav.appendChild(navList);
document.body.appendChild(nav);

// Add a footer to the page
const footer = document.createElement("footer");
footer.textContent = "This is the footer";
document.body.appendChild(footer);

// Add a sidebar to the page
const sidebar = document.createElement("aside");
sidebar.textContent = "This is the sidebar";
document.body.appendChild(sidebar);

// Add a main content area to the page
const main = document.createElement("main");
main.textContent = "This is the main content area";
document.body.appendChild(main);
