
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const indexRoute = require('./index');

//data from data.json
const { projects } = require('./data.json');

//Body parser
app.use(bodyParser.urlencoded({extended: false}));

//Setting 'view engine' to 'pug'
//source: https://medium.com/@SigniorGratiano/server-side-rendering-with-pug-templates-e1e5947d4c1a
app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));


//static route
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/static',express.static(path.join(__dirname, 'images')));

app.use('/', indexRoute);

// //index route
// app.get('/', (req, res) => {
//     res.render('index', {projects})
// });

// //about route
// app.get('/about', (req, res) => {
//     res.render('about')
// } );

// //dynamic routes for projects

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id
    const project = projects.find(({id}) => id === +projectId);

if (project) {
    res.render('project', {project});
} else {
    res.status = 404;
    next();
}
});


//Error Handlers
//404 handler to catch undefined or non-existent route requests/
//


app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Looks like the project you requested does not exist.';
    next(err);
});

//global error handler
app.use((err, req, res, next) => {
    if(err.status === 404) {
        res.send('Oops, something went wrong!');
        console.log('Oops, something went wrong!');
        
    } else {
        console.log(err.status);
        console.log(err.message);
    }
});

//start server
app.listen(3000, () =>{
    console.log('The application is running on localhost:3000')
});
