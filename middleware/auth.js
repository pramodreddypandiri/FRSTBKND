const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    console.log(req.cookies);
    //grab token form cookie
    const token = req.cookies
    if (!token) {
         res.status(403).send('token is missing')
    }
    try{
        const decode = jwt.verify(token, SECRET)
        console.log(decode);// decode contains info we sent to 
        //create a token (i.e const token = jwt.sign({id: extuser._id, email}, 'secret', {expiresIn: '2h'}))
        req.user = decode 


    } catch(error) {
        res.status(403).send('token is invalid')
    }
    return next()
}
module.exports = auth