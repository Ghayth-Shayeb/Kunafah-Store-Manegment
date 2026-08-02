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
    const currentMonth = new Date().getMonth() + 1;
    daySelect.innerHTML = '<option selected value="">اختر تاريخ معين, يوم 20 من الشهر كمثال</option>';
    if (currentMonth == monthSelect.value) {
        for (let d = currentDay; d <= 31; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
    else if (monthSelect.value === monthNames[1]) {
        for (let d = 1; d <= 28; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
    else if (monthSelect.value === monthNames[3] || monthSelect.value === monthNames[5] || monthSelect.value === monthNames[8] || monthSelect.value === monthNames[10]) {
        for (let d = 1; d <= 30; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
    else if (monthSelect.value === monthNames[0] || monthSelect.value === monthNames[2] || monthSelect.value === monthNames[4] || monthSelect.value === monthNames[6] || monthSelect.value === monthNames[7] || monthSelect.value === monthNames[9] || monthSelect.value === monthNames[11]) {
        for (let d = 1; d <= 31; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
    else{
        for (let d = 1; d <= 31; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
}
window.addEventListener("DOMContentLoaded", () => {
    dating();
    day();
});
