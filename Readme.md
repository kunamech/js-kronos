## Kronos-js

An unofficial library to interact with Kronos API. Maintained by uurgothat.

Example;
```javascript
const kronos = require("kronos-js");
const client = new kronos("token");

    console.log(client.api.version) //V1
    console.log(client.version) //1.0.0
    console.log(client.token) //token

    client.blacklists.get("58507475", "PBM"); //false

    client.schedule.get("PBM") //{...} (funfact: Nothing)

```