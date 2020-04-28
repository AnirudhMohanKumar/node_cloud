const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Db Connected!'))
    .catch(err => console.log('Db connection error', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublisher: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const course = new Course({
        name: 'Node',
        author: 'Anirudh',
        tags: ['mango', 'express'],
        isPublisher: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourse(name) {

    const courses = await Course.find({name: name});
    console.log(courses);
    return courses;
}

app.get('/', async (req, resp) => {
    const courses = await getCourse('Node');
    resp.send(courses);
});

app.listen(3000, () => {console.log('Server started! Port 3000.')});