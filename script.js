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
    console.log(data);

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
  //slice to only show the first 3 results
  data.slice(0, 3).forEach((item) => {
    const show = item.show;
       // I know this looks obscure so let me break it down to you. Its a ternary operator so it first checks if the show has a summary, if it does it returns the summary ( the regex expression is in fact straight up coming from stackoverflow, its just removing all the html tags so its not ugly when i print the summary you know), if not it returns "No description available"
    const summary = show.summary
      ? show.summary.replace(/<[^>]*>/g, "")
      : "No description available";

    html += `
            <div class="show-card" data-summary="${summary}">
                <img src="${show.image.medium}" alt="${show.name}">
                <p>Name: ${show.name}</p>
                <p>Rating: ${show.rating.average || "N/A"}</p>
            </div>
        `;
  });

  resultDiv.innerHTML = html;

  //**here i am facing a problem, it keeps printing the description everytime i click.**
  let counter = 0; 

  const cards = document.querySelectorAll(".show-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      counter++; //  increment counter everytime its clicked

      // Get the description from the data-summary attribute
      const summary = card.getAttribute("data-summary");

      // Display or hide the description based on whether the counter is even or odd
      if (counter % 2 === 0) {
        // If the click counter is even, display the description
        card.innerHTML = `
                    ${card.innerHTML}
                    <p>Description: ${summary}</p>

                `;
      } else {
        // If the counter is odd, remove the description
        const descriptionElement = card.querySelector("p:last-child");
        if (descriptionElement) {
          descriptionElement.remove(); // Remove the last paragraph (description)
        }
      }
    });
  });
}

// Keep your input event listener
document.getElementById("searchInput").addEventListener("input", FetchData);
//ALSO YOU LIED THE RIGHT EVENT IS ACTUALLY INPUT
document.getElementById("searchInput").addEventListener("input", FetchData);
