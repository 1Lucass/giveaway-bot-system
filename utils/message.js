const config = require("../config.json");
module.exports = {
  giveaway:
    (config.everyoneMention
      ? "<@&1003628161659064351>\n\n" : "<@&829748275791659059>\n\n", "<@&1003661225227472986>\n\n", "<@&1003628161659064351>\n\n") +
    "<a:notificationbell:1001705685349847082> **GIVEAWAY** <a:notificationbell:1001705685349847082>",

  giveawayEnded:
    (config.everyoneMention
      ? "<@&1003628161659064351>\n\n"
      : "<@&829748275791659059>\n\n",
    "<@&1003661225227472986>\n\n",
    "<@&1003628161659064351>\n\n") +
    "<a:offline:1001866920913547416> **GIVEAWAY ENDED** <a:offline:1001866920913547416>",

  drawing: `Ends: **{timestamp}**`,
  inviteToParticipate: `React with 🎉 to participate!`,
  winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "Giveaway cancelled, no valid participations.",
  hostedBy: "Hosted By: {this.hostedBy}",
  winners: "Winner(s)",
  endedAt: "Ended at",
};
