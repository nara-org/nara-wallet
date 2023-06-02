import {el} from "vuetify/locale";


console.log("background");

chrome.runtime.onInstalled.addListener(() => {
    console.log("onInstalled");
});

chrome.action.onClicked.addListener((tab:any) => {
    console.log("action.onClicked");
    chrome.storage.local.get(["nara"]).then((result:any) => {
        console.log(result);
        if(result.nara){
            chrome.action.setPopup({
                popup: 'index.html',
            });
        }else {
            chrome.tabs.create({
                url: "index.html#/welcome"
            })
        }
    }).catch((err:any) => {
        console.log(err);
    });
});




