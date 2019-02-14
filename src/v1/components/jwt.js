'use strict';
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./private.key', 'utf8');
const publicKey = fs.readFileSync('./public.key', 'utf8');

const signOptions = {
  expiresIn: '12h',
  algorithm: 'RS256',
};

/**
 * @param {object} payload - user details
 * @param {string} token - user jsonwebtoken
*/
async function sign(payload) {
  try {
    const token = await jwt.sign(payload, privateKey, signOptions);
    return token;
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(`logger log. ${err}`);
  }
}

/**
 * @param {string} token - user token
 * @param {object} data - user data
*/
async function resolve(token) {
  try {
    const data = await jwt.verify(token, publicKey, signOptions);
    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.log(`logger log. ${err}`);
  }
}

module.exports = {
  sign,
  resolve,
};