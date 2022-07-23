const url = new URL(window.location.href);
const title = url.searchParams.get("title");
const parameters_object = JSON.parse(sessionStorage.getItem(title));
console.log(parameters_object);
document.title += parameters_object.title;
document.getElementById("title").innerText = parameters_object.title;
document.getElementById("author").innerText = parameters_object.author;
document.getElementById("description").innerText =
  parameters_object.description;
document.getElementById("pageCount").innerText = parameters_object.pageCount;
document.getElementById("publishedDate").innerText =
  parameters_object.publishedDate;
document.getElementById("averageRating").innerText =
  parameters_object.averageRating;
document
  .getElementById("infoLink")
  .setAttribute("href", parameters_object.infoLink + "&source=gbs_api");
document
  .getElementById("thumbnail")
  .setAttribute(
    "src",
    parameters_object.thumbnail +
      "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  );
