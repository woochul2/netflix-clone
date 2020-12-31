import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  .person {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.3rem;
  }

  .caret-down {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

export const MenuContainer = styled.div`
  position: absolute;
  top: 1.8rem;
  left: 0.2rem;
  display: flex;
  flex-direction: column;
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: all 0.2s;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 0.75rem;
  right: -2rem;
  border: 0.07rem solid var(--lightest-black);
  padding: 0.8rem 1rem;
  background-color: hsla(0, 0%, 0%, 0.9);
`;

export const MenuItem = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0;
  font-weight: bold;
  font-size: 0.875rem;
  background: none;
  color: var(--white);

  &:hover {
    text-decoration: underline;
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;
