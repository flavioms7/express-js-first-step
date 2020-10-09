const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())

const courses = [
    { id: 1, name: 'math' },
    { id: 2, name: 'english' },
    { id: 3, name: 'germany' }
];

app.get('/hello/:id', (req, res) => {
    res.send('Hello World!!!' + req.params.id);
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {

    let course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send("There is not course")
    res.send(course)
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
 
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/course/:id', (req, res) => {

    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("There is not course")

    
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

     course.name = req.body.name
     res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}

app.delete('/api/courses/:id', (req, res) => {

    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("There is not course")

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})



const port = process.env.PORT || 2000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})