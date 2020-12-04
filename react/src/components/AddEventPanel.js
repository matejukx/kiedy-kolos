import React, { useEffect, useState } from "react";

const AddEventPanel = ({refreshEvents}) => {
    const API_URL_GET_COURSES = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_courses.php';
    const API_URL_GET_GROUPS = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_groups.php';
    const API_URL_GET_TYPES = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_types.php';
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [types, setTypes] = useState([]);


    const [courseID, setCourseID] = useState(0);
    const [groupID, setGroupID] = useState(0);
    const [typeID, setTypeID] = useState(0);
    const [date, setDate] = useState("2020-12-12");
    const [time, setTime] = useState("12:00");
    const [description, setDescription] = useState("Tu wpisz opis...");
   
    useEffect(() => {
        getCourses();
        getGroups();
        getTypes();
    }, []);

    const getCourses = async () => {
        const response = await fetch(API_URL_GET_COURSES);
        const data = await response.json();
        setCourses(data);
        setCourseID(data[0].id);
    }

    const getGroups = async () => {
        const response = await fetch(API_URL_GET_GROUPS);
        const data = await response.json();
        setGroups(data);
        setGroupID(data[0].id);
    }

    const getTypes = async () => {
        const response = await fetch(API_URL_GET_TYPES);
        const data = await response.json();
        setTypes(data);
        setTypeID(data[0].id);
    }

    const addEvent = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ courseID: courseID, groupID: groupID, time:time, date: date, description: description, typeID: typeID}),
            mode: 'no-cors', // no-cors, cors, *same-origin
        };
        const response = await fetch(`https://aleksanderblaszkiewicz.pl/kiedykolos/add_event.php`, requestOptions);
        console.log(response);
        //refreshEvents();
    }

    const updateCourseID = e => {
        setCourseID(e.target.value);
    }

    const updateDate = e => {
        setDate(e.target.value);
    }

    const updateGroupID = e => {
        setGroupID(e.target.value);
    }

    const updateTime = e => {
        setTime(e.target.value);
    }

    const updateDescription = e => {
        setDescription(e.target.value);
    }

    const updateTypeID = e => {
        setTypeID(e.target.value);
    }

    return(
        <>
            <select name="course" id="course" form="add-event" value={courseID} onChange={updateCourseID}>
            {courses.map(course => (
                <option key={course.id} value={course.id}>
                    {course.name}
                </option>
            ))}
            </select>
            <select name="groupID" id="groupID" form="add-event" value={groupID} onChange={updateGroupID}>
            {groups.map(group => (
                <option key={group.id} value={group.id}>
                    {group.name}
                </option>
            ))}
            </select>
            <select name="typeID" id="typeID" form="add-event" value={typeID} onChange={updateTypeID}>
            {types.map(type => (
                <option key={type.id} value={type.id}>
                    {type.name}
                </option>
            ))}
            </select>
            <input type="date" id="date" name="date" value="2020-11-25" min="2020-11-25" max="2021-12-31" value={date} onChange={updateDate}></input>
            <input type="time" id="time" name="time" min="07:00"  value ="16:00:00" max="21:00" value={time} onChange={updateTime}></input>
            <textarea id="description" name="description" rows="4" cols="50" value={description} onChange={updateDescription}></textarea>
            
            <button onClick={addEvent}>click here</button>
            
        </>
    )
}

export default AddEventPanel;