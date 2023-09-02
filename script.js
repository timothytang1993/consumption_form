var inputDOM = 1;
var jsonData = [];
window.onload = function () {
    fetch("refund_rate.json")
        .then(response => response.json())
        .then(data => {
            // Process the fetched JSON data
            jsonData = data;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error("Error: ", error);
        });
};

document.getElementById("add").onclick = function () {
    let userBox = document.createElement("div");
    userBox.className = "user-box";
    userBox.id = `input-${inputDOM}`;

    let inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.name = `amount-${inputDOM}`;
    inputElement.required = true;

    let selectElement = document.createElement("select");
    selectElement.name = `payment-${inputDOM}`;
    selectElement.id = `payment-${inputDOM}`;
    // Generate options based on the JSON data
    for (let i = 0; i < jsonData.length; i++) {
        option = document.createElement("option");
        option.value = i;
        option.text = jsonData[i].chineseName + " - " + jsonData[i].rate;
        selectElement.appendChild(option);
    }

    let labelElement = document.createElement("label");
    labelElement.textContent = `payment-${inputDOM}`;

    userBox.appendChild(inputElement);

    userBox.appendChild(selectElement);
    userBox.appendChild(labelElement);

    document.getElementById("form-content").appendChild(userBox);
    inputDOM++;
};

document.getElementById("delete").onclick = function () {
    var elementToDelete = document.getElementById(`input-${inputDOM - 1}`);
    if (elementToDelete) {
        elementToDelete.parentNode.removeChild(elementToDelete);
    }
    inputDOM--;
};

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link click behavior

    document.getElementById("msg").innerText = '';

    let unionRateValue = document.querySelector("input[name='union-rate']").value;
    console.log("union-rate Value:", unionRateValue);

    let netTotal = 0;
    for (let i = 1; i < inputDOM; i++) {
        let numberOfInput = i;
        let total = document.querySelector(`input[name='amount-${numberOfInput}']`).value
        * jsonData[document.querySelector(`select[name='payment-${numberOfInput}']`).value]["rate"]

        let textUnion ='';
        if(jsonData[document.querySelector(`select[name='payment-${numberOfInput}']`).value]["unionPay"]){
            textUnion = `* ${unionRateValue}`
            total = total * unionRateValue;
        }

        document.getElementById("msg").innerText += `Payment-${numberOfInput}: ${total} = ${document.querySelector(`input[name='amount-${numberOfInput}']`).value} * ${jsonData[document.querySelector(`select[name='payment-${numberOfInput}']`).value]["rate"]} ${textUnion}\n`
        
        if(jsonData[document.querySelector(`select[name='payment-${numberOfInput}']`).value]["otherPersonPay"]){
            netTotal -= total;
        }else{
            netTotal += total;
        }

        let payback = netTotal / 2;
        
    }
    document.getElementById("msg").innerText += `Net Total: ${netTotal} \nPay Back: ${payback} = ${netTotal} / 2`
});

