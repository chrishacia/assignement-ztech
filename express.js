// NOTE: Duplicate code does exist, in some places, as I am rushing to beat a 24 hour turn around
// on a project I've only had 4-6 hours to actually dedicate to.
// TODO: Clean this up. Remove flat file logic and go for mongoDB?

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('underscore');
const app = express();

const USER_ACCOUNT_FILE = 'account.json';
const USER_FRIENDS_FILE = 'friends.json';

const isNumber = function(n){ return !isNaN(parseFloat(n)) && isFinite(n) };

const getUserInformation = function(n, res, cb) {
    // if not set, not a number, or number === 0
    if(!isNumber(n) || parseInt(n) === 0) {
        res.status(400);
        res.json({ message: 'Invalid or Unknown Account' });
        return;
    }

    // does a matching record exist?
    fs.readFile(USER_ACCOUNT_FILE, 'utf8', ((err, data) => {
        if (err) {
            res.status(400);
            console.log(err);
            res.json({ message: 'An error occured while pulling the account details' });
            return;
        }

        try {
            obj = JSON.parse(data);

            // since we invalidate 0 as an account id, and arrays are 0 indexed
            // we will minus 1 from the ID passed
            user = obj.accounts[parseInt(n) - 1];

            // user account not found basically, couldnt find in the array an index
            // that matched minus 1
            if(!user) {
                res.status(400);
                res.json({ message: 'User account not found.'});
                return;
            }

            // found one!
            // use callback function
            cb(obj);
        } catch (e) {
            // well something done broke..
            console.log(e.message);
            res.status(400);
            res.json({ message: 'An unexpected error occured while seaching for your accounts information.' });
        }
    }));
}

const updateUserInformationFile = function (data, res) {
    fs.writeFile(USER_ACCOUNT_FILE, data, function(err) {
    if(err) {
        res.status(400);
        console.log(err);
        res.json({ message: 'An error occured while updating your account details' });
        return;
    }

    console.log("The file was saved!");
});
}

// configure app to use bodyParser()
// this will let us get the data from a POST
// define our app using express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
const port = process.env.PORT || 8090;

// ROUTES FOR OUR API
// =============================================================================
// get an instance of the express Router
const router = express.Router();

router.route('/account')
.get((req, res) => {
    res.status(400);
    res.json({ message: 'Account ID, missing.' });
})
.post((req, res) => {
    res.json({ message: 'create account!' });
})

router.route('/account/:user_id')
.get((req, res) => {
    getUserInformation(req.params.user_id, res, ((obj) => {
        user = obj.accounts[parseInt(req.params.user_id) - 1];
        res.status(200);
        res.json({ data: user });
    }))
})
.put((req, res) => {
    getUserInformation(req.params.user_id, res, ((obj) => {
        res.status(200);
        res.json({ data: obj });
    }))
})
.delete((req, res) => {
    res.json({ message: 'remove account!' });
})
.post((req, res) => {
    res.status(400);
    res.json({ message: 'Method not supported, in this context' });
});

router.get('/monkey', function(req, res) {
    res.json({ message: 'monkey!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static('public'));
app.use(express.static('assets'));
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
