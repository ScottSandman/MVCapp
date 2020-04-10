var currentUser;

// Render sign in form. executes signIn()
function renderSignIn() {
  document.getElementById("render").innerHTML = `
        <div class="sign-in">
            <div>
            <label for="in-name">Name:</label>
            <input type="text" id="in-name" />
            <label for="password">Password:</label>
            <input type="password" id="password" />
            <button id="sign-in" onclick="signIn()">Sign In</button>
            </div>
        </div>
    `;
}

// user sign, calls renderUser()
async function signIn() {
  try {
    let username = document.getElementById("in-name").value;
    let url = `http://localhost:3000/user?name=${username}`;
    document.getElementById("render").innerHTML = url;
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    await renderUser(response);
    return await response;
  } catch (error) {
    console.log(error);
  }
}

//user welcome
function renderUser(response) {
  let favorites = response.fav_books_id;
  console.log(favorites);
  currentUser = response;
  console.log(currentUser);
  if (favorites.length > 0) {
    document.getElementById("render").innerHTML = `
      <div class="user">
        <div>Welcome ${response.name}!</div></br>
        <div>Your Favorite Books are Shown Below</div>
        <div id="fav-books"></div>
      </div>
      `;
    for (let i = 0; i < favorites.length; i++) {
      getFavBook(favorites[i]);
    }
  } else {
    document.getElementById("render").innerHTML = `
      <div>
        Welcome ${response.name}!<br />
        You Haven't Selected Any Favorites
      </div>
    `;
  }
}

// Render new user sign up. executes postUser()
function renderSignUp() {
  document.getElementById("render").innerHTML = `
          <div class="sign-in">
              <form>
              <label for="up-name">Name:</label>
              <input type="text" id="up-name">
              <label for="password">Password:</label>
              <input type="password" id="password">
              <button onclick="postUser()">Sign Up</button>
              </form>
          </div>
      `;
}

//get user's favorite books (by id)
async function getFavBook(book_id) {
  try {
    let response = await fetch(`http://localhost:3000/book?_id=${book_id}`);
    response = await response.json();
    await renderFavBook(response);
    return await response;
  } catch (error) {
    console.log(error);
  }
}

async function renderFavBook(response) {
  document.getElementById("fav-books").innerHTML += `
      <div class="book">
        <li id="title${response._id}"></li>
        <li id="author${response._id}"></li>
        <li id="yearPublished${response._id}"></li>
        <li id="publisher${response._id}"></li>
      </div>
        `;
  document.getElementById(`title${response._id}`).innerHTML = response.title;
  document.getElementById(`yearPublished${response._id}`).innerHTML =
    response.yearPublished;
  document.getElementById(`publisher${response._id}`).innerHTML =
    response.publisher;
  document.getElementById(
    `author${response._id}`
  ).innerHTML = await getAuthorByBook(response.author_id);
}

// posts user to database
async function postUser() {
  try {
    let username = await document.getElementById("up-name").value;
    let password = await document.getElementById("password").value;
    const response = await fetch(`http://localhost:3000/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });
    window.location.href = "/";
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

// fetches all authors from database and executes renderAuthors()
function getAuthors() {
  const authors = fetch(`http://localhost:3000/authors`);
  authors
    .then((response) => response.json())
    .then(renderAuthors)
    .catch((err) => console.log(err));
}

// executed by getAuthors(). renders authors to page
function renderAuthors(response) {
  console.log(response);
  document.getElementById("render").innerHTML = "";
  for (let i = 0; i < response.length; i++) {
    document.getElementById("render").innerHTML += `
      <div class="author">
        <div id="${response[i]._id}"></div>
        <button id="getBooks${i}" onclick="getBooksByAuthor('${response[i]._id}')">See Books By This Author</button>
      </div>
        `;
    document.getElementById(`${response[i]._id}`).innerHTML =
      response[i].author;
  }
}

// fetches all books from the database. executes renderBooks()
function getBooks() {
  const books = fetch(`http://localhost:3000/books`);
  books
    .then((response) => response.json())
    .then(renderBooks)
    .catch((err) => console.log(err));
}

//executed by getBooks(). renders books to page
async function renderBooks(response) {
  console.log(response);
  document.getElementById("render").innerHTML = "";
  for (let i = 0; i < response.length; i++) {
    document.getElementById("render").innerHTML += `
        <div class="book">
          <button id="favorites${i}" onclick="addBookToFav(${response[i]._id})">Add to Favorites</button>
          <button id="delete${i}" onclick="deleteBook(${response[i]._id})">Delete Book</button>
          <button id="edit${i}" onclick="renderEditBook(${response[i]._id})">Edit Book</button>
          <li id="title${i}"></li>
          <li id="author${i}"></li>
          <li id="yearPublished${i}"></li>
          <li id="publisher${i}"></li>
        </div>
          `;
    document.getElementById(`title${i}`).innerHTML = response[i].title;
    document.getElementById(`yearPublished${i}`).innerHTML =
      response[i].yearPublished;
    document.getElementById(`publisher${i}`).innerHTML = response[i].publisher;
    document.getElementById(`author${i}`).innerHTML = await getAuthorByBook(
      response[i].author_id
    );
  }
}

// utilized by renderBooks() to fetch the book author by id (author_id)
async function getAuthorByBook(id) {
  try {
    let response = await fetch(`http://localhost:3000/author?_id=${id}`);
    response = await response.json();
    author = await response.author;
    console.log(author);
    return author;
  } catch (error) {
    console.log(error);
  }
}

// fetch books by author
async function getBooksByAuthor(id) {
  try {
    let url = `http://localhost:3000/booksbyauthor?author_id=${id}`;
    console.log(url);
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    await renderBooks(response);
  } catch (error) {
    console.log(error);
  }
}

// delete a specific book by id
async function deleteBook(id) {
  try {
    let url = `http://localhost:3000/book`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    window.location.href = "/";
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// renders form to add book
function renderAddBook() {
  document.getElementById("render").innerHTML = "";
  document.getElementById("render").innerHTML = `
        <div class="add-book">
            <label for="title-input">Title:</label>
            <input type="text" id="title-input">
            <label for="author-input">Author:</label>
            <input type="text" id="author-input">
            <label for="year-input">Publication Year:</label>
            <input type="text" id="year-input">
            <label for="publisher-input">Published By:</label>
            <input type="text" id="publisher-input">
            <button type="submit" onclick="addBook()">Submit Book</button>
        </div>
    `;
}

// uses renderAddBook() to add book to database
async function addBook() {
  try {
    let url = `http://localhost:3000/book`;
    let title = document.getElementById("title-input").value;
    let year = document.getElementById("year-input").value;
    let publisher = document.getElementById("publisher-input").value;
    let author = document.getElementById("author-input").value;
    let authorId = author.substr(author.indexOf(" ") + 1).toLowerCase();
    let bookId =
      Math.floor(Math.random() * 100) +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 1);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: bookId,
        title: title,
        yearPublished: year,
        publisher: publisher,
        author_id: authorId,
      }),
    });
    window.location.href = "/";
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// renders form to edit book
async function renderEditBook(id) {
  try {
    let url = `http://localhost:3000/book?_id=${id}`;
    let response = await fetch(url);
    response = await response.json();
    let author = await getAuthorByBook(response.author_id);
    document.getElementById("render").innerHTML = "";
    document.getElementById("render").innerHTML = `
            <div class="edit-book">
                <input style="display: none;" id="book-id" value="${id}">
                <label for="edit-title">Title:</label>
                <input type="text" id="edit-title" placeholder="${response.title}">
                <label for="edit-author">Author:</label>
                <input type="text" id="edit-author" placeholder="${author}">
                <label for="edit-year">Publication Year:</label>
                <input type="text" id="edit-year" placeholder="${response.yearPublished}">
                <label for="edit-publisher">Publisher:</label>
                <input type="text" id="edit-publisher" placeholder="${response.publisher}">
                <button type="submit" onclick="editBook()">Submit Changes</button>
            </div>
        `;
  } catch (error) {
    console.log(error);
  }
}

//edit book details
async function editBook() {
  //   debugger;
  try {
    let bookId = parseInt(document.getElementById("book-id").value);
    let putObject = { _id: bookId };
    let url = `http://localhost:3000/book?_id=${bookId}`;

    if (document.getElementById("edit-title").value !== "") {
      let title = document.getElementById("edit-title").value;
      putObject.title = title;
    }
    if (document.getElementById("edit-year").value !== "") {
      let year = document.getElementById("edit-year").value;
      putObject.yearPublished = year;
    }
    if (document.getElementById("edit-publisher").value !== "") {
      let publisher = document.getElementById("edit-publisher").value;
      putObject.publisher = publisher;
    }
    if (document.getElementById("edit-author").value !== "") {
      let author = document.getElementById("edit-author").value;
      let author_id = author.substr(author.indexOf(" ") + 1).toLowerCase();
      putObject.author_id = author_id;
    }
    console.log(putObject, url);
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putObject),
    });
    window.location.href = "/";
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// add favorite book to current user, utilizes currentUser global variable
async function addBookToFav(book_id) {
  try {
    let url = `http://localhost:3000/user?id=${currentUser.id}`;
    // let newFavs = currentUser.fav_books_id;
    // newFavs.push(book_id);
    let putObject = {
      id: currentUser.id,
      fav_books_id: { $push: { book_id } },
    };
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putObject),
    });
    alert("Book has been added to your favorites");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
