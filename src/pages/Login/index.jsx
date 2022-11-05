import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { isEmail } from 'validator'
import { get } from "lodash";

import { Container } from "../../styles/global";
import { Form } from './styled'
import Loading from "../../components/Loading";


import * as actions from '../../store/modules/auth/actions'

function Login(props) {

    const dispatch = useDispatch()

    const prevPath = get(props, 'location.state.prevPath', '/')

    const isLoading = useSelector(state => state.auth.isLoading)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        let formErrors

        if (!isEmail(email)) {
            formErrors = true
            toast.error('Email inválido!')
        }
        if (password.length < 3 || password.length > 30) {
            formErrors = true
            toast.error('Senha inválida!')
        }
        if (formErrors) return

        dispatch(actions.loginRequest({ email, password, prevPath }))
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />

            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Seu E-mail'
                />

                <label htmlFor="password">Senha: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Sua senha'
                />
                <button type="submit">Fazer login</button>
            </Form>
        </Container>
    )
}
export default Login