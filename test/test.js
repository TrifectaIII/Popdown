Popdown.start();

document.getElementById('alertButton').addEventListener('click', function () {
    Popdown.alert('Hello!', null,  {
        head: "Hi!",
    });
})

document.getElementById('confirmButton').addEventListener('click', function () {
    Popdown.confirm('See console for output', function (bool) {
        console.log(bool)
    }, {
        head: "Hi!",
    });
})

document.getElementById('promptButton').addEventListener('click', function () {
    Popdown.prompt('See console for output See console for output See console for output See console for output See console for output See console for output See console for output ', function (resp) {
        console.log(resp);
    }, {
        head: "Hi!",
    });
})