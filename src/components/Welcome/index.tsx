import { useState } from "react";
import LordIcon from "@components/LordIcon";
import Button from "@components/Button";

function Welcome() {
  const [username, setUsername] = useState(""); // State for storing the entered username

  const handleWelcome = () => {
    // No need for dispatch or storing in local storage, just set the state
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <span className="text-2xl font-bold text-text">What's your name?</span>
      <input
        autoFocus
        onChange={(e) => setUsername(e.target.value)} // Handling input change to update the username state
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleWelcome(); // Handling Enter key press to proceed
          }
        }}
        placeholder="Type it here..."
        type="text"
        value={username} // Binding input value to username state
        className="bg-transparent p-1 text-sm text-text outline-none"
      />
      <Button
        disabled={!username} // Disabling button if username is empty
        onClick={handleWelcome} // Handling button click to proceed
        icon={
          <LordIcon
            src="https://cdn.lordicon.com/zmkotitn.json"
            trigger="hover"
            colors={{ primary: "#808080" }}
            size={16}
          />
        }
      />
      {username && <span>Hello, {username}!</span>}
    </div>
  );
}

export default Welcome;  
