const url = "https://restcountries.com/v3.1/all";
fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.map((element) => {
            const div = document.createElement("div");
            div.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
            let fileLoad = template(element);
            div.innerHTML = fileLoad;
            row.appendChild(div);
        });
    });
const row = document.querySelector(".row");
const btn = document.querySelector("btn");
const template = (country) => {
    const data = `
            <div class="card h-100" >
                <div class="card-header">${country.name.common}</div>
                <div class="card-body">
                    <img class="flags"f src="${country.flags.png}" alt="Country Flag">
                    <div class=align>
                    <p class="card-text"><b>Capital  :  </b>${country.capital}</p>
                    <p class="card-text"><b>Region  :  </b>${country.region}</p>
                    <p class="card-text"><b>Country Code  :  </b> ${country.fifa != undefined ? country.fifa : country.cca3}</p> <br>
                    </div>
                    <button class="btn btn-primary" onclick="weatherBtn([${country.latlng[0]},${country.latlng[1]}],
                        '${country.name.common}')">Click for Weather </button>
                    <p id="load${country.name.common}"></p>
                    </div>
                    </div>`;

    return data;
};

const weatherBtn = (lan, name) => {
    const [lat, lon] = lan;
    const maran = document.getElementById(`load${name}`);
    maran.innerHTML = "Loading...please wait";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9bf59c67c0d408cc5e1c4877f3e4d9d5`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let weatherMsg = `
                        Country : ${data.name}
                        Latitude :  ${lat}   
                        Longitude :  ${lon}
                        Weather  :  ${data.weather[0].description}
                        Wind speed : ${data.wind.speed}
                        Temperature : ${data.main.temp} `;
            alert(weatherMsg);
            maran.innerHTML = "";
        });
};
