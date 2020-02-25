# Shaun Wassell's React: Creating and Hosting a Full-Stack Site 
This repo is the result of following the course.

<br>
<br>
<br>

# Express Back-End Setup

### Initialize the project
```node 
npm init -y
```
Create the `src` folder in the roolt and add `server.js` to it.


### Setup / Add Babel for ES6 support

```node
npm install --save-dev @babel/core @babel/node @babel/preset-env
```
Add `.babelrc` file to the root of the project.

Add the following to the `.babelrc` file:

```javascript
{
    "presets": ["@babel/preset-env"]
}
```

### Add the JSON boby parser for post requests
```node
npm install --save body-parser
```

### Add nodemon to update the server on every save
```node
npm install --save-dev nodemon
```
Now run the following command:
```node
npx nodemon --exec npx babel-node src/server.js
```

### deployment
Put your compiled static assest in the `src` folder and add the following to the `server.js` file:


```javascript
//add the following to import
import path from 'path';
//add just below const app = express();
app.use(express.static(path.join(__dirname, '/build')))
```

```javascript
//add as the last api route
//this will serve the static files
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
})
```