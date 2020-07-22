const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/datarelation';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB Server : ', err));


//1. First create sachema model for author
const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

//2. then create Course schema model
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: { //add author property
      type: mongoose.Schema.Types.ObjectId, //using object id type
      ref: 'Author' //reference to the Author
  }
}));

//3. function to create or add dara author
async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .select('name');
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

createCourse('Node Course', '5f17fe20f399c344c4fc1f92');

//listCourses();