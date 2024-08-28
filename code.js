finalBic = "";
finalIban = "";
finalBlob = "";

function isValidIBAN(iban) {

    const validCharacters = /^[A-Z0-9\s]+$/i;
    if (!validCharacters.test(iban)) {
        return false;
    }

    const minimumLength = 15;
    if (iban.length < minimumLength) {
        return false;
    }

    const rearrangedIban = iban.slice(4) + iban.slice(0, 4);
    const numericIban = rearrangedIban.replace(/[A-Z]/g, char => char.charCodeAt(0) - 55);
    const remainder = BigInt(numericIban) % 97n;
    return remainder === 1n;
};

async function getBIC(iban) {
    
    document.getElementById("bic").textContent = "BIC wird geladen";
    
    const url = "https://openiban.com/validate/" + iban + "?getBIC=true";
    const response = await fetch(url);
    
    if (!response.ok) {
        document.getElementById("bic").textContent = "BIC konnte nicht geladen werden";
    }
    
    else {
        const data = await response.json();
        document.getElementById("bic").textContent = "BIC: " + data.bankData.bic;
        finalBic = data.bankData.bic;
    }    

};

function formatIBAN(value) {
    return value.replace(/\s/g, '').toUpperCase();
};

function umlautToAscii(value) {
    const umlautMap = {
        'ä': 'ae',
        'ö': 'oe',
        'ü': 'ue',
        'Ä': 'Ae',
        'Ö': 'Oe',
        'Ü': 'Ue',
        'ß': 'ss'
    };
    value = value.split('').map(char => umlautMap[char] || char).join('');
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function modifyAmount(value) {
    value = value.replace(/€/g, '');
    value = value.replace(/,/g, '.');
    value = value.replace(/\s/g, '');
    return value;
};

function spaceToUnderscore(value) {
    return value.replace(/\s/g, '_');
};

document.getElementById("iban").addEventListener("input", function(e) {

    const iban = formatIBAN(e.target.value);
    
    if (iban === "") {
        document.getElementById("emoji-iban").textContent = "";
        document.getElementById("bic").textContent = "";
        document.getElementById("copyButton").style.display = "none";
        document.getElementById("qr-code").textContent = "";
        finalIban = "";
    } else if (isValidIBAN(iban)) {
        document.getElementById("emoji-iban").textContent = "👍";
        getBIC(iban);
        finalIban = iban;
    } else {
        document.getElementById("emoji-iban").textContent = "👎";
        document.getElementById("bic").textContent = "";
        document.getElementById("qr-code").textContent = "";
        document.getElementById("copyButton").style.display = "none";
        finalIban = "";
    }

    checkState();

});

document.getElementById("empfaenger").addEventListener("input", function(e) {
    checkState();
});

function checkState() {
    if (document.getElementById("empfaenger").value === "" || finalIban === "") {
        document.getElementById("sendButton").disabled = true;
    } else {
        document.getElementById("sendButton").disabled = false;
    }
}

document.getElementById("sendButton").addEventListener("click", async function(event) {
    event.preventDefault();
    
    empfaenger = spaceToUnderscore(umlautToAscii(document.getElementById("empfaenger").value));
    zweck = spaceToUnderscore(umlautToAscii(document.getElementById("zweck").value));
    betrag = modifyAmount(document.getElementById("betrag").value);
    
    url = "https://qr.phoenixgymnasium.de/api.php?type=epc&bic=" + finalBic + "&empfaenger=" + empfaenger + "&iban=" + finalIban + "&betrag=EUR" + betrag + "&zweck=" + zweck;

    const response = await fetch(url);
    if (response.ok) {
        const imageBlob = await response.blob();
        finalBlob = imageBlob;
        const imageUrl = URL.createObjectURL(imageBlob);
        document.getElementById("qr-code").innerHTML = `<img src="${imageUrl}" alt="QR Code">`;
        document.getElementById("copyButton").style.display = "inline";
    } else {
        document.getElementById("qr-code").textContent = "QR Code konnte nicht geladen werden";
    }
});

document.getElementById("copyButton").addEventListener("click", function(event) {
    navigator.clipboard.write([
        new ClipboardItem({
            'image/png': finalBlob
        })
    ]);
});


document.getElementById("resetButton").addEventListener("click", function(event) {
    document.getElementById("qr-code").textContent = "";
    document.getElementById("emoji-iban").textContent = "";
    document.getElementById("sendButton").disabled = true;
    document.getElementById("copyButton").style.display = "none";
    finalBlob = "";
    finalIban = "";
    finalBic = "";
});