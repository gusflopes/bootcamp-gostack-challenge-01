const express = require('express');
const server = express();
server.use(express.json());

const projects = [];

var  requestCounter = 0;

//Global Middlewares

function logRequests(req, res, next) {
  requestCounter++;

  console.log(`Number of requests: ${requestCounter}`);

  return next();
}

server.use(logRequests);

// Internal Middlewares
function verifyProjectId(req, res, next) {

  console.log('Verifying ProjectId.');

  return next();
}


// ROUTES

// New Project
server.post('/projects', (req, res) => {
  //Information needed 'id' and 'title'
  const { id, title } = req.body;

  //Formating the project (workings as model)
  const project = {
    id,
    title,
    tasks: []
  };

  //Pushing the 'project' to 'projects'
  projects.push(project);

  //Response
  return res.json(projects);
})

// List Projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// Update Project

server.put('/projects/:id', verifyProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});

// Delete Project
server.delete('/projects/:id', verifyProjectId, (req, res) => {
  const  { id } = req.params;

  const project = projects.find(p => p.id === id);

  projects.splice(project, 1);

  return res.json({message: 'Project deleted.'});
});

// Add Task
server.post('/projects/:id/tasks', verifyProjectId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
});



server.listen(3000);