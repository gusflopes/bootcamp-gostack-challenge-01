## First challenge of the GoStack Bootcamp (Rocketseat)

### First  things first.
Just finished the module "Conceitos do NodeJS" (NodeJS Concepts). It's time to work now!

The first challenge is to create an Simple API from scractch on Node.js using Express, using the concepts learned, especially Routes and Middlewares.

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
Making the CRUD is straightforward. We already made part of the `Read` on the route `/projets` with the method `GET`.

#### POST Method
For the post we need to break it in 3 steps:
1. Reading the data provided on the Body (`id` and `title`);
2. Creating a `Project` usign a *Model*, passing `id`, `title` and an empty array for the `tasks`;
3. Adding `project` to `projects` by using `Push()`
4. Returning an answer.

```
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
})
```

#### Update Project & Finding one Project inside Projects
On the methods `PUT`, `DELETE` and also on `POST Task` we will need to find the Project before we can do anything.

Basically we receive the `id` on the `req.params` (url) and we need to use it to find the specific `project`.

We can start by creating a new object (`project`) to receive the `project` we will extract from the array `projects`.
We can use the method `find()` on the array `projects` so we can compare the `id` provided on `req.params` with one `id` that already exists on `projects`, giving us back that `project` as the `project` object.

After that, for updating it we just need to pass the new `title` to the `project` we just located, using: `project.title = title`.

For example, let's take a look at the Update Project (`PUT`): 

```
server.put('/projects/:id', verifyProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});
```

#### Deleting Project from array Projects
For implementing the delete, we just need to change the route method for `delete` and use the same method above to find the correct `project` with the `id` provided.

Since we are not making anychanges, we just need to use a method to delete the `item` from inside the `array`. In this case we can use the method `splice()`.

We just need to call `projects.splice(project, 1);`. It'll execute the method `splice()` on the array `projects` and, the `project` is working as an Index, and the number `1` means that i'll just remove one element (in this case, the one element used as Index).

#### Creating a Task inside a Project
To create a Task inside a Project we first need to find the Project provideded on the `req.params`, like we did on the other situations.

After that, we'll just use `push()` and the only difference is that we're going to use it on the array `tasks` from `project` (`project.tasks.push(title)`), like this:

```
// Add Task
server.post('/projects/:id/tasks', verifyProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
});
```


### Step 03 - Implementing the global Middleware
The middleware can work before or between routes, when you implement not only `(req, res)`, but also the (`next`). It will just execute the middleware and, when you call `next()` or `return next()` it will go for the next middleware/route.

Since we want this to work on any route, we can just pass `server.use(globalMiddleware);` before all the routes, so it'll stop there first. At the end of the middleware function we use `next()` so it will go to the specific route.

In this case, since we wanted a counter, we started a counter (`var requestCounter = 0;`) on the beggining of the `index.js` and then we created this before the routes:

```
var  requestCounter = 0;

//Global Middleware
function logRequests(req, res, next) {
  requestCounter++;

  console.log(`Number of requests: ${requestCounter}`);

  return next();
}

// Calling the Global Middleware on any route
server.use(logRequests);
```
So, before it goes to any specific route, it'll increase the counter and display a console log with the number of requests.

### Step 04 - Implementing the local Middleware for `id` verification
The difference between the Global Middleware and the Local Middleware is that this last one will only be used on specific routes, but the implementation is almost the same.

We basically create a function for it, like this:

```
// Internal Middlewares
function verifyProjectId(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({message: "Project doesn't exists."});
  }

  return next();
}
```
It will basically find a `Project` inside `Projects` and make a small verification: If the project couldn't be found, it'll just provide an response and halt there.

If the condition is false, then it'll just use `next()` so the requisition can be analyzed by the specific routes.

To call the Middleware, in this case, we need to specify in wich route we want it to be called, so we can insert it before `arrow function`, like this:

`server.put('/projects/:id', verifyProjectId, (req, res) => {`

### Conclusion
That's it guys!

This is a basic Node.JS REST API wich you can make a full CRUD with the Projects, and also insert new Tasks inside it.

You can look the repository on my <a href="https://github.com/gusflopes/bootcamp-gostack-challenge-01">Github</a>.