const container = document.querySelector(".container");

function FetchCounriesDetail() {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://restcountries.com/v3.1/all")

    xhr.onprogress = function () {
        // console.log("Loading...")
        // container.innerHTML="<h1>Loaiding...</h1>";
    }

    xhr.onload = function () {

        let data = JSON.parse(this.responseText);
        // console.log(data)
        showdata(data);
    }

    xhr.send();
}
FetchCounriesDetail();

function showdata(data) {
   
    data.map((item) => {
        let capital = []
        item.capital?.forEach((ele) => {
            capital.push(ele+",");
        })


        let card = `
            <div class="card">
                    <img src=${item.flags.png} alt="">
                    <div class="country-detail">
                        <div>
                            <h2>${item?.name?.common}</h2>
                            <h4>${(item?.name?.official)}</h4>
                        </div>
                        <div>
                            <h3>${capital}</h3>
                        </div>
                    </div>
                    <hr />
                    <div class="other">
                        <p><span>Currency:</span>}Dollar($)</p>
                        <p><span>Continent:</span>${item.continents[0]}</p>
                        <p><span>Time-Zone:${item.timezones[0]}</span></p>
                        <p><span>Language:</span>English</p>
                        <p><span>Population:</span>${item.population}</p>
                    </div>
                    <a href=${item.maps.googleMaps} target="_blank"><button>See on map</button></a> 
                </div>
            `
        container.insertAdjacentHTML("beforeend", card);
    })
}

let searchBtn=document.querySelector("#search-btn");

// console.log(inputData);
let searchValue=document.getElementById("search-input" );

function searchCountry(inputValue){
  
    let xhr = new XMLHttpRequest();

    xhr.open("GET", `https://restcountries.com/v3.1/name/${inputValue}`)

    xhr.onprogress = function () {
        container.innerHTML="<h1>Loaiding...</h1>";
    }

    xhr.onload = function () {
        let data = JSON.parse(this.responseText);
        // console.log(data)
        container.innerHTML='';
       
        if(xhr.status===404){
            container.innerHTML="No result Found";
        }
        showdata(data);
        
    }

    xhr.send();

}
searchBtn.addEventListener("click",()=>{
    // console.log("working");
    searchCountry(searchValue.value);
});
