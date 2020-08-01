# Popdown
 Responsive, lightweight, easy-to-use alternatives for prompt(), alert(), and confirm().
 
 **NOTE: Not even close to working yet.**

## Build
```
npm run-script build
```
or
```
node build.js
```

## Include
```
<script src="%YOURPATH%/Popdown.js"></script>
```
or, if you want the minified version,
```
<script src="%YOURPATH%/Popdown.min.js"></script>
```

## Usage
First, initalize the library.
```
Popdown.start()
```

### Popdown.alert()
Syntax:
```
Popdown.alert(message, callback, options);
```
Example:
```
Popdown.alert('Hi!', () => {console.log('Hello!')});
```

### Popdown.confirm()
Syntax:
```
Popdown.confirm(message, callback, options);
```
Example:
```
Popdown.confirm('Do you like green eggs and ham?', (bool) => {console.log(bool)});
```

### Popdown.prompt()
Syntax:
```
Popdown.prompt(message, callback, options);
```
Example:
```
Popdown.prompt('What is your name?', (response) => {console.log(response)});
```
### Parameters
| Parameter | Description                                                                                                                                                                 | Type     | Default |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------|
| message   | Display text of the Popdown                                                                                                                                                 | string   | `""`     |
| callback  | Will execute when user exits the Popdown.  Popdown.confirm() callback should accept a boolean as parameter.  Popdown.prompt() callback should accept a string as parameter. | function | `null`    |
| options   | Used to pass in lesser-used parameters (see below for details).                                                                                                             | object   | `{}`     |

### Options
| Option  | Description                            | Type           | Default |
|---------|----------------------------------------|----------------|---------|
| head    | Display text for header of the Popdown | string         | `""`      |
| context | Context for callback execution         | object/context | `null`    |
