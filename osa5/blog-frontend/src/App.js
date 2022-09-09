import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import SuccessMessage from './components/Success';
import ErrorMessage from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null)
  const [title, setTitle]=  useState("");
  const [author, setAuthor]=  useState("");
  const [url, setUrl]=  useState("");

  const logout = (event)=>{
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    
  }
  const handlelogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleBlog = async (event) =>{
    event.preventDefault();
    const blog ={
      title: title,
      author: author,
      url:url
    }

  const savedBlog = await blogService.createNew(blog)
    setSuccessMessage(`a new blog ${title} by ${author} is added`)
    setTimeout(()=>{
      setSuccessMessage(null)
    },5000)
    setBlogs(blogs.concat(savedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const loginForm = ()=>(
    <form onSubmit={handlelogin}>
      <div>
        Username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = ()=>(
    <form onSubmit={handleBlog}>
      <div>
        title
        <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author
        <input type="author" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url
        <input type="url" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const authenticatedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (authenticatedUser) {
      const user = JSON.parse(authenticatedUser)
      setUser(user)
    }
  }, [])
 

  if (user === null) {
    return (<div>
      <h2>Log in to the application</h2>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loginForm()}
    </div>)
  }
  return (
    <div>
      <h2>blogs</h2>
      <SuccessMessage message={successMessage} />
      <p>{user.name} is logged in <button onClick={logout}> logout</button></p>
      <h2>create new blog</h2>
      {addBlog()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;