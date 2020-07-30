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

## Usage
First, initalize the library.
```
Popdown.start()
```

#### Popdown.alert
Syntax:
```
Popdown.alert(message, callback, context);
```
Example:
```
Popdown.alert('Hi!', () => {console.log('Hello!')}, this)
```

#### Popdown.confirm
Syntax:
```
Popdown.confirm(message, callback, context);
```
Example:
```
Popdown.confirm('Do you like green eggs and ham?', (bool) => {console.log(bool)}, this)
```

#### Popdown.prompt
Syntax:
```
Popdown.prompt(message, callback, context);
```
Example:
```
Popdown.prompt('What is your name?', (response) => {console.log(response)}, this)
```
