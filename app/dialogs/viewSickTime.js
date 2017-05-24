module.exports = function (bot, sickTime) {
  bot.dialog('/viewSickTime', [
    function (session, args, next) {
      var sickDays = (sickTime / 8)
      session.send('Remaining sick time: ' + sickTime + 'Hrs (' + sickDays + ' Days).')
      session.endDialog()
    }
  ])
}
