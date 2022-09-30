import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, addLike, user, deleteBlog }) => {
  const hasWriteRights = user.username === blog.user.username
  const detailStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blogdetails" style={detailStyle}>
      <p>Url: {blog.url}</p>
      <p className="likes">
        {blog.likes} Likes
        <button onClick={addLike}>Like</button>
      </p>
      <p>Author {blog.user.name}</p>
      {hasWriteRights && <DeleteButton deleteBlog={deleteBlog} />}
    </div>
  )
}

const DeleteButton = ({ deleteBlog }) => <button onClick={deleteBlog}>delete</button>

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <span className="blogtitle">
        <b>{blog.title}</b>
      </span>{''}
      <span className="blogauthor">{blog.author}</span>{''}
      <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'View'}</button>
      {showDetails ? (
        <BlogDetails blog={blog} addLike={handleLike} user={user} deleteBlog={handleDelete} />
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog