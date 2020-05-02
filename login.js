function login() {
  const un = document.getElementById("username").value;
  const pw = document.getElementById("password").value;

  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: un,
      password: pw,
    }),
  }).catch(() => console.log(3));
  console.log(2);
}
function myFunction(message = "There was an error") {
  alert(message);
}
