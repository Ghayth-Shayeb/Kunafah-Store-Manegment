const monthNames = ["يناير","فبراير","مارس","إبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

function dating() {
    const monthSelect = document.getElementById("input1");
    const currentMonth = new Date().getMonth() + 1;
    monthSelect.innerHTML = '<option selected value="">اختر الشهر.</option>';

    for (let m = currentMonth; m <= 12; m++) {
        const option = document.createElement("option");
        option.value = m;
        option.textContent = `${m} - ${monthNames[m - 1]}`;
        monthSelect.appendChild(option);
    }
}

function day(){
    let NumberVersionOfMonthSelect = Number(monthSelect.value);
    const monthSelect = document.getElementById("input1");
    const daySelect = document.getElementById("input2");
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    daySelect.innerHTML = '<option selected value="">اختر تاريخ معين, يوم 20 من الشهر كمثال</option>';
    if (NumberVersionOfMonthSelect === monthSelect.value) {
        for (let d = currentDay; d <= 31; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
    
    else if (NumberVersionOfMonthSelect === 2) {
        for (let d = 1; d <= 28; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
    else if (NumberVersionOfMonthSelect === 4 || NumberVersionOfMonthSelect === 6 || NumberVersionOfMonthSelect === 9 || NumberVersionOfMonthSelect === 11) {
        for (let d = 1; d <= 30; d++) {
            const option = document.createElement("option");
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }
    else if (NumberVersionOfMonthSelect === 1 || NumberVersionOfMonthSelect === 3 || NumberVersionOfMonthSelect === 5 || NumberVersionOfMonthSelect === 7 || NumberVersionOfMonthSelect === 8 || NumberVersionOfMonthSelect === 10 || NumberVersionOfMonthSelect === 12) {
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
    document.getElementById("input1").addEventListener("change", day);
});
