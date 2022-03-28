import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import mockMovies from '../../mock/movies';
import Slider from '../Slider';

describe('Slider', () => {
  beforeAll(() => {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
    };
  });

  it('renders properly', () => {
    const contents = mockMovies.results;
    render(
      <BrowserRouter>
        <Slider contents={contents} />
      </BrowserRouter>
    );
    contents.forEach(({ title }) => {
      screen.getByLabelText(`${title} 상세 정보 보기`);
    });
  });
});
