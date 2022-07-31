const { db } = require('../Conexion');
const DaoObject = require('../DaoObjetos');
module.exports = class DaoNotas extends DaoObject {
    constructor(db = null) {
        //console.log('NotasDao db: ', db);
        super(db, 'Notas');
    }
    async setup() {
        if (process.env.MONGODB_SETUP) {
            
            const indexExists = await this.collection.indexExists('notas_1');
            if (!indexExists) {
                await this.collection.createIndex({ title: 1 });
            }
            
        }
    }

    async getAll() {
        return this.find();
    }

    async getNotesUserForPages({ pagina, elementosPorPagina, id }) {
        const query = { idUser: id };
        const options = {
            skip: (pagina - 1) * elementosPorPagina,
            limit: elementosPorPagina,
            projection: { title: 1, description: 1, keyword: 1, created: 1 },
            sort: [["title", 1]]
        };
        const docsCursor = this.find(query, options);
        const numeroFilas = await docsCursor.count();
        console.log(docsCursor);
       // const filas = await docsCursor.toArray();
        return { numeroFilas };
    }

    async getAllPaged({idUser, page=1, pageLimit=20}) {
        const notes = await this.find(
          {idUser: this.objectId(idUser)},
          null,
          null,
          null,
          null,
          true
        );
        const totalDocs = await notes.count();
        notes.skip(pageLimit * ( page - 1 ))
        notes.limit(pageLimit);
        const notesDocs = await notes.toArray();
        return {
          total: totalDocs,
          page,
          pageLimit,
          totalPages: Math.ceil(totalDocs/pageLimit),
          notes: notesDocs
        }
      }

    async getNotesByUser({ codigo }) {
        const query = { idUser: codigo };
        console.log({query});
        let options = {
            projection: {title:1, description:1, keyword:1, created:1},
            sort:[["title", 1]]
          };
        const docsCursor = this.find(query, options);
       // const filas = await docsCursor.toArray()
        return docsCursor;
    }

    getById({ codigo }) {
        return this.findById(codigo);
    }

    insertOne({ title, description, keyword, idUser }) {
        return super.insertOne({ title, description, keyword, idUser, created: new Date().toISOString() });
    }

    updateKeyWord({ keyword, codigo }) {
        const updateCommand = {
            '$set': {
                keyword,
                updated: new Date().toISOString()
            }
        };
        return super.updateOne(codigo, updateCommand);
    }

    updateOne({ title, description, keyword, idUser, codigo }) {

        const updateCommand = {
            '$set': {
                title, description, keyword, idUser,
                updated: new Date().toISOString()
            }
        };
        return super.updateOne(codigo, updateCommand);
    }

    deleteOne({ codigo }) {
        return super.removeOne(codigo);
    }
}
