window.addEventListener("load", () => {
  getContent();
});

window.onscroll = () => {
  myFunction();
};

let page = 1;

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
  if (currentScroll + 100 >= maxScroll) {
    console.log("FIM");
    // document.getElementById("cards").innerHTML += loaderHTML;
    setTimeout(() => {
      getContent();
    }, 1000);
  }
};

let scrollHeight2 = 2225;
let scrollTop2 = 1305;

const loaderHTML = `<strong id="loader" class="text my-10">carregando mais...</strong>`;

const cardHTML = (element) => {
  return `<section class="shaddow card-container">
    <div class="card-wrapper">
      <div class="gradient image" src=${element.imagePath} alt="img"></div>
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
  const cards = document.getElementById("cards");
  const loaderID = document.getElementById("loader");

  if (page > 6) return;
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
