const LocalStrategy = require('passport-local').Strategy;
const db = require("../db/models");

const localStrategy = new LocalStrategy(
    (username, password, done) => {
        // @ts-ignore
        db.user.scope('withPassword').findOne({where: {username}})
            .then(
                (user) => {
                    if (!user) {
                        return done(null, false, {message: 'Invalid credentials.'});
                    }
                    // @ts-ignore
                    if (!user.validPassword(password, user.password)) {
                        return done(null, false, {message: 'Invalid credentials.'});
                    }
                    return done(null, user);
                })

    }
);

export default localStrategy;
