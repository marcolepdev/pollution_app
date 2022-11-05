let inputField = document.querySelector('input');
let btn = document.querySelector('#button');
let errorOne = document.querySelector('#message');
let errorContainer = document.querySelector('.message-container');
let logoutButton = document.querySelector('#logout-button');
let airCondition;


btn.onclick = async function getData() {

    if (inputField.value == '') {

        errorOne.style.visibility = 'visible';
        errorOne.textContent = 'Please type a city name';

    } else {
        errorOne.style.visibility = 'visible';
        errorOne.textContent = 'Loading, please wait...';


    let city = document.querySelector('#city').value;

    const api_key = '';


    //API CALL  with axios                   
    axios.get(`https://api.waqi.info/feed/${city}/?token=${api_key}`)

        .then(

            async response => {

                let data = await response.data
                

                //if the request can't be processed (city is not found)

                if (response.status !== 200) {

                    throw new Error(response.status);
                    console.log(response, 'status different from 200');

                } else {

                    //if call works but city doesn't exist - user has typed a wrong city

                    if (data.status == 'error') {
                        errorOne.style.visibility = 'visible';
                        errorOne.textContent = 'No result for your query';

                    } else if (data.status == 'ok') {
                        errorOne.style.visibility = 'hidden';
                        let particulateTen = _.get(data, "data.forecast.daily.pm10[2].avg", 0);
                        let particulateTwo = _.get(data, "data.forecast.daily.pm25[2].avg", 0);
                        let location = document.querySelector('#location');
                        let airPollution = document.querySelector('#air');
                        let particulateTenValue = document.querySelector('#part-Ten');
                        let particulateTwoValue = document.querySelector('#part-Two');
                        particulateTenValue.textContent = `Particulate matter average quantity: ${particulateTen}`;
                        particulateTwoValue.textContent = `Particulate matter average quantity: ${particulateTwo}`;

                        
                        if (data.data.aqi >= 0 && data.data.aqi <= 50){
                            airCondition = 'Good';
                        } else if(data.data.aqi >= 51 && data.data.aqi <= 100){
                            airCondition = 'Moderate';
                        } else if(data.data.aqi >= 101 && data.data.aqi <= 150){
                            airCondition ='Unhealthy for sensitive groups';
                        } else if(data.data.aqi >= 151 && data.data.aqi <= 200){
                            airCondition = 'Unhealthy';
                        } else if(data.data.aqi >= 201 && data.data.aqi <= 300){
                            airCondition = 'Very unhealthy';
                        } else if(data.data.aqi >= 300){
                            airCondition = 'Hazardous';
                        } else if(!data.data.aqi || data.data.aqi == "" ){
                            airCondition ="Not available";
                        }
                        

                        airPollution.textContent = `Air Pollution: ${airCondition}`;
                        console.log('air pollution', airPollution);
                        console.log(data.data); 
                        console.log('particolato fine', particulateTen);
                        console.log('particolato grosso', particulateTwo);
                        let cityName =`City: ${data.data.city.name}`;

                        location.textContent = cityName;

                    }
                }

            })


        //In case of errors, shows 
        .catch(error =>
            console.log(error)
        );
};
    }




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