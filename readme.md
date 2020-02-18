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

