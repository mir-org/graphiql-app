import { render, screen } from '@testing-library/react';
import { MockTabs } from './mockData';
import Tabs from '../Tabs';
import userEvent from '@testing-library/user-event';

describe('Test Tabs component', () => {
  it('Component renders passed items count', () => {
    const handleClick = vi.fn();
    render(
      <Tabs tabs={MockTabs} selectedId={MockTabs[0].id} onClick={handleClick} />
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(MockTabs.length);
  });
  it('Component assigns active className for selected list item', () => {
    const handleClick = vi.fn();
    render(
      <Tabs tabs={MockTabs} selectedId={MockTabs[0].id} onClick={handleClick} />
    );
    expect(
      screen.getByText(MockTabs[0].label).className.includes('active')
    ).toBe(true);
  });
  it('Tabs component calls onClick function, when user clicks on tab', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Tabs tabs={MockTabs} selectedId={MockTabs[0].id} onClick={handleClick} />
    );
    await user.click(screen.getByText(MockTabs[0].label));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
