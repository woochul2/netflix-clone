import styled from 'styled-components';
import { BasicInputContainer, BasicButtonLink } from '../../common-styles';

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

export const InputContainer = styled(BasicInputContainer)`
  min-width: 500px;
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

  input {
    border: solid 1px hsl(0, 0%, 55%);
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  label {
    @media (max-width: 739px) {
      font-size: 0.875rem;
    }
  }
`;

export const ButtonLink = styled(BasicButtonLink)`
  border-left: 1px solid hsl(0, 0%, 20%);
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 0.6em 0.9em;
  font-size: 1.875rem;

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
