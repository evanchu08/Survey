const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for your voting')
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        console.log(req.body);
        res.send({});
    })

    app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        //Great place to send an email
        try {
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (error) {
            res.status(422).send(error);
        }
    })
}




