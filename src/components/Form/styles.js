import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: 50% 40%;
  padding-top: 10px;

  @media (max-width: 739px) {
    background: none;
    align-items: stretch;
  }
`;

export const Logo = styled.h1`
  color: hsl(358, 90%, 47%);
  text-transform: uppercase;
  font-size: 3rem;
  margin: 0;
  width: 95%;

  @media (max-width: 439px) {
    font-size: 1.6rem;
  }
`;

export const Item = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 50px 70px 100px;
  border-radius: 4px;
  margin-bottom: 100px;

  @media (max-width: 739px) {
    padding: 50px 20px;
  }
`;

export const Title = styled.h1``;

export const Error = styled.p`
  min-width: 260px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(32, 98%, 46%);
  font-size: 0.875rem;
  font-weight: bold;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  min-width: 400px;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 739px) {
    min-width: 300px;
  }
`;

export const InputBox = styled.input`
  outline: none;
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  height: 40px;
  color: hsl(0, 0%, 100%);
  background-color: hsl(0, 0%, 20%);
`;

export const Label = styled.label`
  position: absolute;
  top: ${({ isFocused, value }) => (isFocused || value ? '20%' : '50%')};
  left: 10px;
  font-size: ${({ isFocused, value }) =>
    isFocused || value ? '0.8rem' : '1rem'};
  font-weight: ${({ isFocused, value }) =>
    isFocused || value ? 'bold' : '400'};
  transform: translateY(-50%);
  transition: all 0.1s ease;
  color: hsl(0, 0%, 55%);
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: hsl(357, 92%, 46%);
  padding: 0.8em;
  color: hsl(0, 0%, 100%);
  font-size: 1rem;
  font-weight: bold;
  min-width: 300px;

  &:active {
    background-color: hsl(358, 91%, 40%);
  }

  svg {
    width: 0.8em;
    height: 0.8em;
  }
`;
