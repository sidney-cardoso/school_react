import styled from "styled-components";
import * as colors from "../../config/colors";

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    &:focus {
      outline: 2px solid ${colors.primaryColor};
    }
  }
`;
