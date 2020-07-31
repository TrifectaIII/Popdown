const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const HTMLminifier = require('html-minifier');
const UglifyCSS = require('uglifycss');


function buildString () {
    //read templates in as strings
    const js_template = fs.readFileSync(path.resolve(__dirname, 'template.js'), 'utf8');
    
    //read and minify html
    const html_min = HTMLminifier.minify(fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8'), {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        quoteCharacter: '"',
        removeComments: true,
        sortAttributes: true,
        sortClassName: true,
    });
    
    //read and muinify css
    const css_min = UglifyCSS.processString(fs.readFileSync(path.resolve(__dirname, 'template.css'), 'utf8'), {

    });

    //insert css and html into js
    return js_template.replace('%%%HTML%%%', html_min).replace('%%%CSS%%%', css_min);
}

function buildFiles () {

    //build complete js string
    var string = buildString();

    //write to file
    fs.writeFile('Popdown.js', string, 'utf8', function (err) {
        if (err) {console.log(err); return;}
        console.log('Popdown.js File Successfully Built');
    });

    //minify the js string and write to .min file
    var minResult = UglifyJS.minify(string);
    fs.writeFile('Popdown.min.js', minResult.code, 'utf8', function (err) {
        if (err) {console.log(err); return;}
        console.log('Popdown.min.js File Successfully Built');
    });

    return {
        regular: string,
        minified: minResult.code,
    };
}

buildFiles();

module.exports = {
    buildString: buildString,
    buildFiles: buildFiles,
};