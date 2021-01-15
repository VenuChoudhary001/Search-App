export default async function Reddit(search , limit, sortBY){


    
   const response= await fetch(`http://www.reddit.com/search.json?q=${search}&sort=${sortBY}&limit=${limit}`);
  
   const data= await response.json();
    // console.log(data)
   let local=data.data.children.map(data=>data.data)
//    console.log(local)
    return local;
}