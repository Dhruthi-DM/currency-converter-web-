const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("Form Button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg =  document.querySelector(".msg");


for(let select of dropdowns) {
    for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD") {
        newOption.selected = "Selected";
    }else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "Selected";
    }
     select.append(newOption);//using the countryList and converting to individual options and adding them into select option//
   }

   select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
   });
}

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal === "" | amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toUpperCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value.toUpperCase()];
    console.log(rate);
    console.log(amount);

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();/* page default behaviour when submitted form is to refresh page that we are preventing*/
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();

});