
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const error =
        document.getElementById("error");

    // Demo login credentials

    const correctUsername = "foodie";
    const correctPassword = "12345";

    if (
        username === correctUsername &&
        password === correctPassword
    ) {
        sessionStorage.setItem("isLoggedIn", "true");

        window.location.href = "index.html";
    }
    else {
        error.textContent =
            "Invalid Username or Password!";
    }

});
