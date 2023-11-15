let searchBar = document.getElementById("search-input");
let container = document.querySelector(".container");
let dataStore;
// console.log(dataStore);

GetData();
function GetData() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://restcountries.com/v3.1/all")

    xhr.onprogress = function () {
        console.log("Loading...")
    }

    xhr.onload = function () {

        let data = JSON.parse(this.responseText);
        // console.log(data)
        showcard(data);
        dataStore = data;
        // filteredData(data);
    }

    xhr.send();
}

// searchBar.addEventListener("keypress",)



function showcard(card) {
    let data = new Set(card)
    // console.log(data);
    // // let container=document.querySelector(".container");
    // data?.forEach((item) =>{
    //     container.insertAdjacentHTML('afterbegin', generateCardHTML(item))
    // }
       
        // container.innerHTML=generateCardHTML(item)
        // container.insertAdjacentHTML("afterbegin",generateCardHTML(item))
    // )

    data.forEach(item=>container.appendChild(item))
    // data.forEach(item=>container.innerHTML+=generateCardHTML(item));
    // card?.map((item)=>{

    //     return container.insertAdjacentHTML("beforeend",generateCardHTML(item));
    // })
}


function generateCardHTML(item) {
    // console.log(item)
    let capital = []
    item.capital?.forEach((ele) => {
        capital.push(ele + ",");
    })
    let card = `
    <div class="card">
            <img src=${item?.flags?.png} alt="">
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
                <p><span>Currency:</span>Dollar($)</p>
                <p><span>Continent:</span>${item.continents}</p>
                <p><span>Time-Zone:${item.timezones}</span></p>
                <p><span>Language:</span>English</p>
                <p><span>Population:</span>${item.population}</p>
            </div>
            <a href=${item.maps.googleMaps} target="_blank"><button>See on map</button></a> 
        </div>
    `
    return card;
}


const NoDataFound = () => {
    let html = `<h1>No data found</h1>`;
    return html;
}


searchBar.addEventListener('keyup', function (e) {

    const currentword = e.target.value;
    console.log(currentword);

    const filteredData = dataStore.filter(o => o.name.common.toLowerCase().includes(currentword));
    console.log(filteredData);
    // let htmldata = 
    container.innerHTML = filteredData.length ? showcard(filteredData) : NoDataFound();
    // container.insertAdjacentHTML("beforeend",htmldata);
});