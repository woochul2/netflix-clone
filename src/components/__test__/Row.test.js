import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Row from '../Row';

describe('Row', () => {
  beforeAll(() => {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
    };
  });

  it('renders properly', async () => {
    const genre = { id: 18, name: '드라마' };
    render(
      <BrowserRouter>
        <Row variant="tv" genre={genre} sliderContentCount={2} />
      </BrowserRouter>
    );
    screen.getByText(genre.name);
    const nextButton = await screen.findByLabelText('콘텐츠 더 보기');
    fireEvent.click(nextButton);
    screen.getByLabelText('이전 콘텐츠 보기');
  });
});
