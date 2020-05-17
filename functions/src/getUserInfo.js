const _  = require("lodash");


module.exports = function(req,res) {
    
    const d = {
        "uid": _.get(req,"auth.user.uid","") ,
        "displayName": _.get(req, "auth.user.displayName", ""),
        "photoURL": _.get(req, "auth.user.photoURL", ""),
        "email": _.get(req, "auth.user.email", ""),
        "emailVerified": _.get(req, "auth.user.emailVerified", ""),
        "phoneNumber": _.get(req, "auth.user.phoneNumber", ""),
    };

    res.send(d);
}