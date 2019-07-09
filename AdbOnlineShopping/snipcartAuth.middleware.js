const HTTPStatus = require('http-status');

const axios = require('axios');



const authMiddleware = async function (req, res, next) {

    if (!req.headers['snipcart-token']) {

        return res.status(HTTPStatus.FORBIDDEN).end();

    }

    

    const admins = ['test@test.com', 'admir.kadriu@uni-pr.edu'];



    try {

        const user = await axios.get('https://app.snipcart.com/api/usersessions/' + req.headers['snipcart-token'], {

            headers: {

                Accept: 'application/json',

                Authorization: 'Basic U1RfWlRnNE9HRTJNamt0TUdFeE55MDBZemMwTFRnM05qY3RaVEUzWVRZd09UUXpNelZrTmpNMk9UUXlOemMwTWpJeU1qRXlNakk0',

            },

        })



        if(!admins.includes(user.data.email)){

            return res.status(HTTPStatus.FORBIDDEN).send().end();

        }

    } catch (err) {

        return res.status(HTTPStatus.FORBIDDEN).send().end();

    }



    next();

}



module.exports = authMiddleware;
