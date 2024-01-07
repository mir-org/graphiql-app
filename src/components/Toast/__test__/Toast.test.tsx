import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toast from '../Toast';

describe('Toast component tests', () => {
  it('Toast component is rendered without errors', () => {
    const clickHandler = vi.fn();
    render(
      <Toast imgPath="path-to-img" onClose={clickHandler}>
        child-text
      </Toast>
    );
  });
  it('Toast component is rendered with correct children', () => {
    const clickHandler = vi.fn();
    const childText = 'child-text';
    render(
      <Toast imgPath="path-to-img" onClose={clickHandler}>
        {childText}
      </Toast>
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
  it('Toast component is rendered with correct img', () => {
    const clickHandler = vi.fn();
    const imgPath = 'path-to-img';
    const altText = 'toast-img';
    render(
      <Toast imgPath={imgPath} onClose={clickHandler}>
        child-text
      </Toast>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', 'path-to-img');
    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });
  it('Toast component calls onClose function, when CloseButton is clicked', async () => {
    const user = userEvent.setup();
    const clickHandler = vi.fn();
    render(
      <Toast imgPath="path-to-img" onClose={clickHandler}>
        child-text
      </Toast>
    );
    const closeBtn = screen.getByRole('button');
    await user.click(closeBtn);
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
