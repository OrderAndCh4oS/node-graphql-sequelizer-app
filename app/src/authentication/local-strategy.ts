const LocalStrategy = require('passport-local').Strategy;
import model from "../model";

const localStrategy = new LocalStrategy(
    (username, password, done) => {
        // @ts-ignore
        model.user.scope('withPassword').findOne({ where: { username }})
            .then(
            (user) => {
                if (!user) { return done(null, false); }
                // @ts-ignore
                if (!user.validPassword(password, user.password)) { return done(null, false); }
                return done(null, user);
            })
            .error((err) => done(err));
    }
);

export default localStrategy;
