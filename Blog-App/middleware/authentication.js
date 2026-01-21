import { getTokenData } from '../services/JWT.js';
import User from '../modules/user_DB.js';

export const checkUserAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies?.s_id;

    if (!token) {
      return res.render('Login', {
        error: false,
        title: 'Login',
        currentPage: 'login',
        user: null,
      });
    }

    const decoded = getTokenData(token);
    if (!decoded) {
      return res.render('Login', {
        error: true,
        title: 'Login',
        currentPage: 'login',
        user: null,
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.render('wrong', { message: 'Authentication Problem' });
  }
};
export const checkAuthorize = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) {
      return res.render('Signup', {
        error: false,
        title: 'Signup',
        currentPage: 'signup',
        user: null,
      });
    }

    const dbUser = await User.findOne({ email: req.user.email });

    if (!dbUser) {
      return res.render('Signup', {
        error: false,
        title: 'Signup',
        currentPage: 'signup',
        user: null,
      });
    }

    req.user = dbUser; // attach full DB user
    next();
  } catch (err) {
    return res.render('wrong', { message: 'You are not authorized' });
  }
};
export const checkUserAuthenticationFirst = async (req, res, next) => {
  try {
    const token = req.cookies?.s_id;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = getTokenData(token);
    if (!decoded) {
      req.user = null;
      return next();
    }

    const dbUser = await User.findById(decoded.id);
    if (!dbUser) {
      req.user = null;
      return next();
    }

    req.user = dbUser;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};
