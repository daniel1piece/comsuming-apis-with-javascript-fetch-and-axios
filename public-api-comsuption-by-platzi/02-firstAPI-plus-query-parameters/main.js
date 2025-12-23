
const API_KEY='live_lp0tqGGVsrzX8hSRnDe9LWjytWRFqB6yDYYkUiD7n50ykbeYKMh4ga4fJcciN60U';
// always add ? after the endpoint to include query parameters
// Here we are using ?limit=3&page=2
const limit=3;
const page=2;

const api_url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&api_key=${API_KEY}`;



// function obtenerNuevoGatoDeFormaAleatoria() {
//     fetch(api_url)
//         .then((res)=> {
//             return res.json(); // it returns another promise with the received data as converted in json
//         })
//         .then(data => {
//             const img = document.querySelector('img');
//             img.src = data[0].url;
//         }); // Here we process the second promiss by simply returning the data.
// }

const usingAsyncAwaitToGetRandomCat = async () => {
   const response =  await fetch(api_url);
   const catsInfo = await response.json();   
//    console.log(catsInfo);
   
   const img1 = document.getElementById('gatito1');
   const img2 = document.getElementById('gatito2');
   const img3 = document.getElementById('gatito3');

   img1.src = catsInfo[0].url;
   img2.src = catsInfo[1].url;
   img3.src = catsInfo[2].url;
}

usingAsyncAwaitToGetRandomCat();
document.querySelector('button').addEventListener('click', usingAsyncAwaitToGetRandomCat);