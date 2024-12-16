function getSignedInUser() {
  const email = getCookie("email");
  const token = getCookie("token");

  if ((email ?? "") == "" || (token ?? "") == "") {
    return null;
  } else {
    return { email: email, token: token };
  }
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

function setCookie(name, value) {
  const now = new Date();
  now.setTime(now.getTime() + 60 * 60 * 1000); // Expiry time in ms
  document.cookie = `${name}=${value}; expires=${now.toUTCString()}; path=/`;
}

async function getUserData(userData) {
  try {
    var response = await fetch("../php/getUserData.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(userData), // Send data in URL-encoded format
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    var data = await response.json();

    setCookie("name", data["name"]);
    setCookie("pfp", data["profile_picture"] ?? "");
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function LoadUserData() {
  const user = getSignedInUser();
  if (user != null) {
    var data = await getUserData(user);
    return data;
  }
  return null;
}

function logOut() {
  setCookie("token", "");
  setCookie("email", "");
  setCookie("name", "");
  setCookie("pfp", "");
  location.reload();
}
