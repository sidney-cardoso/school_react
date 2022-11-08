import styled from "styled-components";



export const Form = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: .7rem;

    label {
        font-weight: 600;
        font-size: 18px;
        color: #313238;
    }

    input {
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 0 10px;
    }

`;