## Js-kronos

A promise-based Node.js API wrapper for Kronos API with It's single dependency and utility tools.
Maintained by Thesourtimes.


How to install?
====
Use this command to install

> npm i js-kronos --save


How to use it?
== 

Here is an example code with all the functions avaible:
```javascript
const Kronos = require('js-kronos');
const Client = new Kronos.createClient('token-string');


//Get schedule
Client.schedule.get('TMS').then((response) => {
console.log(response) //{...}
});

//Check if the user is blacklisted
Client.blacklists.get('58507475', 'PET').then((response) => {
    console.log(response) //{58507475: false}
});

//Use array to check multiple users
client.blacklists.get(['58507475', '589547488'], 'PBST').then((response) => {
    console.log(response) //{58507475: false, 589547488: false}
});

//Find users with their usernames
Client.blacklists.find('cocoakacoco', 'PBM').then((response) => {
  console.log(response) //{cococakacoco: false}
});

Kronos.utils.getIdFromUsername('cocoakacoco').then((response) => {
    console.log(response) //58507475
});

client.plugin.extend('gato', {url: 'https://api.thecatapi.com/v1/images', query: 'id', headers: {poo: 'hi'}})

client.plugin.run('gato', {param: 'search', query: '1'}).then(function(response) {
    //...
}) //Goes to https://api.thecatapi.com/v1/images/search?id=1 with specified header poo.
```