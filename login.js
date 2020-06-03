function login() {
  const un = document.getElementById("username").value;
  const pw = document.getElementById("password").value;

  fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: un,
      password: pw,
    }),
  })
    .then((response) => response.status !== 200 && response.text())
    .then((result) => {
      if (result) {
        throw new Error(result);
      }

      location.href = "/loggedin";
    })
    .catch(({ message }) => myFunction(message));
}

function myFunction(message = "There was an error") {
  alert(message);
}
