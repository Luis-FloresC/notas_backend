const express = require('express');
const router = express.Router();

const SeguridadRoutes = require('./Seguridad');

router.get('/', function (req, res, next) {
  const version = {
    entity: 'Notas',
    version: '1.0.0',
    description: 'App Notas Project'
  };
  res.status(200).json(version);
});

router.use('/auth',SeguridadRoutes);

module.exports = router;