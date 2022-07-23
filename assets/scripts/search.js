const container = document.getElementById("section-book");
const loading = document.getElementById("animation-container");
const notfound = document.getElementById("notfound");

window.addEventListener("load", (event) => {
  let url = new URL(window.location.href);
  let query = url.searchParams.get("search");
  if (query == "" || query == " ") {
    return;
  }
  document.title += query;
  document.getElementById("query").innerText = query;
  query = query.trim();
  query = query.replace(" ", "+");
  getBooks(query);
});

function setBookComponent(params) {
  container.innerHTML += params;
}

function getBookComponent(params) {
  params.title = params.title.trim();
  urlparams = `../pages/book.html?title=${params.title}`;
  sessionStorage.setItem(params.title, JSON.stringify(params));
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
            class="book-img img-thumbnail rounded"
            loading="lazy"
          />
        </div>
        <div class="col-6 col-sm-8 col-md-9 col-lg-10 d-flex flex-column">
          <h5 class="p-2 fw-semibold">${params.title}</h5>
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
          title: "Not Available",
          author: "",
          description: "Not Available",
          pageCount: "Not Available",
          thumbnail: null,
          infoLink: null,
          publishedDate: "Not Available",
          averageRating: "Not Available ",
        };
        let component = "";
        try {
          if ("items" in json) {
            json.items.forEach((book) => {
              if ("volumeInfo" in book) {
                if ("title" in book.volumeInfo) {
                  bookData.title = book.volumeInfo.title;
                }
                if ("description" in book.volumeInfo) {
                  bookData.description = book.volumeInfo.description;
                }
                if ("pageCount" in book.volumeInfo) {
                  bookData.pageCount = book.volumeInfo.pageCount;
                }
                if ("imageLinks" in book.volumeInfo) {
                  bookData.thumbnail = book.volumeInfo.imageLinks.thumbnail;
                }
                if ("authors" in book.volumeInfo) {
                  bookData.author = "";
                  book.volumeInfo.authors.forEach((author) => {
                    bookData.author += "  " + author;
                  });
                }
                if ("infoLink" in book.volumeInfo) {
                  bookData.infoLink = book.volumeInfo.infoLink;
                }
                if ("publishedDate" in book.volumeInfo) {
                  bookData.publishedDate = book.volumeInfo.publishedDate;
                }
                if ("averageRating" in book.volumeInfo) {
                  bookData.averageRating = book.volumeInfo.averageRating;
                }
                component += getBookComponent(bookData);
                loading.style.display = "none";
              }
            });
          }
          setBookComponent(component);
        } catch (error) {
          loading.style.display = "none";
          notfound.style.display = "flex";
          console.log("Error in books function", error);
          alert("Something went wrong please try again later...");
        }
      } catch (error) {
        loading.style.display = "none";
        notfound.style.display = "flex";
        console.log("error fetching data from response");
        alert("Something went wrong please try again later...");
      }
    } catch (error) {
      loading.style.display = "none";
      notfound.style.display = "flex";
      console.log("error converting response into json");
      alert("Something went wrong please try again later...");
    }
  } catch (error) {
    loading.style.display = "none";
    notfound.style.display = "flex";
    console.log("error getting Response");
    alert("Something went wrong please try again later...");
  }
}
