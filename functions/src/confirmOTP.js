const fbadm = require('firebase-admin');
const _ = require('lodash');

module.exports = async function (req, res) {
    if (_.get(req, "body.phone", "") === "") {
        return res.status(422).send({ error: "phone is required" });
    }

    if (_.get(req, "body.otp", "") === "") {
        return res.status(422).send({ error: "otp is required" });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.otp);

    try {
        const user = await fbadm.auth().getUser(phone);
        const userDbRef = fbadm.database().ref('users/' + user.uid)

        try {
            let ss = await userDbRef.once('value');

            ss = ss.val();

            if (parseInt(ss.code) === code && ss.isValide === true) {
                ss.isValide = false;

                try {
                    await userDbRef.set(ss);

                    try {
                        const token = await fbadm.auth().createCustomToken(user.uid);

                        return res.send({ token: token });
                    } catch (e) {
                        return res.status(500).send({ error: e })
                    }
                } catch (e) {
                    return res.status(500).send({ error: e });
                }
            } else {
                return res.status(400).send({ message: "Invalid OTP." });
            }
        } catch (e) {
            return res.status(400).send({ error: "User not found using phone no :" + phone });
        }
    } catch (e) {
        return res.status(400).send({ error: "User not found using phone no :" + phone });
    }
}