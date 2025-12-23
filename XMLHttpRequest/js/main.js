const characterList = document.getElementById('character-list');

const request = new XMLHttpRequest();

let method = 'GET';
const characterInfo = [];

let data = null;

const createCard = (cardInfo) => {

    // {
    //                 image: character.image,
    //                 name: character.name,
    //                 description: character.description,
    //                 ki: character.ki,
    //                 maxKi: character.maxKi,
    //                 race: character.race
    // }

    const li = document.createElement('li');
    li.classList = 'flex';
    li.innerHTML = `
        <div class="w-80 flex items-center justify-center flex-wrap gap-5 border-1 p-3 rounded-2xl m-2">
            <img src="${cardInfo.image}" class="w-30 h-30">
            <div class="flex gap-5 flex-col justify-center items-center">
                <h5 class="font-bold">${cardInfo.name}</h5>
                <p>${cardInfo.description}</p>
                <ul>
                    <li><strong>Ki:</strong> ${cardInfo.ki}</li>
                    <li><strong>MaxKi:</strong> ${cardInfo.maxKi}</li>
                    <li><strong>Race:</strong> ${cardInfo.race}</li>
                </ul>
            </div>
        </div>
    `;
    
    return li;
        
};


const getACharacter = ( page ) => {
    const url = `https://dragonball-api.com/api/characters/?page=${page}`;
    // the third agument is whether it is async - true or false
    request.open(method, url);
    request.responseType = 'json';
    request.send();    

    request.onload =  () => {
       if (request.status == 200) {
            data =  request.response;   
            const newData = data['items'].map(character => {                                             
                return createCard(character);
            }); 
            
            newData.forEach(element => characterList.appendChild(element));
            
                       
       } else {
           data = "Page not found"; // If the link is broken,
           // output will be page not found.        
       }
    }

}

getACharacter(3);



