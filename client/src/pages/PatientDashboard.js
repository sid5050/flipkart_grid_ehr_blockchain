import patient_profile from "../assets/img/dashboard/patient2_pbl.png";

import reports from "../assets/img/dashboard/report2_pbl.png";

import search from "../assets/img/dashboard/search2.png";
import Footer from "../components/landingPage/Footer";
import eye from "../assets/img/dashboard/eye.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PatientDashboard = (props) => {
  const navigate = useNavigate();

  const [dob, setDob] = useState("01/01/2006");
  const [patient, setPatient] = useState({
    name: {
      firstName: "Hugo",
      middleName: "Chavier",
      surName: "Boss",
    },
    dob: "01/01/2006",
    mobile: "2876110298",
    email: "hugo@gmail.com",
    adharCard: "123561752781",
    bloodGroup: "O+",
    address: {
      building: "704, Tower A",
      city: "Mumbai",
      taluka: "West",
      district: "Andheri",
      state: "Maharashtra",
      pincode: "176520",
    },
    password: "hugo@boss",
    diseases: [{ disease: "Sugar", yrs: "5" }],
    contactPerson: {
      name: {
        firstName: "Chanel",
        surName: "Dior",
      },
      mobile: "7182092871",
      email: "chanel@gmail.com",
      relation: "Sister",
      address: {
        building: "705, Tower A",
        city: "Mumbai",
        taluka: "West",
        district: "Andheri",
        state: "Maharashtra",
        pincode: "176520",
      },
    },
  });
  const [prescriptions, setPrescriptions] = useState([{}]);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    async function getpatient() {
      const res = await fetch("/getpatient");
      const data = await res.json();
      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setPatient(data.patient);
        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }
      }
    }
    getpatient();
  }, [dob]);

  

  return (
    <div className="full-body col-span-10 h-screen" style={{overflow:'auto'}}>
      <div className="body-without-footer max-h-min bg-bgprimary ">
        <div className=" main ">
          <div className="">
            <div className="flex  h-12 m-2 bg-bgprimary rounded mt-4  ">
              <div>
                <h1 className="text-2xl font-poppins font-bold p-2 ">
                  DashBoard Today
                </h1>
              </div>

              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-white pl-2 rounded ">
                  <img src={search} className=" h-6 mt-2  " alt="search"></img>
                </div>
              </div>

              <Link to="/patient/profile">
                <button className="flex bg-white rounded shadow  px-4  ml-60 h-14 ">
                  <img
                    src={patient_profile}
                    className="h-14 p-1 rounded-2xl"
                    alt="profile"
                  ></img>
                  <div className="mt-4 ml-4  font-bold font-poppins">
                    <h1>{`${patient.name.firstName}  ${patient.name.surName}`}</h1>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="m-4 p-4">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Patient Details
                </h1>
              </div>
              <div className="bg-white font-poppins p-4 mt-4 px-8 rounded-xl shadow">
                <div className="flex">
                  <div>
                    <h1>Name : </h1>
                  </div>
                  <div className="flex ml-2   ">
                    <h1 className="pl-1">{patient.name.firstName}</h1>
                    <h1 className="pl-1">{patient.name.middleName}</h1>
                    <h1 className="pl-1">{patient.name.surName}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Date : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{convertDatetoString(patient.dob)}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Blood group : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{patient.bloodGroup}</h1>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold mt-4">Past Health History</h1>
                  <div>{`${patient.diseases[0].disease} (${patient.diseases[0].yrs} yrs.)`}</div>
                </div>
              </div>
            </div>
            {/* recent health check up start */}
            <div className="m-4 p-4 ">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Recent Health Checkup
                </h1>
              </div>
              {prescriptions.length > 0 ? (
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8">
                  <div className="flex ">
                    <div>
                      <h1>Consultant Doctor :</h1>
                    </div>
                    <div className="ml-2">
                      <h1>{`Dr. ${prescriptions[0].doctor}`}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Date :</h1>
                    </div>
                    <div className="ml-2">
                      <h1>{convertDatetoString(prescriptions[0].createdAt)}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Diagnosis : </h1>
                    </div>
                    <div className="ml-2">
                      <h1>{prescriptions[0].diagnosis}</h1>
                    </div>
                  </div>
                  <Link
                    to="/patient/prescription"
                    onClick={() => {
                      props.setPrescriptionID(prescriptions[0]._id);
                    }}
                  >
                    <div className=" mt-2 flex items-center justify-evenly text-base bg-primary py-1 px-2 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-5/12  ">
                      <img src={reports} className="h-4" alt="report"></img>

                      <button className=" font-semibold pl-1">
                        Preview Prescription
                      </button>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8 flex justify-center font-bold">
                  {" "}
                  No Data Found...{" "}
                </div>
              )}
            </div>
            {/* recent health check up end */}
            <div></div>
          </div>

          <div className="font-poppins px-8">
            <div className="m-r">
              <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

                <div class="min-w-0 rounded-lg shadow overflow-hidden bg-white bg" >
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full bg-rose-500 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold text-rose-500"> Prescription Reports </p>
                      <p class="text-lg font-semibold "> 70 </p>
                    </div>
                  </div>
                </div>
                
                <div class="min-w-0 rounded-lg shadow overflow-hidden bg-white bg" >
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full bg-teal-500 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>

                    </div>
                    <div>
                      <p class="font-bold text-teal-500"> Diagnostics Reports </p>
                      <p class="text-lg font-semibold "> 14 </p>
                    </div>
                  </div>
                </div>
                
                <div class="min-w-0 rounded-lg shadow overflow-hidden bg-white bg" >
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full bg-yellow-400 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold text-yellow-400"> Discharge Reports </p>
                      <p class="text-lg font-semibold"> 8 </p>
                    </div>
                  </div>
                </div>
                
                <div class="min-w-0 rounded-lg shadow overflow-hidden bg-white bg" >
                  <div class="p-4 flex items-center">
                    <div class="p-3 rounded-full bg-sky-500 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>

                    </div>
                    <div>
                      <p class="font-bold text-sky-500"> Laboratory Reports </p>
                      <p class="text-lg font-semibold"> 57 </p>
                    </div>
                  </div>
                </div>

            </div>
            </div>
          </div>

          <div className="font-poppins m-4  ">
            <div className="flex justify-between ml-4">
              <div className="font-bold text-xl ">
                <h1>Patient Dashboard</h1>
              </div>
            </div>
            <div className="bg-white m-4 rounded-lg ">
              <div className="grid grid-rows-2 p-6 gap-2 shadow">
                <div className="grid grid-cols-4 font-bold  ">
                  <div>
                    <h1>Date</h1>
                  </div>
                  <div>
                    <h1>Doctor Name</h1>
                  </div>
                  <div>
                    <h1>Diagnosis</h1>
                  </div>
                  <div>
                    <h1>Prescription</h1>
                  </div>
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                </div>

                {prescriptions.length > 1 ? (
                  prescriptions.slice(1, 3).map((prescription) => {
                    return (
                      <div className="grid grid-cols-4">
                        <div>
                          <h1>{convertDatetoString(prescription.createdAt)}</h1>
                        </div>
                        <div className="flex">
                          <h1>Dr. </h1>
                          <h1>{prescription.doctor}</h1>
                        </div>
                        <div>
                          <h1>{prescription.diagnosis}</h1>
                        </div>
                        <Link
                          to="/patient/prescription"
                          onClick={() =>
                            props.setPrescriptionID(prescription._id)
                          }
                        >
                          <div className=" flex  justify-center bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5   ">
                            <img
                              src={eye}
                              className="h-4 my-auto"
                              alt="preview"
                            ></img>
                            <button className="font-bold ml-2">Preview </button>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="mx-auto mt-3 mb-5">No Records Found...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
