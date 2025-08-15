import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

describe('Card Components', () => {
  it('renders Card with children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders CardHeader with children', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('renders CardTitle with children', () => {
    render(<CardTitle>Card Title</CardTitle>)
    expect(screen.getByText('Card Title')).toBeInTheDocument()
  })

  it('renders CardDescription with children', () => {
    render(<CardDescription>Card description</CardDescription>)
    expect(screen.getByText('Card description')).toBeInTheDocument()
  })

  it('renders CardContent with children', () => {
    render(<CardContent>Content here</CardContent>)
    expect(screen.getByText('Content here')).toBeInTheDocument()
  })

  it('renders CardFooter with children', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies custom className to Card', () => {
    render(<Card className="custom-card">Test</Card>)
    const card = screen.getByText('Test').parentElement
    expect(card).toHaveClass('custom-card')
  })
})
