const searchButton = document.querySelector('.search-btn');
const priceContainer = document.getElementById('price');


searchButton.addEventListener('click', ()=>{
    const cryptoNameInput = document.getElementById('crypto-name');
    const cryptoName = cryptoNameInput.value.trim().toLowerCase();


    // clear the price display
    priceContainer.innerHTML = "";

    // validate the input
    if(!cryptoName){
        alert("Please enter a cryptocurrency name.");
        return;
    }

    // Call the CoinGecko API to get the current price of the entered cryptocurrency in USD

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`).then(response=>{
        if(!response.ok){
            throw new Error('Network response was not OK');
        }
        return response.json();
    }).then(data=>{
        if(data[cryptoName]){
            const cryptoPrice = data[cryptoName].usd;
            console.log(`${cryptoName} Price:`, cryptoPrice);
            priceContainer.innerHTML = `1 ${cryptoName.charAt(0).toUpperCase() + cryptoName.slice(1)} = $${cryptoPrice.toFixed(2)} USD`;
        } else {
            priceContainer.innerHTML = `Cryptocurrency "${cryptoName}" not found.`
        }
    }).catch(error=>{
        console.error('There was a problem with the fetch operation:', error);
        priceContainer.innerHTML = 'Failed to fetch the price. Please try again later.';
    })
})