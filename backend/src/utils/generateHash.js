import crypto from 'crypto';

const SECRET_SALT = `${process.env.SECRET_SALT}`;

export const generateHash = (data) => {
  return crypto
    .createHmac('sha256', SECRET_SALT)
    .update(data)
    .digest('hex');
};
