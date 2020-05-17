const fbadm = require('firebase-admin');
const _ = require('lodash');

module.exports = async function (req, res) {
    if (_.get(req, "body.phone", "") === "") {
        return res.status(422).send({ error: "phone is required" });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    try {
        const user = await fbadm.auth().getUser(phone);

        const userDbRef = fbadm.database().ref('users/' + user.uid);
        const otpCode = Math.floor((Math.random() * 8999) + 1000);

        const otpRecord = { code: otpCode, isValide: true, generated: (new Date()).getTime() };

        try {
            await userDbRef.set(otpRecord);
            
            return res.send({ otp: otpCode });
        } catch (e) {
            return res.status(500).send(err);
        }
    } catch (e) {
        return res.status(400).send({ error: "User not found using phone no :" + phone });
    }
}