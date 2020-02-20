import express, { response } from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

// const articlesInfo = {
//     'learn-react': {
//         upvotes: 0,
//         comments: []
//     },
//     'learn-node':{
//         upvotes: 0,
//         comments: []
//     },
//     'my-thoughts-on-resumes':{
//         upvotes: 0,
//         comments: []
//     }
// }
const app = express();

app.use(bodyParser.json());

const withDB = async (operations,res) => {
    try {

        // connect to mongo db
        const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
        const db = client.db('my-blog');

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
}
app.get('/api/articles/:name', async (req, res) => {


    withDB(async (db) => {
        //get parameter 
        const articleName = req.params.name;
        const articlesInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articlesInfo);
    },res);



});
app.post('/api/articles/:name/upvotes', async (req, res) => {
    //get parameter 
    const articleName = req.params.name;
    withDB(async (db) => {

        const articlesInfo = await db.collection('articles').findOne({ name: articleName });

        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articlesInfo.upvotes + 1,
            }
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
    },res);
});
app.post('/api/articles/:name/add-comment', (req, res) => {
    //desctructing the request username and text values are known
    // will concact or add the destructured value on line 69 to line 75
    const { username, text } = req.body;
    const articleName = req.params.name;
    withDB(async (db) => {
        const articlesInfo = await db.collection('articles').findOne({name: articleName});
        await db.collection('articles').updateOne({name: articleName},{
            '$set': {
                comments: articlesInfo.comments.concat({username,text})
            }
        });
        const updatedArticleInfo = await db.collection('articles').findOne({name: articleName});
        res.status(200).json(updatedArticleInfo);
    },res);


});
// manual method switched to function call above
// app.get('/api/articles/:name', async (req, res) => {
//     try{
//         //get parameter 
//         const articleName = req.params.name;
//         // connect to mongo db
//         const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
//         const db = client.db('my-blog');

//         const articlesInfo = await db.collection('articles').findOne({name: articleName});
//         res.status(200).json(articlesInfo);
//         client.close();
//     }catch(error){
//         res.status(500).json({message: 'Error connecting to db', error});
//     }

// });
// app.post('/api/articles/:name/upvotes', async (req, res) => {
//     try {
//         //get parameter 
//         const articleName = req.params.name;
//         // connect to mongo db
//         const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
//         const db = client.db('my-blog');

//         const articlesInfo = await db.collection('articles').findOne({ name: articleName });

//         await db.collection('articles').updateOne({ name: articleName }, {
//             '$set': {
//                 upvotes: articlesInfo.upvotes + 1,
//             }
//         });
//         const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
//         res.status(200).json(updatedArticleInfo);
//         client.close();
//     } catch (error) {
//         res.status(500).json({ message: "Error connecting to db", error });
//     }
// });
// app.post('/api/articles/:name/upvotes',(req,res) => {
//     const articleName = req.params.name;
//     articlesInfo[articleName].upvotes += 1;
//     res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!!`);
// });
// app.post('/api/articles/:name/upvotes',(req,res) => {
//     const articleName = req.params.name;
//     articlesInfo[articleName].upvotes += 1;
//     res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!!`);
// });
// app.post('/api/articles/:name/add-comment',(req,res) => {
//     //desctructing the request username and text values are known
//     const { username, text } = req.body;
//     const articleName = req.params.name;
//     articlesInfo[articleName].comments.push({username, text});
//     res.status(200).send(articlesInfo[articleName]);
// });


app.get('/hello', (request, response) => response.send("hello!"));
app.get('/hello/:name', (req, res) => res.send(`Hello you stud ${req.params.name}`))
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name} you stud!`));

//testing mysql
app.get('/test', (req, res) => {
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