const express = require('express');
const router = express.Router();
const { validId, isEmpty, mergeToArray } = require('../Utilidades');

const LibsNotas = require('../../../../libs/Notas');
const DaoNotas = require('../../../../dao/mongoDb/models/DaoNotas');
const notDao = new DaoNotas();
const not = new LibsNotas(notDao);
not.init();

router.get('/', async (req, res) => {
  // extraer y validar datos del request
  try {
    // devolver la ejecución el controlador de esta ruta
    const versionData = await not.getNotesVersion();
    return res.status(200).json(versionData);
  } catch (ex) {
    // manejar el error que pueda tirar el controlador
    console.error('Error Notes:', ex);
    return res.status(502).json({ 'error': 'Error Interno de Server' });
  }
});

router.get("/getNotesByUser/:codigo", async (req, res) => {
  try {
    let { codigo } = req.params;
    if (!validId(codigo)) {
      return res.status(400).json({
        error: 'Se espera un codigo numérico'
      });
    }
    const notas = await not.getNoteByUser({ codigo: codigo });
    res.status(200).json({ notas });
  }
  catch (ex) {
    res.status(500).json({ "Error": "Error, " + ex });
  }
}
);

router.get('/page/:page/:limit', async (req, res) => {
  try {
    const { page, limit } = req.params;
    const _page = parseInt(page);
    const _limit = parseInt(limit);
    const result = await not.getPagedNotes(req.user.jwtUser._id, _page, _limit);
    return res.status(200).json(result);
  } catch (error) {
    console.error('notes:', error);
    return res.status(500).json({ 'error': 'No se puede procesar petición.' });
  }
});

router.get("/porId/:codigo", async (req, res) => {
  try {
    let { codigo } = req.params;
    if (!validId(codigo)) {
      return res.status(400).json({
        error: 'Se espera un codigo numérico'
      });
    }
    const filas = await not.getNoteById({ codigo: codigo });
    if (!filas) {
      return res.status(404).json({
        error: 'No se encontró ninguna nota con el id'
      });
    }
    res.status(200).json(filas);
  }
  catch (ex) {
    res.status(500).json({ "Error": "Error, " + ex });
  }
}
);

router.post('/agregarNota', async (req, res) => {
  try {
    const { title, description, keyword } = req.body;
    const idUser = req.user.jwtUser._id;
    if (isEmpty(title)) {
      return res.status(400).json({
        error: 'Se espera valor para el titulo de la nota...'
      });
    }

    if (isEmpty(description)) {
      return res.status(400).json({
        error: 'Se espera valor para la descripción'
      });
    }

    if (isEmpty(keyword)) {
      return res.status(400).json({
        error: 'Se espera valor para la palabra claves'
      });
    }

    if (!validId(idUser)) {
      return res.status(400).json({
        error: 'Se espera valor numérico'
      });
    }

    const keywordArray = keyword.split(",");
    
    const newNote = await not.addNote({ title, description, keyword: keywordArray, idUser });
    return res.status(200).json({ resultado: newNote });
  } catch (ex) {
    console.error(ex);
    return res.status(502).json({ error: 'Error al procesar solicitud' });
  }
});




router.put('/agregarPalabraClave/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!validId(codigo)) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }
    const { keyword } = req.body;

    if (isEmpty(keyword)) {
      return res.status(400).json({
        error: 'Se esperaba un valor para la palabras claves'
      });
    }


    const note = await not.getNoteById({ codigo: codigo });
    if (!note) {
      return res.status(404).json({
        error: 'No se encontró ninguna nota con el id'
      });
    }

    let keywordArray = [];

    if (typeof (keyword) === "string") {
      keywordArray = keyword.split(",");
    }
    else {
      const KText = keyword.join(",");
      keywordArray = KText.split(",");
    }


    note.keyword = keywordArray;
    note.title = title;
    note.description = description;

  
    console.log({ ...note });


    const updateResult = await not.updateNote({ ...note, codigo: note._id });


    return res.status(200).json({ resultado: updateResult });

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});


router.put('/modificarNota/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!validId(codigo)) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }
    const { title, description, keyword } = req.body;
    console.log(keyword);
    if (isEmpty(keyword)) {
      return res.status(400).json({
        error: 'Se esperaba un valor para la palabras claves...'
      });
    }

    if (isEmpty(title)) {
      return res.status(400).json({
        error: 'Se esperaba un valor para el titulo...'
      });
    }

    if (isEmpty(description)) {
      return res.status(400).json({
        error: 'Se esperaba un valor para la descripción...'
      });
    }


    const note = await not.getNoteById({ codigo: codigo });
    if (!note) {
      return res.status(404).json({
        error: 'No se encontró ninguna nota con el id'
      });
    }
    let keywordArray = [];

    if (typeof (keyword) === "string") {
      keywordArray = keyword.split(",");
    }
    else {
      const KText = keyword.join(",");
      keywordArray = KText.split(",");
    }



   
    note.keyword = keywordArray;
    note.title = title;
    note.description = description;

    console.log({ ...note });


    const updateResult = await not.updateNote({ ...note, codigo: note._id });


    return res.status(200).json({ resultado: updateResult });

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});


router.delete('/eliminar/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!validId(codigo)) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }

    const resultado = await not.deleteNote({ codigo });

    if (!resultado) {
      return res.status(404).json({ error: 'Nota no encontrada.' });
    }
    return res.status(200).json(resultado);

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});

module.exports = router;
