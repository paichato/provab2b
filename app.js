let page = 1;
var scrolling = false;

window.addEventListener("load", () => {
  getContent();
});

document.addEventListener(
  "scroll",
  () => {
    scrolling = true;
    setInterval(() => {
      if (scrolling) {
        scrolling = false;
        myFunction();
        // place the scroll handling logic here
      }
    }, 2000);
    // myFunction();
  },
  { passive: true }
);

// window.scroll = () => {
//   scrolling = true;
// };

const myFunction = () => {
  //   console.log("SCROLL HEIGHT:", document.documentElement.scrollTop);

  var maxScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  var currentScroll = document.documentElement.scrollTop;
  console.log(
    "MAX SCROLL:",
    document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  );
  console.log("CURRENT SCROLL:", document.documentElement.scrollTop);
  //   if (
  //     document.documentElement.scrollHeight * 0.58 <
  //     document.documentElement.scrollTop
  //   ) {
  if (currentScroll >= maxScroll) {
    console.log("FIM");

    setTimeout(() => {
      getContent();
    }, 1500);
  }
};

let scrollHeight2 = 2225;
let scrollTop2 = 1305;

var loaderHTML = `<strong id="loader" class="text my-10">carregando mais...</strong>`;
var emptyHTML = `<strong id="loader" class="text my-10">sem mais itens por carregar</strong>`;

const cardHTML = (element) => {
  return `<section class="shaddow card-container">
    <div class="card-wrapper">
      <img class="gradient image" src=${element.imagePath} alt="tech image"></img>
      <div class="card-inner-right">
        <h3 class="text">${element.name}</h3>
        <span class="text"
          ><strong class="title">Nota média:</strong>${element.average_note}</span
        >
        <span class="text">${element.rating} de 5 com base em ${element.reviews_counter} avaliações</span>
      </div>
    </div>
    <div class="card-footer">
      <button class="orange-button">Solicitar contacto</button>
    </div>
    </section>`;
};

const getContent = async () => {
  console.log("FIRE");
  const cards = document.getElementById("cards");
  //   const loaderID = document.getElementById("loader");
  const loaderID = document.getElementById("loader");

  if (page > 6) {
    if (!loaderID) document.getElementById("footer").innerHTML += emptyHTML;
    return;
  }
  if (loaderID) {
    loaderID.remove();
  } else {
    document.getElementById("footer").innerHTML += loaderHTML;
  }
  page += 1;
  fetch(`https://portal.hml.b2bstack.com.br/api/v1/products?page=${page}`)
    .then((response) => {
      if (loaderID) loaderID.innerHTML = "";
      response.json().then((responseJSON) => {
        console.log("RESPONSE:", responseJSON);
        responseJSON.forEach((element) => {
          cards.innerHTML += cardHTML(element);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const toggleMenu = () => {
  const menuID = document.getElementById("horizontal-menu");
  if (menuID.className.includes("hidden")) {
    menuID.className = "";
  } else {
    menuID.className = "hidden";
  }
};
