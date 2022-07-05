const searchInput = document.getElementById("search");
const results = document.getElementById("results");

let searchTerm = "";
let countries;

// API REQUEST
const fetchCountries = async () => {
  countries = await fetch("https://restcountries.com/v2/region/Africa").then(
    (res) => res.json()
  );
};

//Pour montrer les pays
const showCountries = async () => {
  await fetchCountries();

  results.innerHTML = countries
    .filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(
      (country) =>
        `
          <li class="country-item">
            <img class="country-flag" src="${country.flag}" />
            <h3 class="country-name">${country.name}</h3>>
            <h3 class="country-name" style="font-size:15px">capitale: <br>${
              country.capital
            }</h3>>
            <h3 class="country-name" style="font-size:15px">monnaie: <br>${
              country.currencies[0].name
            }</h3>
            <div class="country-info">
              <h2 class="country-population">${numberWithCommas(
                country.population
              )}</h2>
              <h5 class="country-population-text">Habitants</h5>
            </div>
          </li>
        `
    )
    .join("");
};

showCountries();
// mis en place de l'input
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  showCountries();
});

//pour les espaces sur le nombre d'habitants
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
