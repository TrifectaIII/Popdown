Popdown.start();

document.querySelector('.alertButton').addEventListener('click', function () {
    Popdown.alert('Hello!', null,  {
        head: "An Alert",
    });
})

document.querySelector('.confirmButton').addEventListener('click', function () {
    Popdown.confirm('See console for output', function (bool) {
        console.log(bool)
    }, {
        head: "A Confirm",
    });
})

document.querySelector('.promptButton').addEventListener('click', function () {
    Popdown.prompt('See console for output', function (resp) {
        console.log(resp);
    }, {
        head: "A Prompt",
    });
})