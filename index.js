/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a sample skill built with Amazon Alexa Skills nodejs
 * skill development kit.
 * This sample supports multiple languages (en-US, en-GB, de-GB).
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-howto
 **/

'use strict';

const Alexa = require('alexa-sdk');
const recipes = require('./recipes');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            RECIPES: recipes.gins,
            FLAVOURS: recipes.flavours,
            SKILL_NAME: '<prosody pitch="high">GIN MASTER</prosody>',
            WELCOME_MESSAGE: "Welcome to %s. The skill that makes YOU the <emphasis level=\"strong\">GIN MASTER</emphasis> , all your friends will look up to. Ask questions like, what\'s a good spicy gin, or suggest a good fresh fruit gin... Now, what can I help you with?",
            WELCOME_REPROMPT: 'For instructions on what you can say, please say help me.',
            HELP_MESSAGE: "You can ask questions such as, what\'s a good spicy gin, or suggest a good fresh fruit gin... Now, what can I help you with?",
            HELP_REPROMPT: "You can say things like, what\'s the recipe, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Thanks for using Gin Master!',
        },
    },
};

const handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMPT');

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'GinRecommendIntent': function () {
        const itemSlot = this.event.request.intent.slots.flavour;
        let flavour;
        if (itemSlot && itemSlot.value) {
            flavour = itemSlot.value.toLowerCase();
        }

        const myRecipes = this.t('RECIPES');
        const recipe = myRecipes[flavour];

        if (recipe) {
            this.attributes.speechOutput = 'Have you tried ' + recipe + ' gin? <prosody rate="slow">The other bots tell me its great!</prosody>';
            this.attributes.repromptSpeech = this.attributes.speechOutput;

            this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
            this.emit(':responseReady');
        } else {
            let speechOutput = 'I couldn\'t find a ' + flavour + ' gin, try another flavour!';
            let repromptSpeech = '';

            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = speechOutput;

            this.response.speak(speechOutput).listen(repromptSpeech);
            this.emit(':responseReady');
        }
    },
    'FlavourAddIntent': function () {
        const itemSlot = this.event.request.intent.slots.flavour;
        let flavour;
        if (itemSlot && itemSlot.value) {
            flavour = itemSlot.value.toLowerCase();
        }

        const myRecipes = this.t('FLAVOURS');
        const flavourToAdd = myRecipes[flavour];

        if (flavourToAdd) {
            this.attributes.speechOutput = 'Have you ever added ' + flavourToAdd + ' to your ' + flavour + ' gin? I heard it\'s great in the afternoon after work';
            this.attributes.repromptSpeech = this.attributes.speechOutput;

            this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
            this.emit(':responseReady');
        } else {
            let speechOutput = 'I couldn\'t find ' + flavour + ' on the gin flavour wheel, try another flavour!';
            let repromptSpeech = '';

            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = speechOutput;

            this.response.speak(speechOutput).listen(repromptSpeech);
            this.emit(':responseReady');
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'AMAZON.RepeatIntent': function () {
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = 'Thanks for using Gin Master! Go forth and spread your new found gin knowledge!';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended: ${this.event.request.reason}`);
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

