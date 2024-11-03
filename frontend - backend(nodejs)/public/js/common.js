const token = localStorage.getItem("jwtToken");

if (token) {
  const registertray = document.getElementById("register.tray");
  registertray.remove();
} else {
  const logoutbtn = document.getElementById("logout");
  logoutbtn.remove();
}

function logout() {
  localStorage.removeItem("jwtToken");
  window.location.reload();
}
const logoutbtn = document.getElementById("logoutbtn");
logoutbtn.addEventListener("click", logout);
