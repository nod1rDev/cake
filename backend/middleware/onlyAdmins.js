// middleware/onlyAdmins.js
const onlyAdmins = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: admins only' });
  }
  next();
};

export default onlyAdmins;
