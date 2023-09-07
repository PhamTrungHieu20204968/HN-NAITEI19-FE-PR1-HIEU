const confirmBtn = document.querySelector(".confirm-btn");
const confirmForm = document.querySelector(".confirm-form");
const priceInfo = document.querySelector(".price-info");
const cartTable = document.querySelector(".cart-table");
const priceTable = document.querySelector(".price-table");
const submitButton = document.querySelector(".submit");
const nextButton = document.querySelector(".next");

let products = JSON.parse(localStorage.getItem("cart"));
let sumPrice = 0;

const deleteCart = function () {
  localStorage.removeItem("cart");
  products = [];
};

const saveData = async function (userId) {
  await axios
    .post("http://localhost:3000/carts", {
      userId,
      price: sumPrice,
    })
    .then((res) => {
      products.forEach((product) => {
        axios.post("http://localhost:3000/orders", {
          cartId: res.data.id,
          userId,
          productId: product.product.id,
          number: product.num,
          price: product.num * product.product.curPrice,
        });
      });
    })
    .then(() => {
      deleteCart();
    });
};

const checkUser = async function () {
  const account = document.querySelector(".user-account");
  const password = document.querySelector(".user-password");
  let flag = false;

  await axios.get("http://localhost:3000/users").then((result) => {
    result.data.forEach((item) => {
      if (item.account === account.value && item.password === password.value) {
        flag = true;
        alert("Thanh toán thành công");
        saveData(item.id);
      }
    });

    if (!flag) {
      alert("Vui lòng kiểm tra lại thông tin");
    }
  });
};

const renderCartTable = function () {
  const htmls = products.map((item, index) => {
    sumPrice += item.product.curPrice * item.num;
    return `
    <tr>
    <td>
      <img
        class="table-img"
        src='${item.product.imgSrc}'
        alt="spx2-1"
      />
    </td>
    <td class="table-text--primary">${item.product.title}</td>
    <td>${item.product.curPrice}</td>
    <td><span class="table-quality">${item.num}</span></td>
    <td>${item.product.curPrice * item.num}</td>
    <td><i class="fa-regular fa-trash-can"></i></td>
  </tr>
        `;
  });
  cartTable.lastElementChild.innerHTML = htmls.join("");
};

const renderPriceTable = function () {
  const htmls = `
            <thead>
            <tr>
            <th class="sum-table-row table-text--primary" scope="col">
                Tổng tiền ( chưa thuế )
            </th>
            <th
                class="sum-table-row sum-table-price table-text--primary"
                scope="col"
            >
            ${sumPrice}
            </th>
            </tr>
        </thead>

        <thead>
            <tr>
            <th class="sum-table-row table-text--primary" scope="col">
                Thuế (vat 10%)
            </th>
            <th
                class="sum-table-row sum-table-price table-text--primary"
                scope="col"
            >
            ${sumPrice * 0.1}
            </th>
            </tr>
        </thead>

        <thead class="table-light">
            <tr>
            <th class="sum-table-row" scope="col">
                Tổng phải thanh toán
            </th>
            <th class="sum-table-row sum-table-price" scope="col">
            ${sumPrice - sumPrice * 0.1}
            </th>
            </tr>
        </thead>
    `;
  priceTable.innerHTML = htmls;
};

confirmBtn.addEventListener("click", function () {
  confirmForm.style.display = "block";
  window.scrollTo(0, 1500);
});

nextButton.addEventListener("click", function () {
  if (products) {
    priceInfo.style.display = "block";
    window.scrollTo(0, 850);
  }
});

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  checkUser();
});

renderCartTable();
renderPriceTable();
