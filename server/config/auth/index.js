const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const Users = require("../../models/users");

const StrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
};

const VerifyRequest = (
    req,
    accessToken,
    refreshToken,
    params,
    profile,
    done
) => {
    Users.findOne({
        phoneNumber: `${profile.provider}Id:${profile.id}`,
    })
        .then(async (user) => {
            // Query user or create
            if (!user) {
                try {
                    const createUser = new Users({
                        email: profile.email,
                        history: [],
                        imgAvatar: profile.picture,
                        isAdmin: false,
                        name: profile.displayName,
                        password: profile.id,
                        phoneNumber: `${profile.provider}Id:${profile.id}`,
                    });
                    return await createUser.save();
                } catch (error) {
                    console.log("-----", error, "-----");
                    throw "Email đã đăng ký!";
                }
            } else {
                return user;
            }
        })
        .then((user) => {
            // Create session
            const result = {
                user_id: user._id,
                isAdmin: user.isAdmin,
                isLogin: true,
                data: [user],
            };
            return result;
        })
        .then((result) => {
            // >> SerializeUser tao session theo form { _id, expires, session: { cookie, passport }}
            req.session.user = result;
            done(null, result);
            return;
        })
        .catch((err) => {
            // res.status(500);
            console.log(err);
            done(err, null);
            return;
        });
};

const MiddlewarePassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new GoogleStrategy(StrategyOptions, VerifyRequest));
    passport.serializeUser((user, done) => {
        if (user) done(null, user);
        else done(err, null);
    });
    passport.deserializeUser((user, done) => done(null, user));
    return (req, res, next) => next();
};

module.exports = MiddlewarePassport;
