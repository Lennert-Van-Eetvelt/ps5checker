console.log("PS5 checker hi")
var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
console.log(datetime)

setInterval(function (){main();},8000)
// setTimeout(function (){main();},12000);
// document.onload = function (){ console.log("loadd");main();};

function goToUrl(url, timeout){
    // if (!active)
    //     return;
    console.log("changing url to " + url)
    if (active)
        saveActive(active)

    setTimeout(function (){window.location.href = url;}, timeout);
}


let place = 0;
let active = false;
getPlace();
getActive();
// saveActive(false)
function getPlace() {try {chrome.storage.sync.get(['place'], function (result) {place = result.place;});} catch (e) {}}
function getActive() {try {chrome.storage.sync.get(['btn1'], function (result) {active = result.btn1;});} catch (e) {}}
function savePlace(){    chrome.storage.sync.set({place: place}, function (){});}
function saveActive(act){    chrome.storage.sync.set({btn1: act}, function (){});}

console.log("active", active)
console.log("active", place)

function startSearchingAgain(){
    place= 0;
    savePlace();
    main();
}

function main(){
    getActive()
    if (!active)
        return;
    console.log("active???", active)
    console.log("place???", place)
    if (!(place >0 && place < 100))    place = 0;
    switch(place){
        case 100: setTimeout(function (){startSearchingAgain();},4*60*1000); return;
        case 0: checkBol(); return
        case 1: checkAlternateDisc(); return
        case 2: checkAlternateDigital(); return;
        case 3: checkCoolblueAll(0,"https://www.coolblue.be/nl/product/865867");return;
        case 4: checkCoolblueAll(1,"https://www.coolblue.be/nl/product/865866");return;
        // case 5: checkCoolblueAll(2,"https://www.coolblue.be/nl/product/884830");return;
        // case 6: checkCoolblueAll(3,"https://www.coolblue.be/nl/product/873655");return;
        // case 7: checkCoolblueAll(4,"https://www.coolblue.be/nl/product/891380");return;
        // case 8: checkCoolblueAll(5,"https://www.coolblue.be/nl/product/895374");return;
        // case 9: checkCoolblueAll(6,"https://www.coolblue.be/nl/product/895975");return;
        // case 10: checkCoolblueAll(7,"https://www.coolblue.be/nl/product/894891");return;
        case 5: checkAmazonDigital();return;
        // case 12: checkAmazonDisc();return;
        case 6: checkAmazonUkDigital();return;
        case 7: checkAmazonUkDisc();return;
        case 8: checkNedGame();return;
        case 9: checkMediamarkt(0,"https://www.mediamarkt.be/nl/product/_playstation-ps5-825-gb-extra-draadloze-controller-ps5-dualsense-1947127.html");return;
        // case 16: checkMediamarkt(1,"https://www.mediamarkt.be/nl/product/_playstation-ps5-825-gb-ps5-dualsense-cosmic-black-ratchet-clank-rift-apart-marvel-s-spiderman-miles-morales-1973158.html");return;
        // case 17: checkMediamarkt(2,"https://www.mediamarkt.be/nl/product/_playstation-ps5-825-gb-ps5-dualsense-just-dance-2021-marvel-s-spiderman-miles-morales-ps-plus-12-maand-1985184.html");return;
        // case 18: checkMediamarkt(3,"https://www.mediamarkt.be/nl/product/_playstation-ps5-digital-825-gb-draadloze-controller-ps5-dualsense-media-afstandsbediening-ps5-hd-camera-draadloze-gaming-headset-ps5-1990241.html");return;
        // case 19: checkMediamarkt(4,"https://www.mediamarkt.be/nl/product/_playstation-ps5-825-gb-dualsense-cosmic-black-draadloze-gaming-headset-ps5-pulse-3d-call-of-duty-vanguard-uk-ps-plus-12-maand-1991543.html");return;
        // case 20: checkMediamarkt(5,"https://www.mediamarkt.be/nl/product/_playstation-ps5-825-gb-draadloze-controller-ps5-dualsense-draadloze-gaming-headset-ps5-pulse-3d-zwart-fifa-22-battlefield-2042-ps-1995716.html");return;
        default: place = 0; main(); return;
    }
}

function found(website, url){
    place = url;
    active = false;
    // saveActive(false)
    place = 100;
    savePlace()
    console.log("OMG I Found it ")
    sendMessage(website,url)
}


function sendMessage(title, message){
    var url = new URL("https://api.simplepush.io/send/46XqyU/"+title+"/")
    url.searchParams.append('x',message)
    console.log(url.toString().replace("?x=", ""))
    goToUrl(url.toString().replace("?x=", "")+"/event/Critical",0)
}


function checkBol(){
    console.log("checking bol")
    let urlBase = "https://www.bol.com/be/nl/p/sony-playstation-5-console/"
    let urlFull = "https://www.bol.com/be/nl/p/sony-playstation-5-console/9300000004162282/?ruleRedirect=1&sI=playstation%205&variants="
    if (!window.location.href.startsWith(urlBase)) goToUrl(urlFull, 898); else{
        try {
            let ele = document.getElementsByClassName("buy-block__title")[0];
            if (!ele.innerText.startsWith("Niet")) found("bol", urlFull);
            else console.log("not found....")
        }catch (e){
            console.log(e)
        }
    place++;
    savePlace();
    main();}
}
function checkAlternateDisc(){
    console.log("checking alternate disc")
    let urlFull = "https://www.alternate.be/Sony-Interactive-Entertainment/PlayStation-5-spelconsole/html/product/1651220"
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
        try {
            let ele = document.getElementsByClassName("d-flex justify-content-center align-items-center")[0].children[0];
            if (!ele.innerText.startsWith("Niet")) found("alternate", urlFull);
            else console.log("not found....")
        }catch (e){
            console.log(e)
        }
    place++;
    savePlace();
    main();}
}
function checkAlternateDigital(){
    console.log("checking alternate digital")
    let urlFull = "https://www.alternate.be/Sony-Interactive-Entertainment/PlayStation-5-Digital-Edition-spelconsole/html/product/1651221"
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
        try {
            let ele = document.getElementsByClassName("d-flex justify-content-center align-items-center")[0].children[0];
            if (!ele.innerText.startsWith("Niet")) found("alternate", urlFull);
            else console.log("not found....")
        }catch (e){
            console.log(e)
        }
    place++;
    savePlace();
    main();}
}
function checkCoolblueAll(number, url){
    console.log("checking cooblue "+number)
    let urlFull = url ;
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
    let available = true;
    try {
        let ele = document.getElementsByClassName("js-threshold-toggle-sticky-bar")[0].getElementsByClassName("color--unavailable")[0];
        if (ele.innerText.startsWith("Tijdelijk")) available = false;
    }catch (e){
        console.log(e)
    }
    if (available) found("coolblue", urlFull)
    else console.log("not found....")
    place++;
    savePlace();
    main();}
}

function checkAmazonDigital(){
    console.log("checking Amazon digital")
    let urlFull = "https://www.amazon.de/-/en/dp/B08H98GVK8/";
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
    let available = true;
    try{
        document.getElementById("productTitle").innerText;
    }catch (e){
        available = false;
        console.log("page not loaded correct")
    }
    try {
        let ele = document.getElementById("availability").children[0];//.children[0];//.children[0];
        console.log(ele)
        console.log(ele.innerText)
        if (ele.innerText.startsWith("Currently")) available = false;
    }catch (e){
        console.log(e)
    }
    if (available) found("amazon digital", urlFull)
    else console.log("not found....")
    place++;
    savePlace();
    main();}
}

function checkAmazonDisc(){
    console.log("checking Amazon disc")
    let urlFull = "https://www.amazon.de/-/en/dp/B08H93ZRK9/";
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
        let available = true;
        try{
            document.getElementById("productTitle").innerText;
        }catch (e){
            available = false;
            console.log("page not loaded correct")
        }
        try {
            let ele = document.getElementById("availability").children[0];//.children[0].children[0];
            if (ele.innerText.startsWith("Currently")) available = false;
        }catch (e){
            console.log(e)
        }
        if (available) found("amazon disc", urlFull)
        else console.log("not found....")
        place++;
        savePlace();
        main();}
}
function checkAmazonUkDisc(){
    console.log("checking Amazon uk disc")
    let urlFull = "https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452";
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
        let available = true;
        try{
            document.getElementById("productTitle").innerText;
        }catch (e){
            available = false;
            console.log("page not loaded correct")
        }
        try {
            let ele = document.getElementById("availability").children[0];//.children[0].children[0];
            if (ele.innerText.startsWith("Currently")) available = false;
        }catch (e){
            console.log(e)
        }
        if (available) found("amazon uk disc", urlFull)
        else console.log("not found....")
        place++;
        savePlace();
        main();}
}
function checkAmazonUkDigital(){
        console.log("checking Amazon uk digital")
        let urlFull = "https://www.amazon.co.uk/PlayStation-5-Digital-Edition-Console/dp/B08H97NYGP";
        if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
            let available = true;
            try{
                document.getElementById("productTitle").innerText;
            }catch (e){
                available = false;
                console.log("page not loaded correct")
            }
            try {
                let ele = document.getElementById("availability").children[0];//.children[0].children[0];
                if (ele.innerText.startsWith("Currently")) available = false;
            }catch (e){
                console.log(e)
            }
            if (available) found("amazon uk digital", urlFull)
            else console.log("not found....")
            place++;
            savePlace();
            main();}
    }
function checkNedGame(){
    console.log("checking nedgame")
    let urlFull = "https://www.nedgame.nl/playstation-5/playstation-5-digital-edition-bundel/3831177925/";
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
        let available = true;
        try{
            document.getElementById("productTitle").innerText;
        }catch (e){
            available = false;
            console.log("page not loaded correct")
        }
        try {
            let ele = document.getElementsByClassName("koopdiv")[0].children[0];//.children[0].children[0];
            if (ele.innerText.startsWith("Uitverkocht")) available = false;
        }catch (e){
            console.log(e)
        }
        if (available) found("nedgame", urlFull)
        else console.log("not found....")
        place++;
        savePlace();
        main();}
}

function checkMediamarkt(nummer, url){
    console.log("checking mediamarkt " + nummer)
    let urlFull = url;
    if (!window.location.href.startsWith(urlFull)) goToUrl(urlFull, 898); else{
        let available = true;
        try{
            document.getElementById("productTitle").innerText;
        }catch (e){
            available = false;
            console.log("page not loaded correct")
        }
        try {
            let ele = document.getElementsByClassName("offline-text")[0];
            if (ele.innerText.toLowerCase().startsWith("artikel tijdelijk")) available = false;
        }catch (e){
            console.log(e)
        }
        if (available) found("mediamarkt " + nummer, urlFull)
        else console.log("not found....")
        place++;
        savePlace();
        main();}
}