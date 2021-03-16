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
  "publicKey": "BLsPtiDIHfvdJu_PbjezOcH48U3AJdzSXgMHiYkb7Z-gbyDvM_XA3ZkN_dQf0RgNef7c4LBfIwPMWMfdMEl5x60",
  "privateKey": "Tt9lwU8hHRWOu__0WansnXjVJYVrrtORnZQI5LEH8bk"
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
      "title": "HOLA CLARO QUE SIIIIII !! MUY BIEN",
      "body": "Subscribete a mi canal de YOUTUBE",
      "vibrate": [100, 50, 100],
      "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
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
