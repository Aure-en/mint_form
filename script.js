/*Functions*/

  //Tooltip
let tooltip;

function displayTooltip(event) {

    //Create the tooltip
  tooltip = document.createElement("div");
  tooltip.innerHTML = event.target.dataset.tooltip;
  tooltip.classList.add("tooltip");

    //Place the tooltip on the right
  document.body.append(tooltip);
  let coords = event.target.getBoundingClientRect();
  tooltip.style.left = coords.right + 10 + 'px';
  tooltip.style.top = coords.top + 'px';
}

function hideTooltip(event) {
  if (!tooltip) return;
  tooltip.remove();
  tooltip = null;
}

  //Form Validation

    //Form style


function defaultStyle(event) {
  event.target.style.border="";
  event.target.style.backgroundImage="";
}

function carefulStyle(element) {
  element.style.backgroundImage = "url('assets/careful.png')";
  element.style.border = "";
}

function invalidStyle(element) {
  element.style.backgroundImage = "url('assets/invalid.png')";
  element.style.border = "1px solid var(--invalid-color)";
}

    //Mail
function checkMail(event) {
  if (!event.target.value.includes("@")) return false;
  return true;
}

function validateMail(event) {

  if (!checkMail(event) && event.target.value != "") {
    invalidStyle(event.target);
    document.querySelector(".form__mail_details").innerHTML = "Please enter a valid email address.";
  }

  else {
    defaultStyle(event);
    document.querySelector(".form__mail_details").innerHTML = "";
  }
}


    //Phone

let phoneNumber;

function keepNumbers(event) {
  event.target.value = event.target.value.replace(/\D/g, "");
}

function formatPhone(event) {
  event.target.value = event.target.value.replace(/^1/, '1 ')
    .replace(/^(1 )?(\d{3})/, '$1($2) ')
    .replace(/^(1 )?(\(\d{3}\) )(\d{3})/, '$1$2$3-');
}

function checkPhone(event) {
  if (!/^1 ?\d{3} \d{3}-\d{4}/.test(event.target.value)) return false;
  return true;
}

function validatePhone(event) {

  phoneMessage.style.fontStyle = "none";
  phoneMessage.style.fontSize = "12px";

  if (event.target.value == "") {
    phoneMessage.innerHTML = "We strongly recommend adding a phone number. This will help verify your account and keep it safe.";
    phoneMessage.style.color = "var(--careful-color)";
    document.querySelector(".form__phone_verify").classList.add("hidden");
    carefulStyle(event.target);

  } else if (!checkPhone(event)) {
    phoneMessage.innerHTML = "Please enter a valid phone number including area code.";
    phoneMessage.style.color = "var(--invalid-color)";
    invalidStyle(event.target);
  }
}

function displayVerify() {
  document.querySelector(".form__phone_verify").classList.remove("hidden");
}

    //Password

function displayChecks() {
  passwordMessage.classList.remove("hidden");
}

function checkLength(str) {
  if (str.length > 8) return true;
  return false;
}

function checkCase(str) {
  if (/[a-z]/.test(str) && /[A-Z]/.test(str)) return true;
  return false;
}

function checkNumber(str) {
  if (/\d/.test(str)) return true;
  return false;
}

function checkSymbol(str) {
  if (/[^\w\s]/.test(str)) return true;
  return false;
}

function checkPassword(str) {
  if (checkLength(str) && checkCase(str) && checkNumber(str) && checkSymbol(str)) return true;
  return false;
}

function validateCheck(check, element) {
  if (check) {
    element.style.color = "var(--valid-color)";
    element.querySelector("img").src = "assets/password_success.png";
  } else {
    element.style.color = "var(--invalid-color)";
    element.querySelector("img").src = "assets/password_fail.png";
  }
}

function validatePassword(event) {

  if (checkPassword(event.target.value)) {
    document.querySelectorAll(".form__password_details div").forEach( passwordCheck => passwordCheck.style.display = "none");
    document.querySelector('.password__strong').style.display = "block";
    password.style.border = "";
    password.style.backgroundImage = "url('assets/lock_success.png')";
  }

  else {
    document.querySelectorAll(".form__password_details div").forEach( passwordCheck => passwordCheck.style.display = "");
    passwordMessage.style.color = "var(--invalid-color)";
    password.style.backgroundImage = "url('assets/lock_neutral.png')";
  }

}

function invalidatePassword(event) {
  if (!checkPassword(event.target.value)) {
    invalidStyle(event.target);
    password.style.backgroundImage = "url('assets/lock_fail.png')";
    passwordMessage.style.color = "var(--invalid-color)";
    document.querySelectorAll(".form__password_details img").forEach( img => img.src = "assets/password_fail.png");
  }
}

    //Confirmation

function checkConfirmation() {
  if (password.value == confirmPassword.value) return true;
  return false;
}

function validateConfirmation() {

  if (confirmPassword.value == "") {
    confirmMessage.innerHTML = "Please confirm the password.";
    invalidStyle(confirmPassword);

  } else if (!checkConfirmation()) {
    confirmMessage.innerHTML = "Confirm password field does not match the password field.";
    invalidStyle(confirmPassword);

  } else {
    confirmPassword.style.border = "";
    confirmMessage.innerHTML = "";
  }

}

    //Submit

function checkSubmit(event) {

  //Check Mail
  mail.dispatchEvent(new Event("blur"));

  if (mail.value == "") {
    mail.focus();
    mail.style.backgroundImage = "url('assets/invalid.png')";
    mailMessage.innerHTML = "Please enter email address.";
  }

  //Check Phone
  phone.dispatchEvent(new Event("blur"));

  //Check Passwords
  password.dispatchEvent(new Event("blur"));
  displayChecks();

  confirmPassword.dispatchEvent(new Event("blur"));
  event.preventDefault();
}    

/*Event Listeners*/

let mail = document.querySelector(".form__mail input");
let mailMessage = document.querySelector(".form__mail_details");
let phone = document.querySelector(".form__phone input");
let phoneMessage = document.querySelector(".form__phone_details");
let password = document.querySelector(".form__password input");
let passwordMessage = document.querySelector(".form__password_details");
let confirmPassword = document.querySelector(".form__confirm input");
let confirmMessage = document.querySelector(".form__confirm_details");

  //Tooltip
mail.addEventListener("focus", displayTooltip);
mail.addEventListener("blur", hideTooltip);
phone.addEventListener("focus", displayTooltip);
phone.addEventListener("blur", hideTooltip);
password.addEventListener("focus", displayTooltip);
password.addEventListener("blur", hideTooltip);

  //Mail validation
mail.addEventListener("blur", validateMail)
mail.addEventListener("focus", defaultStyle);

  //Phone validation
phone.addEventListener("input", keepNumbers);
phone.addEventListener("input", formatPhone);
phone.addEventListener("focus", () => phone.addEventListener("blur", validatePhone));
phone.addEventListener("focus", displayVerify);

  //Password validation
password.addEventListener("input", () => validateCheck(checkLength(password.value), document.querySelector(".password__characters")));
password.addEventListener("input", () => validateCheck(checkCase(password.value), document.querySelector(".password__case")));
password.addEventListener("input", () => validateCheck(checkNumber(password.value), document.querySelector(".password__number")));
password.addEventListener("input", () => validateCheck(checkSymbol(password.value), document.querySelector(".password__symbol")));
password.addEventListener("focus", (event) => { defaultStyle(event); event.target.style.backgroundImage = "url('assets/lock_neutral.png')"; });
password.addEventListener("focus", displayChecks);
password.addEventListener("focus", () => document.querySelector(".form__confirm").classList.remove("hidden"));
password.addEventListener("input", validatePassword);
password.addEventListener("blur", invalidatePassword);

  //Password Confirmation validation
confirmPassword.addEventListener("focus", defaultStyle);
confirmPassword.addEventListener("blur", validateConfirmation);

  //Submit validation
document.querySelector(".form__submit").addEventListener("click", checkSubmit);