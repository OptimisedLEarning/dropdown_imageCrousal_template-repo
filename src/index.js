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

// Wait for the entire HTML document to be fully loaded before running our script
document.addEventListener("DOMContentLoaded", () => {
  // --- Function to toggle the visibility of a dropdown's content ---
  function toggleDropdown(event) {
    // event.target is the element that was clicked (the button in our case)
    const button = event.target;

    // Find the parent container of the button that has the class 'dropdown-container'
    // .closest() is useful because the click might be on the button itself or an icon inside it.
    const container = button.closest(".dropdown-container");

    // If we found a container (should always be true based on our HTML structure)
    if (container) {
      // Find the element *inside this specific container* that has the class 'dropdown-content'
      const content = container.querySelector(".dropdown-content");

      // If we found the content element
      if (content) {
        // Toggle the 'visible' class on the content element.
        // If it has the class, remove it. If it doesn't have it, add it.
        content.classList.toggle("visible");

        // Optional: Close other open dropdowns when one is opened.
        // This part is more complex but is a common requirement.
        // For this basic assignment, you can skip or comment out this loop initially.
        /*
                document.querySelectorAll('.dropdown-content.visible').forEach(openContent => {
                    // If this open content is NOT the one we just toggled, close it
                    if (openContent !== content) {
                        openContent.classList.remove('visible');
                    }
                });
                */
      }
    }
  }

  // --- Add event listeners to all dropdown buttons ---
  // Find all elements on the page that have the class 'dropdown-button'
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  // Loop through each button we found
  dropdownButtons.forEach((button) => {
    // Add a click event listener to this specific button
    button.addEventListener("click", toggleDropdown);
  });

  // --- Optional: Close dropdowns when clicking outside ---
  // This is good user experience. If you click anywhere on the page,
  // close any open dropdowns, unless the click was inside a dropdown itself.
  document.addEventListener("click", (event) => {
    // Check if the click occurred OUTSIDE of a dropdown container
    const isClickInsideDropdown = event.target.closest(".dropdown-container");

    // If the click was outside a dropdown container
    if (!isClickInsideDropdown) {
      // Find all currently visible dropdown contents
      document
        .querySelectorAll(".dropdown-content.visible")
        .forEach((openContent) => {
          // Remove the 'visible' class to hide them
          openContent.classList.remove("visible");
        });
    }
    // Note: If the click was inside a button, the toggleDropdown function above handles it.
    // If the click was inside the content itself, we let it stay open.
  });

  // --- Example for Hover (If you choose hover instead of click, replace the above click logic) ---
  /*
    document.querySelectorAll('.dropdown-container').forEach(container => {
        const content = container.querySelector('.dropdown-content');
        if (content) {
             // Show on mouse enter the container
            container.addEventListener('mouseenter', () => {
                content.classList.add('visible');
            });
             // Hide on mouse leave the container
            container.addEventListener('mouseleave', () => {
                content.classList.remove('visible');
            });
        }
    });
    */
}); // End of DOMContentLoaded listener

import "./dropdown.js"; // <-- ADD THIS LINE to include your dropdown logic

// ... rest of your existing index.js code ...

// You might remove or keep the example code below, it's not part of the dropdown
function createHeading() {
  const element = document.createElement("h2");
  element.textContent = "JavaScript is bundled!";
  return element;
}
document.body.appendChild(createHeading());
