import React from 'react';
import JumbotronContainer from './containers/Jumbotron';
import FaqsContainer from './containers/Faqs';
import FooterContainer from './containers/Footer';

export default function App() {
  return (
    <>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  );
}
