Popdown = {};

//object constructor for individual popdowns
Popdown.Popdown = function (msg, callback, context) {
    this.msg = msg;
    this.callback = callback;
    this.context = context;
}

//should present the user with info and allow them to close
Popdown.alert = function (msg, callback, context) {
    alert(msg);
    callback.bind(context)();
}

//should present the user with info and allow them to select a positive or negative response
Popdown.confirm = function (msg, callback, context){
    var res = confirm(msg);
    callback.bind(context)(res);
}

//should present the user with a query and allow for a written response, with optional "cancel" option
Popdown.prompt = function (msg, callback, context) {
    var res = prompt(msg);
    callback.bind(context)(res);
}