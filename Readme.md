## Kronos-js

An unofficial library to interact with Kronos API. Maintained by uurgothat.

Example usage:
```javascript
const Kronos = require("js-kronos");
const client = new Kronos.Client("token");

    console.log(client.api.version) //V1
    console.log(Kronos.version) //2.0.0-beta
    console.log(client.token) //token

    client.blacklists.get('58507475', 'PBM'); //{'58507475': false}
    client.blacklists.get(['1', '2', '3'], 'PET') //{'1': false, '2': false, '3': false}
   
    client.schedule.get('PET') //{...} (funfact: Nothing)

```