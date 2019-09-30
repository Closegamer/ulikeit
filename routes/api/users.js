const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const {
  createTokenPair,
  createResetToken
} = require('../../utils/TokenHelpers');
const auth = require('../../middleware/auth');
const sendMail = require('../../utils/sendMail');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('nick', 'Пожалуйста, введите Ваше имя в системе').isLength({
      min: 3
    }),
    check('email', 'Пожалуйста, введите корректый email').isEmail(),
    check('password', 'Пароль должен содержать не менее 6 символов').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(
      ({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
      }
    );
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, error: errors.array().join(', ') });
    }

    const { nick, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: 'User already exists' });
      }

      let role = 'customer';
      let stuff = 'no';
      let balance = 0;
      let discount = 0;
      let contribution = 0;
      let paidGoods = [];

      user = new User({
        nick,
        email,
        password,
        role,
        stuff,
        discount,
        contribution,
        paidGoods,
        balance
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      if (!user.contribution) {
        user.contribution = 0;
      }

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      const tokensData = await createTokenPair(payload, payload);

      sendMail(
        'Closegamer School <closegamer@mail.ru>',
        email,
        'Успешная регистрация',
        `Ваш пароль: <b>${password}</b>`
      );

      res.json({ success: true, tokens: tokensData });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/users/balance
// @desc     Get User Balance
// @access   Public
router.get('/balance', auth, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const foundUser = await User.findById(currentUserId);
    const balance = foundUser.balance;

    if (!foundUser) {
      res.json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      balance
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/balance
// @desc     POST User Balance
// @access   Public
router.post(
  '/balance',
  auth,
  [check('balance', 'Пожалуйста, введите сумму').isNumeric()],
  async (req, res) => {
    const errors = validationResult(req).formatWith(
      ({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
      }
    );
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, error: errors.array().join(', ') });
    }

    const { balance } = req.body;
    const currentUserId = req.user.id;

    try {
      const foundUserId = await User.findById(currentUserId);

      const currentBalance = foundUserId.balance;

      await User.updateOne(
        { _id: foundUserId.id },
        { balance: currentBalance + balance }
      );

      const updated = await User.findById(currentUserId);

      res.json({ success: true, balance: updated.balance });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users/reset
// @desc     Reset User Password
// @access   Public
router.post('/reset', async (req, res) => {
  try {
    const currentUserEmail = req.body.userEmail;
    const foundUser = await User.findOne({ email: currentUserEmail });
    const foundUserEmail = foundUser.email;
    if (!foundUser) {
      res.json({
        success: false,
        error: 'User not found'
      });
    }

    const payload = {
      user: {
        id: foundUser.id
      }
    };

    const tokenData = await createResetToken(payload);

    const recoveryLink =
      '<a href="http://localhost:3000/recovery/' +
      tokenData.resetToken +
      '">Сбросить пароль</a>';

    sendMail(
      'Closegamer School <closegamer@mail.ru>',
      foundUserEmail,
      'Сброс пароля',
      `Перейди по ссылке, товарищ: <b>${recoveryLink}</b>`
    );

    res.json({
      success: true,
      tokenData
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/get-user-for-reset
// @desc     Get user for reset password
// @access   Public
router.get('/reset-user-password/:token', async (req, res) => {
  try {
    const resetToken = req.params.token;

    const resetTokenFromTheBase = await Reset.findOne({ resetToken });

    if (!resetTokenFromTheBase) {
      return res
        .status(401)
        .json({ success: false, error: 'некорректная ссылка' });
    }

    if (resetTokenFromTheBase) {
      var decodedResetToken = jwt.verify(
        resetTokenFromTheBase.resetToken,
        config.get('jwtResetSecret')
      );

      const user = await User.findById(decodedResetToken.user.id);
      return res.json({ success: true, user });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: 'Невалидный токен' });
  }
});

router.post('/password-recovered', async (req, res) => {
  try {
    const user = req.body.user;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const userToUpdate = await User.findById(user._id);

    if (userToUpdate) {
      newPassword = await bcrypt.hash(password, salt);

      await User.updateOne(
        { _id: user._id },
        { password: newPassword },
        { new: false }
      );

      sendMail(
        'Closegamer School <closegamer@mail.ru>',
        userToUpdate.email,
        'Ваш пароль сброшен.',
        `Новый пароль: ${password}`
      );

      return res.json({
        success: true,
        email: userToUpdate.email,
        password: password
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: 'Восстановить пароль не получилось' });
  }
});

// @route    GET api/users/get-user-for-reset
// @desc     Get user for reset password
// @access   Public
router.get('/reset-user-password/:token', async (req, res) => {
  try {
    const resetToken = req.params.token;

    const resetTokenFromTheBase = await Reset.findOne({ resetToken });

    if (!resetTokenFromTheBase) {
      return res
        .status(401)
        .json({ success: false, error: 'некорректная ссылка' });
    }

    if (resetTokenFromTheBase) {
      var decodedResetToken = jwt.verify(
        resetTokenFromTheBase.resetToken,
        config.get('jwtResetSecret')
      );

      const user = await User.findById(decodedResetToken.user.id);
      return res.json({ success: true, user });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: 'Невалидный токен' });
  }
});

router.post('/load-users', async (req, res) => {
  try {
    const usersArray = await User.find();
    if (usersArray) {
      return res.json({
        success: true,
        usersArray
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: 'Получить пользователей не получилось' });
  }
});

module.exports = router;
