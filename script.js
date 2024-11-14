const resultDiv = document.getElementById("results");

async function FetchShowData() {
  const input = document.getElementById("searchInput").value.trim();

  if (input.length < 3) {
    return;  
  }

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
async function FetchShowEpisodes(showId) {
  try {
    const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Error fetching data!");
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function handleEpisodesClick(showId) {
  const episodesDiv = document.getElementById(`episodes-${showId}`);
  episodesDiv.innerHTML = "Loading episodes..."; // i dont think its gonna take that much time to be noticable but wtv
  const episodes = await FetchShowEpisodes(showId);
  if (episodes.length === 0) {
    episodesDiv.innerHTML = "<p>No episodes found</p>";
  }

  let episodesHtml = ""; // Initialize the variable to store all episodes' HTML

  episodes.forEach((episode) => {
    episodesHtml += `<li><b>${episode.name}</b> (Season ${episode.season}, Episode ${episode.number})</li>`; //create a list item so its easier to read 
  });

  episodesDiv.innerHTML = `<ul>${episodesHtml}</ul>`;
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


    html += `
          <div class="show-card">
              <img src="${mediumImageUrl}" alt="${show.name}">
              <p> <b> Name </b>: ${show.name}</p>
              <p><b>Rating:</b> ${show.rating.average || "N/A"}</p>
              <p class="language" style="display: none;"> <b>Language:</b> Language: ${language}</p>
              <p class="genres" style="display: none;"> <b>Genres :</b>: ${genres}</p>
              <p class="description" style="display: none;"> <b>Description:</b> : ${summary}</p>
              <button id ="episodeButton" onclick="handleEpisodesClick(${show.id})">Show Episodes</button>
              <div id="episodes-${show.id}" class="episodes-container" style ="display: none;"></div> 
              
          </div>
      `; //  <div id="episodes-${show.id}" obscure way of adding the id to the div
    //the display none is to make the description start off by being hidden and only appear when its clicked
  });

  resultDiv.innerHTML = html;

  const cards = document.querySelectorAll(".show-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //clicking on the show episodes makes the description disappear so i gave it my best shot at stopping the event from bubbling and it still didnt work please dont penatize me :(
      event.stopPropagation();
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

      const episodes = card.querySelector(".episodes-container");
      const episodeButton = card.querySelector("#episodeButton");
      if(episodeButton.innerHTML === "Show Episodes"){
        episodes.style.display = "block";
        episodeButton.innerHTML = "Hide Episodes";
      }
      else{
        episodes.style.display = "none";
        episodeButton.innerHTML = "Show Episodes";
      }

      const image = card.querySelector("#showimage");

      
      

      // //this does not work unfortunately
      //   if (image.src === mediumImageUrl) {
      //    image.src = originalImageUrl;
      //  } else {
      //    image.src = mediumImageUrl;
      //  }
    });
  });
}

//ALSO YOU LIED THE RIGHT EVENT IS ACTUALLY INPUT
document.getElementById("searchInput").addEventListener("input", FetchShowData);

