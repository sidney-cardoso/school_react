import styled from "styled-components";
import * as colors from "../../config/colors";

export const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 0 10px;

    &:focus {
      outline: 2px solid ${colors.primaryColor};
    }
  }
`;
