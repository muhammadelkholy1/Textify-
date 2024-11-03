const loginBtn = document.getElementById("login.btn");
loginBtn.addEventListener("click", login);

async function login() {
  const email = document.getElementById("login.email.input").value;
  const password = document.getElementById("login.password.input").value;

  try {
    const response = await fetch("http://localhost:3000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email,
        password: password,
      },
    });
    console.log(response.status);
    if (!response) {
      console.error("error occured with token");
      return;
    }
    res = response.json();
    localStorage.setItem("jwtToken", res.token);
    console.log(localStorage.getItem("jwtToken"));

    window.location.href = "index.html";
  } catch (e) {
    console.error(e);
  }
}
