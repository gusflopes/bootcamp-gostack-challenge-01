## First challenge of the GoStack Bootcamp (Rocketseat)

### First  things first.
Just finished the module "Conceitos do NodeJS" (NodeJS Concepts). It's time to work now!

The first challenge is to create an Simple API from scractch using Express, using the concepts learned, especially Routes and Middlewares.

### The Challenge - Bootcamp GoStack Challenge 01

The original <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md#desafio-01-conceitos-do-nodejs">README.md</a> can be found on Rocketseat GitHub.

Anyways, it is the README.md of my repository.

### First settings

For starting i did the following steps:
- `yarn init -y` to start the project
- `yarn add express` to add Express
- `yarn add nodemon -D` to add Nodemon as Dev Dependency
- Created a script on the package.json to start nodemon with `yarn dev`
- Started the git repo and created a `.gitignore` file

Ok. Now I'm ready to really start coding.

### Step 01 - Basic Setupe
- Import and use Express:
```
const express = require('express');
const server = express();
```
- Use Json from Express: `server.use(express.json());`
- Listen Port 3000: `server.listen(3000);`
- Setting up the data (just an array for now): `const projects = [];`
- Implementing the first route:
```
// List Projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});
```

Server is ready and replies for the GET Requisiton with an empty array.

### Step 02 - Making the CRUD (just insights)

#### Finding one Project inside Projects

#### Adding or Deleting Project from array Projects

### Setp 03 - Implementing the global Middleware

### Setp 04 - Implementing the local Middleware for `id` verification