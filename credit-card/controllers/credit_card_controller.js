const { response } = require('express');
const db = require('./db')

module.exports = () => {
    var payment = require('../services/credit_card_services');
    const controller = {};

    controller.payment_proc = (req, res) => {
        var validate = payment.validate_card(req.query.number, req.query.value, req.query.cvv);
        if (!validate[0]) {
            res.status(400).json(validation[1]);
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
    };

    return controller;
}