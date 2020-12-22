import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  max-width: 950px;
  padding: 50px 5% 0;
  margin: 0 auto;
`;

export const Title = styled.h3`
  font-weight: normal;
  font-size: 1.2rem;
  text-align: center;
  padding: 0 4% 20px;

  @media (max-width: 949px) {
    max-width: 450px;
    font-size: 1.45rem;
    padding-bottom: 12px;
  }

  @media (max-width: 739px) {
    font-size: 1.1rem;
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 949px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  min-width: 500px;
  width: 100%;
  max-width: 500px;

  @media (max-width: 1449px) {
    min-width: 450px;
  }

  @media (max-width: 949px) {
    margin-bottom: 20px;
    height: 60px;
  }

  @media (max-width: 739px) {
    min-width: 300px;
    height: 48px;
  }
`;

export const Input = styled.input`
  outline: none;
  border: solid 1px hsl(0, 0%, 55%);
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  width: 100%;
  padding: 10px;
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

  @media (max-width: 739px) {
    font-size: 0.875rem;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  border-left: 1px solid hsl(0, 0%, 20%);
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: hsl(357, 92%, 46%);
  padding: 0.6em 0.9em;
  color: hsl(0, 0%, 100%);
  font-size: 1.875rem;

  &:active {
    background-color: hsl(358, 91%, 40%);
  }

  svg {
    width: 0.8em;
    height: 0.8em;
  }

  @media (max-width: 1449px) {
    font-size: 1.625rem;
  }

  @media (max-width: 949px) {
    border-radius: 2px;
    font-size: 1rem;
  }
`;
