const { Users, Bugs, Projects, sequelize } = require('./bazadate');

// Method to get a specific bug by ID
async function getBug(request, response) {
  try {
    const bugId = request.params.id;
    const bug = await Bugs.findByPk(bugId);
    
    if (bug) {
      response.status(200).json(bug);
    } else {
      response.status(404).json({ error: 'Bug not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to get all bugs
async function getBugs(request, response) {
  try {
    const bugs = await Bugs.findAll();
    response.status(200).json(bugs);
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to get a specific user by ID
async function getUser(request, response) {
  try {
    const userId = request.params.id;
    const user = await Users.findByPk(userId);
    
    if (user) {
      response.status(200).json(user);
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to get all users
async function getUsers(request, response) {
  try {
    const users = await Users.findAll();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to get projects by user ID
async function getProjectsByUserId(request, response) {
  try {
    const userId = request.params.id;
    const projects = await Projects.findAll({
      where: {
        userId: userId,
      },
    });
    
    response.status(200).json(projects);
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to create a new bug
async function postBug(request, response) {
  try {
    const { name, status, priority, creationdate, userId, projectId } = request.body;
    
    if (name && status && priority && creationdate && userId && projectId) {
      const bug = await Bugs.create({
        name,
        status,
        priority,
        creationdate,
        userId,
        projectId,
      });
      
      response.status(201)
        .location(`${request.protocol}://${request.hostname}:${request.socket.localPort}${request.baseUrl}${request.url}/${bug.id}`)
        .send();
    } else {
      response.status(400).json({ error: 'Bad Request: Missing required fields' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to create a new user
async function postUser(request, response) {
  try {
    const { username, password, usertype } = request.body;
    
    if (username && password && usertype) {
      const user = await Users.create({
        username,
        password,
        usertype,
      });
      
      response.status(201)
        .location(`${request.protocol}://${request.hostname}:${request.socket.localPort}${request.baseUrl}${request.url}/${user.id}`)
        .send();
    } else {
      response.status(400).json({ error: 'Bad Request: Missing required fields' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to create a new project
async function postProject(request, response) {
  try {
    const { name, link, userId } = request.body;
    
    if (name && link && userId) {
      const project = await Projects.create({
        name,
        link,
        userId,
      });
      
      response.status(201)
        .location(`${request.protocol}://${request.hostname}:${request.socket.localPort}${request.baseUrl}${request.url}/${project.id}`)
        .send();
    } else {
      response.status(400).json({ error: 'Bad Request: Missing required fields' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to update a bug by ID
async function putBug(request, response) {
  try {
    const bugId = request.params.id;
    const { name, status, priority, creationdate, userId, projectId } = request.body;
    
    const bug = await Bugs.findByPk(bugId);
    
    if (bug) {
      bug.name = name;
      bug.status = status;
      bug.priority = priority;
      bug.creationdate = creationdate;
      bug.userId = userId;
      bug.projectId = projectId;
      
      await bug.save();
      
      response.status(200).json(bug);
    } else {
      response.status(404).json({ error: 'Bug not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to update a user by ID
async function putUser(request, response) {
  try {
    const userId = request.params.id;
    const { username, password, usertype } = request.body;
    
    const user = await Users.findByPk(userId);
    
    if (user) {
      user.username = username;
      user.password = password;
      user.usertype = usertype;
      
      await user.save();
      
      response.status(200).json(user);
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to update a project by ID
async function putProject(request, response) {
  try {
    const projectId = request.params.id;
    const { name, link, userId } = request.body;
    
    const project = await Projects.findByPk(projectId);
    
    if (project) {
      project.name = name;
      project.link = link;
      project.userId = userId;
      
      await project.save();
      
      response.status(200).json(project);
    } else {
      response.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to delete a bug by ID
async function deleteBug(request, response) {
  try {
    const bugId = request.params.id;
    const bug = await Bugs.findByPk(bugId);
    
    if (bug) {
      await bug.destroy();
      response.status(202).send();
    } else {
      response.status(404).json({ error: 'Bug not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to delete a user by ID
async function deleteUser(request, response) {
  try {
    const userId = request.params.id;
    const user = await Users.findByPk(userId);
    
    if (user) {
      await user.destroy();
      response.status(202).send();
    } else {
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

// Method to delete a project by ID
async function deleteProject(request, response) {
  try {
    const projectId = request.params.id;
    const project = await Projects.findByPk(projectId);
    
    if (project) {
      await project.destroy();
      response.status(202).send();
    } else {
      response.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

async function authenticateUser(request, response) {
  try {
    const { username, password } = request.body;
    
    const user = await Users.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    
    if (user) {
      response.status(200).json({ success: true, message: 'Autentificare reușită.' });
    } else {
      response.status(401).json({ error: 'Utilizator sau parolă incorecte.' });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
}

module.exports = {
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
  authenticateUser,
};
