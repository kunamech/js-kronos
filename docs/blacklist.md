createClient#blacklists
===

This function lets you check the users if they are blacklisted. You can use 2 diffrent methods for that; **blacklists#get** and **blacklists#find**

> NOTE: You need an authorized API key for that.

``Usage: blacklists#method('id-or-name-string', 'division')``

Example code:

```js
... //client is declaration of createClient

client.blaclists.get('58507475', 'PBM').then(function(response) {
... //Things to do, response will be like {"58507475": false}
});

client.blaclists.find('cocoakacoco', 'PBM').then(function(response) {
 ... //Stuff to do with return, format will be like {"cocoakacoco": false}   
})
```