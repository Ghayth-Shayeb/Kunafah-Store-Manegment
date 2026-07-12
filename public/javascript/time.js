const {Client, LocalAuth} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

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
async function sendTextWhatsApp(phone) {
  const client = new Client({authStrategy: new LocalAuth()});
  const c970 = "970";
  const c972 = "972";

 client.on("ready", async () => {
    console.log("WhatsApp is ready!");

    try {
        await client.sendMessage(`${c970}${phone}@c.us`, "محل أبو أنس: تم الانتهاء من تحضير طلبك, يرجى استلامه");
        await client.sendMessage(`${c972}${phone}@c.us`, "محل أبو أنس: تم الانتهاء من تحضير طلبك, يرجى استلامه");
        console.log("Message sent");
    } catch(err) {
        console.log("WhatsApp error:", err);
    }
});
}

module.exports = {from24to12, sendTextWhatsApp};