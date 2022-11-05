import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { isEmail } from 'validator'
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../../styles/global";
import { Form } from "./styled";

import Loading from "../../components/Loading";

import * as actions from '../../store/modules/auth/actions'

function Register() {

    const dispatch = useDispatch()

    const id = useSelector(state => state.auth.user.id)
    const nameStored = useSelector(state => state.auth.user.name)
    const emailStored = useSelector(state => state.auth.user.email)
    const isLoading = useSelector(state => state.auth.isLoading)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (!id) return
        setName(nameStored)
        setEmail(emailStored)
    }, [emailStored, id, nameStored])

    const handleSubmit = async e => {
        e.preventDefault()

        let formErrors = false


        if (name.length < 3 || name.length > 255) {
            formErrors = true
            toast.error('Nome deve ter entre 3 e 255 caracteres')
        }
        if (!isEmail(email)) {
            formErrors = true
            toast.error('Email inválido')
        }

        if (!id && (password.length < 5 || password.length > 30)) {
            formErrors = true
            toast.error('Senha deve ter entre 3 e 30 caracteres')
        }

        if (formErrors) return

        dispatch(actions.registerRequest({ name, email, password, id }))

    }
    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>{id ? "Editar dados" : 'Cadastre-se'}</h1>
            <Form onSubmit={handleSubmit} >

                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder="Digite seu nome"
                />

                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    placeholder="Digite seu e-mail"
                />

                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="Digite sua senha"
                />
                <button type="submit">{id ? 'Salvar dados' : 'Criar minha conta'}</button>

            </Form>
        </Container>
    )
}
export default Register