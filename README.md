# The-Movie-Database-Project
The-Movie-Database-Project

## Example screenshort

![Screenshot 2021-02-16 at 09 18 26](https://user-images.githubusercontent.com/18338191/108030840-88c4a400-7038-11eb-9c24-eb40f2fda288.png)

This is a simple web application that makes use of the [The MovieDB API](https://developers.themoviedb.org/3/getting-started/introduction) to get and display movies. No complicated functionality here.
I will improve the project over time.

#### The break down
- The Project is in two parts for separation of concerns, the Angular client and the nodejs backend
- The 1st thing to do was to request an API key from [The MovieDB API](https://developers.themoviedb.org/3/getting-started/introduction) to make sure I have access to fetch the movie list.
- Before fetching the movie list, create a navbar with a search-box, login-button, contact-us button, home button.
- Fecth the movie list and display it to the landing page, 9 items per page.
- Create a separate contact-us page to display my details.
- create a login dialog for the user.
- Create 'Add to Favourites' button.
- Create a Nodejs + expressjs server.
- Configure MySQL database locally and link it to the node + express application. 
- Add login endpoints/controller.
- Add movie-favourites endpoints/controller.

#### Tech stack and why the choice
- `Angular` with `typescript` -> currently I am way familiar with Angular than the other js front-end client frameworks and libraries.
- `SCSS` -> scss offers way more features to work with compare to the plain CSS 💅
- `Nodejs` with `express` -> Node is just that good and this was also an up-skilling project for me interms of Nodejs.
- `MySQL` -> rational DB's make's it easry to store and organize data, at least for me 😅

#### How to Clone and Run
- Firstly you will need to clone the project :point_right: `git clone https://github.com/kmodipa/The-Movie-Database-Project.git`.
- Secondly open your iTerm or terminal and navigate to `The-Movie-Database-Project/Front-End/The-Movie-Database-Project/`.
- Thirdly run the command `npm install` to install the packages 📦  that are required to run the application.
- and then run `ng serve --port 4200` to launch the application.
- Now open your browser and got to `http://localhost:4200/` to view.
- That's all 💁.
