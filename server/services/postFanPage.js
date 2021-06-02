const axios = require('axios');
const qs = require('qs');

const url = `https://graph.facebook.com/v10.0/108020131360293_${process.env.FP_POST}/comments`
const questions = [
    `1️⃣ ¿Qué opinión tienes acerca del contenido de mi canal de Youtube? \n`,
    `2️⃣ ¿Qué te gustaría que mejorara en el canal de YT? \n`,
    `3️⃣ ¿Por qué me comenzaste a seguir? ¡(Si aún no me sigues hazlo!) 😅 \n`,
].join(' ')


const postFb = ({dataJson}) => new Promise((resolve, reject) => {
    const message = [
        `👋 Hola!`,
        `${dataJson.first_name} 💆‍♂️`,
        `quiero estar más conectado contigo`,
        `y quisiera saber... \n`
    ].join(' ')

    console.log('----------->', process.env.APP_FB_TOKEN)
    console.log('****************', `${message} ${questions}`)
    const data = qs.stringify({
        'message': `${message} ${questions}`,
        'access_token': process.env.APP_FB_TOKEN
    });
    const config = {
        method: 'post',
        url,
        headers: {
            'Host': 'graph.facebook.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    axios(config)
        .then((response) => {
            resolve({res: response.data})
        })
        .catch((error) => {
            reject(error)
        });
})

module.exports = {postFb}
