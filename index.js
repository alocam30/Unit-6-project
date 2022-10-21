const express = require("express");
const router = express.Router();
const { projects } = require('./data.json');



//index route
router.get('/', (req, res) => {
    res.render('index', {projects})
});

//about route
router.get('/about', (req, res) => {
    res.render('about')
} );

//dynamic routes for projects

router.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id
    const project = projects.find(({id}) => id === +projectId);

if (project) {
    res.render('project', {project});
} else {
    res.status = 404;
    next();
}
});

module.exports = router;