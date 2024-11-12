async function  FetchData(){
    try{
        const url = `https://api.tvmaze.com/search/shows?q=${input}`
        const response = await fetch(url);
        
        
        

    }
    catch(error){
        console.log(error);
    }

}