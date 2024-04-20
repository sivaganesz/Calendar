import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar = () => {
    const [selectDate, setselectDate] = useState(new Date());

    const daysInMonth = () => {
        const daysArray = [];
        const firstDay = new Date(selectDate.getFullYear(), selectDate.getMonth(), 1)
        const lastDay = new Date(selectDate.getFullYear(), selectDate.getMonth() + 1, 0)

        for (let i = 0; i < firstDay.getDay(); i++) {
            daysArray.push(null);
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            daysArray.push(new Date(selectDate.getFullYear(), selectDate.getMonth(), i));
        }
        return daysArray;
    }

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
    }

    const handleChangeMonth = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setselectDate(new Date(selectDate.getFullYear(), newMonth, 1));
    }

    const handleChangeYear = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setselectDate(new Date(newYear, selectDate.getMonth(), 1));
    }

    return (
        <div className="container flex justify-center w-90 items-center">
            <div className="header border-2 p-3 mt-12 rounded">
                <div className="bg-blue-700 p-2 rounded">
                    <button className="mx-4" onClick={() => { setselectDate(new Date(selectDate.getFullYear(), selectDate.getMonth() - 1, 1)) }}>
                        <FaArrowAltCircleLeft className='text-xl mt-3' />
                    </button>
                    <select className="mx-5 w-24 rounded" value={selectDate.getMonth()} onChange={handleChangeMonth}>
                        {Month.map((month, index) => (<option key={index} value={index} >{month}</option>))}
                    </select>
                    <select className="mx-8 w-24 rounded" value={selectDate.getFullYear()} onChange={handleChangeYear}>
                        {Array.from({ length: 10 }, (_, i) => selectDate.getFullYear() - 5 + i).map((year) => (<option key={year} value={year}>{year}</option>))}
                    </select>
                    <button className="mx-5" onClick={() => { setselectDate(new Date(selectDate.getFullYear(), selectDate.getMonth() + 1, 1)) }}>
                        <FaArrowAltCircleRight className='text-xl mt-3' />
                    </button>
                    <div className="daysOfweek grid grid-cols-7 my-1 mt-5">
                        {dayOfWeek.map((day) => (<p key={day} className='mx-1  border-2 w-12 text-center'>{day}</p>))}
                    </div>
                </div>
                <div className="Days grid grid-cols-7 ml-1 mr-1">
                    {daysInMonth().map((days, index) => (
                        <div key={index} className={`p-2 border-2 cursor-pointer text-center ${days ? (isSameDay(days, new Date()) ? "days bg-red-700 text-slate-100" : "days hover:bg-blue-600 hover:text-white") : "empty bg-f9f9f9"}`}>
                            {days ? days.getDate() : ""}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
