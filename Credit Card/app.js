'use strict'

const cardNumber = document.getElementById("card-front__number");
const cardHolderName = document.getElementById("card-front__name");
const cardHolderNameBack = document.getElementById("card-back__name");
const cvv = document.getElementById("card-back__cvv");
const expiryMonth = document.querySelector(".expiry-month-and-year .month");
const expiryYear = document.querySelector(".expiry-month-and-year .year");

const cardInputForm = document.querySelector("form");
const cardNumberInput = document.querySelector(".card-number");
const cardHolderNameInput = document.querySelector(".name-on-card");
const expiryMonthInput = document.getElementById("MM");
const expiryYearInput = document.getElementById("YY");
const cvvInput = document.querySelector(".cvv");

const presentDate = new Date();
const presentMonth = 1 + Number(presentDate.getMonth());
const presentYear = Number(presentDate.getFullYear());

preventScrollInput()
addDropDownyears();
updateDropDownMonths();

cardInputForm.addEventListener("input", event => {
  if (event.target.id === "name")   updateCardHolderNameOnCard();
  if (event.target.id === "number") updateCardNumberOnCard();
  if (event.target.id === "cvv") updatedCardCvvOnCard();
})

// Triggered whenever the Selected Expiry year gets changed
expiryYearInput.addEventListener('change', e => {
  updateDropDownMonths();
  updateExpiryYearOnCard();
})

expiryMonthInput.addEventListener('change', e => updateExpiryMonthOnCard());


// Function to add the next 15 years to the expiry year dropdown and update the expiry year field in card
function addDropDownyears() {
  for (let i = 0; i <= 15; i++){
    expiryYearInput.insertAdjacentHTML('beforeend',
    `<option value="${presentYear+i}">${presentYear+i}</option>`);
  }
  updateExpiryYearOnCard();
}

// Function to update the months in the expiry month dropdown based on the selected expiry year. 
// It will clear the old months if selected year is current year and the present month is not January
// Or if the selected year is not present year and the months drop down doesn't start from January
function updateDropDownMonths() {
  const dropDownStartMonth = (expiryYearInput.value == presentYear) ? presentMonth : 1;

  if (!expiryMonthInput.childElementCount || (expiryYearInput.value == presentYear && presentMonth !== 1) || expiryMonthInput.childElementCount != 12) {
    const selectedMonth = expiryMonthInput.value;
    expiryMonthInput.innerHTML = "";
    for (let month = dropDownStartMonth; month <=12; month++) {
      if (month.toString().length === 1) month = `0${month}`;
      expiryMonthInput.insertAdjacentHTML('beforeend',
      `<option value="${month}">${month}</option>`)
    }
    expiryMonthInput.value = (selectedMonth < dropDownStartMonth) ? expiryMonthInput.firstChild.value : selectedMonth;
    updateExpiryMonthOnCard();
  }
}

// To prevent number input on scrolling the mouse wheel
function preventScrollInput(){
  let numberInputs = document.querySelectorAll("input[type=number]");
  for (let a = 0; a < numberInputs.length; a++) {
    numberInputs[a].onwheel = function (event) {
      event.preventDefault();
    };
  }
}

function updateExpiryMonthOnCard(){
  expiryMonth.textContent = expiryMonthInput.value;
}

function updateExpiryYearOnCard(){
  expiryYear.textContent = expiryYearInput.value.slice(2);
}

function updateCardHolderNameOnCard(){
  const formattedCardHolderName = cardHolderNameInput.value.replace(/[^a-zA-Z ]/g,"")
  cardHolderNameInput.value = formattedCardHolderName;
  const CARD_HOLDER_NAME = (formattedCardHolderName === "") ? "Card holder name" : formattedCardHolderName;
  cardHolderName.textContent = CARD_HOLDER_NAME;
  cardHolderNameBack.textContent = CARD_HOLDER_NAME;
}

function updateCardNumberOnCard(){
  const formattedCardNumber = cardNumberInput.value.replace(/[^\d]/g, "").slice(0, 16);
  cardNumberInput.value = formattedCardNumber;
  const CARD_NUMBER = (formattedCardNumber === "") ? "0000 0000 0000 0000" : formattedCardNumber.replace(/(.{4})/g, '$1 ').trim();
  cardNumber.textContent = CARD_NUMBER;
}

function updatedCardCvvOnCard(){
  const formattedCVV = cvvInput.value.substring(0,3);
  cvvInput.value = formattedCVV;
  const CVV = (formattedCVV === "") ? "000" : formattedCVV;
  cvv.textContent = CVV;
}



