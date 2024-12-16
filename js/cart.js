let listofitems = JSON.parse(localStorage.getItem("user-data"));
document.getElementsByClassName("checkout")[0].addEventListener("click", () => {
  if (
    Number(
      document.getElementsByClassName("total")[0].textContent.substring(14)
    ) != 0
  )
    window.location.href = `checkout.html`;
});
const calc_total = () => {
  const total = document.getElementsByClassName("total")[0];
  let totalN = 0;
  const prices = document.getElementsByClassName("prod-price");
  for (let i = 0; i < prices.length; i++) {
    totalN += Number(prices[i].textContent.substring(1));
  }
  totalN = totalN.toFixed(2);
  total.innerHTML = `Total Price: $${totalN}`;
};
const create_prod = (prod_list, product, keys, i, e) => {
  const product_div = document.createElement("div");
  product_div.classList += "prod";

  const prod_img = document.createElement("div");
  prod_img.classList.add("prod-img");
  prod_img.style.background = `url('/assets/images/${product.id}.png') no-repeat center center`;
  prod_img.style.backgroundSize = "cover";

  const prod_type = document.createElement("span");
  prod_type.classList.add("prod-v-or-s");
  prod_type.textContent = e;

  const prod_title = document.createElement("span");
  prod_title.classList.add("prod-title");
  prod_title.textContent = product.name;

  const prod_price = document.createElement("span");
  prod_price.classList.add("prod-price");
  prod_price.textContent = `$${(
    Number(product.price) * Number(listofitems[keys[i]][e])
  ).toFixed(2)}`;

  const prod_div_rem_quan = document.createElement("div");
  prod_div_rem_quan.classList.add("rem-quan");

  const prod_div_quantity = document.createElement("div");

  const prod_inc = document.createElement("button");
  prod_inc.classList.add("increment");
  prod_inc.textContent = " +1 ";

  const prod_quantity = document.createElement("span");
  prod_quantity.classList.add("prod-quantity");
  prod_quantity.textContent = listofitems[keys[i]][e];

  const prod_dec = document.createElement("button");
  prod_dec.classList.add("decrement");
  prod_dec.textContent = " -1 ";

  const prod_rem = document.createElement("button");
  prod_rem.classList.add("remove");
  prod_rem.textContent = "remove";

  prod_inc.addEventListener("click", () => {
    listofitems[keys[i]][e]++;
    prod_quantity.textContent = listofitems[keys[i]][e];
    prod_price.textContent = `$${(
      Number(product.price) * Number(listofitems[keys[i]][e])
    ).toFixed(2)}`;

    localStorage.setItem("user-data", JSON.stringify(listofitems));
    calc_total();
  });
  prod_dec.addEventListener("click", () => {
    listofitems[keys[i]][e]--;
    prod_quantity.textContent = listofitems[keys[i]][e];
    prod_price.textContent = `$${(
      Number(product.price) * Number(listofitems[keys[i]][e])
    ).toFixed(2)}`;

    if (listofitems[keys[i]][e] < 0) {
      delete listofitems[keys[i]][e];
      if (Object.keys(listofitems[keys[i]]).length == 0)
        delete listofitems[keys[i]];
      prod_list.removeChild(product_div);
    }
    localStorage.setItem("user-data", JSON.stringify(listofitems));
    calc_total();
  });
  prod_rem.addEventListener("click", () => {
    delete listofitems[keys[i]][e];
    if (Object.keys(listofitems[keys[i]]).length == 0)
      delete listofitems[keys[i]];
    prod_list.removeChild(product_div);
    localStorage.setItem("user-data", JSON.stringify(listofitems));
    calc_total();
  });

  prod_div_quantity.appendChild(prod_inc);
  prod_div_quantity.appendChild(prod_quantity);
  prod_div_quantity.appendChild(prod_dec);

  prod_div_rem_quan.appendChild(prod_div_quantity);
  prod_div_rem_quan.appendChild(prod_rem);

  product_div.appendChild(prod_img);
  product_div.appendChild(prod_type);
  product_div.appendChild(prod_title);
  product_div.appendChild(prod_price);
  product_div.appendChild(prod_div_rem_quan);
  return product_div;
};
if (listofitems) {
  fetch("../data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const keys = Object.keys(listofitems);
      const prod_list = document.getElementsByClassName("prod-list")[0];
      for (let i = 0; i < keys.length; i++) {
        const product = data.products.find((product) => product.id == keys[i]);
        const keys2 = Object.keys(listofitems[keys[i]]);
        keys2.forEach((e) => {
          prod_list.appendChild(create_prod(prod_list, product, keys, i, e));
        });
      }
      calc_total();
    });
}
