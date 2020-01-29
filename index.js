const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

//Middleware check project exists
function checkProjectExists(req, res, next){
  const { id } = req.params;
  const project = projects.find(project => project.id ==id);

  if (!project){
    return res.status(400).json({ error: 'Project not found'});
  }

  return next();

};

//Middleware  project log
function logRequests(req, res, next){
  console.count("Número de requisições efetuadas: ");

  return next();
}

server.use(logRequests);

//Register new project

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(project);
});


//List projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Edit project title

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.title = title;
  return res.json(projects);
});

//Delete project

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  projectIndex = projects.findIndex(project => project.id == id);
  projects.splice(projectIndex, 1);

  return res.send("Project successfully deleted!")

});

//Add Task
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.tasks.push(title);
  return res.json(project);

  
});

// Edit tasks
server.put('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id == id);

  project.tasks = title;
  return res.json(project);
}); 

//Delete tasks
server.delete('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);

  projects.splice(projects.tasks)

  return res.send("Task successfully deleted!")

});

server.listen(4000);