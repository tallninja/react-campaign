const sendgrid = require("sendgrid");
const config = require("config");

const helper = sendgrid.mail;

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sendGridApi = sendgrid(config.get("sendGrid.apiKey"));

    this.from_email = new helper.Email("techystuffs123@gmail.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatRecipients(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatRecipients = (recipients) => {
    return recipients.map((recipient) => {
      return new helper.Email(recipient.email);
    });
  };

  addRecipients = () => {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  };

  addClickTracking = () => {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  };

  send = async () => {
    const request = this.sendGridApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON(),
    });

    const response = await this.sendGridApi.API(request);
    return response;
  };
}

module.exports = Mailer;
