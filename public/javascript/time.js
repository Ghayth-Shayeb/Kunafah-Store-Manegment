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
function sendVoiceWhatsApp(phone) {
  const link = `https://wa.me/${phone}?text=مرحباً! طلبك جاهز الآن., تعال لاستلامه.`;
  window.open(link, "_blank");
}



module.exports = from24to12;