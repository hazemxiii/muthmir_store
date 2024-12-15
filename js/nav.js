const navButton = document.getElementsByClassName("toggle_links")[0];

navButton.addEventListener("click", (e) => {
  const links = document.querySelector("nav ul");
  links.classList.toggle("active");
});
