import "./App.css";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
function App() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleClick = async () => {
    try {
      const result = await axios.post("http://localhost:2000/api/user", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      setWalletAddress(result.data);
      setErr(null);
    } catch (err) {
      console.log(err.response.data);
      setErr(err.response.data);
      setWalletAddress(null);
    }
  };
  const [walletaddress, setWalletAddress] = useState();
  const [err, setErr] = useState();
  return (
    <div className="App">
      <h1>Wallet Pratice</h1>
      <div>
        <label htmlFor="name">Name : </label>
        <input type="text" id="name" ref={usernameRef}></input>
      </div>
      <div>
        <label htmlFor="password">Password : </label>
        <input type="text" id="password" ref={passwordRef}></input>
      </div>
      <button onClick={handleClick}>Create Account</button>
      {!err && (
        <div>
          <label>Wallet Address : </label>
          <label>{walletaddress}</label>
        </div>
      )}
      {err && <div>Error : {err}</div>}
    </div>
  );
}

export default App;
