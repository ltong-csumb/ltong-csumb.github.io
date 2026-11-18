document.querySelector("#signupForm").addEventListener("submit", validateForm);

function validateForm(event) {
    event.preventDefault();

    let fName = document.querySelector("#fName").value.trim();
    let lName = document.querySelector("#lName").value.trim();
    let email = document.querySelector("#email").value.trim();
    let formError = document.querySelector("#formError");

    formError.textContent = "";
    formError.style.color = "red";

    if (fName === "") {
        formError.textContent = "First name is required";
    } else if (lName === "") {
        formError.textContent = "Last name is required";
    } else if (!email.includes("@") || !email.includes(".")) {
    formError.textContent = "Please enter a valid email address";
    } else {
        document.querySelector("#signupForm").submit();
    }
}