const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
    "511942804385-cfbupldeeg63jcmruhtjhfnrhk741vbd.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_CALLBACK_URL = "http://localhost:5000/auth/google/callback";

const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    console.log("/1");
    console.time("1. Get /");
    console.timeEnd("1. Get /");
    res.send(
        '\
        <div><a class="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="/auth/google"><img src="https://img.icons8.com/color/16/000000/google-logo.png"> Signup Using Google</a></div>\
        <div><button class="_d6ddka css-1581srh" data-track="true" data-track-app="authentication" data-track-action="click" data-track-component="continue_with_google_auth_btn" type="button"><svg aria-hidden="true" class="_ufjrdd" viewBox="0 0 24 24" role="img" aria-labelledby="Google46166b21-b06d-4211-9b44-efe66cebef14 Google46166b21-b06d-4211-9b44-efe66cebef14Desc" xmlns="http://www.w3.org/2000/svg" style="fill: rgb(54, 59, 66); height: 18px; width: 18px; left: 24px; position: absolute; top: 15px;"><title id="Google46166b21-b06d-4211-9b44-efe66cebef14">Google</title><g fill="none" fill-rule="evenodd" role="presentation"><path d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 01-2.394 3.622v3.01h3.878c2.269-2.088 3.578-5.165 3.578-8.82z" fill="#4285F4" fill-rule="nonzero"></path><path d="M12 24c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.11-6.715-4.947H1.276v3.11A11.995 11.995 0 0012 24z" fill="#34A853" fill-rule="nonzero"></path><path d="M5.285 14.28A7.213 7.213 0 014.91 12c0-.79.136-1.56.376-2.28V6.61H1.276A11.995 11.995 0 000 12c0 1.936.464 3.77 1.276 5.39l4.01-3.11z" fill="#FBBC05" fill-rule="nonzero"></path><path d="M12 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C17.951 1.19 15.235 0 12 0 7.31 0 3.25 2.69 1.276 6.61l4.01 3.11C6.228 6.884 8.874 4.773 12 4.773z" fill="#EA4335" fill-rule="nonzero"></path><path d="M0 0h24v24H0z"></path></g></svg>Continue with Google</button></div>\
        <div><a class="button google" href="/auth/google">Authenticate with Google</a></div>\
        '
    );
});

app.get(
    "/auth/google",
    (req, res, next) => {
        console.log("/2");
        console.time("2. Get /auth/google");
        console.timeEnd("2. Get /auth/google");
        next();
    },
    passport.authenticate("google", { scope: ["email", "profile"] }) // Yêu cầu google cung cấp tài nguyên trước khi xác thực
);

app.get(
    "/auth/google/callback",
    (req, res, next) => {
        console.log("/3");
        console.time("3. Get /auth/google/callback");
        console.timeEnd("3. Get /auth/google/callback");
        next();
    },
    passport.authenticate("google", {
        successRedirect: "/protected",
        failureRedirect: "/auth/google/failure",
    }) // Kết quả xác thực trả về
);

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },

        function (request, accessToken, refreshToken, profile, done) {
            console.log("/4");
            console.time("4. GoogleStrategy");
            // console.log(accessToken, "///");
            // const defaultUser = {
            //     email: profile.email,
            //     history: [],
            //     imgAvatar: profile.picture,
            //     isAdmin: false,
            //     name: profile.displayName,
            //     password: profile.id,
            //     phoneNumber: `${profile.provider}Id:${profile.id}`,
            // };
            // User.findOne({ phoneNumber: `${profile.provider}Id:${profile.id}` }, function (err, user) {
            //     return done(err, user);
            // });
            done(null, profile); // >> SerializeUser
            console.timeEnd("4. GoogleStrategy");
        }
    )
);

passport.serializeUser(function (user, done) {
    console.log("/5");
    console.time("5. SerializeUser");
    done(null, user);
    console.timeEnd("5. SerializeUser");
});

passport.deserializeUser(function (user, done) {
    console.log("/6 - 8");
    console.time("6 - 8. DerializeUser");
    done(null, user); // >> Route
    console.timeEnd("6 - 8. DerializeUser");
});

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get("/protected", isLoggedIn, (req, res) => {
    console.log("/7");
    console.time("7. Get /protected");
    res.json(req.user);
    console.timeEnd("7. Get /protected");
});

app.get("/logout", isLoggedIn, (req, res) => {
    console.log("/9");
    console.time("9. Get /logout");
    req.logout((err) => next(err));
    req.session.destroy();
    res.send("Goodbye!");
    console.timeEnd("9. Get /logout");
});

app.get("/auth/google/failure", (req, res) => {
    console.time("Get /auth/google/failure");
    console.timeEnd("Get /auth/google/failure");
    res.send("Failed to authenticate..");
});

app.listen(5000, () => console.log("listening on port: 5000"));
