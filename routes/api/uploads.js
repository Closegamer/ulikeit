const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const uuid = require('uuid/v4');
const path = require('path');

const User = require('../../models/User');

router.post('/', auth, async (req, res) => {
  try {
    if (Object.keys(req.files).length !== 0) {
      let bigPic = req.files.bigPic;
      const realName = bigPic.name;
      const guidName = uuid();
      const ext = path.extname(realName);

      bigPic.mv(`./upload/${guidName}${ext}`, function(err) {
        if (err) throw new Error(err);
        res.json({
          success: true,
          image: { guidName, ext }
        });
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
