import { render, screen } from '@testing-library/react';
import Content from '../Content';
import mockTVShows from '../../mock/tv-shows';
import { BrowserRouter } from 'react-router-dom';

describe('Content', () => {
  beforeAll(() => {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
    };
  });

  it('renders properly', () => {
    const content = mockTVShows.results[0];
    render(
      <BrowserRouter>
        <Content content={content} imgLoaded={true} />
      </BrowserRouter>
    );
    const { name } = content;
    screen.getByLabelText(`${name} 상세 정보 보기`);
    screen.getByAltText(name);
    screen.getByText(name);
  });
});
