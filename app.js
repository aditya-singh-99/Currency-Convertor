const API_Key = "581c59bd32489e424c036a69";
const fromSelect = document.querySelector("#from");
const toSelect = document.querySelector("#to");
const fromImage = document.querySelector("#from-image");
const toImage = document.querySelector("#to-image");
const input = document.querySelector("input");
const button = document.querySelector("button");
const result = document.querySelector("#result");

for (const key in countryList) {
    const option1 = document.createElement("option");
    option1.value = key;
    option1.innerText = key;
    if (key == "USD") option1.selected = true;
    fromSelect.append(option1);
    const option2 = document.createElement("option");
    option2.value = key;
    option2.innerText = key;
    if (key == "INR") option2.selected = true;
    toSelect.append(option2);
}

fromSelect.addEventListener("change", () => {
    const country = countryList[fromSelect.value];
    fromImage.setAttribute("src", `https://flagsapi.com/${country}/flat/64.png`);
});

toSelect.addEventListener("change", () => {
    const country = countryList[toSelect.value];
    toImage.setAttribute("src", `https://flagsapi.com/${country}/flat/64.png`);
});

button.addEventListener("click", fun);

async function fun() {
    const amount = input.value;
    const from = fromSelect.value;
    const to = toSelect.value;
    const LINK = `https://v6.exchangerate-api.com/v6/${API_Key}/pair/${from}/${to}/${amount}`;
    if (isNaN(amount)) {
        alert("Entered amount is not a Number");
        return;
    }
    const respone = await fetch(LINK.replace("from", from.toUpperCase()));
    const data = await respone.json();
    if (data.result == "success") {
        const res = data["conversion_result"].toFixed(2);
        result.innerHTML = `${amount} ${from} = ${res} ${to}`;
    } else {
        alert("Unexpected error occured! Retry later.");
    }
}
fun();
