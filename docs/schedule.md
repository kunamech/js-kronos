createClient#Schedule
===

This is prob. the most critic part of the library. 



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


TBD. I'm lazy.