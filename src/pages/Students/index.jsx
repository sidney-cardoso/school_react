import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa'

import { Container } from "../../styles/global";
import { ProfilePicture, StudentContainer } from "./styled";

import axios from '../../services/axios'

function Students() {
    const [students, setStudents] = useState([])
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('/students')
            setStudents(response.data)
        }
        getData()
    }, [])
    
    return (
        <Container>
            <h1>Alunos</h1>
            <StudentContainer>
                {students.map(student => (
                    <div key={String(student.id)}>
                        <ProfilePicture>
                            {get(student, 'Photos[0].url', false) ? (
                                <img src={student.Photos[0].url} alt="" />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{student.name}</span>
                        <span>{student.email}</span>
                        <a href={`/student/${student.id}/edit`}>
                            <FaEdit size={16} />
                        </a>
                        <a href={`/student/${student.id}/delete`}>
                            <FaWindowClose size={16} />
                        </a>
                    </div>
                ))}
            </StudentContainer>
        </Container>
    )
}
export default Students