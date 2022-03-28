import { fireEvent, render, screen } from '@testing-library/react';
import mockVideos from '../../mock/videos';
import mockTVShows from '../../mock/tv-shows';
import ImgOrVideo from '../ImgOrVideo';

describe('ImgOrVideo', () => {
  let content;
  beforeAll(() => {
    content = { info: mockTVShows.results[0] };
  });

  const setUp = (props) => {
    render(<ImgOrVideo content={content} {...props} />);
  };

  it('renders properly when there is a video', async () => {
    const videos = mockVideos.results;
    const video = videos[0];
    setUp({ videos });
    await screen.findByTitle(video.name);
  });

  it("renders properly when there isn't a video", () => {
    setUp();
    screen.getByAltText(content.info.name);
  });

  it('renders close button when it is open', () => {
    const close = jest.fn();
    setUp({ isOpen: true, close });
    const closeButton = screen.getByLabelText('닫기');
    fireEvent.click(closeButton);
    expect(close).toHaveBeenCalled();
  });
});
