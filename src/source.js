// Global Object
Popdown = {};

// Initialization Function, must be called before anything else happens
Popdown.start = function () {

    //enum for Popdown types
    Popdown._Types = Object.freeze({
        ALERT: 'alert',
        CONFIRM: 'confirm',
        PROMPT: 'prompt',
    });

    //INSERT HTML AND CSS CODE TO DOCUMENT
    /////////////////////////////////////////////////////

    //create style element
    Popdown._style = document.createElement('style');
    //fill with css
    Popdown._style.innerHTML = '%%%CSS%%%';
    //add style to head
    document.head.appendChild(Popdown._style);

    //create div for HTML code
    Popdown._div = document.createElement('div'); 
    //give div the top-level classes
    Popdown._div.classList.add('Popdown-container');
    //start hidden
    Popdown._div.classList.add('Popdown-noShow');
    //fill with html
    Popdown._div.innerHTML = '%%%HTML%%%';
    //add div to body
    document.body.appendChild(Popdown._div);

    //REFERENCE HTML ELEMENTS 
    /////////////////////////////////////////////////////

    Popdown._elements = {

        //shared elements
        container: document.body.querySelector('.Popdown-container'),
        background: document.body.querySelector('.Popdown-background'),
        boxContainer: document.body.querySelector('.Popdown-box-container'),

        //alert elements
        alert: {
            box: document.body.querySelector('.Popdown-box.Popdown-alert'),
            header: document.body.querySelector('.Popdown-alert .Popdown-header'),
            message: document.body.querySelector('.Popdown-alert .Popdown-message'),
            okButton: document.body.querySelector('.Popdown-alert .Popdown-ok'),
        },

        //confirm elements
        confirm: {
            box: document.body.querySelector('.Popdown-box.Popdown-confirm'),
            header: document.body.querySelector('.Popdown-confirm .Popdown-header'),
            message: document.body.querySelector('.Popdown-confirm .Popdown-message'),
            okButton: document.body.querySelector('.Popdown-confirm .Popdown-ok'),
            cancelButton: document.body.querySelector('.Popdown-confirm .Popdown-cancel'),
        },

        //prompt elements
        prompt: {
            box: document.body.querySelector('.Popdown-box.Popdown-prompt'),
            header: document.body.querySelector('.Popdown-prompt .Popdown-header'),
            message: document.body.querySelector('.Popdown-prompt .Popdown-message'),
            okButton: document.body.querySelector('.Popdown-prompt .Popdown-ok'),
            cancelButton: document.body.querySelector('.Popdown-prompt .Popdown-cancel'),
            input: document.body.querySelector('.Popdown-prompt .Popdown-input'),
        },
    };

    //OBJECT CONSTRUCTOR FOR INDIVIDUAL POPDOWNS
    /////////////////////////////////////////////////////

    Popdown._Popdown = function (type, message, callback, options) {

        //if message not defined, set to enmty string
        if (message === undefined) {message = ''};

        //if callback nor defined, set to null
        if (callback === undefined) {callback = null};

        //if options not defined, create empty object
        if (options === undefined){options = {}};

        //options defaults
        var defaults = {
            //text for header of box
            head: '',
            //context for callback
            context: null,
        }

        //place default options if not specified
        for (var option in defaults) {
            if (options[option] === undefined) {
                options[option] = defaults[option];
            }
        }

        this.type = type;
        this.message = message;
        this.callback = callback;
        this.options = options;
    }

    //method to render the individual popdown
    Popdown._Popdown.prototype.render = function () {

        //render based on type
        switch (this.type) {

            //render alert
            case Popdown._Types.ALERT:
                //fill text elements
                Popdown._elements.alert.header.innerText = this.options.head;
                Popdown._elements.alert.message.innerText = this.message;

                //hide other boxes
                Popdown._elements.confirm.box.classList.add('Popdown-noShow');
                Popdown._elements.prompt.box.classList.add('Popdown-noShow');

                //show alert box
                Popdown._elements.alert.box.classList.remove('Popdown-noShow');
                break

            //render confirm
            case Popdown._Types.CONFIRM:
                //fill text elements
                Popdown._elements.confirm.header.innerText = this.options.head;
                Popdown._elements.confirm.message.innerText = this.message;

                //hide other boxes
                Popdown._elements.alert.box.classList.add('Popdown-noShow');
                Popdown._elements.prompt.box.classList.add('Popdown-noShow');

                //show confirm box
                Popdown._elements.confirm.box.classList.remove('Popdown-noShow');
                break

            //render prompt
            case Popdown._Types.PROMPT:
                //fill text elements
                Popdown._elements.prompt.header.innerText = this.options.head;
                Popdown._elements.prompt.message.innerText = this.message;

                //clear input
                Popdown._elements.prompt.input.value = '';

                //hide other boxes
                Popdown._elements.alert.box.classList.add('Popdown-noShow');
                Popdown._elements.confirm.box.classList.add('Popdown-noShow');

                //show prompt box
                Popdown._elements.prompt.box.classList.remove('Popdown-noShow');
                break
        }
    }

    //executes callback function
    Popdown._Popdown.prototype.executeCallback = function (argument) {
        if (this.callback !== null){
            this.callback.bind(this.options.context)(argument);
        }
    }

    //QUEUE TO HOLD ALL ACTIVE POPDOWNS
    /////////////////////////////////////////////////////

    Popdown._queue = [];

    //remove all popdowns
    Popdown.clear = function () {
        if (Popdown._queue.length > 0) {
            Popdown._queue = [];
            Popdown._render();
        }
    }

    //RENDERS TOP POPDOWN
    /////////////////////////////////////////////////////

    Popdown._render = function () {

        //hide popdown and enable body scrolling when no active popdowns
        if (Popdown._queue.length === 0) {
            Popdown._elements.container.classList.add('Popdown-noShow');
            document.body.classList.remove('Popdown-noScroll');
        }
        //render next popdown otherwise
        else {
            Popdown._queue[0].render();
            //show popdown and disable body scrolling
            Popdown._elements.container.classList.remove('Popdown-noShow');
            document.body.classList.add('Popdown-noScroll');
        }
    }

    //EVENT LISTENERS FOR POPDOWN ELEMENTS
    /////////////////////////////////////////////////////

    //alert ok button
    Popdown._elements.alert.okButton.addEventListener('click', function () {
        //ensure that the top element is an alert
        if (Popdown._queue[0].type === Popdown._Types.ALERT) {
            //remove object from front of queue
            var alertObj = Popdown._queue.shift();
            //render after removal
            Popdown._render();
            //execute callback
            alertObj.executeCallback();
        }
    });

    //confirm ok button
    Popdown._elements.confirm.okButton.addEventListener('click', function () {
        //ensure that the top element is an alert
        if (Popdown._queue[0].type === Popdown._Types.CONFIRM) {
            //remove object from front of queue
            var confirmObj = Popdown._queue.shift();
            //render after removal
            Popdown._render();
            //execute callback
            confirmObj.executeCallback(true);
        }
    });

    //confirm cancel button
    Popdown._elements.confirm.cancelButton.addEventListener('click', function () {
        //ensure that the top element is an alert
        if (Popdown._queue[0].type === Popdown._Types.CONFIRM) {
            //remove object from front of queue
            var confirmObj = Popdown._queue.shift();
            //render after removal
            Popdown._render();
            //execute callback
            confirmObj.executeCallback(false);
        }
    });

    //prompt ok button
    Popdown._elements.prompt.okButton.addEventListener('click', function () {
        //ensure that the top element is an alert
        if (Popdown._queue[0].type === Popdown._Types.PROMPT) {
            //save text from input
            var text = Popdown._elements.prompt.input.value;
            //remove object from front of queue
            var promptObj = Popdown._queue.shift();
            //render after removal
            Popdown._render();
            //execute callback, passing through text
            promptObj.executeCallback(text);
        }
    });

    //prompt cancel button
    Popdown._elements.prompt.cancelButton.addEventListener('click', function () {
        //ensure that the top element is an alert
        if (Popdown._queue[0].type === Popdown._Types.PROMPT) {
            //remove object from front of queue
            var promptObj = Popdown._queue.shift();
            //render after removal
            Popdown._render();
            //execute callback, with null as param
            promptObj.executeCallback(null);
        }
    });

    //prompt input enter press
    Popdown._elements.prompt.input.addEventListener('keypress', function (event) {
        //ensure that the top element is an alert and that the enter key is pressed
        if (event.keyCode === 13 &&
            Popdown._queue[0].type === Popdown._Types.PROMPT) {
            //save text from input
            var text = Popdown._elements.prompt.input.value;
            //remove object from front of queue
            var promptObj = Popdown._queue.shift();
            //render after removal
            Popdown._render();
            //execute callback, passing through text
            promptObj.executeCallback(text);
        }
    });

    //FUNCTIONS TO CREATE POPDOWNS
    /////////////////////////////////////////////////////

    //present the user with info and allow them to close
    Popdown.alert = function (message, callback, options) {
        Popdown._queue.push(new Popdown._Popdown(Popdown._Types.ALERT, message, callback, options));
        //render if the new popdown is on top
        if (Popdown._queue.length === 1) {
            Popdown._render();
        }
    }

    //present the user with info and allow them to select a positive or negative response
    Popdown.confirm = function (message, callback, options) {
        Popdown._queue.push(new Popdown._Popdown(Popdown._Types.CONFIRM, message, callback, options));
        //render if the new popdown is on top
        if (Popdown._queue.length === 1) {
            Popdown._render();
        }
    }

    //present the user with a query and allow for a written response, with optional "cancel" option
    Popdown.prompt = function (message, callback, options) {
        Popdown._queue.push(new Popdown._Popdown(Popdown._Types.PROMPT, message, callback, options));
        //render if the new popdown is on top
        if (Popdown._queue.length === 1) {
            Popdown._render();
        }
    }
}