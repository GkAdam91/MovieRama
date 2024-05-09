<h1>Welcome to movieRama a movie list application.</h1>

functionality
* Listing the currently playing movies in theaters
* Search for movie by name
* click movie to show more details

Please do not judge my design skills. I know it is ugly. 

It is a pure html, css, javascript application. I serve it locally using Live Server Extension in VSCode.
I chose to not use any packages since this wasnt the assignment

API key from TMDB is ommited from the repo 
please provide yours 
(I could have hidden it using an environmental variable somehow but the key would still be visible in the API requests)

<h2>Things I would have done differently: </h2>

Creating reusable html elements proved too cumbersome in comparison with components created with a library like React or Vue. Passing arguments between components needed to be done in string format which would introduce unneeded parsing. 

* I would ideally have created a reusable MovieList element with different show styles like Grid/Row/Column to reuse it in the extended view of a movie or in different screen sizes/ratios.
* I would have spent more time in the MovieCard element creating different, or more beautiful displays of data, while also making it work with different displays.
