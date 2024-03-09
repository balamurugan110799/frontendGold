/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import loginPic from "../Assets/Images/login.png";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error] = useState({
    email: "",
    password: "",
  });
  const [dbMessage] = useState({
    email: "",
    password: "",
  });
  const [check] = useState(true);
  const [validataion, setValidation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    dbMessage.email = "";
    dbMessage.password = "";
  };

  if (check === true) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (data.email === "" || data.email === undefined) {
      error.email = "Enter the Email";
    } else if (!regex.test(data.email)) {
      error.email = "vaild email required";
    } else {
      error.email = true;
    }

    if (data.password === "" || data.password === undefined) {
      error.password = "Enter the Password";
    } else {
      error.password = true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error.email === true && error.password === true) {
      window.location.href = "/user-task";
    }
    setValidation(true);
  };
  return (
    <div>
      <div className="p-16 h-[100vh] sm:p-4 background  bg-secondary">
        <div className=" grid grid-cols-3 smmd:grid-cols-1 sm:grid-cols-1 sm:flex sm:justify-center sm:items-center sm:h-full">
          <div></div>
          <div className="p-8 sm:p-2 ">
            <div className=" bg-white rounded-lg">
              <img src={loginPic} className=" h-[30vh] object-cover" />
              <div className="px-4 pb-4 pt-4">
                <div className="pb-2 ">
                  <div className=" myPoppinsFont text-secondary  tracking-wide text-dashboard text-[20px] font-semibold">
                    User Task
                    <span className="mx-1  tracking-wide text-dashboard myPoppinsFont text-[20px] font-semibold">
                      Login
                    </span>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute top-1 left-1">
                    <div className="h-[30px] file: w-[30px] bg-[#b3d6f4] rounded-[4px] flex justify-center items-center">
                      <RiMailLine className="text-secondary " />
                    </div>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="User Email ID"
                    value={data.email}
                    onChange={(e) => handleChange(e)}
                    className={` ${
                      dbMessage?.email.length > 0
                        ? "border-error"
                        : "border-[#ccc]"
                    } ${
                      error.email.length > 0 && validataion
                        ? "border-error"
                        : "border-[#ccc]"
                    } border placeholder:text-[#9a9a9a] myPoppinsFont duration-300  text-sm rounded-[4px] p-3 pl-10 py-2 text-[#9195a1] w-[100%]`}
                  />
                </div>
                {validataion ? (
                  <span className="text-error text-tiny">{error.email}</span>
                ) : null}
                {error.email.length > 0 ? null : (
                  <span className="text-error text-tiny">
                    {dbMessage?.email}
                  </span>
                )}

                <div className="relative mt-3 mb-3 group">
                  <div className="absolute top-1 left-1">
                    <div className="h-[30px] file: w-[30px] bg-[#b3d6f4] rounded-[4px] flex justify-center items-center">
                      <RiLockPasswordLine className="text-secondary  " />
                    </div>
                  </div>
                  <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => handleChange(e)}
                    className={` ${
                      dbMessage?.password.length > 0
                        ? "border-error"
                        : "border-[#ccc]"
                    } ${
                      error.password.length > 0 && validataion
                        ? "border-error"
                        : "border-[#ccc]"
                    } border placeholder:text-[#9a9a9a] myPoppinsFont duration-300 border-[#ccc] text-sm rounded-[4px] p-3 pl-10 py-2 text-[#9195a1]  w-[100%]`}
                  />
                  {validataion ? (
                    <span className="text-error text-tiny text-left">
                      {error.password}{" "}
                    </span>
                  ) : null}
                  {error.password.length > 0 ? null : (
                    <span className="text-error text-tiny text-left text-3xl font-bold underline">
                      {dbMessage?.password}
                    </span>
                  )}
                </div>

                <div className="flex justify-center mb-0 ">
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="py-2 myPoppinsFont bg-secondary text-[18px] duration-300 tracking-wider hover:bg-dashboard-hover w-full bg-dashboard text-white rounded-[4px]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
