const menuBtn = document.getElementById("menuBtn");
const navList = document.querySelector("nav");


const navClone = navList.cloneNode(true);

const menu = document.createElement("div");
menu.className = "navigationMenu";
menu.append(navClone);
menu.insertAdjacentHTML(
  "beforeend",
  `<button class="closeBtn">
    <span class="material-symbols-outlined">close</span>
  </button>`
);
menu.style.display = "none";

document.body.append(menu);

menuBtn.onclick = () => {
  menu.classList.toggle("activeMenu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
};

const closeBtn = document.querySelector(".closeBtn");

closeBtn.onclick = () => {
  menu.classList.remove("activeMenu");
  menu.style.display = "none";
};

const productsContainer = document.querySelector(".products_cards");
let allProducts = [];

function renderProductCard(product) {
  
  const productCard = document.createElement("div");
  productCard.className = "product_card";
  productCard.dataset.id = product.id;

 
  const productImg = document.createElement("img");
  productImg.src = product.image;
  productImg.alt = product.title;
  productImg.className = "product_img";
  productCard.appendChild(productImg);

  
  const productTitle = document.createElement("h4");
  productTitle.className = "product_title";
  productTitle.textContent = product.title;
  productCard.appendChild(productTitle);

  
  const productCardInfo = document.createElement("div");
  productCardInfo.className = "product_card_info";

  
  const productPrice = document.createElement("span");
  productPrice.className = "price";
  productPrice.textContent = `$${product.price}`;
  productCardInfo.appendChild(productPrice);

  
  const ratings = document.createElement("div");
  ratings.className = "ratings";
  const rating = Math.round(product.rating.rate);
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("img");
    star.src =
      i <= rating ? "./assets/yellowStar.svg" : "./assets/greyStar.svg";
    star.alt = "star";
    ratings.appendChild(star);
  }
  productCardInfo.appendChild(ratings);

  
  const ratesCount = document.createElement("span");
  ratesCount.className = "ratesCount";
  ratesCount.textContent = `(${product.rating.count})`;
  productCardInfo.appendChild(ratesCount);

  
  productCard.appendChild(productCardInfo);

 
  const addToCartBtn = document.createElement("button");
  addToCartBtn.className = "add_to_cart_btn";
  addToCartBtn.textContent = "Add to Cart";
  productCard.appendChild(addToCartBtn);

  
  productsContainer.appendChild(productCard);
}

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    allProducts = await response.json();
    renderProducts(allProducts.slice(0, 8)); 
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = ''; 
  products.forEach((product) => {
    renderProductCard(product);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await getProducts();
  hidePreloader();
});

const productCards = document.querySelector(".products_cards");

productCards.addEventListener("click", (event) => {
  const productCard = event.target.closest(".product_card");
  if (productCard) {
    const id = productCard.dataset.id;
    window.location.href = `/productPage?id=${id}`;
  }
});

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
}

// function redirect() {
//   const hasToken = localStorage.getItem("token");
//   if (!hasToken) {
//     window.location.href = "./pages/login.html";
//   }
// }

// (() => {
//   redirect();
// })();

const showAllBtn = document.getElementById("view_all_products_btn");

showAllBtn.addEventListener("click", () => {
  renderProducts(allProducts); 
  showAllBtn.style.display = "none";
});

function startCountdown(targetDateTime) {
  const timerElement = document.querySelector(".timer");
  const daysElement = timerElement.querySelector(".days");
  const hoursElement = timerElement.querySelector(".hours");
  const minutesElement = timerElement.querySelector(".minutes");
  const secondsElement = timerElement.querySelector(".seconds");

  function updateTimer() {
    const now = new Date();
    const distance = targetDateTime - now;

    if (distance < 0) {
      clearInterval(intervalId);
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
  }

  const intervalId = setInterval(updateTimer, 1000);
  updateTimer(); 
}

function parseDateTime(dateTimeStr) {
  const [datePart, timePart] = dateTimeStr.split("/");
  const [day, month, year] = datePart.split(".");
  const [hours, minutes] = timePart.split(":");

  return new Date(year, month - 1, day, hours, minutes);
}

const targetDateTime = parseDateTime("29.07.2024/19:30");
startCountdown(targetDateTime);
