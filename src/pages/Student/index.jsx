import React, { useEffect, useState } from "react";
import { get } from 'lodash'
import { isEmail, isInt, isFloat } from 'validator'
import PropTypes from 'prop-types'

import { Container } from "../../styles/global";
import { Form } from "./styled";
import { toast } from "react-toastify";
import Loading from '../../components/Loading'
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from '../../store/modules/auth/actions'
import { useDispatch } from "react-redux";


export default function Student({ match }) {
    const dispatch = useDispatch()

    const id = get(match, 'params.id', 0)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        setIsLoading(true)

        const getData = async () => {
            try {
                setIsLoading(true)
                const { data } = await axios.get(`/students/${id}`)
                const Photo = get(data, 'Photos[0].url', '')

                setName(data.name)
                setSurname(data.surname)
                setEmail(data.email)
                setAge(data.age)
                setWeight(data.weight)
                setHeight(data.height)

                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                const status = get(err, 'response.status', 0)
                const errors = get(err, 'response.data.errors', [])

                if (status == 400) errors.map(error => toast.error(error))

                history.push('/')
            }
        }
        getData()
    }, [id])

    const handleSubmit = async e => {
        e.preventDefault()

        let formErrors = false

        if (name.length < 3 || name.length > 255) {
            toast.warn('Nome deve ter entre 3 e 255 caracteres')
            formErrors = true
        }
        if (surname.length < 3 || surname.length > 255) {
            toast.warn('Sobrenome deve ter entre 3 e 255 caracteres')
            formErrors = true
        }
        if (!isEmail(email)) {
            toast.error('E-mail inválido!')
            formErrors = true
        }
        if (!isInt(String(age))) {
            toast.error('Idade inválida!')
            formErrors = true
        }
        if (!isFloat(String(weight))) {
            toast.error('Peso inválido!')
            formErrors = true
        }
        if (!isFloat(String(height))) {
            toast.error('Altura inválida!')
            formErrors = true
        }
        if (formErrors) return

        try {
            setIsLoading(true)
            if (id) {
                await axios.put(`/students/${id}`, {
                    name,
                    surname,
                    email,
                    age,
                    height,
                    weight
                })
                toast.success('Aluno(a) editado(a) com sucesso!')
                history.push('/')
            } else {
                const { data } = await axios.post(`/students`, {
                    name,
                    surname,
                    email,
                    age,
                    height,
                    weight
                })
                toast.success('Aluno(a) criado(a) com sucesso!')
                history.push(`/student/${data.id}/edit`)

            }
            setIsLoading(false)

        } catch (err) {
            const status = get(err, 'response.status', 0)
            const data = get(err, 'response.data', {})
            const errors = get(data, 'errors', [])

            if (errors.length > 0) {
                errors.map(error => toast.error(error))
            } else {
                toast.error('Erro desconhecido')
            }

            if (status === 401) dispatch(actions.loginFailure())
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>{id ? 'Editar aluno' : "Criar novo aluno"}</h1>

            <Form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Digite seu nome"
                    id="name"
                />

                <label htmlFor="surname">Sobrenome:</label>
                <input
                    type="text"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    placeholder="Digite seu sobrenome"
                    id="surname"
                />

                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    id="email"
                />

                <label htmlFor="age">Idade:</label>
                <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="Digite sua idade"
                    id="age"
                />

                <label htmlFor="weight">Peso:</label>
                <input
                    type="text"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    placeholder="Digite seu peso"
                    id="weight"
                />

                <label htmlFor="height">Altura:</label>
                <input
                    type="height"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    placeholder="Digite sua altura"
                    id="height"
                />

                <button type="submit">Salvar</button>

            </Form>
        </Container>
    )
}


Student.propTypes = {
    match: PropTypes.shape({}).isRequired
}