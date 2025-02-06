const API_URL = 'https://meekandev-github-io.onrender.com';

console.log(window.location.href.toString())

function changeTheLinks(url){
    document.querySelector('.apiDrinks').href = url+'api/drinks'
    document.querySelector('.apiCustomers').href = url+'api/allCustomers'
}

changeTheLinks(API_URL + '/')

async function apiRequest(){
    try{
        const response = await fetch(`${API_URL}/api/coredrinks`)
        const data = await response.json()

        Object.keys(data).forEach(key => {
            console.log(key, data[key]);
          });
        
    }catch(error){
        console.log(error)
    }
}
