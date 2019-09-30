const jwt = require('jsonwebtoken');
const config = require('config');
const uuid = require('uuid/v4');

const Token = require('../models/Token');
const Reset = require('../models/Reset');

const createTokenPair = async (accessPayload, refreshPayload) => {
  const date = Date.now();
  const accessExpired = 172800; // 48 часов - время жизни accessToken
  const expiredDate = date + accessExpired * 1000; // дата смерти accessToken
  const code = uuid();
  const accessToken = await jwt.sign(
    { ...accessPayload, uuid: code },
    config.get('jwtSecret'),
    {
      expiresIn: accessExpired
    }
  );
  const refreshToken = await jwt.sign(
    { ...refreshPayload, uuid: code },
    config.get('jwtRefreshSecret'),
    {
      expiresIn: '30d'
    }
  );

  const RefreshToken = new Token({
    uuid: code,
    user: refreshPayload.user.id
  });

  await RefreshToken.save();

  return {
    accessToken,
    refreshToken,
    expiredDate
  };
};

const createResetToken = async payload => {
  const date = Date.now();
  const resetExpired = 3600000;
  const expiredDate = date + resetExpired * 1000;
  const code = uuid();
  const resetToken = await jwt.sign(
    { ...payload, uuid: code },
    config.get('jwtResetSecret'),
    {
      expiresIn: expiredDate
    }
  );

  const query = {
    user: payload.user.id,
    resetToken: resetToken
  };
  await Reset.updateOne({ user: payload.user.id }, query, { new: true });

  return {
    resetToken,
    expiredDate
  };
};

module.exports = { createTokenPair, createResetToken };
