const express = require('express');
const joi = require('joi');
const app = express();

const courses = [{
    id: 1,
    name: 'test'
}];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!!!');
});

app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const course = courses.find(i => i.id === +id);
    if (!course) {
        return res.status(404).send(`${id} is not found`);
    }
    console.info(req.body)
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    course.name = req.body.name;
    res.send(course);
});

const validate = (course) => {
    const schema = {
        name: joi.string().max(8).min(3),
    };
    return joi.validate(course, schema);
}

app.listen(3000);