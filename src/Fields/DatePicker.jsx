import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerComponents(props) {
    return (
        <div>
            <label className="block my-2">{props.label}</label>
            <DatePicker className="border" selected={props.selected} onChange={(e) => props.handleChange(e)} />
        </div>
    )
}

export default DatePickerComponents