// components/UserProfile.js
"use client";
import { useState } from "react";

const UserProfile = ({ name, age }) => {
  const [userName, setUserName] = useState(name);

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userName}</p>
      <p>Age: {age}</p>
      <input
        type="text"
        value={userName}
        onChange={handleNameChange}
        placeholder="Update Name"
      />
    </div>
  );
};

export default UserProfile;
