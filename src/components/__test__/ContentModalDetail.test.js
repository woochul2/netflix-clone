import { render, screen } from '@testing-library/react';
import mockVideos from '../../mock/videos';
import ContentModalDetail from '../ContentModalDetail';

describe('ContentModalDetail', () => {
  beforeAll(() => {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
    };
  });

  const setUp = async (props) => {
    const videos = mockVideos.results;
    render(<ContentModalDetail videos={videos} {...props} />);
    await screen.findByTestId('detail-links');
    await screen.findByTestId('overview');
    await screen.findByTestId('videos');
    await screen.findByText('상세 정보');
    await screen.findByText('장르:');
  };

  it('renders properly when variant is tv', async () => {
    await setUp({ variant: 'tv', id: 87739 });
    await screen.findByText('첫 방송 날짜:');
    await screen.findByText('시즌 수:');
    await screen.findByText('회원 평점:');
    await screen.findByText('제작:');
  });

  it('renders properly when variant is movie', async () => {
    await setUp({ variant: 'movie', id: 315635 });
    await screen.findByText('개봉일:');
    await screen.findByText('회원 평점:');
    await screen.findByText('상영 시간:');
    await screen.findByText('제작비:');
  });
});
