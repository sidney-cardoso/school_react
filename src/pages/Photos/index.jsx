import React, { useEffect, useState } from "react";
import { get } from 'lodash'
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";


import { Container } from "../../styles/global";
import Loading from '../../components/Loading'
import { Title, Form } from './styled'


import axios from '../../services/axios'
import history from '../../services/history'
import * as actions from '../../store/modules/auth/actions'

function Photos() {
    const dispatch = useDispatch()
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false)
    const [photo, setPhoto] = useState('')

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true)
                const { data } = await axios.get(`/students/${id}`)
                setPhoto(get(data, 'Photo[0].url', ''))
                setIsLoading(false)

            } catch (err) {
                toast.error("Erro ao obter a sua imagem")
                setIsLoading(false)
                history.push('/')
            }
        }
        getData()
    }, [id])

    const handleChange = async e => {
        const file = e.target.files[0];
        const photoURL = URL.createObjectURL(file)

        setPhoto(photoURL)

        const formData = new FormData()
        formData.append('student_id', id)
        formData.append('photo', file)

        try {
            setIsLoading(true)

            await axios.post('/photos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Imagem alterada com sucesso')
            setIsLoading(false)
        } catch (err) {

            setIsLoading(false)
            const { status } = get(err, 'response', '')
            toast.error('Erro ao enviar a imagem')

            if (status == 401) dispatch(actions.login_failure())
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>Fotos</Title>
            <Form>
                <label htmlFor="photo">
                    {photo ? <img src={photo} alt="Photo" /> : 'Selecionar'}
                </label>
                <input type="file" id="photo" onChange={handleChange} />
            </Form>
        </Container>
    )
}
export default Photos