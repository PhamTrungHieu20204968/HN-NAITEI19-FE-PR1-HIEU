const gridIcon = document.querySelector(".grid-icon");
const listIcon = document.querySelector(".list-icon");
const gridLayout = document.querySelector(".grid-wrapper");
const listLayout = document.querySelector(".list-wrapper");
const filtterItem = document.querySelector(".form-select");

const addToCart = async function (productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let flag = false;
  await axios
    .get("http://localhost:3000/products/" + productId)
    .then((result) => {
      cart = cart.filter((item) => {
        if (item.product.id === productId) {
          flag = true;
          return { num: item.num++, product: result.data };
        }
        return item;
      });
      if (!flag) cart = [...cart, { num: 1, product: result.data }];

      localStorage.setItem("cart", JSON.stringify(cart));
    });
};

filtterItem.addEventListener("change", function (e) {
  getProducts();
});

const renderGrid = function (products) {
  const htmls = products.map((item, index) => {
    return `
    <div class="col-4">
    <div class="card">
      <div class="card-img">
        <img
          src='${item.imgSrc}'
          class="card-img-top"
          alt="spx2-1"
        />
        <div class="card-btns">
          <button
            class="card-btn btn btn-custom mr-4"
            type="button"
            onclick="addToCart(${item.id})"
          >
            MUA NGAY
          </button>
          <button class="card-btn btn btn-light" type="button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-name mb-8">${item.title}</div>
        <div class="card-rate mb-8">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
        </div>
        <div class="card-price">
          ${item.curPrice} <span class="card-supprice">${item.prevPrice}</span>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  gridLayout.firstElementChild.innerHTML = htmls.join("");
};

const renderList = function (products) {
  const htmls = products.map((item, index) => {
    return `
    <div class="col-12">
    <div class="card">
      <div class="row">
        <div class="col-md-4">
          <img
            src='${item.imgSrc}'
            class="img-fluid rounded-start"
            alt="spx2-1"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <div class="card-name">${item.title}</div>
            <div class="card-rate">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <p class="card-description">
            ${item.desc}
            </p>
            <div class="card-price"> ${item.curPrice}</div>

            <div class="list-card-btns">
              <button
                class="card-btn btn btn-custom mr-4"
                type="button"
                onclick="addToCart(${item.id})"
              >
                MUA NGAY
              </button>
              <button
                class="card-btn btn btn-light card-icon"
                type="button"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              <button
                class="card-btn btn btn-light card-icon"
                type="button"
              >
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  listLayout.firstElementChild.innerHTML = htmls.join("");
};

const getProducts = async function () {
  await axios.get("http://localhost:3000/products").then((res) => {
    const filterStr = filtterItem.value;
    let products = res.data;
    if (filterStr !== "Tên sản phẩm") {
      products = products.filter((item) => {
        return item.title === filterStr;
      });
    }

    if (gridIcon.className.includes("active")) {
      renderGrid(products);
    } else renderList(products);
  });
};

gridIcon.addEventListener("click", function () {
  if (!gridIcon.className.includes("active")) {
    gridIcon.classList.add("active");
    listIcon.classList.remove("active");

    gridLayout.style.display = "block";
    listLayout.style.display = "none";
  }
  getProducts();
});

listIcon.addEventListener("click", function () {
  if (!listIcon.className.includes("active")) {
    listIcon.classList.add("active");
    gridIcon.classList.remove("active");

    listLayout.style.display = "block";
    gridLayout.style.display = "none";
  }
  getProducts();
});
getProducts();
