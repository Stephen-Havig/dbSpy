import { RequestHandler, Request, Response, NextFunction } from 'express';
import { TableColumns, TableSchema, TableColumn, ReferenceType } from '@/Types';
import { dbConnect, addNewDbRow, updateRow, deleteRow, addNewDbColumn, updateDbColumn, deleteColumn, addNewTable, deleteTable, addForeignKey, removeForeignKey } from './helperFunctions/universal.helpers'


const sqliteController = {
//----------------------------------------------------------------------------

sqliteQuery: async (req: Request, res: Response, next: NextFunction) => {
  const SqliteDataSource = await dbConnect(req);  
  try {

//--------HELPER FUNCTION-----------------------------------   
    //function organizing data from queries in to the desired format of the front end
    async function sqliteFormatTableSchema(sqliteSchemaData: TableColumn[], tableName: string): Promise<TableColumn> {
    const tableSchema: TableColumn = {};
    
    for (const column of sqliteSchemaData) {
      const columnName: any = column.name
      const keyString: number = column.pk

      //Creating the intial format for the Reference property if there is a foreign key

      //query for the foreign key data
      const foreignKeys = await SqliteDataSource.query(`PRAGMA foreign_key_list(${tableName})`)
      const foreignKey = await foreignKeys.find((fk: any) => fk.from === columnName);
      // console.log('foreignKey before: ', foreignKey)
      
      const references = [];

        if (foreignKey) {
          // console.log('foreignKey after: ', foreignKey)
          references.push({
              isDestination: false,
              PrimaryKeyName: foreignKey.from,
              PrimaryKeyTableName: 'public.' + tableName,
              ReferencesPropertyName: foreignKey.to,
              ReferencesTableName: foreignKey.table,
              constraintName: tableName + '_' + foreignKey.from + '_fkey'
            });
            
            // console.log('[references]: ', [references])
          };
    
      tableSchema[columnName] = {
      IsForeignKey: foreignKey ? true : false,
      IsPrimaryKey: keyString !== 0 ? true : false,
      Name: columnName,
      References: references,
      TableName: 'public.' + tableName,
      Value: column.dflt_value,
      additional_constraints: column.notnull === 1 ? 'NOT NULL' : null,
      data_type: column.type,
      field_name: columnName,
      };
    };
    return tableSchema;
    };
//--------HELPER FUNCTION END-----------------------------------
      
        const tables = await SqliteDataSource.query(`SELECT name FROM sqlite_master WHERE type='table'`)
 
        const tableData: TableColumns = {};
        const schema: TableSchema = {};

                // LOOP
      for (const table of tables) {

        // DATA Create property on tableData object with every loop
        const tableName = table.name;
        const tableDataQuery = await SqliteDataSource.query(`SELECT * FROM ${tableName}`);
        tableData[tableName] = tableDataQuery

        // SCHEMAS Create property on schema object with every loop
          const sqliteSchemaData = await SqliteDataSource.query(`PRAGMA table_info(${tableName})`)
          //console.log('sqliteForeignKeyData', sqliteSchemaData)

        // console.log('sqliteSchemaData: ', sqliteSchemaData)
          schema['public.' + tableName] = await sqliteFormatTableSchema(sqliteSchemaData, tableName);
        };

              // Console.logs to check what the data looks like
    //   console.log('table data: ', tableData)
    //   console.log('schema data: ', schema)


      // Storage of queried results into res.locals
      res.locals.schema = schema;
      res.locals.data = tableData;

      // Disconnecting after data has been received 
      SqliteDataSource.destroy();
      console.log('Database has been disconnected');

      return next();

    } catch (err: unknown) {
      console.log('Error during Data Source: ', err);
      SqliteDataSource.destroy();
      console.log('Database has been disconnected');
      return next(err);
    };
},

//----------------------------------------------------------------------------

sqliteAddNewRow: async (req: Request, _res: Response, next: NextFunction) => {
  const dbDataSource = await dbConnect(req)
  console.log('req.session: ', req.session)
  try{
  const newDbRowData: {[key: string]: string } = req.body;
  const tableName = newDbRowData.tableName;
  const newMysqlRow: {[key: string]: string} = newDbRowData.newRow as {};

        const keys: string = Object.keys(newMysqlRow).join(", ");
        console.log("keys: ", keys)
        const values: string = Object.values(newMysqlRow).map(val => `'${val}'`).join(", ");
        console.log('values: ', values)
        const dbAddedRow: Promise<unknown> = await dbDataSource.query(`INSERT INTO ${tableName} (${keys})
          VALUES (${values})`);

    dbDataSource.destroy();
    console.log('Database has been disconnected');
    console.log('dbAddedRow in helper: ', dbAddedRow)
    return dbAddedRow;
    

} catch (err: unknown) {
  console.log('Error occurred in the mysqlAddNewRow middleware: ', err);
  dbDataSource.destroy();
  console.log('Database has been disconnected');
  return next(err);
};
},

//------------------------------------------------------------------------------------------------------

sqliteAddNewRow: async (req: Request, res: Response, next: NextFunction) => {
  addNewDbRow(req, res, next)
  console.log("sqliteAddNewRow function has concluded")
  return next();
},

//------------------------------------------------------------------------------------------------------

sqliteUpdateRow: async (req: Request, res: Response, next: NextFunction) => {
    updateRow(req, res, next);
    console.log("sqliteUpdateRow function has concluded")
    return next();
  },

//--------------------------------------------------------------------------------------------------------

sqliteDeleteRow: async (req: Request, res: Response, next: NextFunction) => {
  deleteRow(req, res, next);
  console.log("sqliteDeleteRow function has concluded")
    return next();
  },

//--------------------------------------------------------------------------------------------------------

sqliteAddNewColumn: async (req: Request, res: Response, next: NextFunction) => {
  addNewDbColumn(req, res, next);
  console.log("sqliteAddNewColumn function has concluded")
    return next();
  },

//--------------------------------------------------------------------------------------------------------

sqliteUpdateColumn: async (req: Request, res: Response, next: NextFunction) => {
  updateDbColumn(req, res, next);
  console.log("sqliteUpdateColumn function has concluded")
    return next();
  },

//--------------------------------------------------------------------------------------------------------

sqliteDeleteColumn: async (req: Request, res: Response, next: NextFunction) => {
  deleteColumn(req, res, next);
  console.log("sqliteDeleteColumn function has concluded")
    return next();
  },

//--------------------------------------------------------------------------------------------------------

sqliteAddNewTable: async (req: Request, res: Response, next: NextFunction) => {
  addNewTable(req, res, next);
  console.log("sqliteAddNewTable function has concluded")
    return next();
  },

//--------------------------------------------------------------------------------------------------------

sqliteDeleteTable: async (req: Request, res: Response, next: NextFunction) => {
  deleteTable(req, res, next);
  console.log("sqliteDeleteTable function has concluded")
    return next();
  },

//--------------------------------------------------------------------------------------------------------

sqliteAddForeignKey: async (req: Request, res: Response, next: NextFunction) => {
  addForeignKey(req, res, next);
  console.log("sqliteAddForeignKey function has concluded")
  return next();
},

//--------------------------------------------------------------------------------------------------------

sqliteRemoveForeignKey: async (req: Request, res: Response, next: NextFunction) => {
  removeForeignKey(req, res, next);
  console.log("sqliteRemoveForeignKey function has concluded")
  return next();
},

//--------------------------------------------------------------------------------------------------------

};

export default sqliteController;