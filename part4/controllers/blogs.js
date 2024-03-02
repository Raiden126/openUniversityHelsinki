const blogRouter = require('express').Router();
const express = require('express')
const app = express();
const Blog = require('../models/blog')

app.use(express.json())

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog)
})

blogRouter.post('/', (request, response) => {
  const blog = request.body;

  const blogs = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  })

  blogs
    .save()
    .then(result => {
      response.status(201).json(result)
      console.log(result)
    })
})

module.exports = blogRouter;