var inputDOM = 1;
var jsonData = [];
const params = new URLSearchParams(window.location.search);
const phone = params.get('phone');
var htmlMsg = null;
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
    inputElement.step = 0.01
    inputElement.required = true;

    let selectElement = document.createElement("select");
    selectElement.name = `payment-${inputDOM}`;
    selectElement.id = `payment-${inputDOM}`;
    // Generate options based on the JSON data
    for (let i = 0; i < jsonData.length; i++) {
        if(jsonData[i].enable == false){
            continue;
        }
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


//Calculation
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link click behavior
    document.getElementById("msg").innerText = '';
    let msg = '';

    let unionRateValue = document.querySelector("input[name='union-rate']").value;
    console.log("union-rate Value:", unionRateValue);

    let totalAmout = 0;
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

        msg += `Payment-${numberOfInput}: ${total} = ${document.querySelector(`input[name='amount-${numberOfInput}']`).value} * ${jsonData[document.querySelector(`select[name='payment-${numberOfInput}']`).value]["rate"]} ${textUnion}%0A`
        
        if(jsonData[document.querySelector(`select[name='payment-${numberOfInput}']`).value]["otherPersonPay"]){
            totalAmout += total;
            netTotal -= total;        
        }else{
            totalAmout += total;
            netTotal += total;
        }
    }

    let payback = netTotal / 2;

    msg += `Total Amount: ${totalAmout} %0A Net Total: ${netTotal} %0A Pay Back: ${payback} = ${netTotal} / 2`;
    
    //chnage %0A for new line in HTML
    document.getElementById("msg").innerText += msg.replace(/%0A/g, '\n')

    //send message to button as value in order to share whatsapp
    createShareWhatsappButton(msg);
});

document.getElementById("share-button").addEventListener("click", function (event) {
    window.location.href = `https://wa.me/${phone}?text=${document.getElementById("share-whatsapp").value}`
});

function createShareWhatsappButton(msg) {
    let buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.id = "share-whatsapp";
    buttonElement.value = msg;
    let whatsappIcon = document.createElement("i");
    whatsappIcon.className = "fa fa-whatsapp";
    let textNode = document.createTextNode("share-whatsapp");
    buttonElement.appendChild(whatsappIcon);
    buttonElement.appendChild(textNode);
    document.getElementById("share-button").appendChild(buttonElement);
}