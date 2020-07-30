Popdown = {};

Popdown.start = function () {

    //create style element
    Popdown._style = document.createElement('style');
    //fill with css
    Popdown._style.innerHTML = '.Popdown-container { /* display on top of normal page*/ z-index: 1;}/* semi-transparent background on top of main page to bring user focus to the popdown */.Popdown-background { background-color: rgba(0, 0, 0, 0.5); position: fixed; top:0; bottom:0; right:0; left:0;}/* main box for popdown */.Popdown-box { /* move to middle of screen */ position: fixed; top:50%; left: 50%; transform: translate(-50%, -50%); max-width: 80%; background-color: white; /* padding-bottom:0px; */ border-radius: 0.5rem;}.Popdown-message { text-align: center; margin: 2rem; font-family: sans-serif;}/* buttons for popdown */.Popdown-button { color: white;}/* ok button on alert popdown */.Popdown-alert .Popdown-button { background-color: red; width:100%; height: 2rem; border:0; border-radius: 0 0 0.5rem 0.5rem; outline: none;}/* color for mouseover */.Popdown-alert .Popdown-button:hover { background-color: lightcoral;}';
    //add style to head
    document.head.appendChild(Popdown._style);

    //create div for HTML code
    Popdown._div = document.createElement('div'); 
    //fill with html
    Popdown._div.innerHTML = '<div class="Popdown-container"> <div class="Popdown-background"></div> <div class="Popdown-box Popdown-alert"> <p class="Popdown-message">This is a message.</p> <button class="Popdown-button">OK</button> </div></div>';
    //add div to body
    document.body.appendChild(Popdown._div);

    //object constructor for individual popdowns
    Popdown._Popdown = function (msg, callback, context) {
        this.msg = msg;
        this.callback = callback;
        this.context = context;
    }

    Popdown._queue = [];

    //remove all popdowns
    Popdown.clearAll = function () {
        Popdown._queue = [];
    }

    //should present the user with info and allow them to close
    Popdown.alert = function (msg, callback, context, options) {
        alert(msg);
        callback.bind(context)();
    }

    //should present the user with info and allow them to select a positive or negative response
    Popdown.confirm = function (msg, callback, context, options) {
        var res = confirm(msg);
        callback.bind(context)(res);
    }

    //should present the user with a query and allow for a written response, with optional "cancel" option
    Popdown.prompt = function (msg, callback, context, options) {
        var res = prompt(msg);
        callback.bind(context)(res);
    }
}