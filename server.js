const { json } = require('express');
const express = require('express'); 
const app = express(); 

app.use(express.json());             
app.use(express.urlencoded());       



let users = [ 
  { id: 1, name: 'Lalit', age: 22 }, 
  { id: 2, name: 'Jayesh', age: 24 }, 
  { id: 3, name: 'Ramila', age:21 },
  { id: 4, name: 'Flora', age:26 },
  { id: 5, name: 'Jit', age:23 },
]; 


http://localhost:3000/
app.get('/', (req, res) => { 
  res.send("Welcome to our server");
}); 

 
http://localhost:3000/users
app.get('/users', (req, res) => { 
  res.json(users); 
}); 



app.get('/users/:id', function(req, res) {
    console.log("User ID " + req.params.id + " requested");
    var userID = req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.send("ERROR: User with ID " + userID + " does not exist");
    }
});


 

app.post('/users', (req, res) => {

  if (req.body === undefined) {
    
    console.log("ERROR: req.body is undefined");
    res.status(400).send("ERROR: req.body is undefined");
  } 
  else {
    
    userData = JSON.stringify(req.body);
    console.log("Adding new user with data: " + userData);

    
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json(newUser); 
  }
  
}); 

 


app.put('/users/:id', (req, res) => { 

  const userId = parseInt(req.params.id); 
  console.log("Update user with ID: " + req.params.id);

  const updatedUser = req.body; 

  users = users.map(user => user.id === userId ? updatedUser : user); 
  res.status(200).json(updatedUser); 
}); 

 


app.delete('/users/:id', (req, res) => { 
  
  const userId = parseInt(req.params.id);

  
  users = users.filter(user => user.id !== userId); 
  res.status(204).send(); 
}); 

 

app.listen(3000, () => { 
  console.log('Server is listening on port 3000'); 
});