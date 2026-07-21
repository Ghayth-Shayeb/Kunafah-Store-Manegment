function dating() {
    const monthSelect = document.getElementById("input1");
    const currentMonth = new Date().getMonth() + 1;
    const monthNames = ["يناير","فبراير","مارس","إبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
    monthSelect.innerHTML = '<option selected value="">اختر الشهر.</option>';

    for (let m = currentMonth; m <= 12; m++) {
        const option = document.createElement("option");
        option.value = m;
        option.textContent = `${m} - ${monthNames[m - 1]}`;
        monthSelect.appendChild(option);
    }
}

function day(){
    const daySelect = document.getElementById("input2");
    const currentDay = new Date().getDate();
    daySelect.innerHTML = '<option selected value="">اختر تاريخ معين, يوم 20 من الشهر كمثال</option>';

    for (let d = currentDay; d <= 31; d++){
        const option = document.createElement("option");
        option.value = d;
        option.textContent = d;
        daySelect.appendChild(option);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    dating();
    day();
});
