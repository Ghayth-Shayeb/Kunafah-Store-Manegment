function callCustomer(phone) {
  fetch("/order-ready", {
    method: "POST",headers: {"Content-Type": "application/json"},
    body: JSON.stringify({phone: phone})
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    alert("Call sent!");
  })
  .catch(err => {
    console.error(err);
    alert("Error calling customer");
  });
}

module.exports = callCustomer;