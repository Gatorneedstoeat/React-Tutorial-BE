import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/hello',(request,response) => response.send("hello!"));

app.post('/hello',(req,res) => res.send(`Hello ${req.body.name} you stud!`));

app.listen(8000, () => console.log("Listening on port 8000"));