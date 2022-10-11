import React from "react";
import { useDispatch } from "react-redux";

import { Title, Paragraph } from "./styled";
import { Container } from "../../styles/global";
import * as exampleActions from '../../store/modules/example/actions'

function Login() {
    const dispatch = useDispatch()
    const handleClick = (event) => {
        event.preventDefault()

        dispatch(exampleActions.requestClickedButton())
    }
    return (
        <Container>
            <Title>
                Login
                <small> page</small>
            </Title>
            <Paragraph>Lorem ipsum dolor sit amet.</Paragraph>
            <button type="button" onClick={handleClick}>Send</button>
        </Container>
    )
}
export default Login