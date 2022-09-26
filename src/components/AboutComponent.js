import React from "react";
import { useSelector } from "react-redux";

const About = () => {
    const students = useSelector(state => state.student);

    const female = students.filter((student) => student.gender === 'female');
    const male = students.filter((student) => student.gender === 'male');

    return(
        <div>
            <h2> The number of registed students </h2>
            <h2> {students.length}</h2>
            <h2>Female: <span>{female.length}</span></h2>
            <h2>Male: <span>{male.length}</span></h2>
        </div>
    );
}

export default About;