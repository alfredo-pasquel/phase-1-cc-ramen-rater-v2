// index.js

// Global variables

const ramenName = document.querySelector(".name");
const ramenRestaurant = document.querySelector(".restaurant");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const imageDetail = document.querySelector(".detail-image");

// Random Ramen when page loads

fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then(data => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomRamen = data[randomIndex];
  imageDetail.src = randomRamen.image;
  ramenName.textContent = randomRamen.name;
  ramenRestaurant.textContent = randomRamen.restaurant;
  ramenRating.textContent = randomRamen.rating;
  ramenComment.textContent = randomRamen.comment;
})
.catch(error => console.error(error));

// handleClick Function

const handleClick = () => {
  const ramenMenu = document.querySelector("#ramen-menu");
  
  ramenMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
      const id = event.target.id;
      fetch(`http://localhost:3000/ramens/${id}`)
        .then(response => response.json())
        .then(selectedRamen => {

          imageDetail.src = selectedRamen.image;
          ramenName.textContent = selectedRamen.name;
          ramenRestaurant.textContent = selectedRamen.restaurant;
          ramenRating.textContent = selectedRamen.rating;
          ramenComment.textContent = selectedRamen.comment;
        })
        .catch(error => console.error("Error fetching ramen details:", error));
    }
  });
};

// addSubmitListener Function

const addSubmitListener = () => {
  document.querySelector("#new-ramen").addEventListener("submit", event => {
    event.preventDefault();

    const name = event.target.name.value;
    const restaurant = event.target.restaurant.value;
    const image = event.target.image.value;
    const rating = event.target.rating.value;
    const comment = event.target["new-comment"].value;

    const newRamen = {
      name,
      restaurant,
      image,
      rating,
      comment,
    };

    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newRamen)
    })
      .then(response => response.json())
      .then(data => {

        appendRamenToMenu(data);

        event.target.reset();
      })
      .catch(error => console.error("Error adding new ramen:", error));
  });
};

const appendRamenToMenu = (ramen) => {
  const menu = document.querySelector("#ramen-menu");
  const newImg = document.createElement("img");
  newImg.src = ramen.image;
  newImg.id = ramen.id;
  menu.append(newImg);
};

// displayRamens Function

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => data.forEach(ramen => {
      appendRamenToMenu(ramen);
    }))
    .catch(error => console.error("Error fetching ramen data:", error));
};

// Calls main functions on page load

const main = () => {
    document.addEventListener("DOMContentLoaded", () => {
      displayRamens();
      addSubmitListener();
      handleClick();
    });
  };

main();

// Export functions for testing

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
