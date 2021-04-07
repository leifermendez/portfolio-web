const webpush = require('web-push');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(cors())

app.use(bodyParser.json())

const vapidKeys = {
  "publicKey": "BGmZ039okFid9eDMauKTunFpaqytiISZ_niGKXXKZpkcj5uWXNwcdfO2CVxEjQVw6Ud0gNFHM1BVsWXFFdwTAQA",
  "privateKey": "l6oKTW8TvFSGuCOC-nM4G1IEgB6g9_bhEHJ0iQx-NFM"
}

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// ------------ HELPERS ------------------------------//

const handlerResponse = (res, data, code = 200) => {
  res.status(code).send({data})
}

//------------- CONTROLADORES -------------------------//

const savePush = (req, res) => {

  const name = Math.floor(Date.now() / 1000);

  let tokenBrowser = req.body.token;

  let data = JSON.stringify(tokenBrowser, null, 2);

  fs.writeFile(`./tokens/token-${name}.json`, data, (err) => {
    if (err) throw err;
    handlerResponse(res, `Save success`)
  });
};

const sendPush = (req, res) => {

  const payload = {
    "notification": {
      "title": "EY!! Mira esto",
      "body": "Subscribete a mi canal de YOUTUBE",
      "vibrate": [100, 50, 100],
      "image": "https://i.imgur.com/TtHZzvc.png",
      "actions": [{
        "action": "explore",
        "title": "HOLA!"
      }]
    }
  }

  const directoryPath = path.join(__dirname, 'tokens');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      handlerResponse(res, `Error read`, 500)
    }

    files.forEach((file) => {
      const tokenRaw = fs.readFileSync(`${directoryPath}/${file}`);
      const tokenParse = JSON.parse(tokenRaw);

      webpush.sendNotification(
        tokenParse,
        JSON.stringify(payload))
        .then(res => {
          console.log('Enviado !!');
        }).catch(err => {
        console.log('** USUARIO NO TIENE PERMISOS O LAS KEYS NO SON CORRECTAS');
      })

    });
  });

  res.send({data: 'Se envio subscribete!!'})

}

//------------- RUTAS ------------------------------//

app.route('/save').post(savePush);

app.route('/send').post(sendPush);


const httpServer = app.listen(9000, () => {
  console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});
