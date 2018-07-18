
const {
    LSPORTS_USERNAME,
    LSPORTS_PASS,
    LSPORTS_GUID,
} = process.env

const scriptGeter = (url, model, params = null) => {
    url = url + `?username=${encodeURIComponent(LSPORTS_USERNAME)}&password=${LSPORTS_PASS}&guid=${LSPORTS_GUID}`;
  // if (model === 'events') {
  //     url = url + '&sports=' + params.sport + '&leagues=' + params.league;
  // }
  console.log(url);
  return new Promise((resolve, reject) => {

    const http        = require('http'),
          https       = require('https');

    let client = http;

    if (url.toString().indexOf("https") === 0) {
        client = https;
    }

    client.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            resolve(data);
        });

    }).on("error", (err) => {
        reject(err);
    });
  });

};


// const scriptGeter = async (url) => {
//     let data = await getData(url);
//     data = JSON.parse(data)
//     return data.Body
// }



export default scriptGeter
