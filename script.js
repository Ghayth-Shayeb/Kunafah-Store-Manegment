// imports
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
let app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

// connections and running the programme
async function run() {
    try {
        await mongoose.connect( "mongodb+srv://<username>:<password>@cluster0.szie5ta.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0");
        console.log("mongo run")
    }
    catch (err) {
        app.get('/', (req, res) => {
            res.status(500).send(err.message);
        });
    }
}run();

let dashboardSchema = new mongoose.Schema({
    month: Number,
    dayOfMonth: Number,
    time: String,
    quantity: String,
    additionalNotes: String,
    yourName: String,
    yourPhone: Number
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
            return res.status(400).sendFile(path.join(__dirname, 'public', 'validation.html'));
        }
        await dataForm.save();

        res.redirect('/');
// check if the date is available
    } catch (err) {
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
        res.render('dashboard', { items, from24to12 });
    }
    catch(err){
        console.log("ERROR:", err);
        res.status(500).send(err.message);
    }
});
// update data
app.post('/find', async (req, res) => {
  try {
    const phone = Number(req.body.yourPhone);
    const items = await dashboard_item.find({yourPhone: phone});
    if (!items.length) {
        console.log(items.length)
        return res.status(404).send("لا يوجد طلبات مسجلة من هذا الرقم");
    }
    res.render('edit', {items});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    await dashboard_item.findByIdAndUpdate(req.params.id, {
      yourName: req.body.yourName,
      yourPhone: req.body.yourPhone,
      time: req.body.time,
      quantity: req.body.quantity,
      additionalNotes: req.body.additionalNotes,
      month: req.body.month,
      dayOfMonth: req.body.dayOfMonth
    });

    res.redirect('/show');

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

function from24to12(time24){
    if (!time24) return "";

    let [hours, minutes] = time24.split(":");

    hours = parseInt(hours);

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;

    let all = `${hours}:${minutes} ${period}`;
    return all;
}

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server established at PORT ${PORT}`);
});