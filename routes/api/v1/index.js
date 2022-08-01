const express = require('express');
const router = express.Router();

const { authorizer } = require('./Middleware/Autorizador');
const { jwtAuthorizer } = require('./Middleware/JwtAutorizador');

const NotesRoutes = require('./Notas');
const SeguridadRoutes = require('./Seguridad');


router.get('/', function (req, res, next) {
  const version = {
    entity: 'Notas',
    version: '1.0.0',
    description: 'App Notas Project'
  };
  res.status(200).json(version);
});


router.use('/notes',authorizer,jwtAuthorizer, NotesRoutes);
router.use('/auth',authorizer,SeguridadRoutes);

module.exports = router;