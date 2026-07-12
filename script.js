// imports
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const {Client, LocalAuth} = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
let app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
const from24to12 = require('./public/javascript/time.js').from24to12;

// Set Puppeteer executable path
process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/google-chrome-stable';

// connections and running the programme
async function run() {
    try {
        await mongoose.connect( "mongodb+srv://ghaythshayeb_db_user:7tibcK3FN3dU98@cluster0.szie5ta.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0");
        console.log("mongoose connected");
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

    dashboardSchema.index({month: 1, dayOfMonth: 1, time: 1}, {unique: true});

const dashboard_item = mongoose.model("dashboard_item", dashboardSchema);
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth()
});
let whatsappReady = false;
client.on("qr", (qr) => {
    qrcode.generate(qr, {small: true});
});
client.on("ready", () => {
    console.log("WhatsApp is ready!");
    whatsappReady = true;
});

client.on("disconnected", () => {
    whatsappReady = false;
});

client.initialize().catch(err => {
    console.log("WhatsApp initialization error:", err.message);
});
client.on("change_state", state => {
    console.log("WhatsApp state:", state);
});

client.on("disconnected", reason => {
    console.log("Disconnected:", reason);
    whatsappReady = false;
});

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
// send message to whatsapp
        if(whatsappReady){
            try{
                await new Promise(resolve => setTimeout(resolve, 2000));
                const result = await client.sendMessage("972568771505@c.us", "طلب جديد قد تم استلامه");
                
                console.log("Sent:", result.id._serialized);
            }
            catch(err){
                console.log("WhatsApp error:", err);
        }
    }

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
    const phone = String(req.body.yourPhone);
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

    if (whatsappReady) {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const result = await client.sendMessage(`972568771505@c.us`, "لقد تم تعديل طلب");
                
            console.log("Sent:", result.id._serialized);
        }
        catch(err) {
            console.log("WhatsApp error:", err);
        }
    }

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server established at PORT ${PORT}`);
});
