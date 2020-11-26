import React, { useEffect, useState } from "react";

const AddEventPanel = ({refreshEvents}) => {
    const API_URL_GET = `http://aleksanderblaszkiewicz.pl/kiedykolos/get_courses.php`;
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState("jezyki programowania");
    const [date, setDate] = useState("2020-12-12");
  
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        const response = await fetch(API_URL_GET);
        const data = await response.json();
        setCourses(data);
    }

    const addEvent = async () => {
        const response = await fetch(`http://aleksanderblaszkiewicz.pl/kiedykolos/add_event.php?name=${name}&date=${date}`);
        refreshEvents();
    }

    const updateName = e => {
        setName(e.target.value);
    }

    const updateDate = e => {
        setDate(e.target.value);
    }

    return(
        <>
            <select name="course" id="course" form="add-event" value={name} onChange={updateName}>
            {courses.map(course => (
                <option key={course.id} value={course.id}>
                    {course.name}
                </option>
            ))}
            </select>
            <input type="date" id="date" name="date" value="2020-11-25" min="2020-11-25" max="2021-12-31" value={date} onChange={updateDate}></input>
            
            <button onClick={addEvent} >click here</button>
            
        </>
    )
}

export default AddEventPanel;