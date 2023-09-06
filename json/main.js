var productApi = " http://localhost:3000/products";

fetch(productApi)
  .then((res) => {
    return res.json();
  })
  .then((products) => {
    console.log(products);
  });
