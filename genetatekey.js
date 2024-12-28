const crypto = require('crypto');

const refreshTokenPrivateKey = crypto.randomBytes(64).toString('hex');
console.log('Generated Refresh Token Private Key:', refreshTokenPrivateKey);
