 const url = `https://api.tvmaze.com/search/shows?q=${input}`

 const resultDiv = document.getElementById("results")
async function  FetchData(){
    try{
        const response = await fetch(url);
        if(!response.ok){
            
        }

        const data = await response.json();

        if(data.length===0)
        {
            resultDiv.innerHTML = "<p> No shows found </p>"
        }


        
        

    }
    catch(error){
        console.log(error);
    }

}

//event listener when user click submit button
document.getElementById("searchButton").addEventListener("click", FetchData);

