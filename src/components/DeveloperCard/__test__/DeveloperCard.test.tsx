import { render, screen } from '@testing-library/react';
import { DeveloperCard } from '../DeveloperCard';

const mockDeveloper = {
  firstName: 'John Doe',
  position: 'Frontend Developer',
  biography: 'Mock biography.',
  gitHubLink: 'https://github.com/johndoe',
};

describe('DeveloperCard component', () => {
  it('should render without errors with correct data', () => {
    render(<DeveloperCard data={mockDeveloper} />);
    const avatarImage = screen.getByTestId('avatar') as HTMLImageElement;
    const githubLink = screen.getByText('GitHub') as HTMLAnchorElement;
    expect(screen.getByText(mockDeveloper.firstName)).toBeInTheDocument();
    expect(screen.getByText(mockDeveloper.position)).toBeInTheDocument();
    expect(screen.getByText(mockDeveloper.biography)).toBeInTheDocument();
    expect(avatarImage.alt).toBe(mockDeveloper.firstName);
    expect(githubLink.href).toBe(mockDeveloper.gitHubLink);
  });
});
