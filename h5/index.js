const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use("/ali_icon", express.static(path.join(__dirname, "./ali_icon")));
app.use("/css", express.static(path.join(__dirname, "./css")));
app.use("/feature", express.static(path.join(__dirname, "./feature")));
app.use("/html", express.static(path.join(__dirname, "./html")));
app.use("/icon", express.static(path.join(__dirname, "./icon")));
app.use("/image", express.static(path.join(__dirname, "./image")));
app.use("/launch", express.static(path.join(__dirname, "./launch")));
app.use("/res", express.static(path.join(__dirname, "./res")));
app.use("/web_adapter", express.static(path.join(__dirname, "./web_adapter")));
app.use("/script", express.static(path.join(__dirname, "./script")));
app.use("/wgt", express.static(path.join(__dirname, "./wgt")));

app.get('/', (req, res) => {
  var params = req.query
  console.log(req);
    fs.readFile('./index.html', (err, data) => {
        if (err) res.send(err);
        res.end(data)
    })
})

app.listen(8000, () => {
    console.log('done!')
})
