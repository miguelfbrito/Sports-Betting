const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const UserC = require('../controllers/user');

const jwt = require('jsonwebtoken');

require('dotenv').config();

router.get('/', async (req, res, next) => {
    console.log("Creating user!")
    let user = await User.create({ username: "mbrito", password: "pass" });
    res.send(user)
});

router.get('/details/:userOid', async (req, res, next) => {

    let user = await UserC.findOne({ where: { oid: req.params.userOid } })
    delete user.dataValues.password;

    res.send(user);
})


router.post('/update/:userOid', async (req, res, next) => {

    const user = req.body;
    const data = await UserC.update({ where: { oid: req.params.userOid } }, user);
    res.send(data);

})

router.post('/deposit', async (req, res, next) => {
    // TODO : obter userOid vindo do gateway
    const data = req.body;
    res.send(await UserC.depositBalance(data.userOid, data.amount));
})

router.post('/withdraw', async (req, res, next) => {
    // TODO : obter userOid vindo do gateway
    const data = req.body;
    res.send(await UserC.withdrawBalance(data.userOid, data.amount));
})

router.post('/subscribe', async (req, res, next) => {

    if (!req.body.userOid) {
        res.send({ message: 'Missing parameters!' })
    }

    const userOid = req.body.userOid;

    const didSubscribe = await UserC.subscribe(userOid);

    if (didSubscribe) {
        res.send({ message: 'You are now subscribed!' })
    } else {
        res.send({ message: 'Subscription failed!' })
    }

})

router.post('/unsubscribe', async (req, res, next) => {

    if (!req.body.userOid) {
        res.send({ message: 'Missing parameters!' })
    }

    const userOid = req.body.userOid;

    const didUnsubscrive = await UserC.unsubscribe(userOid);

    if (didUnsubscrive) {
        res.send({ message: 'Your subscription has been canceled!' })
    } else {
        res.send({ message: 'No subscription found!' })
    }

})

router.post('/updatebalanceonwin', async (req, res, next) => {

    const data = req.body;
    const currentUser = await UserC.findOne({ where: { oid: data.userOid } });

    if (!currentUser) {
        res.send({ message: 'Invalid user' })
    }

    const newBalance = currentUser.dataValues.balance + (data.wager * data.odd);
    await UserC.update({ where: { oid: data.userOid } }, { balance: newBalance });

    const user = await UserC.findOne({ where: { oid: data.userOid } });

    res.send(user);
})



router.post('/signup', async (req, res, next) => {
    passport.authenticate('signup', async (err, user, info) => {
        try {

            if (err) {
                return next(err)
            }

            if (!user) {
                return res.jsonp({
                    message: info.message,
                    success: false
                })
            }

            return res.jsonp({
                message: info.message,
                user: req.user,
                success: true
            })
        } catch (err) {
            return next(err)
        }

    })(req, res, next)
})


router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err)
            }

            if (!user) {
                return res.jsonp({
                    message: info.message,
                    token: null,
                    success: false
                })
            }

            req.login(user, {
                session: false
            }, async (err) => {
                if (err) return next(err)

                const userInfoInToken = {
                    oid: user.oid,
                    username: user.username,
                    balance: user.balance
                }

                // Geração do token
                const token = jwt.sign({
                    ...userInfoInToken
                }, process.env.JWT_SECRET_KEY, {
                        expiresIn: '1h'
                    })

                return res.jsonp({
                    message: info.message,
                    token: token,
                    success: true
                })
            });
        } catch (err) {
            return next(err);
        }
    })(req, res, next)
})



module.exports = router;
