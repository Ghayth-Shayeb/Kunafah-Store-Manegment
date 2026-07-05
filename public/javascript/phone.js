function callCustomer(phone) {
  fetch("/order-ready", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({phone})
  });
}

module.exports = {callCustomer};