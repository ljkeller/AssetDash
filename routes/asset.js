const express = require('express'),
      { check, validationResult } = require('express-validator/check/'),
      router = express.Router();

const Asset = require('../model/Asset');

/**
 * @method - POST
 * @param - /add
 * @description - Add a new asset
 */
router.post(
    '/add',
    [
        check('name', 'Please enter a valid asset name').notEmpty(),
        check('model', 'Please enter a valid model name').notEmpty(),
        check('state', 'Please enter a valid asset state').notEmpty(),
        check('availibility', 'Please enter a valid availibility').notEmpty(),
    ],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) return res.status(400).json({ errors: err.array() });

        const {
            name,
            model,
            state,
            availibility,
        } = req.body;

        try {
            let asset = await Asset.findOne({ name });
            if (asset) return res.status(400).json({ msg: 'Asset already exists or conflicting name' });

            asset = new Asset({ name, model, state, availibility });

            // TODO: link asset against user's ID for audit log / availibility check?
            await asset.save();

            const payload = { asset: { id: asset.id } };
            console.log(`Created new asset: ${payload}`);

            res.status(200).json({payload});
        } catch (err)
        {
            console.log(err.message);
            res.status(500).send('Error in storing asset to DB');
        }
    }
)

/**
 * @method - PUT
 * @param - /availiblity
 * @description - Update the availibility for an existing asset
 */
router.put(
    '/availibility',
    [
        check('name', 'Must pass an asset for the update').notEmpty(),
        check('availibility', 'Must pass an availibility for the asset').notEmpty()
    ],
    async (req, res) => {
        errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        //TODO: Validate that only user with asset claimed can undo claim
        const { name, availibility } = req.body;
        try {
            // To enforce validation, use findOne over findOneAndUpdate
            let asset = await Asset.findOne({name});
            asset.availibility = availibility;

            const updated = await asset.save();
            res.status(200).json(updated);
            console.log(`Updated asset state: ${updated}`);
        } catch (err) {
            console.log(err.message);
            res.status(500);
            res.render('oops.ejs', { message: 'Error in updating asset availiblity'});
        }
    }
)

/**
 * @method - POST
 * @param - /info
 * @description - Get information regarding an existing asset
 */
router.post(
    '/info',
    [
        check('name', 'Please enter a valid asset name').notEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const { name } = req.body;
            const asset = await Asset.findOne({ name });

            if (!asset) 
            {
                res.status(400);
                res.render('oops.ejs', {message: 'Asset does not exist' });
                return;
            }
            res.render('asset.ejs', {asset});
        } catch (err) {
            console.log(err.message);

            res.status(500);
            res.render('oops.ejs', {message: err.message});
        }
    }
)

module.exports = router;