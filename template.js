Popdown = {};

Popdown.start = function () {

    //enum for Popdown types
    Popdown.Types = Object.freeze({
        ALERT: 'alert',
        CONFIRM: 'confirm',
        PROMPT: 'prompt',
    });

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

    //get elements from inserted html
    Popdown.elements = {

        //shared elements
        container: document.body.querySelector('.Popdown-container'),
        background: document.body.querySelector('.Popdown-background'),
        boxContainer: document.body.querySelector('.Popdown-box-container'),

        //alert elements
        alertBox: document.body.querySelector('.Popdown-box.Popdown-alert'),
        alertHeader: document.body.querySelector('.Popdown-alert .Popdown-header'),
        alertMessage: document.body.querySelector('.Popdown-alert .Popdown-message'),
        alertOkButton: document.body.querySelector('.Popdown-alert-ok-button'),

        //confirm elements
        confirmBox: document.body.querySelector('.Popdown-box.Popdown-confirm'),
        confirmHeader: document.body.querySelector('.Popdown-confirm .Popdown-header'),
        confirmMessage: document.body.querySelector('.Popdown-confirm .Popdown-message'),
        confirmOkButton: document.body.querySelector('.Popdown-confirm-ok-button'),
        confirmCancelButton: document.body.querySelector('.Popdown-confirm-cancel-button'),

        //prompt elements
        promptBox: document.body.querySelector('.Popdown-box.Popdown-prompt'),
        promptHeader: document.body.querySelector('.Popdown-prompt .Popdown-header'),
        promptMessage: document.body.querySelector('.Popdown-prompt .Popdown-message'),
        promptOkButton: document.body.querySelector('.Popdown-prompt-ok-button'),
        promptCancelButton: document.body.querySelector('.Popdown-prompt-cancel-button'),
        promptInput: document.body.querySelector('.Popdown-prompt-input'),
    };

    //object constructor for individual popdowns
    Popdown._Popdown = function (type, head, message, callback, context) {
        this.type = type;
        this.head = head;
        this.message = message;
        this.callback = callback;
        this.context = context;
    }

    Popdown._queue = [];

    //remove all popdowns
    Popdown.clearAll = function () {
        Popdown._queue = [];
    }

    Popdown._render = function () {

        //hide popdown and enable body scrolling 
        if (Popdown._queue.length === 0) {
            Popdown.elements.container.classList.add('Popdown-noShow');
            document.body.classList.remove('Popdown-noScroll');
        }
        //render alert
        else if (Popdown._queue[0].type === Popdown.Types.ALERT) {

            //fill text elements
            Popdown.elements.alertHeader.innerText = Popdown._queue[0].head;
            Popdown.elements.alertMessage.innerText = Popdown._queue[0].message;

            //hide other boxes
            Popdown.elements.confirmBox.classList.add('Popdown-noShow');
            Popdown.elements.promptBox.classList.add('Popdown-noShow');

            //show alert box
            Popdown.elements.alertBox.classList.remove('Popdown-noShow');

            //show popdown and disable body scrolling
            Popdown.elements.container.classList.remove('Popdown-noShow');
            document.body.classList.add('Popdown-noScroll');
        }
        //render confirm
        else if (Popdown._queue[0].type === Popdown.Types.CONFIRM) {

            //fill text elements
            Popdown.elements.confirmHeader.innerText = Popdown._queue[0].head;
            Popdown.elements.confirmMessage.innerText = Popdown._queue[0].message;

            //hide other boxes
            Popdown.elements.alertBox.classList.add('Popdown-noShow');
            Popdown.elements.promptBox.classList.add('Popdown-noShow');

            //show alert box
            Popdown.elements.confirmBox.classList.remove('Popdown-noShow');

            //show popdown and disable body scrolling
            Popdown.elements.container.classList.remove('Popdown-noShow');
            document.body.classList.add('Popdown-noScroll');
        }
        //render prompt
        else if (Popdown._queue[0].type === Popdown.Types.PROMPT) {

            //fill text elements
            Popdown.elements.promptHeader.innerText = Popdown._queue[0].head;
            Popdown.elements.promptMessage.innerText = Popdown._queue[0].message;

            //clear input
            Popdown.elements.promptInput.value = '';

            //hide other boxes
            Popdown.elements.alertBox.classList.add('Popdown-noShow');
            Popdown.elements.confirmBox.classList.add('Popdown-noShow');

            //show alert box
            Popdown.elements.promptBox.classList.remove('Popdown-noShow');

            //show popdown and disable body scrolling
            Popdown.elements.container.classList.remove('Popdown-noShow');
            document.body.classList.add('Popdown-noScroll');
        }
    }

    //ADD EVENT LISTENERS HERE

    //should present the user with info and allow them to close
    Popdown.alert = function (head, message, callback, context) {
        Popdown._queue.push(new Popdown._Popdown(Popdown.Types.ALERT, head, message, callback, context));
        if (Popdown._queue.length === 1) {
            Popdown._render();
        }
        
    }

    //should present the user with info and allow them to select a positive or negative response
    Popdown.confirm = function (head, message, callback, context) {
        Popdown._queue.push(new Popdown._Popdown(Popdown.Types.CONFIRM, head, message, callback, context));
        if (Popdown._queue.length === 1) {
            Popdown._render();
        }
    }

    //should present the user with a query and allow for a written response, with optional "cancel" option
    Popdown.prompt = function (head, message, callback, context) {
        Popdown._queue.push(new Popdown._Popdown(Popdown.Types.PROMPT, head, message, callback, context));
        if (Popdown._queue.length === 1) {
            Popdown._render();
        }
    }
}