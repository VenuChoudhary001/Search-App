import Reddit from './RedditAPI.js';
import reddit from 'url:./images/unnamed.png'


const searchBtn = document.getElementById("search-btn");
const searchForm = document.getElementById("search-form");
const relevance = document.getElementById("relevance");
const latest = document.getElementById("latest");
const limit = document.getElementById("limit");

searchBtn.addEventListener("click", () => {
    // 1.Get Search item
    const searchItem = searchForm.value;
    //  2. Check for search item for not to be null
    const sortBY = document.querySelector("input[name='sortby']:checked").value;
    console.log(sortBY)
    if (searchItem == "" || limit.value == "" || isNaN(limit.value)) {
        searchForm.value = "";
        limit.value = "";
        showMessage("Please enter  valid data ", "alert-danger");
    }
    else {
        document.getElementById('show-data').innerHTML="";
        async function getData(){

       
        const data = await Reddit(searchItem, limit.value, sortBY);
         console.log(data)
      Array.from(data).forEach(element => {
            console.log(element)
         let images=element.preview?element.preview.images[0].source.url:reddit;
        let markup = `
        <div class="card p-2" style="width: 500px; margin:20px;">
            <div class="row no-gutters">
                <div class="col-sm-5">
                    <img class="card-img" src="${images}" alt="..">
                </div>
                <div class="col-sm-7">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${truncateText(element.selftext,100)}</p>
                        <a href="${element.url}" class="btn btn-primary" target="blank">Read More</a>
                        <hr>
                        <span class="badge bg-secondary">Subreddit:${element.subreddit}</span>
                        <span class="badge bg-dark">Score:${element.score}</span>
                    </div>
                </div>

            </div>
        </div>`;
        document.getElementById('show-data').insertAdjacentHTML('afterbegin',markup)
      });
        }

        getData()
    }

})
function truncateText(text,lmt){
    return text.substring(0,lmt)
}

function showMessage(Message, className) {
    // Create a div elemetn
    const div = document.createElement('div');
    //Add class name
    div.className = `alert ${className}`;
    //Add the message
    div.appendChild(document.createTextNode(Message));
    // Get the parent element
    const searchContainer = document.getElementById('search-container');
    //Get the elment above which u need to display
    const search = document.getElementById('search');

    searchContainer.insertBefore(div, search);

    // timeout 
    setTimeout(() => (
        document.querySelector('.alert').remove()
    ), 3000)
}




// Log in And Sign Up

// const logIN=document.getElementById('logIN');
// const signUP=document.getElementById('sign-up');
