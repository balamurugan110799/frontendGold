import React, { useEffect, useState } from "react";
import PopUp from "../Fields/PopUp";
import Button from "../Fields/Button";
import Input from "../Fields/Inupt";
import DatePicker from "react-datepicker";
import SelectDropDown from "../Fields/SelectDropDown";
import axios from "axios";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

export default function UserTask() {
  const [popUpState, setPopUpState] = useState(false);
  //   const [startDate, setStartDate] = useState(new Date());
  const [action, setAction] = useState("");
  const [enumValue] = useState([
    { id: 0, name: "Boun", value: "boun" },
    { id: 1, name: "Gram", value: "gram" },
  ]);

  const [startDate, setStartDate] = useState(new Date());
  const [getGold, setGetGold] = useState();
  const [gold, setGold] = useState();

  //(startDate)

  const [values, setValues] = useState({
    date: "",
    weight: "",
    total: undefined,
    price: undefined,
    eachPrice: undefined,
    gst: undefined,
  });

  const [errors, setErrors] = useState({
    date: undefined,
    weight: "",
    total: undefined,
    price: undefined,
    eachPrice: undefined,
    gst: undefined,
  });
  const [vaild, setVaild] = useState(true);
  const [vaildation, setVaildation] = useState(false);
  const [, setUpdateId] = useState();
  const [, setClearError] = useState(false);

  const setDate = (date, e) => {
    setStartDate(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const popUpHandler = () => {
    setPopUpState(!popUpState);
    setAction("Add");
  };

  if (vaild === true) {
    values.date = startDate;
    if (values.date === "" || values.date === undefined) {
      errors.date = "Fill the Date";
    } else {
      errors.date = true;
    }

    if (values.weight === "" || values.weight === undefined) {
      errors.weight = "Enter the weight";
    } else {
      errors.weight = true;
    }

    if (values.eachPrice === "" || values.eachPrice === undefined) {
      errors.eachPrice = "Enter the Each Amount";
    } else {
      errors.eachPrice = true;
    }

    if (values.gst === "" || values.gst === undefined) {
      errors.gst = "Enter the GST Amount";
    } else {
      errors.gst = true;
    }

    if (values.price === "" || values.price === undefined) {
      errors.price = "Enter the Total Amount";
    } else {
      errors.price = true;
    }

    if (values.total === "" || values.total === undefined) {
      errors.total = "Enter the Total Amount";
    } else {
      errors.total = true;
    }
  }

  const handleEdit = (v, i) => {
    console.log(v);
    setPopUpState(true);
    setAction("Updates");
    // setValues(v)
    //(v)
    var time = new Date(v.date * 1000);
    setStartDate(time);
    setUpdateId(v?._id);
    values._id = v?._id;
    values.date = Number(v?.date);
    values.weight = v?.weight;
    values.eachPrice = v?.eachPrice;
    values.gst = v?.gst;
    values.price = v?.price;
    values.total = v?.total;
  };

  const updateHandler = (e) => {
    e.preventDefault();
    setVaild(true);
    var date = new Date(startDate);
    var myEcho = date.getTime() / 1000;
    values.date = myEcho;
    axios
      .put(`http://localhost:4000/api/updateGold/${values?._id}`, values)
      .then((res) => {
        ////(res)
        setValues({
          date: "",
          weight: "",
          total: undefined,
          price: undefined,
          eachPrice: undefined,
          gst: undefined,
        });
        setUpdateId("");
        setErrors({
          date: "",
          weight: "",
          total: undefined,
          price: undefined,
          eachPrice: undefined,
          gst: undefined,
        });
        setPopUpState(false);
        getGoldData();
        setStartDate("");
      })
      .catch((err) => {
        ////(err)
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setVaild(true);
    setUpdateId("");
    setVaildation(true);
    const myData = new Date(startDate);
    const echoConvert = myData.getTime() / 1000.0;
    values.date = echoConvert;
    console.log(errors, values);
    if (
      errors.total === true &&
      errors.price === true &&
      errors.gst === true &&
      errors.eachPrice === true &&
      errors.weight === true &&
      errors.date === true
    ) {
      axios
        .post("http://localhost:4000/api/addGold", values)
        .then((res) => {
          ////(res)
          getTotalGold();
          setErrors({
            date: "",
            weight: "",
            total: undefined,
            price: undefined,
            eachPrice: undefined,
            gst: undefined,
          });
          setClearError(true);
          setValues({
            date: "",
            weight: "",
            total: undefined,
            price: undefined,
            eachPrice: undefined,
            gst: undefined,
          });
          setPopUpState(false);
          setStartDate("");
          getGoldData();
        })
        .catch((err) => {
          ////(err)
        });
    }
  };

  const getGoldData = () => {
    axios
      .get("http://localhost:4000/api/getGold")
      .then((res) => {
        ////(res)
        setGetGold(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        ////(err)
      });
  };

  const handleDelete = (v, i) => {
    axios
      .delete(`http://localhost:4000/api/deleteGold/${v?._id}`)
      .then((res) => {
        getGoldData();
        getTotalGold();
      })
      .then((err) => {
        //(err)
      });
  };

  const getTotalGold = () => {
    axios
      .get("http://localhost:4000/api/getGoldCal")
      .then((res) => {
        //(res)
        setGold(res.data);
        getTotalGold();
      })
      .catch((err) => {
        //(err)
      });
  };
  const handleLogout = () =>{
    window.location ="/"
  }

  useEffect(() => {
    getGoldData();
    getTotalGold();
  }, []);

  return (
    <div>
      <div className=" grid grid-cols-4">
        <div className=" sm:hidden lg:h-[100vh] sm:h-[100%]  md:hidden mdsm:hidden lg:block bg-primary p-4">
          <p className=" text-white text-h1 font-semibold">Get Gold Rate </p>
        </div>
        <div className=" col-span-3 sm:col-span-4 p-10">
          <div className=" grid lg:grid-cols-4 smmd:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 py-4">
            <div className=" bg-[#ff5774] rounded-[6px] px-6 py-4">
              <div className=" grid grid-cols-2">
                <div>
                  <div className=" text-h4 text-[#fff]">{gold?.totalGrams}</div>
                  <div className=" text-h5 text-[#fff]">Total Gram</div>
                </div>
              </div>
            </div>

            <div className=" bg-[#9d63a6] rounded-[6px] px-6 py-4">
              <div className=" grid grid-cols-2">
                <div>
                  <div className=" text-h4 text-[#fff]">{gold?.totalBouns}</div>
                  <div className=" text-h5 text-[#fff]">Total Bouns</div>
                </div>
              </div>
            </div>

            <div className=" bg-[#ffbd4c] rounded-[6px] px-6 py-4">
              <div className=" grid grid-cols-2">
                <div>
                  <div className=" text-h4 text-[#fff]">{gold?.totalGold}</div>
                  <div className=" text-h5 text-[#fff]">Total Gold</div>
                </div>
              </div>
            </div>

            <div className=" bg-[#27a79a] rounded-[6px] px-6 py-4">
              <div className=" ">
                <div>
                  <div className=" text-h4 text-[#fff]">
                    {gold?.totalBuyPrize}
                  </div>
                  <div className=" text-h5 text-[#fff]">
                    Total Amount for Gold
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2">
            <div className=" flex">
              <Button
                handleClick={popUpHandler}
                buttonName="Add"
                className="mb-2"
              />
            </div>
            <div className=" flex justify-end">
                
              <Button buttonName="Logout"  handleClick={handleLogout}/>
            </div>
          </div>

          <PopUp
            state={popUpState}
            handleClick={popUpHandler}
            width={"md"}
            actionbar={true}
            title={action}
            // type={popup.type}
            // message={popup.message}
            // handleClick={popUpHandler}
          >
            <div className=" grid grid-cols-2 gap-3 p-4 pb-0">
              <div>
                <label className=" text-primary text-sm font-semibold">
                  Date
                </label>
                <div className="pt-1">
                  <DatePicker
                    id="date"
                    selected={startDate}
                    onChange={(date, e) => setDate(date, e)}
                    className="border p-1  w-full h-[36px] text-sm"
                  />
                  {vaildation ? (
                    <div className="text-[#dd0821] text-tiny pt-1">
                      {" "}
                      {errors.date}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <SelectDropDown
                  setNameOption="Select the Weight"
                  label="Weight"
                  name="weight"
                  className="w-full text-primary"
                  value={values.weight}
                  optionValue={enumValue}
                  id="weight"
                  handleChange={(e) => handleChange(e)}
                />
                {vaildation ? (
                  <div className="text-[#dd0821] text-tiny pt-1">
                    {errors.weight}
                  </div>
                ) : null}
              </div>

              <div>
                <Input
                  type="number"
                  value={values.total}
                  handleChange={(e) => handleChange(e)}
                  label={`${
                    values.weight === "boun"
                      ? "Enter the Boun Weight"
                      : `${
                          values.weight === "gram"
                            ? "Enter the Gram Weight"
                            : "Enter the Gold Weight"
                        } `
                  }  `}
                  name="total"
                />
                {vaildation ? (
                  <div className="text-[#dd0821] text-tiny pt-1">
                    {errors.total}
                  </div>
                ) : null}
              </div>

              <div>
                <Input
                  type="number"
                  label={`${
                    values.weight === "boun"
                      ? "Each Amount of Boun"
                      : `${
                          values.weight === "gram"
                            ? "Each Amount of Gram"
                            : "Enter Amount"
                        } `
                  }  `}
                  value={values.eachPrice}
                  handleChange={(e) => handleChange(e)}
                  name="eachPrice"
                />
                {vaildation ? (
                  <div className="text-[#dd0821] text-tiny pt-1">
                    {errors.eachPrice}
                  </div>
                ) : null}
              </div>

              <div>
                <Input
                  type="number"
                  value={values.price}
                  handleChange={(e) => handleChange(e)}
                  label="Total Amount"
                  name="price"
                />
                {vaildation ? (
                  <div className="text-[#dd0821] text-tiny pt-1">
                    {errors.price}
                  </div>
                ) : null}
              </div>

              <div>
                <Input
                  type="number"
                  value={values.gst}
                  handleChange={(e) => handleChange(e)}
                  label="GST Amount"
                  name="gst"
                />
                {vaildation ? (
                  <div className="text-[#dd0821] text-tiny pt-1">
                    {errors.gst}
                  </div>
                ) : null}
              </div>
            </div>
            <div className=" flex justify-end px-4">
              <Button
                buttonName="Cancel"
                handleClick={popUpHandler}
                className="mx-2 mt-4 mb-4"
              />
              {action === "Add" ? (
                <Button
                  buttonName="Add"
                  handleClick={submitHandler}
                  className="mt-4 mb-4"
                />
              ) : (
                <Button
                  buttonName="Update"
                  handleClick={updateHandler}
                  className="mt-4 mb-4"
                />
              )}
            </div>
          </PopUp>

          <div className=" sm:h-[500px] sm:overflow-auto">
            <table className=" w-full">
              <thead>
                <tr className="bg-primary text-[#fff]">
                  <td className=" px-4 text-left py-2">S.No</td>

                  <td className=" px-4 text-left py-2">Date</td>
                  <td className=" px-4 text-left py-2">Gram/Boun</td>
                  <td className=" px-4 text-center py-2">Total Gold</td>
                  <td className=" px-4 text-left py-2"> 1 Gram/Boun Weight</td>
                  <td className=" px-4 text-left py-2">Price</td>
                  <td className=" px-4 text-left py-2 ">GST</td>
                  <td className=" px-4 text-left py-2 w-[50px]">Edit</td>

                  <td className=" px-4 text-left py-2 text-sm w-[50px]">
                    Delete
                  </td>
                </tr>
              </thead>
              <tbody>
                {getGold?.map((v, i) => {
                  var date = new Date(v.date * 1000);
                  var months = [
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ];
                  var year = date.getFullYear();
                  var month = months[date.getMonth()];
                  var date = date.getDate();
                  var time = date + "/" + month + "/" + year;
                  // ////(i%2)
                  console.log(time);
                  return (
                    <tr className={`${i % 2 === 1 ? "td" : null} `}>
                      <td className=" px-4 text-text-color text-sm py-2">
                        {i}
                      </td>
                      <td className=" px-4 text-text-color text-sm py-2">
                        {time}
                      </td>
                      <td className={` px-4  text-sm py-2`}>
                        <div
                          className={`${
                            v?.weight === "boun"
                              ? "bg-[#fff0cc] text-[#e09d00]"
                              : "bg-[#f9cbbe] text-[#dd0821]"
                          } w-[70px] text-center rounded-[10px]`}
                        >
                          {" "}
                          {v?.weight}
                        </div>
                      </td>
                      <td className=" px-4 text-text-color text-center text-sm py-2">
                        {v?.total}
                      </td>
                      <td className=" px-4 text-text-color text-sm py-2">
                        {v?.eachPrice}
                      </td>
                      <td className=" px-4 text-[#dd0821] text-sm py-2">
                        {v?.price}
                      </td>

                      <td className="  px-4 text-text-color text-sm py-2">
                        {v?.gst}
                      </td>
                      <td className="h-full flex justify-center px-4 text-text-color text-sm py-3 w-[50px]">
                        <HiOutlinePencilAlt
                          onClick={() => handleEdit(v, i)}
                          className="text-[#50933e] hover:text-[#1e6510] duration-300 hover:cursor-pointer"
                        />
                      </td>
                      <td className=" px-8 text-text-color text-sm py-2 w-[50px]">
                        <HiOutlineTrash
                          onClick={() => handleDelete(v, i)}
                          className="hover:text-[#ff554b] hover:cursor-pointer duration-300 text-[#dd0821]"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
