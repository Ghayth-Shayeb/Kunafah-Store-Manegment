function from24to12(time24){
    if (!time24) return "";

    let [hours, minutes] = time24.split(":");

    hours = parseInt(hours);

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;

    let all = `${hours}:${minutes} ${period}`;
    return all;
};
function callCustomer(phone) {
  fetch("/order-ready", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ phone })
  });
}



module.exports = from24to12;