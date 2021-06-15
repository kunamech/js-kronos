const got = require('got');
const util = require('./util');

const config = {
    hostname: 'pb-kronos.dev/api/',
    version: `v2`
};

const gateway = `https://${config.hostname}${config.version}`;

const {createKronosError, createKronosWarning, getIdFromUsername, correctDivision} = util

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
         * 
         */
        config: {
            config,
            gateway
        },
        /**
         * Gives the API version
         *
         * @returns {String} 
         */
        version: config.version,
        /**
         * Gives the header configurations in use
         * 
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
         * 
         * @returns {Promise}
         */
        get: (async (userId, div) => {
            let set;
            let postArray = []
            let division = div.toUpperCase()

            if (correctDivision(division) === true) {
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
 //for commit
                return await promise.then(data => {
                    return data
                })

            } else {
                return createKronosError(`This is not a valid division! (blacklists#get)`)
            }



        }),

        /**
         * Check the user if blacklisted.
         * 
         * @param {String} username Tthe Username.
         * @param {String} division The division.
         * 
         * @returns {Promise}
         */
        find: (async (username, div) => {
            let user;
            let division = div.toUpperCase()

            getIdFromUsername(username).then((username) => {
                user = username;

                let promise = new Promise((resolve, reject) => {
                    got(`${gateway}${division}/blacklist/checkusers?userids=${user}`, {
                        headers: this.headers
                    }).then((res) => {
                        resolve(JSON.parse(res.body))
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
         */
        get: async (div) => {
            if (!div) return createKronosError(`Division cannot be empty! (schedule#get)`)
            let division = div.toUpperCase()
            
            if (division === "ALL") {
                let promise = new Promise((resolve, reject) => {
                    got(`${gateway}/schedule/all`, {
                        headers: this.headers
                    }).then(function (data) {
                        resolve(JSON.parse(data.body))
                    }).catch((err) => {
                        reject(createKronosError(`${err.response.statusCode}: ${err.response.body} (schedule#get)`, false));
                    })
                })

                return await promise.then(data => {
                    return data
                })
            }

        

            if (correctDivision(division, 1) === true) {
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

            } else {
                return createKronosError(`Division is not valid or not a string! Valid ones are: PBST,TMS,PET,PBM (schedule#get)`, true)
            }
        },

        /**
         * Get event colors of a division.
         * 
         * @param {String} division The division.
         * 
         */
        colors: ((division) => {
            return createKronosWarning(`schedule#colors is not an active feature.`)

            /* var result = correctDivision(div)
             if(result === true){
                 let promise = new Promise((resolve, reject) => {
             got(`${gateway}/schedule/${division}/colors`, {headers: this.headers}).then((res) => {
                 resolve(res.body)
             }).catch((err) => {
                 return reject(createKronosError(`${err.response.statusCode}: ${err.response.body} (schedule#colors)`));
              })
             })
             return await promise

             }else{
                return createKronosError(`Division is not valid or not a string! Valid ones are: PBST,TMS,PET,PBM (schedule#colors)`, true)
             }*/
        })
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
