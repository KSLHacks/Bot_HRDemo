const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('/viewAnniversary', [
    function (session, args, next) {
      var style = builder.ListStyle['button']
      builder.Prompts.choice(session, 'Select an employee', ['Kevin Leung', 'Chih-Wei Tsai', 'Jane Doe', 'John Doe'], { listStyle: style })
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          session.send("Kevin's anniversary: 05/25/2017")
          break
        case 1:
          session.send("Chih-Wei's anniversary: 05/25/2017")
          break
        case 2:
          session.send("Jane's anniversary: 05/25/2017")
          break
        case 3:
          session.send("John's anniversary: 05/25/2017")
          break
      }
      session.endDialog()
    }
  ])
}
