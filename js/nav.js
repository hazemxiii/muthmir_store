const navButton = document.getElementsByClassName("toggle_links")[0];

navButton.addEventListener("click", (e) => {
  const links = document.querySelector("nav ul");
  links.classList.toggle("active");
});

const logOutButton = document.getElementById("log_out_btn");
var logButtonFunction = () => {};
if ((getCookie("email") ?? "") == "") {
  logOutButton.innerHTML = "Login";
  logButtonFunction = () => {
    location.href = "../html/auth.html";
  };
} else {
  logOutButton.innerHTML = "Log Out";
  logButtonFunction = logOut;
}
logOutButton.addEventListener("click", logButtonFunction);

const profileButton = document.getElementsByClassName("profile_button")[0];
profileButton.addEventListener("click", () => {
  document.getElementsByClassName("profile_info")[0].classList.toggle("active");
});

const nameP = document.querySelector(".profile p");
nameP.innerHTML = getCookie("name");

if ((getCookie("pfp") ?? "") != "") {
  const pfp = document.querySelector(".profile img");
  pfp.setAttribute("src", getCookie("pfp"));
}
