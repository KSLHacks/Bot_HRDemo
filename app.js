// Require npm packages
require('dotenv').config()
const restify = require('restify')
const builder = require('botbuilder')

// Require dialogs
const viewSickTimeDialog = require('./app/dialogs/viewSickTime')
const viewVacationTimeDialog = require('./app/dialogs/viewVacationTime')
const viewUpcomingBirthdaysDialog = require('./app/dialogs/viewUpcomingBirthdays')
const viewAnniversary = require('./app/dialogs/viewAnniversary')

// Global variables
var sickTime = 120
var vacationTime = 508

// =========================================================
// Bot Setup
// =========================================================

// Setup Restify Server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url)
})

// Create chat bot
var connector = new builder.ChatConnector({
  appId: process.env.APP_ID,
  appPassword: process.env.APP_PASS
})

var bot = new builder.UniversalBot(connector)
server.post('/api/messages', connector.listen())

// Setup LUIS connection
var model = 'https://api.projectoxford.ai/luis/v1/application?id=' + process.env.LUIS_ID + '&subscription-key=' + process.env.LUIS_KEY + '&verbose=true'
var recognizer = new builder.LuisRecognizer(model)
var dialog = new builder.IntentDialog({recognizers: [recognizer]})
bot.dialog('/', dialog)

// =========================================================
// LUIS Dialogs
// =========================================================

dialog.matches('Greeting', [
  function (session, results) {
    session.send('Hello! I am your friendly HR bot. What can I help you with today?')
  }
])

dialog.matches('getSickTime', [
  function (session, results) {
    session.send("I hope you're feeling okay.")
    session.beginDialog('/viewSickTime')
  }
])

dialog.matches('getVacationTime', [
  function (session, results) {
    session.send('A vacation sounds great!')
    session.beginDialog('/viewVacationTime')
  }
])

dialog.matches('getUpcomingBirthdays', [
  function (session, results) {
    session.send('Checking birthdays..')
    session.beginDialog('/viewUpcomingBirthdays')
  }
])

dialog.matches('getAnniversaries', [
  function (session, results) {
    session.send('Checking anniversaries..')
    session.beginDialog('/viewAnniversary', results)
  }
])

dialog.matches('Farewell', [
  function (session, results) {
    session.send('Glad I could help! Have a great day!')
  }
])

dialog.onDefault([
  function (session, results) {
    session.send('Sorry.. I did\'t understand that. Let me show you what I can do.')
    session.beginDialog('/mainMenu', results)
  }
])

// =========================================================
// Bots Dialogs
// =========================================================

viewSickTimeDialog(bot, sickTime)
viewVacationTimeDialog(bot, vacationTime)
viewUpcomingBirthdaysDialog(bot)
viewAnniversary(bot)

// present the user with a main menu of choices they can select from
bot.dialog('/mainMenu', [
  function (session, results) {
    var style = builder.ListStyle['button']
    builder.Prompts.choice(session, 'I can do any of these, pick one!', ['Show sick time', 'Show vacation time', 'View upcoming birthdays', 'View employee anniversary'], { listStyle: style })
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        session.beginDialog('/viewSickTime')
        break
      case 1:
        session.beginDialog('/viewVacationTime')
        break
      case 2:
        session.beginDialog('/viewUpcomingBirthdays')
        break
      case 3:
        session.beginDialog('/viewAnniversary')
        break
    }
  }
])
