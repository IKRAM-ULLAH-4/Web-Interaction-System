import { useState } from "react";

function ChangeEvent() {
  const [username, setUsername] = useState("");
  const [key, setKey] = useState("");

  const handleChange = (identifier) => {
    if (identifier == "username") setUsername(e.target.value);
    else setKey(e.target.value);
  };

  return (
    <>
      <form>
        Username :
        <input
          type="text"
          value={username}
          onChange={handleChange("username")}
        />
        Key :
        <input type="text" value={key} onChange={e =>handleChange("key")} />
        <p>{username}</p>
        <p>{key}</p>
      </form>
    </>
  );
}
export default ChangeEvent;
