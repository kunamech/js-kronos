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
  await promise.then(data => {
    return data
  })
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

function correctDivision(div, usage) { //usage 1 is schedule
  let bDivisions = ['PBST', 'TMS']
  let sDivisions = ['PBST', 'TMS', 'PET', 'PBM']
  if (div instanceof String !== false) return false

  if (!usage) {

    if (sDivisions.includes(div)) {
      return true
    } else {
      return false
    }
  } else {
    if (usage <= 0) {
      if (bDivisions.includes(div)) {
        return true
      } else {
        return false
      }
    }
    if (usage >= 1) {
      if (sDivisions.includes(div)) {
        return true
      } else {
        return false
      }
    }
  }
}

module.exports = {
  getIdFromUsername: getIdFromUsername,
  createKronosWarning: createKronosWarning,
  createKronosError: createKronosError,
  correctDivision: correctDivision
}