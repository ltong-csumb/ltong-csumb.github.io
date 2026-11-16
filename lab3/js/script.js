document.querySelector("#passwordAgain").addEventListener("change", checkPassword);

document.querySelector("#password").addEventListener("click", passwordSuggestion);

document.querySelector("#state").addEventListener("change", loadCounties);

document.querySelector("#signupForm").addEventListener("submit", validateForm);

document.querySelector("#username").addEventListener("change", checkUsername);

loadStates();

document.querySelector("#zip").addEventListener("change", displayCity);

async function displayCity() {
  try {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://easyzipcodes.com/api/v1/zip/${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    //the API returns false when the zip code is not found, so we can check for that case before trying to access the city property
    if (data === false) {
      document.querySelector("#city").textContent = "Zip code not found";
      document.querySelector("#latitude").textContent = "";
      document.querySelector("#longitude").textContent = "";
      return;
    }

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.lat;
    document.querySelector("#longitude").textContent = data.lng;

  } catch (error) {
    document.querySelector("#city").textContent = "Unable to retrieve city";
    console.error(error);
  }
}

async function loadStates() {
  let stateMenu = document.querySelector("#state");

  stateMenu.textContent = "";

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  stateMenu.appendChild(defaultOption);

  try {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    for (let item of data) {
      let option = document.createElement("option");
      option.value = item.usps;
      option.textContent = item.state;
      stateMenu.appendChild(option);
    }
  } catch (error) {
    console.error(error);

    stateMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load states";
    stateMenu.appendChild(errorOption);
  }
} 

async function loadCounties() {
  let state = document.querySelector("#state").value;
  let countyMenu = document.querySelector("#county");

  countyMenu.textContent = "";

  if (state === "") {
    return;
  }

  try {
    let url = `https://api.rootfast.org/v1/states/${state}/counties`;
    let response = await fetch(url);
    let data = await response.json();

    for (let item of data.counties) {
      let option = document.createElement("option");
      option.value = item.county_name;
      option.textContent = item.county_name;
      countyMenu.appendChild(option);
    }

  } catch (error) {
    console.error(error);
  }
}

async function checkUsername() {
  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");

  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    return false;
  }

  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();

  if (data.available) {
    usernameError.textContent = "Username available!";
    usernameError.style.color = "green";
    return true;
  } else {
    usernameError.textContent = "Username taken";
    usernameError.style.color = "red";
    return false;
  }
}

async function passwordSuggestion() {
    let url = 'https://csumb.space/api/suggestedPassword.php?length=8';
    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#passwordSuggestion").textContent =
    `Suggested Password: ${data.password}`;
}

function checkPassword() {
  let password = document.querySelector("#password").value;
  let passwordAgain = document.querySelector("#passwordAgain").value;
  let passwordError = document.querySelector("#passwordError");

  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    passwordError.style.color = "red";
    return false;
  } else if (password !== passwordAgain) {
    passwordError.textContent = "Passwords do not match";
    passwordError.style.color = "red";
    return false;
  } else {
    passwordError.textContent = "Passwords match!";
    passwordError.style.color = "green";
    return true;
  }
}

async function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");

  usernameError.textContent = "";

  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    isValid = false;
  } else {
    let usernameAvailable = await checkUsername();

    if (usernameAvailable === false) {
      isValid = false;
    }
  }

  if (checkPassword() === false) {
    isValid = false;
  }

  if (isValid) {
    document.querySelector("#signupForm").submit();
  }
}