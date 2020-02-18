import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: []
    },
    'learn-node':{
        upvotes: 0,
        comments: []
    },
    'my-thoughts-on-resumes':{
        upvotes: 0,
        comments: []
    }
}
const app = express();
app.use(bodyParser.json());

app.post('/api/articles/:name/upvotes',(req,res) => {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!!`);
});
app.post('/api/articles/:name/add-comment',(req,res) => {
    //desctructing the request username and text values are known
    const { username, text } = req.body;
    const articleName = req.params.name;
    articlesInfo[articleName].comments.push({username, text});
    res.status(200).send(articlesInfo[articleName]);
});
app.get('/hello', (request,response) => response.send("hello!"));
app.get('/hello/:name', (req,res) => res.send(`Hello you stud ${req.params.name}`))
app.post('/hello', (req,res) => res.send(`Hello ${req.body.name} you stud!`));

app.get('/test',  (req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'express',
        password: 'expresstest',
        database: 'react_tut'
      })
      
       connection.connect()
      
      connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err
        res.status(200).send(`The connection test was good and it returned ${rows[0].solution}`);
        console.log('The solution is: ', rows[0].solution)
      })
      
      connection.end();
})

app.listen(8000, () => console.log("Listening on port 8000"));