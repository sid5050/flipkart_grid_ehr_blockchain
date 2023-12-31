import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import profile from "../../assets/img/landingPage/profile.png";
import doctor from "../../assets/img/landingPage/doctor.jpg";
import doctor1 from "../../assets/img/landingPage/doctor1.png";
import patient from "../../assets/img/landingPage/patient1.png";
import ReactLoading from "react-loading";
export default function Login(props) {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [Toggle, setToggle] = useState("Patient");
  const [error, setError] = useState("");
  const [data, setData] = useState({ userID: "", password: "", metaAccount: ""});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [metaAccount, setMetaAccount] = useState(''); // meta mask account

  useEffect(() => {
    const auth = async () => {
      const res = await fetch("/auth");
      const data = await res.json();
      if (data.msg === "Doctor Login Found") {
        navigate("/doctor/dashboard");
      }
      if (data.msg === "Admin Login Found") {
        navigate("/admin/dashboard");
      }
      if (data.msg === "Patient Login Found") {
        navigate("/patient/dashboard");
      }
    };
    auth();
  });

  const handlePatientLogin = async (abhaID, password, metaAccount) => {
    setLoading(true);
    console.log("Pressed Login")
    try {
			const url = "http://localhost:8080/api/auth";
      console.log(data);
			// data.role = selectedtype;
			// alert("Before Login " + data.role);
      data.userID = abhaID;
      data.password = password;
      data.metaAccount = metaAccount;
			const { data: res } = await axios.post(url, data);
      console.log("Here", data);
			console.log("Yo", res);
			localStorage.setItem("token", res.data);
			localStorage.setItem("userID", data.userID);
			// localStorage.setItem("type", data.role);
			// if(localStorage.getItem("type") === "student")
			window.location = "http://localhost:3000/dashboard";
		} catch (error) {
            console.log("Here", error);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
    // const res = await fetch("/api/auth", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     abhaID,
    //     password,
    //   }),
    // });

    // const data = await res.json();

    // if (data.errors) {
    //   setUsernameError(data.errors.abhaID);
    //   setPasswordError(data.errors.password);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    //   props.settoastCondition({
    //     status: "success",
    //     message: "Logged in Successfully!!!",
    //   });
    //   props.setToastShow(true);
    //   navigate("/patient/dashboard");
    // }
  };

  const handleDoctorAdminLogin = async (email, password, metaAccount, path) => {
    setLoading(true);
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        metaAccount
      }),
    });

    const data = await res.json();
    if (data.err) {
      setLoading(false);
      props.settoastCondition({
        status: "error",
        message: "Wrong Credentials!!!",
      });
      props.setToastShow(true);
    } else if (data.errors) {
      setUsernameError(data.errors.abhaID);
      setPasswordError(data.errors.password);
      setLoading(false);
      props.settoastCondition({
        status: "error",
        message: "Wrong Credentials!!!",
      });
      props.setToastShow(true);
    } else {
      setLoading(false);
      props.settoastCondition({
        status: "success",
        message: "Logged in Successfully!!!",
      });
      props.setToastShow(true);
      if (path == "/login/doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    switch (Toggle) {
      case "Patient":
        handlePatientLogin(username, password, metaAccount);
        break;
      case "Doctor":
        handleDoctorAdminLogin(username, password, metaAccount, "/login/doctor");
        break;
      case "Admin":
        handleDoctorAdminLogin(username, password, metaAccount, "/login/admin");
        break;
      default:
        break;
    }
  };
  
  const getAccount = async () => {
    try {
      if(metaAccount != ''){
        setMetaAccount('');
        console.log("meta account removed", metaAccount);
      }
      else{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setMetaAccount(account);
        console.log("meta account added", metaAccount);  
      }
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white flex flex-col justify-items-center items-center py-1 px-4 rounded shadow-md lg:w-3/4 w-full my-7 ml-auto ">
      <h1 className="text-3xl font-bold font-poppins text-primary py-5">
        Login
      </h1>
      <div className="flex bg-bgsecondary w-fit justify-between rounded">
        <button
          className={
            Toggle === "Patient"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          }
          onClick={() => {
            setToggle("Patient");
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
          }}
        >
          Patient
        </button>
        <button
          onClick={() => {
            setToggle("Doctor");
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
          }}
          className={
            Toggle === "Doctor"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          }
        >
          Doctor
        </button>
        <button
          onClick={() => {
            setToggle("Admin");
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
          }}
          className={
            Toggle === "Admin"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          }
        >
          Admin
        </button>
      </div>

      <div>
        {Toggle === "Patient" ? (
          <img className="h-20 my-6 border-2 rounded-full" src={patient} alt="Patient Image" />
        ) : Toggle === "Doctor" ? (
          <img className="h-20 my-6 border-2 rounded-full" src={doctor} alt="Doctor Image" />
        ) : (
          <img className="h-20 my-6 border-2 rounded-full" src={profile} alt="Default Image" />
        )}
      </div>

      <form className="flex flex-col w-full px-8" onSubmit={handleLogin}>
        <label
          htmlFor="email"
          className="font-poppins pt-2 pb-1 text-lg font-bold"
        >
          {Toggle === "Patient" ? "Health Id" : "Email"}
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <span className="text-sm text-red-500">{usernameError}</span>
        <label
          htmlFor="password"
          className="font-poppins pt-6 pb-1 text-lg font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="text-sm text-red-500">{passwordError}</span>

        <div className="pt-4">
          <input
            onClick={getAccount}
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault02"
              required
           />
          <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer text-semibold"
              htmlFor="flexSwitchCheckDefault"
          >Connect to MetaMask Wallet</label>
      </div>

        {Loading ? (
          <div className="flex justify-center items-center py-3">
            <ReactLoading
              type={"bubbles"}
              color={"color"}
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          <button
            type="submit"
            className="text-lg mt-1  bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary"
          >
            Login
          </button>
        )}
      </form>
      <h1 className="font-poppins text-base pt-5">
        New User, <Link to="/Register">Register here</Link>
      </h1>
    </div>
  );
}
