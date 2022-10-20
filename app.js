
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//data from data.json
const { data } = require('./data.json');
const projects = data;

//Body parser
app.use(bodyParser.urlencoded({extended: false}));

//Setting 'view engine' to 'pug'
app.set('view engine', 'pug');


//static route
app.use('/static', express.static('public'));

//index route
app.get('/', (req, res) => {
    res.render('index', {projects})
});

//about route
app.get('/about', (req, res) => {
    res.render('about')
} );

//dynamic routes for projects

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id
    const project = projects.find(({id}) => id === +projectId);

if (project) {
    res.render('project', {project});
} else {
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
        res.render('not-found', {err});
    } else {
        res.status(err.status);
       console.log(err.message)
    }
});

//start server
app.listen(3000, () =>{
    console.log('The application is running on localhost:3000')
});
