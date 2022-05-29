let container = document.getElementById("section-book");

window.addEventListener("load", (event) => {
  let url = new URL(window.location.href);
  let query = url.searchParams.get("search");
  document.title += query;
  document.getElementById("query").innerText = query;
  if (query == "" || query == " ") {
    return;
  }
  query = query.trim();
  query = query.replace(" ", "+");
  getBooks(query);
});

function setBookComponent(params) {
  container.innerHTML += params;
}

function getBookComponent(params) {
  params.title = params.title.trim();
  urlparams = `../pages/book.html?title=${params.title}&author=${params.author}&publishedDate=${params.publishedDate}&pageCount=${params.pageCount}&averageRating=${params.averageRating}&thumbnail=${params.thumbnail}&infoLink=${params.infoLink}&description=${params.description}`;
  console.log(params.infoLink);
  return `
  <div class="list-group-item list-group-item-action">
      <div class="row">
        <div class=" col-6 col-sm-4 col-md-3 col-lg-2 p-2">
          <img
            src="${params.thumbnail}"
            alt="Can't load book image"
            width="150"
            height="200"
            id="book-img"
            class="book-img"
            loading="lazy"
          />
        </div>
        <div class="col-6 col-sm-8 col-md-9 col-lg-10 d-flex flex-column">
          <h5 class="p-2">${params.title}</h5>
          <h6 class="p-2">Author : ${params.author}</h6>
          <p class="p-2">Pages : ${params.pageCount}</p>
          <br />
          <a href="${urlparams}" class=" p-2 m-2 mt-auto align-self-end"><button class="btn btn-outline-danger">View Book</button></a>
        </div>
      </div>
      </div>
  `;
}
async function getBooks(params) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle=${params}&country=IN&maxResults=40`
    );
    try {
      const json = await response.json();
      try {
        let bookData = {
          title: undefined,
          author: "",
          description: undefined,
          pageCount: undefined,
          thumbnail: undefined,
          infoLink: undefined,
          publishedDate: undefined,
          averageRating: undefined,
        };
        let no_of_books;
        try {
          if ("totalItems" in json) {
            no_of_books = json.totalItems;
          }
          if ("items" in json) {
            json.items.forEach((book) => {
              if ("volumeInfo" in book) {
                if ("title" in book.volumeInfo) {
                  bookData.title = book.volumeInfo.title;
                } else {
                  return;
                }
                if ("description" in book.volumeInfo) {
                  bookData.description = book.volumeInfo.description;
                } else {
                  return;
                }
                if ("pageCount" in book.volumeInfo) {
                  bookData.pageCount = book.volumeInfo.pageCount;
                } else {
                  return;
                }
                if ("imageLinks" in book.volumeInfo) {
                  bookData.thumbnail = book.volumeInfo.imageLinks.thumbnail;
                } else {
                  return;
                }
                if ("authors" in book.volumeInfo) {
                  bookData.author = "";
                  book.volumeInfo.authors.forEach((author) => {
                    bookData.author += "  " + author;
                  });
                } else {
                  return;
                }
                if ("infoLink" in book.volumeInfo) {
                  bookData.infoLink = book.volumeInfo.infoLink;
                } else {
                  return;
                }
                if ("publishedDate" in book.volumeInfo) {
                  bookData.publishedDate = book.volumeInfo.publishedDate;
                } else {
                  return;
                }
                if ("averageRating" in book.volumeInfo) {
                  bookData.averageRating = book.volumeInfo.averageRating;
                } else {
                  return;
                }
                let component = getBookComponent(bookData);
                setBookComponent(component);
              } else {
                return;
              }
            });
          }
        } catch (error) {
          console.log("Error in books function", error);
          alert("Something went wrong please try again later...");
        }
      } catch (error) {
        console.log("error fetching data from response");
        alert("Something went wrong please try again later...");
      }
    } catch (error) {
      console.log("error converting response into json");
      alert("Something went wrong please try again later...");
    }
  } catch (error) {
    console.log("error getting Response");
    alert("Something went wrong please try again later...");
  }
}
