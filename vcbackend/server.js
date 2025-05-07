import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
})


app.listen(5001, () => {
    console.log("server is running at port 5001")
})