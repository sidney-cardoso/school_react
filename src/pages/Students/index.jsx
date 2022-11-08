import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa'

import { Container } from "../../styles/global";
import { ProfilePicture, StudentContainer, NewStudent } from "./styled";
import axios from '../../services/axios'

import Loading from "../../components/Loading";
import { toast } from "react-toastify";

function Students() {
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const response = await axios.get('/students')
            setStudents(response.data)
            setIsLoading(false)
        }
        getData()
    }, [])

    const handleDeleteAsk = e => {
        e.preventDefault()
        const exclamation = e.currentTarget.nextSibling
        exclamation.setAttribute('display', 'block')
        e.currentTarget.remove()
    }
    const handleDelete = async (e, id, index) => {
        e.persist()
        try {
            setIsLoading(true)
            await axios.delete(`/students/${id}`)
            const newStudents = [...students]
            newStudents.splice(index, 1)
            setStudents(newStudents)
            setIsLoading(false)
        } catch (err) {
            const status = get(err, 'response.status', 0)
            if (status == 401) {
                toast.error("Você precisa fazer login!")
            } else {
                toast.error("Um erro desconhecido acaba de ocorrer!")
            }
            setIsLoading(false)
        }
    }
    return (
        <Container>
            <Loading isLoading={isLoading} />

            <h1>Alunos</h1>

            <NewStudent to="/student/">Criar novo aluno</NewStudent>

            <StudentContainer>
                {students.map((student, index) => (
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
                        <Link to={`/student/${student.id}/edit`}>
                            <FaEdit size={16} />
                        </Link>
                        <Link onClick={handleDeleteAsk} to={`/student/${student.id}/delete`}>
                            <FaWindowClose size={16} />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={e => handleDelete(e, student.id, index)}
                        />
                    </div>
                ))}
            </StudentContainer>
        </Container>
    )
}
export default Students