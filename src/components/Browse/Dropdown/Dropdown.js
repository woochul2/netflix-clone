import React, { useState } from 'react';
import {
  Container,
  Icon,
  MenuContainer,
  Menu,
  MenuItem,
} from './DropdownStyles';
import { firebase } from '../../../firebase';
import { BsPeopleCircle } from 'react-icons/bs';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';

let isMouseOn = false;

export default function Dropdown() {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
    isMouseOn = true;
  };

  const handleMouseLeave = () => {
    isMouseOn = false;
    setTimeout(() => {
      if (!isMouseOn) {
        setIsActive(false);
      }
    }, 250);
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Icon>
        <BsPeopleCircle className="person" />
        <AiOutlineCaretDown className="caret-down" />
      </Icon>
      <MenuContainer isActive={isActive}>
        <AiOutlineCaretUp />
        <Menu>
          <MenuItem onClick={() => firebase.auth().signOut()}>
            로그아웃
          </MenuItem>
        </Menu>
      </MenuContainer>
    </Container>
  );
}
