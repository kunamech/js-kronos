createClient#Schedule
===

This method is prob. the fundamental of the library



Schedule#get
==

This method returns with a promise.

```javascript
const Kronos = require('js-kronos');
const client = new Kronos.createClient('string-token');

client.schedule.get('TMS').then(async(promise) => {
    //Stuff to do with promise.
});

//Caps doesn't matters
client.schedule.get('PbSt').then(async(promise) => {
    //Stuff to do with promise.
});

```


Schedule#colors
==

Reserved for future. Coasterteam hasn't relased it yet.

```js
client.schedule.colors('PbSt').then(async(promise) => {
    //Stuff to do with promise.
});

```