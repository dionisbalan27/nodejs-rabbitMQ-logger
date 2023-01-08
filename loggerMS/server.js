const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Producer = require("./producer");
const producer = new Producer();

app.use(bodyParser.json("application/json"));

app.post("/sendLog", async (req,res,next)=> {
    try{
        await producer.publishMassage(req.body.logType, req.body.massage);
        res.send();
    }catch(err){
        next(err)
    }
})

app.listen(3000, ()=>{
    console.log("Server started...");
});