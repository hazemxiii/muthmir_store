const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  contactUs(formData);
});
async function contactUs(data) {
  try {
    var response = await fetch("../php/sendContact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    });

    if (!response.ok) {
      throw new Error();
    } else {
      console.log(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}
