function callCustomer(phone) {
  fetch("/order-ready", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ phone: String(phone) })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
}