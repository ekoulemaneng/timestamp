const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => res.send("/public/index.html"));


app.get('/api/timestamp/', (req, res) => {
    let date = new Date();
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});



app.get('/api/timestamp/:date_string', (req, res) => {

    let str = req.params.date_string;
    let date;

    if ((/^\d+$/).test(str)) {
        date = new Date(parseInt(str));
        res.json({"unix": date.getTime(), "utc": date.toUTCString()});
    }
    else if ((/^\d{4}-\d{1,2}-\d{1,2}$/).test(str)) {
        date = new Date(str);
        if (date.toString() === "Invalid Date") res.json({"error" : "Invalid Date" });
        else res.json({"unix": date.getTime(), "utc": date.toUTCString()});
    }
    else res.json({"error": "Invalid Date" });  

});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

app.listen(3000);
