async function postUser() {
  let un = document.getElementById("username").value;
  let pw = document.getElementById("password").value;
  let email = document.getElementById("email").value;
  let st = document.getElementById("state").value;
  let ct = document.getElementById("city").value;

  const response = await fetch(
    `http://localhost:3000/register?username=${un}&email=${email}&password=${pw}&state=${st}&city=${ct}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log(await response.json());
}

// function open_win() {
//   window.open("/login.html");
// }

document.getElementById("btn").addEventListener("click", myFunction);
function myFunction() {
  alert("You have registered succesfully!");
  location.href = "/login";
}
