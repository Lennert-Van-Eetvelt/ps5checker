let btn1 = false;
let btn2 = false;
let btn3 = false;

try {
    chrome.storage.sync.get(['btn1'], function (result) {btn1 = result.btn1;updateUi()});
    chrome.storage.sync.get(['btn2'], function (result) {btn2 = result.btn2;updateUi()});
    chrome.storage.sync.get(['btn3'], function (result) {btn3 = result.btn3;updateUi()});

} catch (e) {
    console.log(e);
}

$(document).click(function () {
    if (event.srcElement.id === "btn1") btn1 = !btn1;
    // if (event.srcElement.id === "btn2") btn2 = !btn2;
    // if (event.srcElement.id === "btn3") btn3 = !btn3;


    updateUi();
    save();
});

function save() {
    chrome.storage.sync.set({btn1: btn1}, function (){});
    chrome.storage.sync.set({btn2: btn2}, function (){});
    chrome.storage.sync.set({btn3: btn3}, function (){});
}


function updateUi() {
    console.log("updateui")
    if (btn1) document.getElementById("btn1").classList.add("active");
     else document.getElementById("btn1").classList.remove("active");

    // if (btn2) document.getElementById("btn2").classList.add("active");
    // else document.getElementById("btn2").classList.remove("active");
    //
    // if (btn3) document.getElementById("btn3").classList.add("active");
    // else document.getElementById("btn3").classList.remove("active");
}


setTimeout(function () {
        document.getElementById("btn1").classList.add("set");
        // document.getElementById("btn2").classList.add("set");
        // document.getElementById("btn3").classList.add("set");
}, 10);
