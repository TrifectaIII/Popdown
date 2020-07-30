const fs = require('fs');
const path = require('path');

function build () {
    //read templates in as strings
    const js_template = fs.readFileSync(path.resolve(__dirname, 'template.js'), 'utf8');
    //remove newlines from html and css, and reduce all spaces to one at most
    const html_template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8').replace(/[\r\n]/g, '').replace(/  +/g, ' ').replace(/'+/g, '"');
    const css_template = fs.readFileSync(path.resolve(__dirname, 'template.css'), 'utf8').replace(/[\r\n]/g, '').replace(/ +/g, ' ').replace(/'+/g, '"');;

    //insert css and html into js
    return js_template.replace('%%%HTML%%%', html_template).replace('%%%CSS%%%', css_template);
}

fs.writeFile('Popdown.js', build(), 'utf8', function (err) {
    if (err) {console.log(err); return;}
    console.log('Popdown.js Successfully Built');
});

module.exports = build;