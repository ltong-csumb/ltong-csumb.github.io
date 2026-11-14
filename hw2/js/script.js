// Event Listener
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global Variables
let score = 0;

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}

// Display Randomized Choices
displayQ4Choices();
displayQ5Choices();
displayQ7Choices();
displayQ9Choices();

// Form Validation
function isFormValid() {
  let isValid = true;
  let validationFdbk = document.querySelector("#validationFdbk");
  validationFdbk.textContent = "";

  // Question 1
  if (document.querySelector("#q1").value.trim() === "") {
    isValid = false;
    validationFdbk.textContent += "Question 1 was not answered. ";
  }

  // Question 2
  if (document.querySelector("#q2").value === "") {
    isValid = false;
    validationFdbk.textContent += "Question 2 was not answered. ";
  }

  // Question 3
  if (!document.querySelector("#Jackson").checked &&
      !document.querySelector("#Franklin").checked &&
      !document.querySelector("#Jefferson").checked &&
      !document.querySelector("#Roosevelt").checked) {
    isValid = false;
    validationFdbk.textContent += "Question 3 was not answered. ";
  }

  // Question 4
  if (document.querySelector("input[name=q4]:checked") === null) {
    isValid = false;
    validationFdbk.textContent += "Question 4 was not answered. ";
  }

  // Question 5
  if (document.querySelector("input[name=q5]:checked") === null) {
    isValid = false;
    validationFdbk.textContent += "Question 5 was not answered. ";
  }

  // Question 6
  if (document.querySelector("#q6").value === "") {
    isValid = false;
    validationFdbk.textContent += "Question 6 was not answered. ";
  }

  // Question 7
  if (document.querySelector("input[name=q7]:checked") === null) {
    isValid = false;
    validationFdbk.textContent += "Question 7 was not answered. ";
  }

  // Question 8
  if (document.querySelector("#q8").value.trim() === "") {
    isValid = false;
    validationFdbk.textContent += "Question 8 was not answered. ";
  }

  // Question 9
  if (document.querySelector("input[name=q9]:checked") === null) {
    isValid = false;
    validationFdbk.textContent += "Question 9 was not answered. ";
  }

  // Question 10
  if (document.querySelector("#q10").value === "") {
    isValid = false;
    validationFdbk.textContent += "Question 10 was not answered. ";
  }

  return isValid;
}

// Grade Quiz
function gradeQuiz() {
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

  score = 0;

  // Question 1
  let q1Response = document.querySelector("#q1").value.trim().toLowerCase();

  if (q1Response === "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  // Question 2
  let q2Response = document.querySelector("#q2").value;

  if (q2Response === "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  // Question 3
  if (document.querySelector("#Jefferson").checked &&
      document.querySelector("#Roosevelt").checked &&
      !document.querySelector("#Jackson").checked &&
      !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  // Question 4
  let selectedQ4 = document.querySelector("input[name=q4]:checked");

  if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }

  // Question 5
  let selectedQ5 = document.querySelector("input[name=q5]:checked");

  if (selectedQ5 !== null && selectedQ5.value === "Alaska") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  // Question 6
  let q6Response = document.querySelector("#q6").value;

  if (q6Response === "T") {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  // Question 7
  let selectedQ7 = document.querySelectorAll("input[name=q7]:checked");
  let q7Answers = [];

  for (let answer of selectedQ7) {
    q7Answers.push(answer.value);
  }

  if (q7Answers.length === 3 &&
      q7Answers.includes("Pennsylvania") &&
      q7Answers.includes("New Jersey") &&
      q7Answers.includes("Vermont")) {
    rightAnswer(7);
  } else {
    wrongAnswer(7);
  }

  // Question 8
  let q8Response = document.querySelector("#q8").value.trim().toLowerCase();

  if (q8Response === "austin") {
    rightAnswer(8);
  } else {
    wrongAnswer(8);
  }

  // Question 9
  let selectedQ9 = document.querySelector("input[name=q9]:checked");

  if (selectedQ9 !== null && selectedQ9.value === "Atlantic Ocean") {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  // Question 10
  let q10Response = document.querySelector("#q10").value;

  if (q10Response === "5") {
    rightAnswer(10);
  } else {
    wrongAnswer(10);
  }

  // Display Total Score
  let totalScore = document.querySelector("#totalScore");
  totalScore.textContent = `Total Score: ${score}`;

  if (score < 80) {
    totalScore.className = "text-danger";
  } else {
    totalScore.className = "text-success";
  }

  // Congratulatory Message
  if (score > 80) {
    totalScore.textContent += " Congratulations! Great job!";
  }

  // Track Total Attempts
  attempts++;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);
}

// Display Correct or Incorrect Image
function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  markContainer.appendChild(img);
}

// Correct Answer
function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white";
  setMarkImage(index, "Checkmark.png", "Checkmark");
  score += 10;
}

// Incorrect Answer
function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-white";
  setMarkImage(index, "xmark.png", "X mark");
}

// Shuffle Answer Choices
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Display Question 4 Choices
function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

// Display Question 5 Choices
function displayQ5Choices() {
  let q5ChoicesArray = ["Texas", "California", "Alaska", "Montana"];
  shuffleArray(q5ChoicesArray);

  let choicesContainer = document.querySelector("#q5Choices");
  choicesContainer.textContent = "";

  for (let choice of q5ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q5";
    input.id = "q5" + choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

// Display Question 7 Choices
function displayQ7Choices() {
  let q7ChoicesArray = ["Pennsylvania", "New Jersey", "Vermont", "Ohio"];
  shuffleArray(q7ChoicesArray);

  let choicesContainer = document.querySelector("#q7Choices");
  choicesContainer.textContent = "";

  for (let i = 0; i < q7ChoicesArray.length; i++) {
    let choice = q7ChoicesArray[i];

    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "q7";
    input.id = "q7Choice" + i;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

// Display Question 9 Choices
function displayQ9Choices() {
  let q9ChoicesArray = [
    "Pacific Ocean",
    "Atlantic Ocean",
    "Indian Ocean",
    "Arctic Ocean"
  ];
  shuffleArray(q9ChoicesArray);

  let choicesContainer = document.querySelector("#q9Choices");
  choicesContainer.textContent = "";

  for (let i = 0; i < q9ChoicesArray.length; i++) {
    let choice = q9ChoicesArray[i];

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q9";
    input.id = "q9Choice" + i;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}
