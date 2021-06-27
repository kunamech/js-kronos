Kronos#util
==

js-kronos has two utility tools that can help during development. These are **getIdFromUsername** and **correctDivision**.


> **getIdFromUsername**: This tool returns with a promise string.

> **correctDivision**: Checks the division name. Usage: **('Division-string', Boolean)**. Boolean false stands for schedule divisions and the else is blacklist divisions.

Usage:
```js
... //K is the declaration of the library

if(K.utils.correctDivision('PBST')) {
    ... //Things to do
}else{
    console.log('PBST is not a valid division!')
}

K.utils.getIdFromUsername('cocoakacoco').then(function(username) {
    ... //Things to do. username is the user id
})
```