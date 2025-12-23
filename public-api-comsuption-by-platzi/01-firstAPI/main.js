const url = 'https://api.thecatapi.com/v1/images/search';



function obtenerNuevoGatoDeFormaAleatoria() {
    fetch(url)
        .then((res)=> {
            return res.json(); // it returns another promise with the received data as converted in json
        })
        .then(data => {
            const img = document.querySelector('img');
            img.src = data[0].url;
        }); // Here we process the second promiss by simply returning the data.
}

const usingAsyncAwaitToGetRandomCat = async () => {
   const response =  await fetch(url);
   const catInfo = await response.json();   
   const img = document.querySelector('img');
   img.src =  catInfo[0].url;
}

usingAsyncAwaitToGetRandomCat();
document.querySelector('button').addEventListener('click', usingAsyncAwaitToGetRandomCat);