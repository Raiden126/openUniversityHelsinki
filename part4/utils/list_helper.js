const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  },0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((maxLikes, blog) => {
    return blog.likes > maxLikes.likes ? blog : maxLikes;
  }, blogs[0])
}

const mostBlogs = (blogs) => {
	const blogsAuthor = blogs.map(blogs => blogs.author)

	let mode = 
		chain(blogsAuthor)
		.countBy()
		.entries()
		.maxBy(_.last)
		.thru(_.head)
		.value();

	let count = 0;

	blogsAuthor.forEach(element => {
  		if (element === mode) {
    	count += 1;
		}
	})

	return {
		author: mode,
		blogs: count,
	}
}

const mostLikes = (blogs) => {
	const groupedBlogs = _.groupBy(blogs, 'author')
	const countedAuthors = _.map(groupedBlogs, (arr) => { 
		return { 
			author: arr[0].author, 
			likes: _.sumBy(arr, 'likes'), 
		}; 

	})
	const maxLikesAuthor = _.maxBy(countedAuthors, (a) => a.likes)
	const authorName = _.head(_.values(maxLikesAuthor))

	return {
		author: authorName,
		likes: maxLikesAuthor.likes
	}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
	mostLikes
}