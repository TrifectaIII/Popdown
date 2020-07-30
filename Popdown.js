Popdown = {};

Popdown.start = function () {

    //create style element
    Popdown._style = document.createElement('style');

    //fill with css
    Popdown._style.innerHTML = '.Popdown-container { z-index: 10;}.Popdown-background { background-color: rgba(0, 0, 0, 0.5); position: fixed; top:0; bottom:0; right:0; left:0;}.Popdown-box {}.Popdown-alert .Popdown-button { background-color: red;}';

    //add style to head
    document.head.appendChild(Popdown._style);

    //create div for HTML code
    Popdown._div = document.createElement('div'); 

    //fill with html
    Popdown._div.innerHTML = '<div class="Popdown-container"> <div class="Popdown-background"></div> <div class="Popdown-box Popdown-alert"> <p class="Popdown-message"></p> <button class="Popdown-button">OK</button> </div></div>';

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
        Popdown.queue = [];
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