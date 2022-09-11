const express = require("express");
const app = express();


app.get("/api", (req, res)=>{
    console.log(req);
    res.json({
        1:"hi",
        2:"how",
        3:"are",
        4:"you"
    });

});

app.listen(5000, ()=>{
    console.log("server started")
});