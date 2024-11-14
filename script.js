const resultDiv = document.getElementById("results");

async function FetchData() {
  const input = document.getElementById("searchInput").value.trim();

  if (!input) {
    resultDiv.innerHTML = "<p>Please enter a show name</p>";
    return;
  }

  const url = `https://api.tvmaze.com/search/shows?q=${input}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      resultDiv.innerHTML =
        "<p>Error fetching data! No illegal shows for you tonight :)</p>";
      return;
    }

    const data = await response.json();

    if (data.length === 0) {
      resultDiv.innerHTML = "<p>No shows found</p>";
    } else {
      DisplayInfo(data);
    }
  } catch (error) {
    console.log(error);
    resultDiv.innerHTML = "<p>Something went wrong! Please try again.</p>";
  }
}

function DisplayInfo(data) {
  let html = "";

  data.slice(0, 3).forEach((item) => {
    const show = item.show;
    //obscure line of code but the regex (that is straight out from stack Overflow) is to remove all the trailling signs bcs otherwise its ugly but whatever
    const summary = show.summary
      ? show.summary.replace(/<[^>]*>/g, "")
      : "No description available";
    const mediumImageUrl = show.image.medium || "placeholder-image-url.jpg";
    const language = show.language || "N/A";
    const genres = show.genres.join(", ") || "N/A";

    //const originalImageUrl = show.image?.original || mediumImageUrl;

    html += `
          <div class="show-card">
              <img src="${mediumImageUrl}" alt="${show.name}">
              <p>Name: ${show.name}</p>
              <p>Rating: ${show.rating.average || "N/A"}</p>
              <p class="description" style="display: none;">Description: ${summary}</p>
              <p class="language" style="display: none;">Language: ${language}</p>
              <p class="genres" style="display: none;">Genres: ${genres}</p>
          </div>
      `; //the display none is to make the description start off by being hidden and only appear when its clicked
  });

  resultDiv.innerHTML = html;

  const cards = document.querySelectorAll(".show-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const description = card.querySelector(".description");
      //when the user clicks, if the description was not showing (none), it will show (block), if it was not showing (block) it becomes not showing (none) Crazy logic i know
      if (description.style.display === "none") {
        description.style.display = "block";
      } else {
        description.style.display = "none";
      }

      const language = card.querySelector(".language");
      if (language.style.display === "none") {
        language.style.display = "block";
      } else {
        language.style.display = "none";
      }
      // you know the part where you get the logic right and life is good and youre just copy pasting previous code
      const genres = card.querySelector(".genres");
      if (genres.style.display === "none") {
        genres.style.display = "block";
      } else {
        genres.style.display = "none";
      }







      //this does not work unfortunately 
      //  if (image.src === mediumImageUrl) {
      //   image.src = originalImageUrl;
      // } else {
      //   image.src = mediumImageUrl;
      // }
    });
  });
}

// Keep your input event listener
document.getElementById("searchInput").addEventListener("input", FetchData);
//ALSO YOU LIED THE RIGHT EVENT IS ACTUALLY INPUT
document.getElementById("searchInput").addEventListener("input", FetchData);
