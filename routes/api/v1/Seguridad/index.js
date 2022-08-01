const express =require('express');
let router = express.Router();
const Usuario = require('../../../../libs/Usuarios');
const UsuarioDao = require('../../../../dao/mongoDb/models/DaoUsuarios');
const servicioCorreo = require('../../../../libs/Seguridad/correo');
const userDao = new UsuarioDao();
const user = new Usuario(userDao);
user.init();

const { jwtSignResetPassword } = require('../../../../libs/Seguridad');
const { jwtVerify } = require('../../../../libs/Seguridad');
const {validId,isEmpty,validPassword,isEquals} = require('../Utilidades');
const {jwtSign} = require('../../../../libs/Seguridad');

router.post('/login', async (req, res)=>{
  try {
    const {email, password} = req.body;
    //console.log({email,password});
    const userData = await user.getUsuarioByEmail({email});
    
    if(!userData) {
      console.error('seguridad de inicio de sesión: ', {error:`Credenciales no Válidas`});
      return res.status(403).json({ "error": "Credenciales no Válidas" });
    }

    if(!user.comparePasswords(password, userData.password) ) {
      console.error('seguridad de inicio de sesión: ', {error:`Credenciales para usuario ${userData._id} ${userData.email} incorrectas.`});
      return res.status(403).json({ "error": "Credenciales no Válidas" });
    }
    
    const dataUsuario = {
      id: userData._id,
      nombre: userData.nombre,
      avatar: userData.avatar,
      email: userData.email
    };
    const {password: passwordDb, created, updated, ...jwtUser} = userData;
    const jwtToken = await jwtSign({jwtUser, generated: new Date().getTime()});
   console.log(dataUsuario);
    return res.status(200).json({token: jwtToken,user: dataUsuario});
  } catch (ex) {
    console.error('seguridad de inicio de sesión:', {ex});
    return res.status(500).json({"error":"No es posible procesar la solicitud."});
  }
});

router.post('/resetPassword', async (req, res) => {
  const { email, password, confirmedPassword, tempPassword } = req.body;
  const BuscarEmail = await user.getUsuarioByEmail({ email: email });
  try {

   
    if (!BuscarEmail) {
      return res.status(404).json({ error: 'Error al procesar la solicitud' });
    }

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: error });
  }

  try {
    var token = BuscarEmail.resetToken;
    var jwtData = await jwtVerify(token);
    console.log(jwtData);
  } catch (error) {
    console.log("Error:", error);
    return res.status(408).json({ error: "Token invalido, solicite un nuevo token" });
  }

  try {
    if (!user.comparePasswords(tempPassword, BuscarEmail.password)) {
      console.error('security login: ', { error: `Contraseña Temporal incorrecta` });
      return res.status(403).json({ "error": "Contraseña Temporal incorrecta" });
    }

    if (!validPassword(password)) {
      return res.status(400).json({
        error: 'Ingrese una contraseña fuerte, Mínimo 8 caracteres, 1 letra en mayúscula y un carácter especial'
      });
    }

    if (!isEquals(password,confirmedPassword)) {
      console.error('security login: ', { error: `Las contraseñas no coinciden` });
      return res.status(403).json({ "error": "Las contraseñas no coinciden" });
    }

    var codigo = BuscarEmail._id.toString();
    const updateResult = await user.updatePassword({ codigo: codigo, password: password, resetToken: null });
    console.log(updateResult);
    return res.status(200).json({ msj: "Su contraseña se restableció correctamente" });

  } catch (error) {
    console.error("error: ",error);
    return res.status(500).json({ error: error });
  }


});

router.post('/recoveryPassword', async (req, res) => {
  try {
    const { email } = req.body;
    const pin = user.generatePasswordRand(8);
    const BuscarEmail = await user.getUsuarioByEmail({ email: email });
    if (!BuscarEmail) {
      return res.status(404).json({ error: 'Error al procesar la solicitud' });
    }

    const contenidoHtml = `     
                                    <div class="container">
                                    <h1>Recuperación de Contraseña</h1>
                                    <ul>
                                        <li>Nombre: ${BuscarEmail.nombre}</li>
                                        <li>Correo: ${BuscarEmail.email}</li>
                                        <li>Contraseña Temporal: ${pin}</li>
                                    </ul>
                                    <p>Nota: al momento de iniciar sesión se recomienda cambiar la contraseña</p>
                                    </div>`;

    const data = {
      nombre: BuscarEmail.nombre,
      correo: BuscarEmail.email,
      avatar: BuscarEmail.avatar,
      pin: pin,
      contenidoHtml: contenidoHtml,
      titulo: "Recuperación de Contraseña",
      mensajeConfirmacion: "Se envió el pin de recuperación a su Correo: " + BuscarEmail.email
    };


    var codigo = BuscarEmail._id.toString();
    const { password: passwordDb, created, updated, ...jwtUser } = BuscarEmail;
    const jwtToken = await jwtSignResetPassword({ jwtUser, generated: new Date().getTime() });
    //return res.status(200).json({token: jwtToken});
    //console.log(jwtToken);
    await servicioCorreo.sendEmail(req, res, data);
    const updateResult = await user.updatePassword({ codigo: codigo, password: pin, resetToken: jwtToken });
    console.log(updateResult);

  } catch (ex) {
    console.error(ex);
    return res.status(501).json({ error: 'Error al procesar solicitud.' });
  }
});

router.post('/signIn', async (req, res) => {
  try {
    const { email = '',
      password = ''
    } = req.body;
    if (isEmpty(email)) {
      return res.status(400).json({
        error: 'Se espera valor de correo'
      });
    }

    if (!validPassword(password)) {
        return res.status(400).json({
            error: 'Ingrese una contraseña fuerte, Mínimo 8 caracteres, 1 letra en mayúscula y un carácter especial'
          });
    }
    const newUsuario = await user.addUsuarios({
      email,
      nombre : 'John Doe',
      avatar: 'John',
      password,
      estado: 'ACT'
    });
    return res.status(200).json(newUsuario);
  } catch (ex) {
    console.error('seguridad: ', ex);
    return res.status(502).json({ error: 'Error al procesar solicitud' });
  }
});

module.exports = router;
