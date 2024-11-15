import '../App.css';
import React, { useState } from 'react';
import UserService from '../Services/UserServ';
import md5 from 'md5';

// Funktion nimi. Huom! On oltava isolla alkukirjaimella
// setMuokkaustila ym. on propseja, jotka tulee UserList-komponentilta, jotta täältä päästään pois.

const UserEdit = ({ setMuokkaustila, setUsers, setMessage, setIsPositive, setShowMessage, muokattavaUser }) => {
  // Tilan eli Staten määritys
  const [newUserId, setNewUserId] = useState(muokattavaUser.userId);
  const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName);
  const [newLastName, setNewLastname] = useState(muokattavaUser.lastName);
  const [newEmail, setNewEmail] = useState(muokattavaUser.email);
  const [newAcceslevelId, setNewAcceslevelId] = useState(muokattavaUser.acceslevelId);
  const [newUsername, setNewUsername] = useState(muokattavaUser.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // onSubmit tapahtumankäsittelijä funktio
  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const updatedUser = {
      userId: newUserId,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      username: newUsername,
      password: newPassword ? md5(newPassword) : muokattavaUser.password,
      acceslevelId: newAcceslevelId,
    };

    UserService.update(updatedUser)
      .then(() => {
        setMessage(`Edited user: ${updatedUser.username}`);
        setIsPositive(true);
        setShowMessage(true);
        setUsers(prevUsers => prevUsers.map(u => (u.userId === updatedUser.userId ? updatedUser : u)));

        setTimeout(() => {
          setShowMessage(false);
        }, 3000);

        setMuokkaustila(false);
      })
      .catch(error => {
        console.error("Error updating user:", error);
        setMessage('Error updating user');
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      });
  };

  return (
    <>
      <h2>User Edit</h2>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="customer-edit-form">
        <div>
          <label htmlFor="userId">User ID</label>
          <input type="text" id="userId" value={newUserId} disabled />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={newFirstName}
            onChange={({ target }) => setNewFirstName(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={newLastName}
            onChange={({ target }) => setNewLastname(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={({ target }) => setNewEmail(target.value)}
          />
        </div>
        <div>
          <label htmlFor="acceslevelId">Access Level ID</label>
          <input
            type="number"
            id="acceslevelId"
            value={newAcceslevelId}
            onChange={({ target }) => setNewAcceslevelId(Number(target.value))}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={({ target }) => setNewUsername(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            required
          />
        </div>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <div style={{ marginTop: '20px' }}>
          <input type='submit' value='Save' style={{ marginRight: '10px', width: '150px',color: 'black' }} />
          <input type='button' value='Cancel'  onClick={() => setMuokkaustila(false)} style={{ marginRight: '10px', width: '150px',color: 'black' }} />
        </div>
      </form>
    </div>
    </>
  );
};

export default UserEdit;