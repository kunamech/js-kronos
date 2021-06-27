In js-kronos there is a simple API for reaching the gateways that we cannot built into library for security reasons.

You can extend a plugin with a name and config objects using **plugin#extend** and run it with **plugin#run**, It also has It's own parameters! 

> Avaible configurations for plugin#extend 

> **url**: For the URL of host. **It won't be added over the default and you can define a param anytime** 

> **query**: Add a query with that. 

> **param**: Define a gateway.

Example usage:


```js
... //(Kronos#createClient is client here)


client.plugin.extend('gato', {url: 'https://api.thecatapi.com/v1/images', query: 'id', headers: {poo: 'hi'}})

const response = await client.plugin.run('gato', {param: 'search', query: '1'}) //Goes to https://api.thecatapi.com/v1/images/search?id=1 with specified header poo.

```