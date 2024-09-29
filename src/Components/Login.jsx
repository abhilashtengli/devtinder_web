import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/Constants";

const Login = () => {
  const [emailId, setEmailId] = useState("mahesh@gmail.com");
  const [password, setPassword] = useState("Mahesh@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
        // To save token in cookies you need this
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      // console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center my-16">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Login!</h2>
            <div>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Email Id</span>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <p className="text-lg text-red-600">{error}</p>
            <div className="card-actions justify-center mt-5">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
