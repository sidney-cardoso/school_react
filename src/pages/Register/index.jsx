import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from 'validator'
import { get } from "lodash";

import { Container } from "../../styles/global";
import { Form } from "./styled";
import axios from '../../services/axios'
import history from '../../services/history'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = async e => {
        e.preventDefault()

        let formErrors = false

        
        if(name.length < 3 || name.length > 255) {
            formErrors = true
            toast.error('Nome deve ter entre 3 e 255 caracteres')
        }
        if(!isEmail(email)) {
            formErrors = true
            toast.error('Email inválido')
        }

        if(password.length < 5 || password.length > 30) {
            formErrors = true
            toast.error('Senha deve ter entre 3 e 30 caracteres')
        }

        if(formErrors) return

        try {
            await axios.post('/users/', {
                name,
                email,
                password
            })

            toast.success('Usuário cadastrado com sucesso')
            history.push('/login')
        } catch (err) {
            const errors = get(err, 'response.data.errors', [])
            errors.map(error => toast.error(error))
        }

    }
    return (
        <Container>
            <h1>Cadastre-se</h1>
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
                <button type="submit">Criar minha conta</button>

            </Form>
        </Container>
    )
}
export default Register