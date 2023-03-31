import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Hero from "../assets/images/hero.png";

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
    <div className="bg-cover w-screen h-screen flex items-center justify-center" style={{ backgroundImage: `url(${Hero})` }}>
      <div className="card w-96 h-96">
        <div className="card-body rounded-2xl">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
              required
              className="input input-bordered w-full max-w-xs text-center mb-3"
            />
            <div className="card-actions justify-center">
              <button type="submit" className="btn btn-primary w-full">Start</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
