const got = require("got"); //rip request 

var config = {
  hostname: 'pb-kronos.dev/api',
  version: `V1`
}

class API {
  constructor(token) {
    this.token = token
  }

  version = require('../package').version; //Why this exists? what was the reason behind it? Jokes aside It gives the client version.

  api = {
    version: config.version //Gives the version of Kronos API
  }

  token = this.token; //Gives the client token

  blacklists = {
    get: async (id, div) => { //arrow functions B)
      if (!id) throw new Error("[js-kronos] ID field cannot be empty");
      if (!div) throw new Error("[js-kronos] Division field cannot be empty.");
      if (div instanceof String) throw new Error("[js-kronos] division can only be a string!");
      if (id instanceof Number) id = toString(id);
      if (!["PBST", "TMS"].indexOf(div)) throw new Error(`[js-kronos] Error: ${div} is not a valid division!`);

      if (id instanceof Array) id = Array.join(",")
      got(`https://pb-kronos.dev/${div}/blacklist/checkusers?userids=${id}`, {
        headers: {
          'Access-Key': this.token,
          'Content-Type': "x-url-form-encoded"
        }
      }).then(async res => {
        return await JSON.parse(res.body)
      });
    }
  }

  schedule = {
    get: async (div) => {
      console.log
      if (!div) throw new Error("[js-kronos] Division field cannot be empty.")
      if (!["PBST", "PET", "PBM", "TMS"].indexOf(div)) throw new Error(`[js-kronos] Error: ${div} is not a valid division!`)
      
      got(`https://pb-kronos.dev/api/schedule/${div}`, {
        headers: {
          'Access-Key': this.token
        }
      }).then(async res => {
        return await JSON.parse(res.body)
      })
    }
  }

}



module.exports = API