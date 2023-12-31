import logo from "../../assets/img/landingPage/logo1.jpeg";
import dashboard from "../../assets/img/dashboard/dashboard.jpeg";
import reports from "../../assets/img/dashboard/report2_pbl.png";
import patient_history from "../../assets/img/dashboard/patient_history.jpeg";
import consent_manager from "../../assets/img/dashboard/i-icon.jpg";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import logoutimg from "../../assets/img/dashboard/logout.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const PatientProfileSideBar = (props) => {
  const navigate = useNavigate();
  const logout = async () => {
    const res = await fetch("/logout");
    props.settoastCondition({
      status: "success",
      message: "Logged out Successfully!!!",
    });
    props.setToastShow(true);
    navigate("/");
  };
  const [Toggle, setToggle] = useState("Dashboard");

  return (
    <div className="h-screen overflow-y-hidden w-screen grid grid-cols-12">
      <div className="side_bar bg-white shadow col-span-2">
        <div className="flex m-2 mt-4  ">
          <div className="logo m-2  ">
            <img src={logo} className="w-16" alt="logo"></img>
          </div>
          <div className="heading font-poppins font-bold text-m  ">
            <Link to="/">
              <h1>Public health Record System</h1>
            </Link>
          </div>
        </div>
        <nav>
          <Link
            to="/patient/dashboard"
            onClick={() => setToggle("Dashboard")}
            className={
              Toggle === "Dashboard" ? "text-gray-900" : "text-gray-400"
            }
          >
            <div className="flex m-2 mt-8 ">
              <div className="w-6 ml-4  ">
                <img src={dashboard} alt="dashboard"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Dashboard</h1>
              </div>
            </div>
          </Link>

          <Link
            to="/patient/reports"
            onClick={() => setToggle("Reports")}
            className={Toggle === "Reports" ? "text-gray-900" : "text-gray-400"}
          >
            <div className="flex m-2 mt-6  ">
              <div className="w-6 ml-4  ">
                <img src={reports} alt="reports"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Add Report</h1>
              </div>
            </div>
          </Link>

          <div className="p-4">
            <h1 className="font-poppins font-bold text-xl mt-4">Main menu</h1>
            <div className="grid grid-rows-2 gap-4 font-bold font-poppins mt-4">
              <Link
                to="/patient/prescriptions"
                onClick={() => setToggle("Patient_Prescriptions")}
                className={
                  Toggle === "Patient_Prescriptions"
                    ? "text-gray-900 "
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={patient_history}
                    className="w-6"
                    alt="history"
                  ></img>
                  <h1 className="ml-4">Prescription Reports</h1>
                </div>
              </Link>

              <Link
                to="/patient/diagnostics"
                onClick={() => setToggle("Patient_Diagnostics")}
                className={
                  Toggle === "Patient_Diagnostics"
                    ? "text-gray-900 "
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={patient_history}
                    className="w-6"
                    alt="history"
                  ></img>
                  <h1 className="ml-4">Diagnostics Reports</h1>
                </div>
              </Link>

              <Link
                to="/patient/discharge"
                onClick={() => setToggle("Patient_Discharge")}
                className={
                  Toggle === "Patient_Discharge"
                    ? "text-gray-900 "
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={patient_history}
                    className="w-6"
                    alt="history"
                  ></img>
                  <h1 className="ml-4">Discharge Reports</h1>
                </div>
              </Link>

              <Link
                to="/patient/labreports"
                onClick={() => setToggle("Patient_Lab")}
                className={
                  Toggle === "Patient_Lab"
                    ? "text-gray-900 "
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={patient_history}
                    className="w-6"
                    alt="history"
                  ></img>
                  <h1 className="ml-4">Lab Reports</h1>
                </div>
              </Link>

              <Link
                to="/patient/consentManagment"
                onClick={() => setToggle("consent_manager")}
                className={
                  Toggle === "consent_manager"
                    ? "text-gray-900 "
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={consent_manager}
                    className="w-6"
                    alt="Consent Manager"
                  ></img>
                  <h1 className="ml-4">Consent Manager</h1>
                </div>
              </Link>
            </div>
          </div>
        </nav>

        <div className=" mx-auto py-1  mt-24  bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5  ">
          <button className="font-bold  flex items-center" onClick={logout}>
            <img src={logoutimg} className="h-4 px-2 " alt="logout"></img>logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default PatientProfileSideBar;
