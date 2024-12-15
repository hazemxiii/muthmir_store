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

function setCookie(name, value) {
  const now = new Date();
  now.setTime(now.getTime() + 60 * 60 * 1000); // Expiry time in ms
  document.cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null; // If not found
}

const auth_switch = document.getElementsByClassName("switch_container")[0];
auth_switch.addEventListener("click", (e) => {
  switchSignIn();
});

const signInForm = document.getElementsByClassName("sign_in_form")[0];
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email_sign_in").value;

  const formData = new FormData(signInForm);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/signIn.php", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      if (!xhr.responseText.includes("fail")) {
        setCookie("token", xhr.responseText);
        setCookie("email", email);
      }
    } else {
      alert("Failed To Make Request");
    }
  };

  xhr.send(formData);
});

const signUpForm = document.getElementsByClassName("sign_up_form")[0];
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name_input").value;
  const email = document.getElementById("email_sign_up").value;
  const pass = document.getElementById("password_sign_up").value;

  if (!validateEmail(email)) {
    alert("Invalid Email");
    return;
  }

  if (!validatePassword(pass)) {
    alert(
      "Password must be 6 chars or longer and contains at least an uppercase, a lowercase and a number"
    );
    return;
  }

  if (name.length < "3") {
    alert("Name Must contain at least 3 chars");
    return;
  }

  const formData = new FormData(signUpForm);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/signUp.php", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      alert(xhr.response == "" ? "Success" : xhr.response);
    } else {
      alert("Failed To Make Request");
    }
  };

  xhr.send(formData);
});

function validatePassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return re.test(password);
}

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
}
