const fs = require('fs');
const path = require('path');

//minify modules
const UglifyJS = require('uglify-js');
const HTMLminifier = require('html-minifier');
const UglifyCSS = require('uglifycss');


//read scource files and build js string
function buildString () {
    //read templates in as strings
    var js_template = fs.readFileSync(path.resolve(__dirname, 'src/source.js'), 'utf8');
    //read and minify html
    var html_min = HTMLminifier.minify(fs.readFileSync(path.resolve(__dirname, 'src/source.html'), 'utf8'), {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        quoteCharacter: '"',
        removeComments: true,
        sortAttributes: true,
        sortClassName: true,
    });
    //read and muinify css
    var css_min = UglifyCSS.processString(fs.readFileSync(path.resolve(__dirname, 'src/source.css'), 'utf8'), {});
    //insert css and html into js
    var result = js_template.replace('%%%HTML%%%', html_min).replace('%%%CSS%%%', css_min);
    return result;
}

//build minified version of js string
function buildStringMin() {
    //build complete js string, minified
    var full = buildString();
    //minify with uglify js
    var result = UglifyJS.minify(full).code;
    return result;
}

//build non-minified file at given location
function buildToFile (location) {
    //default location is directiory of this file
    if (location === undefined) {location = __dirname; console.log('defaulting')}
    //build complete js string
    var result = buildString();
    //resolve full path
    var fullpath = path.resolve(location, 'Popdown.js');
    //write to file at given location
    fs.writeFile(fullpath, result, 'utf8', function (err) {
        if (err) {throw "Error Building Popdown.js File";}
        console.log('Popdown.js File Successfully Built');
    });
    return result;
}

//build minified file at given location
function buildToFileMin(location) {
    //default location is directiory of main file
    if (location === undefined) {location = __dirname; console.log('defaulting')}
    //build complete js string, minified
    var result = buildStringMin();
    //resolve full path
    var fullpath = path.resolve(location, 'Popdown.min.js');
    //write to file at given location
    fs.writeFile(fullpath, result, 'utf8', function (err) {
        if (err) {throw "Error Building Popdown.min.js File";}
        console.log('Popdown.min.js File Successfully Built');
    });
    return result;
}

//create Popdown.js and Popdown.min.js at given location
function buildFiles (location) {
    return {
        full: buildToFile(location),
        minified: buildToFileMin(location),
    };
}

// build files to local directory & docs if this is the main file
if (!module.parent) {
    buildFiles(__dirname);
    buildFiles(path.resolve(__dirname, 'docs'));
}

//export functions
module.exports = {
    buildString: buildString,
    buildStringMin: buildStringMin,
    buildToFile: buildToFile,
    buildToFileMin: buildToFile,
    buildFiles: buildFiles,
};