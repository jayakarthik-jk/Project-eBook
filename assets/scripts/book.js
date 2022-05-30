let url = new URL(window.location.href);
parameters_object = {
  title: url.searchParams.get("title"),
  author: url.searchParams.get("author"),
  description: url.searchParams.get("description"),
  pageCount: url.searchParams.get("pageCount"),
  thumbnail: url.searchParams.get("thumbnail"),
  infoLink: url.searchParams.get("infoLink"),
  publishedDate: url.searchParams.get("publishedDate"),
  averageRating: url.searchParams.get("averageRating"),
};
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
