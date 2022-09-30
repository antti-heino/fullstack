import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> component', () => {
  let component
  const mockHandlerUpdate = jest.fn()
  const mockHandlerDelete = jest.fn()

  beforeEach(() => {
    const testUser = {
      name: 'Mock User',
      username: 'mockusername',
    }
    const testBlog = {
      title: 'Mock Title',
      author: 'Mock Author',
      url: 'http://www.mock.com',
      likes: 10,
      user: {
        username: 'mockusername',
      }
    }
    component = render(
      <Blog blog={testBlog} user={testUser} updateBlog={mockHandlerUpdate} deleteBlog={mockHandlerDelete} />
    )
  })

  test('renders content', () => {
    expect(component).toBeDefined()
  })
  test('Blog details are rendered', () => {
    let button = component.getByText('view')
    fireEvent.click(button)
    button = component.getByText('hide')
    expect(button).toBeDefined()
    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).toBeDefined()
  })
  test('Title and Author are rendered', () => {
    const title = component.container.querySelector('.blogtitle')
    const author = component.container.querySelector('.blogauthor')
    expect(title).toBeDefined()
    expect(author).toBeDefined()
    const details = component.container.querySelector('.blogdetails')
    expect(details).toBe(null)
  })
  test('Like handler is called twice if button is clicked twice', () => {
    let viewButton = component.getByText('View')
    fireEvent.click(viewButton)
    let likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
  test('Details are hidden', () => {
    let button = component.getByText('View')
    fireEvent.click(button)
    button = component.getByText('Hide')
    expect(button).toBeDefined()
    fireEvent.click(button)
    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).toBe(null)
  })
})