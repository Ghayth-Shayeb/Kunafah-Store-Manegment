function dating() {
    const monthSelect = document.getElementById("input1");
    const currentMonth = new Date().getMonth() + 1;
    const monthNames = ["يناير","قبراير","مارس","إبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
    monthSelect.innerHTML = "";

    for (let m = currentMonth; m <= 12; m++) {
        const option = document.createElement("option");
        option.value = m;
        option.textContent = `${m} - ${monthNames[m - 1]}`;
        monthSelect.appendChild(option);
    }
}
window.addEventListener("DOMContentLoaded", dating);