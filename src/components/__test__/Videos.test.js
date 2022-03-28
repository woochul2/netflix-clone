import { render, screen } from '@testing-library/react';
import Videos from '../Videos';
import mockVideos from '../../mock/videos';

describe('Videos', () => {
  beforeAll(() => {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
    };
  });

  it('renders properly', () => {
    render(<Videos videos={mockVideos.results} />);
    screen.getByText('다른 영상');
    screen.getByTitle('퀸스 갬빗 | 곧 넷플릭스에서 | Netflix');
  });
});
