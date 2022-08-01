var {jwtVerify} = require('../../../../libs/Seguridad');


const jwtAuthorizer = async (req, res, next)=>{
  const jwtToken = (req.headers.Authorization || req.headers.authorization || '').replace('Bearer ', '');
  // console.log(req);
  //console.log('JwtAuthorizer: ', {jwtToken});
  try{
    const jwtData = await jwtVerify(jwtToken);
   
    req.user = jwtData;
    return next();
  } catch (ex) {
    console.error('Autorizado jwt: ', {ex});
    return res.status(401).json({'error':'Desautorizado'});
  }
}

module.exports = {
  jwtAuthorizer
}
