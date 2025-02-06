const API_URL = '';

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

document.addEventListener('DOMContentLoaded', function() {
    // Get the current environment
    const isProd = window.location.hostname === 'meekandev.github.io';
    const API_BASE = isProd ? 'https://meekandev-github-io.onrender.com' : '';

    // Function to fetch drinks
    async function fetchDrinks() {
        try {
            const response = await fetch(`${API_BASE}/api/drinks`);
            if (!response.ok) throw new Error('Network response was not ok');
            const drinks = await response.json();
            return drinks;
        } catch (error) {
            console.error('Error fetching drinks:', error);
            return [];
        }
    }

    // Handle POS button click
    const posButton = document.querySelector('#pos-button');
    if (posButton) {
        posButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = `${API_BASE}/pos`;
        });
    }
});
