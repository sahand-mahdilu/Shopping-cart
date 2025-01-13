let productArray = [
  {
    id: 1,
    title: "cx GAME",
    price: 700,
    count: 1,
    image: "../public/images/1.png",
  },
  {
    id: 2,
    title: "ASUS",
    price: 600,
    count: 1,
    image: "../public/images/2.png",
  },
  {
    id: 3,
    title: "DELL",
    price: 500,
    count: 1,
    image: "../public/images/3.png",
  },
  {
    id: 4,
    title: "zx 2000",
    price: 400,
    count: 1,
    image: "../public/images/4.png",
  },
  {
    id: 5,
    title: "INVIDIA",
    price: 1000,
    count: 1,
    image: "../public/images/5.png",
  },
  { id: 6, title: "HP", price: 750, count: 1, image: "../public/images/6.png" },

  {
    id: 7,
    title: "AMD GAME ",
    price: 730,
    count: 1,
    image: "../public/images/7.png",
  },
  {
    id: 8,
    title: "RIZEN",
    price: 800,
    count: 1,
    image: "../public/images/8.png",
  },
  {
    id: 9,
    title: "KX 1200",
    price: 900,
    count: 1,
    image: "../public/images/9.png",
  },
  {
    id: 10,
    title: "LENOVO GAME",
    price: 950,
    count: 1,
    image: "../public/images/10.png",
  },
  {
    id: 11,
    title: "LEGION",
    price: 450,
    count: 1,
    image: "../public/images/11.png",
  },
  {
    id: 12,
    title: "HX 200",
    price: 720,
    count: 1,
    image: "../public/images/12.png",
  },

  {
    id: 13,
    title: "ROG 1700",
    price: 560,
    count: 1,
    image: "../public/images/13.png",
  },
  {
    id: 14,
    title: "GFORCE x90",
    price: 920,
    count: 1,
    image: "../public/images/14.png",
  },
  {
    id: 15,
    title: "GCX 500",
    price: 590,
    count: 1,
    image: "../public/images/15.png",
  },
  {
    id: 16,
    title: "GLADIATOR 10X",
    price: 800,
    count: 1,
    image: "../public/images/16.png",
  },
];

const dataContainerElem = document.getElementById("container");
const paginationBtnsContainer = document.querySelector(".btnsContainer");
const cartContainer = document.querySelector(".userCart_container");
const totalPriceElem = document.querySelector("#totalPrice");
const purchaceBtn = document.querySelector("#purchace");
console.log(totalPriceElem);

let localStaorageDAta = [];

let currentPage = 1;
let dataCount = 6;

function displayData(allData, currentPage, dataCount, dataContainer) {
  dataContainerElem.innerHTML = "";

  let endtIndex = currentPage * dataCount;
  let startIndex = endtIndex - dataCount;

  let pageItems = allData.slice(startIndex, endtIndex);

  pageItems.forEach(function (item) {
    // product div
    let newProduct = document.createElement("div");
    newProduct.setAttribute("class", "cartClass");

    // creating product img
    let newImg = document.createElement("img");
    newImg.setAttribute("src", item.image);
    newImg.setAttribute("alt", "image");

    // creating product title
    let newTitle = document.createElement("h2");
    newTitle.setAttribute("class", "text-white");
    newTitle.innerHTML = item.title;
    //creating price
    let newPrice = document.createElement("h2");
    newPrice.classList = "text-white mt-1";
    newPrice.innerHTML = `${item.price} $`;
    // creating new botton
    let newButton = document.createElement("button");
    newButton.setAttribute("class", "addToCart");
    newButton.innerHTML = "Add to cart";

    newButton.addEventListener("click", function () {
      localStaorageDAta.push(item);
      setLocalStorage(localStaorageDAta);

      generateCArt(localStaorageDAta);

      ///////////////////////////////////////////////////////////
    });

    // appending elements
    newProduct.append(newImg, newTitle, newPrice, newButton);

    dataContainer.append(newProduct);
  });
}

function setupPagination(allData, dataCount, btnContainer, currentPage) {
  let pageCount = Math.ceil(allData.length / dataCount); //num

  for (let i = 1; i < pageCount + 1; i++) {
    createPaginationBtn(i, btnContainer, currentPage);
  }
}

function createPaginationBtn(pageCount, btnContainer, currentPage) {
  let paginationBtn = document.createElement("button");
  paginationBtn.setAttribute("class", "paginateBtns");
  paginationBtn.innerHTML = pageCount;
  btnContainer.append(paginationBtn);

  let btnValue = Number(paginationBtn.innerHTML);

  if (btnValue === currentPage) {
    paginationBtn.classList.add("red");
  }

  paginationBtn.addEventListener("click", function () {
    currentPage = btnValue;
    let prevBtn = document.querySelector(".red");
    prevBtn.classList.remove("red");
    paginationBtn.classList.add("red");

    displayData(productArray, currentPage, dataCount, dataContainerElem);

    console.log(currentPage);
  });
}
// generating cart
function generateCArt(items) {
  cartContainer.innerHTML = "";

  calculateTotal(items);

  items.forEach(function (item) {
    // create new cart div
    let newCart = document.createElement("div");
    newCart.classList = "row";

    // creating title span
    let newTitleSpan = document.createElement("span");
    newTitleSpan.classList = "titlePrice";
    newTitleSpan.innerHTML = item.title;
    // creating price span
    let newPriceSpan = document.createElement("span");
    newPriceSpan.classList = "titlePrice";
    newPriceSpan.innerHTML = `${item.price} $`;

    // creating buttons container div

    let newButtonsContainerDiv = document.createElement("div");
    newButtonsContainerDiv.classList = "counContainer";
    // creating cat input
    let newCartInput = document.createElement("input");
    newCartInput.setAttribute("type", "number");
    newCartInput.setAttribute("min", "1");
    newCartInput.classList = "inputClass";
    newCartInput.value = item.count;
    newCartInput.addEventListener("change", function (e) {
      let value = e.target.value;
      item.count = +value;

      console.log(localStaorageDAta);

      setLocalStorage(localStaorageDAta);

      calculateTotal(items);
    });
    // creating remove button
    let newRemoveBtn = document.createElement("button");
    newRemoveBtn.classList = "removeBtn";
    newRemoveBtn.innerHTML = "Remove";
    newRemoveBtn.addEventListener("click", function () {
      removeSelectedCart(item.id);
    });

    // appending elements

    newButtonsContainerDiv.append(newCartInput, newRemoveBtn);

    newCart.append(newTitleSpan, newPriceSpan, newButtonsContainerDiv);
    cartContainer.append(newCart);
  });
}

// setting localStorage
function setLocalStorage(dataArray) {
  localStorage.setItem("products", JSON.stringify(dataArray));
}

window.addEventListener("load", function () {
  let datas = JSON.parse(localStorage.getItem("products"));

  if (datas) {
    localStaorageDAta = datas;
  } else {
    localStaorageDAta = [];
  }

  generateCArt(localStaorageDAta);
});

function calculateTotal(items) {
  let totalPrice = 0;
  if (items) {
    items.forEach(function (item) {
      totalPrice += item.price * item.count;
    });
  }
  totalPriceElem.innerHTML = `${totalPrice} $`;
}

function removeSelectedCart(id) {
  let dataInlocal = JSON.parse(localStorage.getItem("products")); //array

  let Index = dataInlocal.findIndex(function (item) {
    return item.id === id;
  });

  dataInlocal.splice(Index, 1);
  setLocalStorage(dataInlocal);
  generateCArt(dataInlocal);
}

purchaceBtn.addEventListener("click", clearCart);

function clearCart() {
  localStorage.clear("products");
  localStaorageDAta = [];
  generateCArt(localStaorageDAta);
}

setupPagination(productArray, dataCount, paginationBtnsContainer, currentPage);

displayData(productArray, currentPage, dataCount, dataContainerElem);
