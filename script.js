document.getElementById("add-1").onclick = function() {
    var userBox = document.createElement("div");
    userBox.className = "user-box";
    userBox.id = "input-1";
 
    var inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.name = "amount-1";
    inputElement.required = true;
 
    var selectElement = document.createElement("select");
    selectElement.name = "payment-1";
    selectElement.id = "payment-1";
 
    var option1 = document.createElement("option");
    option1.value = "wechat-prime-credit";
    option1.textContent = "微信安信";
 
    var option2 = document.createElement("option");
    option2.value = "union-bank-of-china";
    option2.textContent = "雲閃付中銀";
 
    selectElement.appendChild(option1);
    selectElement.appendChild(option2);
 
    var labelElement = document.createElement("label");
    labelElement.textContent = "number-1";
 
    userBox.appendChild(inputElement);
    userBox.appendChild(selectElement);
    userBox.appendChild(labelElement);
 
    document.getElementById("form-content").appendChild(userBox);
 };
document.getElementById("delete-1").onclick = function() {
    var elementToDelete = document.getElementById("input-1");
    if (elementToDelete) {
       elementToDelete.parentNode.removeChild(elementToDelete);
    }
 };
 
document.addEventListener("DOMContentLoaded", function() {
// Your JavaScript code here
    var currentDate = new Date().toISOString().split("T")[0];
    document.getElementById("union-rate-date").value = currentDate;
    var date = new Date();
    var dayOfWeek = date.getDay(); // Get the day of the week (0-6, where 0 is Sunday)

    // Check if it's Saturday (6) or Sunday (0) in Hong Kong (GMT+8)
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      // If it's Saturday or Sunday, change the date to the previous Friday
      date.setDate(date.getDate() - (dayOfWeek === 0 ? 2 : 1));
    }

    // Format the date as YYYY-MM-DD
    var formattedDate = date.toISOString().split("T")[0];
    document.getElementById("union-rate-date").value = formattedDate;
});

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link click behavior
  
    var number1Value = document.querySelector("input[name='amount-1']").value;
    console.log("amount-1 Value:", number1Value);

    var select1Value  = document.querySelector("select[name='payment-1']").value;
    console.log("payment-1 Value:", select1Value);
    // Optionally, you can perform further processing or submit the value to a server
  
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "tgw_l7_route=4463820afa6e1a580b8a21989312f26d");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://www.unionpayintl.com/upload/jfimg/20230902.json", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

});

