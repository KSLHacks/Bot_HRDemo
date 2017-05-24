const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('/viewAnniversary', [
    function (session, args, next) {
      if (typeof args !== 'undefined' && args.entities) {
        var employee = builder.EntityRecognizer.findEntity(args.entities, 'employee')
        if (!employee) {
          builder.Prompts.choice(session, 'Select an employee', ['Kevin Leung', 'Chih-Wei Tsai', 'Jane Doe', 'John Doe'], { listStyle: builder.ListStyle['button'] })
        } else {
          next({ response: employee.entity })
        }
      } else {
        builder.Prompts.choice(session, 'Select an employee', ['Kevin Leung', 'Chih-Wei Tsai', 'Jane Doe', 'John Doe'], { listStyle: builder.ListStyle['button'] })
      }
    },
    function (session, results) {
      var employee = results.response
      if ((employee === 'kevin') | (employee.index === 0)) {
        session.send("Kevin's anniversary: 05/25/2017")
      } else if ((employee === 'chih - wei') | (employee.index === 1)) {
        session.send("Chih-Wei's anniversary: 05/25/2017")
      } else if ((employee === 'jane') | (employee.index === 2)) {
        session.send("Jane's anniversary: 05/25/2017")
      } else if ((employee === 'john') | (employee.index === 3)) {
        session.send("John's anniversary: 05/25/2017")
      }
      session.endDialog()
    }
  ])
}
