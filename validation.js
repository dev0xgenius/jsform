let submitBtn = document.getElementById('submitBtn');
main();

function main() {
  let form = document.getElementById("userInfo");
  let formInputs = form.querySelectorAll('input');

  for (let input of formInputs)
    input.addEventListener('blur', event => {
      try { validateInput(event.target); }
      catch(err) { showError(event.target, err); return }

      clearError(input);
    });
}

function validateInput(input) {
  let inputValue = input.value, match;
  if (inputValue.trim() == false && input.id != 'dateOfBirth') {
    input.value = ""; throw new Error("This field cannot be empty...");
  }

  if (/Name$/.test(input.id)) {
    if (match = /[^a-z\s]/gi.exec(inputValue)){
      throw new Error(`Invalid Char: "${match[0]}"`);
    }
  } else if (/password$/gi.test(input.id)) {
    if (inputValue.length < 8) {
      throw new Error("Must contain atleast 8 characters...");
    } else if (input.id == 'confirmPassword' &&
               inputValue != document.getElementById('password').value) {
      throw new Error("Does not match password...");
    }
  } else if (input.type == 'email') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (match = emailRegex.exec(inputValue)) {
      console.log("This match is somewhat valid.");
    } else {
      throw new Error("Invalid email address...");
    }
  }
}

function showError(input, error) {
  input.className += " error";
  document.querySelector(`label[for=${input.id}]`)
    .className += ' error';
    
    let output = document.getElementById('errorBox');
    output.style.display = 'block';
    output.textContent = error;

    submitBtn.setAttribute("disabled", "disabled");
}

function clearError(input) {
    input.className = '';
    document.querySelector(`label[for='${input.id}']`)
      .className = '';

    let output = document.getElementById('errorBox');
    output.style.display = 'none';
    submitBtn.removeAttribute("disabled");
}