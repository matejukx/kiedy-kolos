import React, { useEffect, useState } from "react";

const AddEventPanel = ({refreshEvents}) => {
    const API_URL_GET_COURSES = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_courses.php';
    const API_URL_GET_GROUPS = 'https://aleksanderblaszkiewicz.pl/kiedykolos/get_groups.php';
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [name, setName] = useState("jezyki programowania");
    const [group, setGroup] = useState("Wszystkie");
    const [date, setDate] = useState("2020-12-12");
  
    useEffect(() => {
        getCourses();
        getGroups();
    }, []);

    const getCourses = async () => {
        const response = await fetch(API_URL_GET_COURSES);
        const data = await response.json();
        setCourses(data);
    }

    const getGroups = async () => {
        const response = await fetch(API_URL_GET_GROUPS);
        const data = await response.json();
        setGroups(data);
    }

    const addEvent = async () => {
        console.log(`Adding event ${name} to date ${date}`)
        const response = await fetch(`https://aleksanderblaszkiewicz.pl/kiedykolos/add_event.php?name=${name}&date=${date}`);
        refreshEvents();
    }

    const updateName = e => {
        setName(e.target.value);
    }

    const updateDate = e => {
        setDate(e.target.value);
    }

    const updateGroup = e => {
        setGroup(e.target.value);
    }

    return(
        <>
            <select name="course" id="course" form="add-event" value={name} onChange={updateName}>
            {courses.map(course => (
                <option key={course.id} value={course.name}>
                    {course.name}
                </option>
            ))}
            </select>
            <select name="group" id="group" form="add-event" value={group} onChange={updateGroup}>
            {groups.map(group => (
                <option key={group.name} value={group.name}>
                    {group.name}
                </option>
            ))}
            </select>
            <input type="date" id="date" name="date" value="2020-11-25" min="2020-11-25" max="2021-12-31" value={date} onChange={updateDate}></input>
            
            <button onClick={addEvent}>click here</button>
            
        </>
    )
}

export default AddEventPanel;