var notes =[];

for (var i = 0; i < 20; i++) {
    var notesDoc = {
      title:   `Title Test # ${(i + 1)}.`,
      description: `description Test # ${(i + 1)}.`,
      keyword: ['Test'],
      idUser: ObjectId('62dc8886328c6fb2b96ac35c'),
      created: new Date().toISOString(),
    };
    notes.push(notesDoc);
  }
  db.Notas.insert(notes);