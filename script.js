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
      const summary = show.summary
          ? show.summary.replace(/<[^>]*>/g, "")
          : "No description available";

      html += `
          <div class="show-card">
              <img src="${show.image.medium}" alt="${show.name}">
              <p>Name: ${show.name}</p>
              <p>Rating: ${show.rating.average || "N/A"}</p>
              <p class="description" style="display: none;">Description: ${summary}</p>
          </div>
      `;
  });

  resultDiv.innerHTML = html;

  const cards = document.querySelectorAll(".show-card");
  cards.forEach((card) => {
      card.addEventListener("click", () => {
          const description = card.querySelector(".description");
          description.style.display = description.style.display === "none" ? "block" : "none";
      });
  });
} 

// Keep your input event listener
document.getElementById("searchInput").addEventListener("input", FetchData);
//ALSO YOU LIED THE RIGHT EVENT IS ACTUALLY INPUT
document.getElementById("searchInput").addEventListener("input", FetchData);
