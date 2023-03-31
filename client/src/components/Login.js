import "../styling/login.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:5000/api/findorcreateuser", {
      username: username,
    }).then(res => {
      navigate("/dashboard", { state: { username: username, score: res.data[0].score } });
    }).catch(error => {
      console.log(error);
    })
  };

  return (
    <div className="login-body">
      <Header />
      <div className="login-body-content">
        <div>
          <form className="login" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
              required
            />
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
