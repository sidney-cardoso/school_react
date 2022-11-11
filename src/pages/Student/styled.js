import styled from "styled-components";
import * as colors from '../../config/colors'


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
export const Title = styled.h1`
    text-align: center;
`

export const ProfilePicture = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 20px;
    position: relative;
    margin-top: 30px;

    img  {
        width: 180px;
        height: 180px;
        border-radius: 50%;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        position: absolute;
        bottom: 0;
        color: #fff;
        background: ${colors.primaryColor};
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
`