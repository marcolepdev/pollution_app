let inputField = document.querySelector('input');
let btn = document.querySelector('#button');
let errorOne = document.querySelector('#message');
let errorContainer = document.querySelector('.message-container');
let logoutButton = document.querySelector('#logout-button');
let airCondition;




// search bar opens up or closes on click
let openSearchBar = document.querySelector('.open_close_search');

openSearchBar.addEventListener('click', function () {

    
    if (document.querySelector('.input-container').style.visibility == 'hidden') {
        document.querySelector('.input-container').style.visibility = 'visible'
    } else {
       document.querySelector('.input-container').style.visibility = 'hidden'
    }
})


//search fires when enter button is pressed on INPUT

inputField.addEventListener('keypress', function(e){
    if(e.key === 'Enter' && inputField.value ==""){
        
        errorOne.style.visibility = 'visible';
        errorOne.textContent = 'Please type a city name';
        document.cursor.style.display = 'none';

    } else if(e.key === 'Enter' && inputField.value != ""){
        btn.onclick();
    }
})

//preventing the page to refresh when logout button is pressed or clicked..
logoutButton.addEventListener('click', function(e){
    e.preventDefault();
})