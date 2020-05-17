const fbadm = require('firebase-admin');
const _ = require('lodash');

module.exports = async function (req, res) {
    if (_.get(req, "body.phone", "") === "") {
        return res.status(422).send({ error: "phone is required" });
    }

    if (_.get(req, "body.name", "") === "") {
        return res.status(422).send({ error: "name is required" });
    }

    if (_.get(req, "body.email", "") === "") {
        return res.status(422).send({ error: "email is required" });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const name = String(req.body.name);
    const email = String(req.body.email);

    try {
        const user = await fbadm.auth().getUser(phone);

        return res.send(user);
    } catch (err) {
        try {
            const insUnser = { uid: phone, displayName: name, email: email, emailVerified: false };
            const user = await fbadm.auth().createUser(insUnser);
            return res.send(user);
        } catch (error) {
            return res.status(400).send({ error: error });
        }
    }
}