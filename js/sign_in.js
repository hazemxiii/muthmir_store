function switchSignIn() {
  const page = document.getElementsByClassName("auth_page")[0];
  active = page.classList.toggle("active");
  const auth_container = document.getElementsByClassName("auth_container")[0];
  if (active) {
    auth_container.scrollTo(0, 0);
  } else {
    auth_container.scrollTo(999999, 0);
  }
}

const auth_switch = document.getElementsByClassName("switch_container")[0];
auth_switch.addEventListener("click", (e) => {
  switchSignIn();
});
