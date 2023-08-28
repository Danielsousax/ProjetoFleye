import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users');
        var usersArray = response.data
        setUsers(usersArray);
    } catch (error) {
        console.log('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const UserList = () => (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>ID: {user.id}</span>
            <span>Name: {user.name}</span>
            <span>Email: {user.email}</span>
            <span>Age: {user.age}</span>
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  const AddUser = () => {
    
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAge, setNewAge] = useState('');

    const handleAddUser  = async () => {
      let newUser = { name: newName, email: newEmail, age: newAge };
      await axios.post('http://localhost:4000/users', newUser)
                  .then(res =>  {
                    console.log("Usuario cadastrado com sucesso");
                    addUser(newUser);
                    setNewName('');
                    setNewEmail('');
                    setNewAge('');
                  })
                  .catch(err => {console.log("Erro no cadastro")});
    };

    return (
      <div className="add-user">
        <h2>Add User</h2>
        
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    );


  };

  const EditUser = () => {

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAge, setNewAge] = useState('');
    
    useEffect(() => {
      if (editingUser) {
        setNewName(editingUser.name);
        setNewEmail(editingUser.email);
        setNewAge(editingUser.age);
      } else {
        setNewName('');
        setNewEmail('');
        setNewAge('');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingUser]);
    

    if (!editingUser) {
      return null;
    }

    const handleUpdateUser = async () => {

      const data = {
        name: newName,
        email: newEmail,
        age: newAge
      }
      console.log(editingUser)

      await axios.put(`http://localhost:4000/users/${editingUser.id}`, data)
                  .then(res => {
                    console.log('Usuario editado');
                    updateUser({
                      ...editingUser,
                      name: newName,
                      email: newEmail,
                      age: newAge
                    });
                    setEditingUser(null);
                  })
                  .catch(err => {
                    console.log(err);
                  });
                  
    };

    return (
      <div className="edit-user">
        <h2>Edit User</h2>
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="New Age"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
        />
        <button onClick={handleUpdateUser}>Update User</button>
        <button onClick={() => setEditingUser(null)}>Cancel</button>
      </div>
    );
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:4000/users/${userId}`)
                  .then(res => {
                    console.log(res);
                    setUsers(users.filter(user => user.id !== userId));
                    setEditingUser(null);
                  })
                  .catch(err => {
                    console.log(err);
                  });
  };

  return (
    <div className="App">
      <header className="App-header">
        <UserList />
        <AddUser />
        <EditUser />
      </header>
    </div>
  );
}


export default App;
