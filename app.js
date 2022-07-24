// catching the submit form event

document.querySelector("form").addEventListener("submit", function (e) {
  const userName = document.getElementById("username"), //stores username
    email = document.getElementById("email"), //stores email
    password = document.getElementById("password"), //stores password
    confirmPassword = document.getElementById("password2"); //stores confirmation password
  requiredCheck([userName, email, password, confirmPassword]);
  checkLength(userName, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassword(password, confirmPassword);
  e.preventDefault();
});

// function checks solely for no user input or empty strings
// argument is passed as an array which contains all user input

function requiredCheck(inputArr) {
  inputArr.forEach(function (field) {
    if (field.value.trim() === "") {
      displayError(field, `${capitaliseFirstLetter(field)} is required`);
    }
  });
}

// returns the name of the input field with the first letter capitalized, to be displayed in error message

function capitaliseFirstLetter(field) {
  return field.id.charAt(0).toUpperCase() + field.id.slice(1);
}

// checks the length of the username and the password entered by the user. Any input that is not an empty string is checked
// allowed length for username => minimum - 3, maximum - 15
// allowed length for password => minimum - 6, maximum - 25

function checkLength(input, min, max) {
  if (input.value.length < min && input.value.length != 0) {
    displayError(
      input,
      `${capitaliseFirstLetter(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    displayError(
      input,
      `${capitaliseFirstLetter(input)} cannot be more than ${max} characters`
    );
  } else if (min < input.value.length && input.value.length < max) {
    displaySuccess(input);
  }
}

// displays error message when the user input is invalid

function displayError(field, msg) {
  field.className = "error";
  const inputFields = field.parentElement;
  inputFields.querySelector("small").textContent = msg;
}

// displays success message when the user input is valid

function displaySuccess(input) {
  input.className = "success";
  const inputFields = input.parentElement;
  inputFields.querySelector("small").textContent = "";
}

// confirms whether the two passwords are same or not

function checkPassword(password, confirmPassword) {
  if (
    (password.value.length != 0 || confirmPassword.value.length != 0) &&
    password.value != confirmPassword.value
  ) {
    displayError(confirmPassword, `Passwords do not match`);
  } else if (
    password.value.length != 0 &&
    confirmPassword.value.length != 0 &&
    password.value == confirmPassword.value
  ) {
    displaySuccess(password);
    displaySuccess(confirmPassword);
  }
}

// checks the validity of the email. Uses regular expression

function checkEmail(email) {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.value.match(regEx)) {
    displaySuccess(email);
  } else if (email.value.length != 0) {
    displayError(email, `Email is not valid`);
  }
}
