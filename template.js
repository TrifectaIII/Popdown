Popdown = {};

Popdown.start = function () {

    //create style element
    Popdown._style = document.createElement('style');

    //fill with css
    Popdown._style.innerHTML = '%%%CSS%%%';

    //add style to head
    document.head.appendChild(Popdown._style);

    //create div for HTML code
    Popdown._div = document.createElement('div'); 

    //fill with html
    Popdown._div.innerHTML = '%%%HTML%%%';

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