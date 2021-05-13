## Js-kronos

A promise-based (at least for now) Node.js API wrapper for Kronos API with It's single dependency and utility tools.
Maintained by uurgothat aka cocoakacoco.


How to install?
====
>Use this command to install.
`npm i js-kronos`


Example usage of the library with all functions avaible:
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
})

Kronos.utils.getIdFromUsername('cocoakacoco').then((response) => {
    console.log(response) //58507475
})

```