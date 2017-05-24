module.exports = function (bot, vacationTime) {
  bot.dialog('/viewVacationTime', [
    function (session, args, next) {
      var vacationDays = (vacationTime / 8)
      session.send('Remaining vacation time: ' + vacationTime + 'Hrs (' + vacationDays + ' Days).')
      session.send('You should probably take some time off.. :)')
      session.endDialog()
    }
  ])
}
