const express = require('express');
const router = express.Router();
const {
  getBug,
  getBugs,
  getUser,
  getUsers,
  getProjectsByUserId,
  postBug,
  postUser,
  postProject,
  putBug,
  putUser,
  putProject,
  deleteBug,
  deleteUser,
  deleteProject,
} = require('./service'); // Adjust the path based on your actual file structure

// Routes for Bugs
router.get('/bugs/:id', getBug);
router.get('/bugs', getBugs);
router.post('/bugs', postBug);
router.put('/bugs/:id', putBug);
router.delete('/bugs/:id', deleteBug);

// Routes for Users
router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.post('/users', postUser);
router.put('/users/:id', putUser);
router.delete('/users/:id', deleteUser);

// Routes for Projects
router.get('/projects/user/:id', getProjectsByUserId);
router.post('/projects', postProject);
router.put('/projects/:id', putProject);
router.delete('/projects/:id', deleteProject);

module.exports = router;
