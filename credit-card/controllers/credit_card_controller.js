const { response } = require('express');
const db = require('./db')

module.exports = () => {
    const controller = {};
    var payment = require('../services/credit_card_services');

    controller.payment_proc = (req, res) => {
        var validate = payment.validate_card(req.query.number, req.query.value, req.query.cvv);
        if (!validate[0]) {
            res.status(400).json(validate[1]);
        } else {
            var today = new Date();
            var data_to_insert = {
                method: 'credit card',
                purchase_value: req.query.value,
                client: req.query.client_id,
                date: `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`
            }
            console.log(data_to_insert)
            db.insert(data_to_insert)

            res.status(200).json(payment.update_info(req.query.number, req.query.value));
        }
    }

    controller.validate_card = (req, res) => {
        var validate = payment.validate_card(req.query.number, 0, req.query.cvv);
        if (!validate[0]) {
            res.status(400).json(validate[1]);
        } else {
            res.status(200).json('OK');
        }
    }

    return controller;
}