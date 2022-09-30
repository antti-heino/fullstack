import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm /> component', () => {
  test('lomake kutsuu propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun blogi luodaan', () => {
    const createBlog = jest.fn()
    const component = render(<BlogForm createBlog={createBlog} />)
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#create-blog-form')

    fireEvent.change(title, {
      target: { value: 'Mock BlogTitle' },
    })
    fireEvent.change(author, {
      target: { value: 'Mock BlogAuthor' },
    })
    fireEvent.change(url, {
      target: { value: 'Mock BlogUrl' },
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Mock BlogTitle')
    expect(createBlog.mock.calls[0][0].author).toBe('Mock BlogAuthor')
    expect(createBlog.mock.calls[0][0].url).toBe('Mock BlogUrl')
  })
})