const url = `https://api.tvmaze.com/search/shows?q=${input}`;

const resultDiv = document.getElementById("results");
async function FetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      resultDiv.innerHTML = "<p> Error fetching data! No illegal shows for you tonight :) </p>";
    }

    const data = await response.json();

    if (data.length === 0) {
      resultDiv.innerHTML = "<p> No shows found </p>";
    }
    DisplayInfo();
  } catch (error) {
    console.log(error);
  }
}
function DisplayInfo() {
  resultDiv.innerHTML = `<p>"Name:${data.show.name}</p>"`;
  resultDiv.innerHTML = `<p>"Rating:${data.show.rating.average}</p>"`;
  resultDiv.innerHTML = `<p>"Description:${data.show.summary}</p>"`;
}
//event listener when user click submit button
document.getElementById("searchInput").addEventListener("input", FetchData);
