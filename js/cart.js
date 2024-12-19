async function getProductInfod(id) {
  try {
    var response = await fetch("../php/getProductInfo.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ id: +id }),
    });

    if (!response.ok) {
      throw new Error("Failed");
    }
    var data = await response.json();

    return data;
  } catch (error) {
    alert(error);
  }
}

let listofitems = JSON.parse(localStorage.getItem("cart"));
document.getElementsByClassName("checkout")[0].addEventListener("click", () => {
  if (
    Number(
      document.getElementsByClassName("total")[0].textContent.substring(14)
    ) != 0
  )
    window.location.href = `checkout.html`;
});
const calc_total = () => {
  console.log("total");
  const total = document.getElementsByClassName("total")[0];
  let totalN = 0;
  const prices = document.getElementsByClassName("prod-price");
  for (let i = 0; i < prices.length; i++) {
    console.log(prices[i].textContent);
    totalN += Number(prices[i].textContent.substring(1));
  }
  totalN = totalN.toFixed(2);
  total.innerHTML = `Total Price: $${totalN}`;
  console.log("done");
};
const create_prod = (prod_list, product, i) => {
  const product_div = document.createElement("div");
  product_div.classList += "prod";

  const prod_img = document.createElement("div");
  prod_img.classList.add("prod-img");
  prod_img.style.background = `url('${product["imageUrl"]}') no-repeat center center`;
  prod_img.style.backgroundSize = "cover";

  const prod_title = document.createElement("span");
  prod_title.classList.add("prod-title");
  prod_title.textContent = product["name"];

  const prod_price = document.createElement("span");
  prod_price.classList.add("prod-price");
  prod_price.textContent = `$${(
    Number(product["price"]) * Number(listofitems[i])
  ).toFixed(2)}`;

  const prod_div_rem_quan = document.createElement("div");
  prod_div_rem_quan.classList.add("rem-quan");

  const prod_div_quantity = document.createElement("div");

  const prod_inc = document.createElement("button");
  prod_inc.classList.add("increment");
  prod_inc.textContent = " +1 ";

  const prod_quantity = document.createElement("span");
  prod_quantity.classList.add("prod-quantity");
  prod_quantity.textContent = listofitems[i];

  const prod_dec = document.createElement("button");
  prod_dec.classList.add("decrement");
  prod_dec.textContent = " -1 ";

  const prod_rem = document.createElement("button");
  prod_rem.classList.add("remove");
  prod_rem.textContent = "remove";

  prod_inc.addEventListener("click", () => {
    listofitems[i]++;
    prod_quantity.textContent = listofitems[i];
    prod_price.textContent = `$${(
      Number(product["price"]) * Number(listofitems[i])
    ).toFixed(2)}`;

    localStorage.setItem("cart", JSON.stringify(listofitems));
    calc_total();
  });
  prod_dec.addEventListener("click", () => {
    listofitems[i]--;
    prod_quantity.textContent = listofitems[i];
    prod_price.textContent = `$${(
      Number(product["price"]) * Number(listofitems[i])
    ).toFixed(2)}`;

    if (listofitems[i] < 0) {
      delete listofitems[i];
      if (Object.keys(listofitems[i]).length == 0) delete listofitems[i];
      prod_list.removeChild(product_div);
    }
    localStorage.setItem("cart", JSON.stringify(listofitems));
    calc_total();
  });
  prod_rem.addEventListener("click", () => {
    delete listofitems[i];

    prod_list.removeChild(product_div);
    localStorage.setItem("cart", JSON.stringify(listofitems));
    calc_total();
  });

  prod_div_quantity.appendChild(prod_inc);
  prod_div_quantity.appendChild(prod_quantity);
  prod_div_quantity.appendChild(prod_dec);

  prod_div_rem_quan.appendChild(prod_div_quantity);
  prod_div_rem_quan.appendChild(prod_rem);

  product_div.appendChild(prod_img);
  product_div.appendChild(prod_title);
  product_div.appendChild(prod_price);
  product_div.appendChild(prod_div_rem_quan);
  return product_div;
};

function create() {
  const keys = Object.keys(listofitems);
  const prod_list = document.getElementsByClassName("prod-list")[0];

  keys.forEach(async (key) => {
    const product = await getProductInfod(key);
    prod_list.appendChild(create_prod(prod_list, product, key));
    calc_total();
  });
}

create();
