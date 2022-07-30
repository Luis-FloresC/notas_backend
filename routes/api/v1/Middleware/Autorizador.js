const authorizer = (req, res, next)=>{
    const clientApiKey = req.headers.apikey || '';
    const appApiKey = (process.env.APP_API_KEY).split('|');
    if (appApiKey.includes(clientApiKey)) {
      return next();
    }
    console.error("autorizaron: Token de API no válido", req.headers);
    res.status(401).json({"error":"Solicitud del cliente no autorizada."});
  }
  
  module.exports.authorizer = authorizer;