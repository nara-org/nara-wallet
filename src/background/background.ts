import {el} from "vuetify/locale";


console.log("background");

chrome.runtime.onInstalled.addListener(() => {
    console.log("onInstalled");
});

chrome.action.onClicked.addListener((tab) => {
    console.log("action.onClicked");
    chrome.storage.local.get(["account"]).then((result) => {
        console.log(result);
        if(result.account){

        }else {
            chrome.tabs.create({
                url: "index.html"
            })
        }
    }).catch(err => {
        console.log(err);
    });
});




