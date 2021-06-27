const got = require("got");

/**
 * 
 * @param {String} id The username
 * @returns {promise}
 */
async function getIdFromUsername(id) {
  // if(id instanceof String) { //for some reason It gives an error
  if (id.length < 3) throw new Error("[js-kronos] ERROR: username cannot be shorter than 3")

  let promise = new Promise((resolve, reject) => {
    got(`https://api.roblox.com/users/get-by-username?username=${id}`).then(async (res) => {
      resolve(res.body.Id)
    }).catch((err) => {
      reject(createKronosError(`${err} (getIdFromUsername)`));
    })
  })
  return await promise
  //}else{
  //console.error(`[js-kronos]  ${chalk.red('ERROR: username can only be a string')}.`)
  //}
}

//createKronosWarning
function createKronosWarning(text) {
  return console.error(`[js-kronos] WARNING: ${text}`);
};


function createKronosError(text, ifThrow) {
  if(!ifThrow) ifThrow = false
  if (ifThrow == true) {
    throw new Error(`[js-kronos] ERROR: ${text}`)
  } else if (ifThrow == false) {
    return new Error(`[js-kronos] ERROR: ${text}`)
  };
};

function correctDivision(division, usage) { //false is schedule
  let mode = usage || false;
  let div = division.toUpperCase()

  let bDivisions = ['PBST', 'TMS']
  let sDivisions = ['PBST', 'TMS', 'PET', 'PBM', 'ALL']
  if (div instanceof String !== false) return false

  if(!mode && sDivisions.includes(div)) return true
  if(mode && bDivisions.includes(div)) return true
  return false
}

module.exports = {
  getIdFromUsername: getIdFromUsername,
  createKronosWarning: createKronosWarning,
  createKronosError: createKronosError,
  correctDivision: correctDivision
}