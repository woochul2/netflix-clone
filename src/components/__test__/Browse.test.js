import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import movieGenres from '../../fixtures/movie-genres.json';
import Browse from '../Browse';

describe('Browse', () => {
  beforeAll(() => {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
    };
  });

  it('renders properly', () => {
    render(
      <BrowserRouter>
        <Browse genres={movieGenres} />
      </BrowserRouter>
    );

    screen.getByTestId('header');
    screen.getByTestId('notification');

    movieGenres.forEach((genre) => {
      screen.getByText(genre.name);
    });
  });
});
