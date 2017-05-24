const builder = require('botbuilder')

module.exports = function (bot) {
  bot.dialog('/viewUpcomingBirthdays', [
    function (session, args, next) {
      // display card with data
      var msg = new builder.Message(session)
        .textFormat(builder.TextFormat.xml)
        .attachments([
          new builder.HeroCard(session)
            .title('Upcoming Team Birthdays')
            .subtitle('Time for a team lunch?')
            .text('Jane Doe: May 25, 1990 (Thursday)')
            .images([
              builder.CardImage.create(session, 'http://az616578.vo.msecnd.net/files/2017/03/13/636250236946931769-1159404963_636211716182035480637037577_every-school-needs-to-adopt-the-birthday-cake-ban.jpg')
            ])
            .buttons([
              builder.CardAction.openUrl(session, 'https://www.yelp.com/biz/burger-king-streamwood', 'Make a lunch reservation!')
            ])
        ])
      session.send(msg)
      session.endDialog()
    }
  ])
}
