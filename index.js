const SlackBot = require('slackbots');
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'Whale Bot'
})

// Start Handler

const params = {};

params.min_value = 500000;
params.currency = "btc";
params.api_key = process.env.API_KEY;
params.transaction_type = "transfer";


setInterval(()=>{
    params.start = Math.floor(Date.now() / 1000) - 3600;
    axios.get('https://api.whale-alert.io/v1/transactions', {params})
    .then(res => {
        const transactions = res.data.transactions;
        transactions.forEach(transaction => {
            bot.on('start', () => {
                const params = {
                    icon_emoji: ':robot_face:'
                }

                bot.postMessageToChannel(
                    'random',
                    transaction.amount + " #BTC ("+transaction.amount_usd+"USD) \n transferred from " + transaction.from.address ,
                    params
                );
            })
        });
    })
    
}, 10000)
// bot.on('start', () => {
//     const params = {
//         icon_emoji: ':robot_face:'
//     }

//     bot.postMessageToChannel(
//         'random',
//         'Get inspired while working with @inspirenuggets',
//         params
//     );
// })

// // Error Handler
// bot.on('error', (err) => {
//     console.log(err);
// })

// // Message Handler
// bot.on('start', (data) => {
//     // if(data.type !== 'message') {
//     //     return;
//     // }
//     handleMessage("random jok");
// })

// // Response Handler
// function handleMessage(message) {
//     if(message.includes(' inspire me')) {
//         inspireMe()
//     } else if(message.includes(' random joke')) {
//         randomJoke()
//     } else if(message.includes(' help')) {
//         runHelp()
//     }
// }

// // inspire Me
// function inspireMe() {
//     axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
//       .then(res => {
//             const quotes = res.data;
//             const random = Math.floor(Math.random() * quotes.length);
//             const quote = quotes[random].quote
//             const author = quotes[random].author

//             const params = {
//                 icon_emoji: ':male-technologist:'
//             }
        
//             bot.postMessageToChannel(
//                 'random',
//                 `:zap: ${quote} - *${author}*`,
//                 params
//             );

//       })
// }

// // Random Joke
// function randomJoke() {
//     axios.get('https://api.chucknorris.io/jokes/random')
//       .then(res => {
//             const joke = res.data.value;

//             const params = {
//                 icon_emoji: ':smile:'
//             }
        
//             bot.postMessageToChannel(
//                 'random',
//                 `:zap: ${joke}`,
//                 params
//             );

//       })
// }

// // Show Help
// function runHelp() {
//     const params = {
//         icon_emoji: ':question:'
//     }

//     bot.postMessageToChannel(
//         'random',
//         `Type *@inspirenuggets* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
//         params
//     );
// }