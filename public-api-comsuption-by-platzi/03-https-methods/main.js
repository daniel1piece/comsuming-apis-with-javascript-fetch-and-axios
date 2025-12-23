
const API_KEY='live_lp0tqGGVsrzX8hSRnDe9LWjytWRFqB6yDYYkUiD7n50ykbeYKMh4ga4fJcciN60U';
// always add "?" after the endpoint to include query parameters
// Here we are using ?limit=3&page=2
const limit=2;
const page=9;

const RANDOM_API_URL = `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&api_key=${API_KEY}`;
const FAVORITE_API_URL = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
const DELETE_API_URL = (id)  =>`https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

const errorSpan = document.getElementById('error');

const loadRandomMichis = async () => {
                           // Fetch uses the http method GET by default.
   const response =  await fetch(RANDOM_API_URL);
   const catsInfo = await response.json();   
   // console.log(response, ' response object.');
   
   console.log(catsInfo);

   if (response.status !== 200) {
      errorSpan.innerText = 'Huborr un error ' + response.status;
   } else {
      const img1 = document.getElementById('gatito1');
      const img2 = document.getElementById('gatito2');
      const btn1 = document.getElementById('saveFavoriteBtn1');
      const btn2 = document.getElementById('saveFavoriteBtn2');

      img1.src = catsInfo[0].url;
      img2.src = catsInfo[1].url;

      btn1.onclick = () => saveFavoriteMichi(catsInfo[0].id);
      btn2.onclick = () => saveFavoriteMichi(catsInfo[1].id);
   }
}

loadRandomMichis();
document.getElementById('reloadBtn').addEventListener('click', loadRandomMichis);

const loadFavoriteMichis = async () => {
                           // Fetch uses the http method GET by default.
   const response =  await fetch(`${FAVORITE_API_URL}`, 
      {
         method: 'GET',
         headers: {
            'X-API-KEY':API_KEY,
         }
      }
   );
   const data = await response.json();
   console.log(data, 'Favoritos');   

   if (response.status !== 200) {
      errorSpan.innerText = 'Huborr un error ' + response.status;
   } else {
     const section = document.getElementById('favoriteMichis');
     section.innerHTML = '';
     const h2 = document.createElement('h2');
     const h2Text = document.createTextNode('Favorite Kitties');
     h2.appendChild(h2Text);
     section.appendChild(h2);      

     data.forEach(michi => {
      
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');

      btn.onclick = () => deleteFavoriteMichi(michi.id);

      const btnText = document.createTextNode('Sacar al michi de favoritos');

      btn.appendChild(btnText);
      img.src =  michi.image.url;
      article.appendChild(img);
      article.appendChild(btn);

      section.appendChild(article);
     });
   }
   
}

loadFavoriteMichis();

async function saveFavoriteMichi( cat_id ) {

   const rawRequestBody = JSON.stringify({
      // image_id must be a string not a number or other data type.
      "image_id":  `${cat_id}`
   });

   const response = await fetch(FAVORITE_API_URL, {
      method: "POST",
      headers: { 
         // 'x-api-key': API_KEY,
         'Content-Type': 'application/json'
      },
      body: rawRequestBody
   });

   const data = await response.json();
   console.log(data);
   

   if (response.status !== 200) {
      errorSpan.innerText = "There was an error: " + response.status ;      
   } 

   loadFavoriteMichis();

   // console.log(await response.json());
   
}

// saveFavoriteMichi('mo');

async function deleteFavoriteMichi ( cat_id ) {

   const response = await fetch(DELETE_API_URL(cat_id), {
      method: "DELETE"
   });

   const data = await response.json();
   

   if (response.status !== 200) {
      errorSpan.innerText = "There was an error: " + response.status + data.message;      
   }  else {
      console.log('Michi removed from favorites.');    
      loadFavoriteMichis();  
   }
}


