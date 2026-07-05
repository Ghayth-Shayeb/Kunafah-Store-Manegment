// imports
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const twilio = require("twilio");
let app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
const from24to12 = require("./public/javascript/time")

// connections and running the programme
async function run() {
    try {
        await mongoose.connect( "mongodb+srv://ghaythshayeb_db_user:7tibcK3FN3dU98@cluster0.szie5ta.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0");
        console.log("mongo run")
    }catch(err){
        app.get('/', (req, res) => {
            res.status(500).send(err.message);
        });
    }
}run();

let dashboardSchema = new mongoose.Schema({
    month: Number,
    dayOfMonth: Number,
    time: String,
    quantity: Number,
    additionalNotes: String,
    yourName: String,
    yourPhone: String
});

    dashboardSchema.index({ month: 1, dayOfMonth: 1, time: 1 }, {unique: true });

const dashboard_item = mongoose.model("dashboard_item", dashboardSchema);

const path = require('path');

app.get('/', (req, res) => {
    res.render('index');
});
// create data
app.post('/sign', async (req, res) => {
    try {
        const dataForm = new dashboard_item({
            month: req.body.month,
            dayOfMonth: req.body.dayOfMonth,
            time: req.body.time,
            quantity: req.body.quantity,
            additionalNotes: req.body.additionalNotes,
            yourName: req.body.yourName,
            yourPhone: req.body.yourPhone
        });

        const exists = await dashboard_item.findOne({
            month: req.body.month,
            dayOfMonth: req.body.dayOfMonth,
            time: req.body.time   
        });
        if(exists){
            return res.status(404).sendFile(path.join(__dirname, 'public', 'validation.html'));
        }
        await dataForm.save();
        return res.status(201).render('complete',{order: dataForm})
// check if the date is available
    }catch(err) {
        if (err.code === 11000) {
            return res.status(400).send("يوجد طلب آخر في نفس الموعد.");
        }
        res.status(500).send(err.message);
        console.log(err)
    }
});
// read data
app.get('/show', async (req, res) => {
    try{
        const items = await dashboard_item.find({});
        res.render('dashboard', {items, from24to12});
    }
    catch(err){
        console.log("ERROR:", err);
        res.status(500).send(err.message);
    }
});
// update data
app.post('/find', async (req, res) => {
  try{
    const phone = Number(req.body.yourPhone);
    const items = await dashboard_item.find({yourPhone: phone});
    if (!items.length) {
        console.log(items.length);
        return res.status(404).sendFile(path.join(__dirname, 'public', 'noNumber.html'));
    }
    res.render('edit', {items});
  }catch(err) {
    res.status(500).send(err.message);
  }
});

app.put('/update/:id', async (req, res) => {
  try{
    await dashboard_item.findByIdAndUpdate(req.params.id, {
      yourName: req.body.yourName,
      yourPhone: req.body.yourPhone,
      time: req.body.time,
      quantity: req.body.quantity,
      additionalNotes: req.body.additionalNotes,
      month: req.body.month,
      dayOfMonth: req.body.dayOfMonth
    });
    return res.status(201).sendFile(path.join(__dirname, 'public', 'edited.html'));
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// delete data
app.post('/delete/:id', async (req, res) => {
    try{
        await dashboard_item.findByIdAndDelete(req.params.id);
        res.redirect('/show')
    }
    catch(err){
        res.status(500).send(err.message);
    }
});
// using twilio for calls
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

app.post("/order-ready", async (req, res) => {
  try{
    const phone = req.body.phone;

    if (!phone) {
      return res.status(400).json({success: false, message: "ادخل رقماً"});
    }
    if (!phone.startsWith("+")) {
      phone = "+970" + phone.replace(/^0/, "");
    }
    const call = await client.calls.create({
      to: phone,
      from: process.env.TWILIO_NUMBER,
      twiml: `<Response><Say language="ar-SA">محل أبو أنس يتصل بك. طلبك جاهز، يرجى التوجه لاستلامه.</Say></Response>`
    });
    return res.json({success: true, sid: call.sid});
  }catch(err) {
    return res.status(500).json({success: false, error: err.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server established at PORT ${PORT}`);
});