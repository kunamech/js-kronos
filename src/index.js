const got = require("got");

const config = {
  hostname: 'pb-kronos.dev/api/',
  legacy: `v1`, //Useless
  version: `v1` //Useless
};

this.useLegacy = false;
this.gateway = `https://${config.hostname}/`; //`https://${config.hostname}/${config.version}/`

/**@
 * Gives the version of the library
 *
 * @return {string} Version of the library.
 */
var version = require('../package').version;

class API {
  constructor(token) {
    this.token = token;
  };

  api = {
    version: config.version,
    legacy: {
      version: config.legacy
    },
    useLegacy:(async() => {
      while (true) {
        this.useLegacy = true
      };
    })
  };


  /**
   * Give the token of the client
   * 
   * @override
   * @since 1.1.0 */
  token = this.token;

  blacklists = {
    /**
     * Returns 
     *
     * @param {string} id The Roblox ID to check if the person is blacklisted.
     * @param {Array} id The Roblox IDs to check if the persons are blacklisted.
     * @param {string} div The division to check
     * @return {boolean} x raised to the n-th power.
     */
    get: async (id, div) => { //arrow functions B)
      if (!id) throw new Error("[js-kronos] ID field cannot be empty.");
      if (!div) throw new Error("[js-kronos] Division field cannot be empty.");
      if (!div instanceof String) throw new Error("[js-kronos] Division can only be a string!");
      if (id instanceof Number) id = toString(id);
      if (!["PBST", "TMS"].indexOf(div)) throw new Error(`[js-kronos] Error: ${div} is not a valid division!`);

      if (id instanceof Array) id = Array.join(",")

      if (this.useLegacy == false, this.useLegacy !== true) {
        got(`${this.gateway}${div}/blacklist/checkusers?userids=${id}`, { //change at V2
          headers: {
            'Access-Key': this.token,
            'Content-Type': 'application/json'
          }
        }).then(async res => {
          return await JSON.parse(res.body)
        });

      } else if (this.useLegacy == true) { //put the previous at V2
        got(`https://pb-kronos.dev/${div}/blacklist/checkusers?userids=${id}`, {
          headers: {
            'Access-Key': this.token,
            'Content-Type': "application/json"
          }
        }).then(async res => {
          return await JSON.parse(res.body)
        });
      }
    }
  };

  /**
   * Returns with division schedule.
   *
   * @param {string} div The division to check the schedule
   * @return {Array} Division schedule.
   */
  schedule = {
    get: async (div) => {
      if (!div) throw new Error("[js-kronos] Division field cannot be empty.")
      if (!["PBST", "PET", "PBM", "TMS"].indexOf(div)) throw new Error(`[js-kronos] Error: ${div} is not a valid division!`)

      if (this.useLegacy == false, this.useLegacy !== true) {
        got(`${this.gateway}/schedule/${div}`, {

        }).then(async res => {
          return await JSON.parse(res.body)
        });
      } else if (this.useLegacy == true) {
        got(`https://pb-kronos.dev/api/schedule/${div}`, {
          headers: {
            'Access-Key': this.token
          }
        }).then(async res => {
          return await JSON.parse(res.body)
        });
      }

    }
  };
};



module.exports = {
  /**
   * Declare the client.
   * 
   * @class
   * @since 1.0.0
   */
  Client: API,
    /**
   * Give the token of the client.
   * 
   * @override
   * @since 1.1.0 */
  version: version
}