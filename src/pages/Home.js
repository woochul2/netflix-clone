import React from 'react';
import JumbotronContainer from '../containers/Jumbotron';
import FaqsContainer from '../containers/Faqs';
import FooterContainer from '../containers/Footer';
import HeaderContainer from '../containers/Header';

export default function Home() {
  return (
    <>
      <HeaderContainer />
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  );
}
