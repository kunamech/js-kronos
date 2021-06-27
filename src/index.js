const got = require('got');
const util = require('./util');

const config = {
    hostname: 'pb-kronos.dev/api/',
    version: `v2`
};

const gateway = `https://${config.hostname}${config.version}`;

const {createKronosError, createKronosWarning, getIdFromUsername, correctDivision} = util

let plugins = {};
class API {
    constructor(KeyEntry) {
        this.token = KeyEntry;
        this.headers = {
            'Access-key': this.token,
            'Content-Type': 'application/json'
        }
    }

    api = {
        /**
         * Gives the wrapper configurations
         * 
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/misc.md
         * @returns {Object} return config and gateway
         */
        config: {
            config,
            gateway
        },
        /**
         * Gives the API version
         *
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/misc.md
         * @returns {String} return version.
         */
        version: config.version,
        /**
         * Gives the header configurations in use
         * 
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/misc.md
         * @returns {Object} return headers object
         */
        headers: this.headers
    }

    blacklists = {
        /**
         * Check if the user is blacklisted.
         * 
         * 
         * @param {(Array|String)} userId Id(s) to check
         * @param {String} division Division to check
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/blacklist.md
         * @returns {Promise}
         */
        get: (async (userId, div) => {
            let set;
            let postArray = []
            let division = div.toUpperCase()

            if (correctDivision(division, true)) {
                if (!userID instanceof(String || Array || Number)) return createKronosError(`userId can only be a string or array!`)
                //Array handling
                if (userID instanceof Array) {
                    userID.forEach(x => {
                        if (!x instanceof(String || Number) && x.includes("?" || "/" || ".")) return createKronosError(`userId Array contains illegal object or strings! (blacklists#get)`);
                        if (x instanceof Number) toString(x)
                        postArray.push(x);
                        set = postArray.join(",")
                    });
                }
                if(userId instanceof Number) set = toString(userId)
                if(userId instanceof String) set = userId

                let promise = new Promise((resolve, reject) => {
                    got(`${gateway}/blacklist/${division}/blacklist?checkusers=${set}`, {
                        headers: this.headers
                    }).then((res) => {
                        resolve(JSON.parse(res.body))
                    }).catch((err) => {
                        reject(createKronosError(`${err.response.statusCode}: ${err.response.body} (blacklists#get)`));
                    })
                    
                })
                return await promise


            } else {
                return createKronosError(`This is not a valid division! (blacklists#get)`)
            }



        }),

        /**
         * Check the user if blacklisted.
         * 
         * @param {String} username Tthe Username.
         * @param {String} division The division.
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/blacklist.md
         * @returns {Promise}
         */
        find: (async (username, div) => {
            let user;
            let division = div.toUpperCase();

            getIdFromUsername(username).then((user) => {
                let obj = {};

                let promise = new Promise((resolve, reject) => {
                    got(`${gateway}${division}/blacklist/checkusers?userids=${user}`, {
                        headers: this.headers
                    }).then((res) => {
                        let respon = JSON.parse(res.body);
                        obj[username] = respon[user];
                        resolve(JSON.parse(JSON.stringify(obj)))
                    }).catch((err) => {
                        reject(createKronosError(`${err.response.statusCode}: ${err.response.body} (blacklists#find)`));
                    })
                })
            });

            return await promise
        })
    }

    schedule = {
        /**
         * Get the schedule of a division
         * 
         * @param {String} div The division [PBST, TMS, PBM are avaible] or ALL for schedule of all avaible divisions 
         * @returns  {Promise}
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/schedule.md
         */
        get: async (div) => {
            if (!div) return createKronosError(`Division cannot be empty! (schedule#get)`)
            let division = div.toUpperCase()

            if (correctDivision(division, false)) {
                let promise = new Promise((resolve, reject) => {
                    got(`${gateway}/schedule/${division}`, {
                        headers: this.headers
                    }).then(function (data) {
                        resolve(JSON.parse(data.body))
                    }).catch((err) => {
                        return reject(createKronosError(`${err.response.statusCode}: ${err.response.body} (schedule#get)`));
                    })
                })
                return await promise
            }
         return createKronosError(`Division is not valid or not a string! Valid ones are: PBST,TMS,PET,PBM (schedule#get)`, true)
        },

        /**
         * Get event colors of a division.
         * 
         * @param {String} division The division.
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/schedule.md
         */
        colors: ((division) => {
            return createKronosWarning(`schedule#colors is not an active method. (schedule#colors)`)
            let div = division.toUpperCase();
            if(!correctDivision(div)) return createKronosError(`ERROR: ${div} is not a valid division (schedule#colors)`);
            let promise = new Promise((resolve, reject) => {
                got(`${gateway}/schedule/${division}/colors`, {
                    headers: this.headers
                }).then(function (data) {
                    resolve(JSON.parse(data.body))
                }).catch((err) => {
                    return reject(createKronosError(`${err.response.statusCode}: ${err.response.body} (schedule#colors)`));
                })
            })
            return await promise
        })
    }

        plugin = {

            /**
             * Extend a custom gateway.
             * @param {String} name Name of the plugin
             * @param {Object} obj Object of plugin.
             * @returns Response body
             * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/plugin.md
             */
            extend: async(name, obj) => {
                let header = obj.headers || {};
                let query = obj.query || null;

                if(!name || !obj.url) return createKronosError(`name and url are mandatory for plugins. (plugin#extend)`, true)
                const form = {
                    gate: obj.url,
                    header: header,
                    query: query,
                }

                return plugins[name] = form
        },
        /**
         * Run an extended plugin.
         * @param {String} mod  Plugin name
         * @param {String} query Additional parameter for queries
         * @param {String} param Additional parameter for params
         * @returns Response
         * @description Check https://github.com/Thesourtimes/js-kronos/blob/main/docs/plugin.md
         */
        run: async(mod, obj) => {
            const addon = plugins[mod];
            if(!obj) obj = {}
            const url = !addon.query && !obj.param ? addon.query ? addon.gate+`?${addon.query}=${obj.query ? obj.query : ''}` : obj.param ? addon.gate+`/${obj.param}` : addon.gate : addon.gate+`/${obj.param}?${addon.query}=${obj.query}`;
            console.log(url)
            if(!addon) return createKronosError(`ERROR: ${mod} is not extended (run#${mod})`, true);

            let promise = new Promise((resolve, reject) => {
                got(url, {headers: Object.assign(addon.header, this.headers)}).then(function (data) {
                    resolve(JSON.parse(data.body))
                }).catch((err) => {
                    reject(createKronosError(`ERROR: ${err} (plugin#run)`, true));
                })
            })
            
            return await promise;
        }
    }
    

}

const utils = {
    /**
     * Get ID of a user with username
     * 
     * @param {String} id Username
     * 
     * @returns {Promise} 
     */
    getIdFromUsername: getIdFromUsername,
    /**
     * Check if the division name is correct.
     * 
     * @param {String} div Division.
     * 
     * @returns {Boolean} 
     */
    correctDivision: correctDivision
};

module.exports = {
    /**
     * Create the client 
     * 
     * 
     * @param {String} KeyEntry The token.
     * 
     * @class
     */
    createClient: API,

    /**
     * 
     * Gives the version of the js-kronos library.
     * 
     * @returns {String} Library version
     */
    version: require('../package').version,
    util: utils
}
