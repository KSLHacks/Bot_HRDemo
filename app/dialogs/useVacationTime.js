const builder = require('botbuilder')

module.exports = function (bot, vacationTime) {
  bot.dialog('/useVacationTime', [
    updateVacationTime(vacationTime),
    function (session, results) {
      var pto = results.response[0]
      var vacationTime = results.response[1]

      vacationTime = (vacationTime - pto)
      var vacationDays = (vacationTime / 8)

      session.send('Updating your vacation time..')
      session.send('Remaining vacation time: ' + vacationTime + 'Hrs (' + vacationDays + ' Days).')
      session.endDialog()
    }
  ])
}

function updateVacationTime (vacationTime) {
  return function (session, args, next) {
    if (typeof args !== 'undefined' && args.entities) {
      var pto = builder.EntityRecognizer.findEntity(args.entities, 'builtin.number')
      if (!pto) {
        builder.Prompts.number(session, 'How many hours did you use?')
      } else {
        next({ response: [pto.entity, vacationTime] })
      }
    } else {
      builder.Prompts.number(session, 'How many hours did you use?')
    }
  }
}
