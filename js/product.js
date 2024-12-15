const data = {
  name: "Tomato",
  avgRating: "3",
  price: 24,
  describtion: "Tomato for your graduation project cause yours is dead",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1200px-Tomato_je.jpg",
};

const ratings = [
  { name: "Hazem", rating: 5, comment: "This tomato is great" },
  { name: "Toxic", rating: 1, comment: "Couldn't rate negative numbers" },
];

function createStars(e, rating) {
  const stars = document.createElement("div");
  stars.className = "stars";

  for (let i = 1; i < 6; i++) {
    const star = document.createElement("i");
    if (i <= rating) {
      star.className = "fa-solid fa-star";
    } else {
      star.className = "fa-regular fa-star";
    }
    stars.appendChild(star);
  }

  e.appendChild(stars);
}

function buildProductInfo(data) {
  const page = document.querySelector(".product_section");

  const product = document.createElement("div");
  product.className = "product";

  const imageHolder = document.createElement("div");
  imageHolder.className = "image_holder";

  const img = document.createElement("img");
  img.setAttribute("src", data["imageUrl"]);
  imageHolder.appendChild(img);

  const productInfo = document.createElement("div");
  productInfo.className = "product_info";

  const name = document.createElement("h2");
  name.className = "name";
  name.innerText = data["name"];

  const price = document.createElement("h2");
  price.className = "price";
  price.innerText = `${data["price"]}$`;

  const describtion = document.createElement("p");
  describtion.className = "describtion";
  describtion.innerText = data["describtion"];

  const quantitySection = document.createElement("div");
  quantitySection.className = "quantity_section";

  const p = document.createElement("p");
  p.innerText = "Quantity: ";

  const input = document.createElement("input");
  input.value = 1;
  input.min = 1;
  input.type = "number";

  const button = document.createElement("button");

  const cart = document.createElement("i");
  cart.className = "fa-solid fa-cart-shopping";

  const buttonP = document.createElement("p");
  buttonP.innerText = "Add To Cart";

  button.appendChild(cart);
  button.appendChild(buttonP);

  quantitySection.appendChild(p);
  quantitySection.appendChild(input);

  productInfo.appendChild(name);
  createStars(productInfo, 4);
  productInfo.appendChild(price);
  productInfo.appendChild(describtion);
  productInfo.appendChild(quantitySection);
  productInfo.appendChild(button);

  product.appendChild(imageHolder);
  product.appendChild(productInfo);

  page.appendChild(product);
}

function buildRatings(data) {
  // <div class="rating_section">
  //       <h2 class="title">Ratings</h2>
  //       <div class="rating">
  //         <div class="user_info">
  //           <div class="stars">
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-regular fa-star"></i>
  //           </div>
  //           <h4 class="name">John doe</h4>
  //         </div>
  //         <div class="comment">
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ex
  //           aut rem nam, nostrum nesciunt corrupti, fuga error possimus sequi
  //           natus sed sapiente alias nobis assumenda. Voluptas beatae officia
  //           tempora.
  //         </div>
  //       </div>
  //       <div class="rating">
  //         <div class="user_info">
  //           <div class="stars">
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-solid fa-star"></i>
  //             <i class="fa-regular fa-star"></i>
  //           </div>
  //           <h4 class="name">John doe</h4>
  //         </div>
  //         <div class="comment">
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ex
  //           aut rem nam, nostrum nesciunt corrupti, fuga error possimus sequi
  //           natus sed sapiente alias nobis assumenda. Voluptas beatae officia
  //           tempora.
  //         </div>
  //       </div>
  //     </div>

  for (let i = 0; i < data.length; i++) {
    const ratingSection = document.getElementsByClassName("rating_section")[0];

    const rating = document.createElement("div");
    rating.className = "rating";

    const userInfo = document.createElement("div");
    userInfo.className = "user_info";

    const name = document.createElement("h4");
    name.className = "name";
    name.innerText = data[i]["name"];

    const comment = document.createElement("div");
    comment.className = "comment";
    comment.innerText = data[i]["comment"];

    createStars(userInfo, data[i]["rating"]);
    userInfo.appendChild(name);

    rating.appendChild(userInfo);
    rating.appendChild(comment);

    ratingSection.appendChild(rating);
  }
}

buildProductInfo(data);
buildRatings(ratings);