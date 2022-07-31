const express = require('express');
const router = express.Router();
const { authorizer } = require('./Middleware/Autorizador');
const { jwtAuthorizer } = require('./Middleware/JwtAutorizador');

const SeguridadRoutes = require('./Seguridad');
const NotasRoutes = require('./Notas');

router.get('/', function (req, res, next) {
  const version = {
    entity: 'Notas',
    version: '1.0.0',
    description: 'App Notas Project'
  };
  res.status(200).json(version);
});

router.use('/auth',authorizer,SeguridadRoutes);
router.use('/notes',authorizer,jwtAuthorizer,NotasRoutes);

module.exports = router;