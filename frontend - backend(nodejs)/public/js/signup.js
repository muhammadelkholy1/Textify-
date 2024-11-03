const signupBtn = document.getElementById("signup.btn");
signupBtn.addEventListener("click", signup);

async function signup() {
  const email = document.getElementById("signup.email.input").value;
  const password = document.getElementById("signup.password.input").value;
  const name = document.getElementById("signup.name.input").value;

  try {
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
    // console.log(response.status);
    if (!response) {
      console.error("error occured with token");
    }
    console.log(response)
    res = await response.json();
    console.log(res);
    localStorage.setItem("jwtToken", res.accessToken);
    window.location.href = "index.html";
  } catch (e) {
    console.error(e);
  }
}
