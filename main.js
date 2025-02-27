document.getElementById("crypto-options").addEventListener("change", function() {
    let selectedCrypto = this.value;
    let inputField = document.getElementById("amount");

    if (selectedCrypto === "btc") {
        inputField.placeholder = "Enter Bitcoin amount";
    } else if (selectedCrypto === "eth") {
        inputField.placeholder = "Enter Ethereum amount";
    } else if (selectedCrypto === "doge") {
        inputField.placeholder = "Enter Dogecoin amount";
    }
});

document.getElementById("crypto-options").addEventListener("change", updatePlaceholder);
document.getElementById("convert-btn").addEventListener("click", convertCurrency);

async function fetchExchangeRate(crypto) {
    try {
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        let data = await response.json();
        return data[crypto].usd;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
}

async function convertCurrency() {
    let selectedCrypto = document.getElementById("crypto-options").value;
    let inputAmount = parseFloat(document.getElementById("amount").value);
    let resultField = document.getElementById("conversion-result");

    if (!inputAmount || inputAmount <= 0) {
        resultField.innerText = "Enter a valid amount.";
        return;
    }

    let cryptoId = getCryptoId(selectedCrypto);
    let exchangeRate = await fetchExchangeRate(cryptoId);

    if (exchangeRate) {
        let convertedAmount = (inputAmount * exchangeRate).toFixed(2);
        resultField.innerText = `USD: $${convertedAmount}`;
    } else {
        resultField.innerText = "Failed to fetch conversion rate.";
    }
}

function getCryptoId(symbol) {
    let cryptoMap = {
        btc: "bitcoin",
        eth: "ethereum",
        doge: "dogecoin"
    };
    return cryptoMap[symbol];
}

function updatePlaceholder() {
    let selectedCrypto = this.value;
    let inputField = document.getElementById("amount");

    let placeholders = {
        btc: "Enter Bitcoin amount",
        eth: "Enter Ethereum amount",
        doge: "Enter Dogecoin amount"
    };

    inputField.placeholder = placeholders[selectedCrypto];
}

// Create a result display element
document.body.insertAdjacentHTML("beforeend", '<div id="conversion-result" style="margin-top:20px; font-size:18px; font-weight:bold;"></div>');
