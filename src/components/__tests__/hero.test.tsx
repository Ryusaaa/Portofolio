import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Hero } from '../hero'
import { GithubProfile } from '@/types'

// Mock next/image since it doesn't work well in jsdom environment by default
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />
    },
}))

const mockProfile: GithubProfile = {
    login: 'Ryusaaa',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/Ryusaaa',
    name: 'Ryusaaa Name',
    bio: 'Test Bio',
    public_repos: 10,
    followers: 5,
    following: 5,
    created_at: '2020-01-01T00:00:00Z',
    company: null,
    blog: '',
    location: null,
    email: null,
}

describe('Hero Component', () => {
    it('renders profile name correctly', () => {
        render(<Hero profile={mockProfile} />)
        const nameElement = screen.getByText((content) => content.includes('Ryusaaa'.toUpperCase()));
        expect(nameElement).toBeInTheDocument()
    })

    it('renders bio correctly', () => {
        render(<Hero profile={mockProfile} />)
        expect(screen.getByText(/Test Bio/i)).toBeInTheDocument()
    })

    it('renders stats', () => {
        render(<Hero profile={mockProfile} />)
        expect(screen.getByText('10')).toBeInTheDocument() // public_repos
        expect(screen.getByText('5')).toBeInTheDocument() // followers
    })
})
