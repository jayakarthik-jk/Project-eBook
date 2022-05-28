let container = document.getElementById("section-book");

window.addEventListener("load", (event) => {
  let url = new URL(window.location.href);
  let query = url.searchParams.get("search");
  document.title += query;
  if (query == "" || query == " ") {
    return;
  }
  query = query.trim();
  query = query.replace(" ", "+");
  getBooks(query);
});

function setBookComponent(params) {
  container.innerHTML = container.innerHTML + params;
  document.querySelectorAll(".card-book").forEach((card) => {
    let img = card.children[0].children[0];
    let details = card.children[1];
    details.style.display = "none";
    img.addEventListener("click", () => {
      if (details.style.display == "none") {
        card.style.display = "flex";
        details.style.display = "block";
      } else {
        card.style.display = "inline-flex";
        details.style.display = "none";
      }
    });
  });
}

function getBookComponent(params) {
  params.title = params.title.trim();
  return `
    <div class="card-book" id="card-book">
    <div class="col-2">
      <img
        src="${params.thumbnail}"
        alt="Can't load book image"
        width="150"
        height="200"
        id="book-img"
        loading="lazy"
      />
    </div>
    <div class="col-10 card-details" id="card-details">
      <p><b>${params.title}</b></p>
      <p><b>${params.author}</b></p>
      <p>Description${params.description}</p>
      <p>Total Pages - ${params.pageCount}</p>
    </div>
  </div>
  `;
}

async function getBooks(params) {
  try {
    container.innerHTML = "";
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${params}&country=IN&maxResults=40`
    );
    try {
      const json = await response.json();
      try {
        let bookData = {
          title: undefined,
          subtitle: undefined,
          author: "",
          description: undefined,
          pageCount: undefined,
          thumbnail: undefined,
          infoLink: undefined,
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
                if ("subtitle" in book.volumeInfo) {
                  bookData.subtitle = book.volumeInfo.subtitle;
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
                  book.volumeInfo.authors.forEach((author) => {
                    bookData.author += "\t" + author;
                  });
                } else {
                  return;
                }
                if ("infoLink" in book.volumeInfo) {
                  bookData.infoLink = book.volumeInfo.infoLink;
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
