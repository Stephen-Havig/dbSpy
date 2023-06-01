"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.microsoftRouter = void 0;
const express_1 = require("express");
const microsoftData_controller_1 = __importDefault(require("../controllers/microsoftData.controller"));
const microsoftRouter = (0, express_1.Router)();
exports.microsoftRouter = microsoftRouter;
// Retrieve Microsoft SQL schema and data from REMOTE db
microsoftRouter.get('/schema', microsoftData_controller_1.default.microsoftQuery, (_req, res) => {
    return res.status(200).json(res.locals);
});
//-------------------------------------DATA TABLE ROWS----------------------------------------------------------------------------------------
//-------------------ADD NEW ROW-----------------------------------------------------------------------------------------
microsoftRouter.post('/addRow', microsoftData_controller_1.default.microsoftAddNewRow, (_req, res) => {
    return res.sendStatus(200);
});
//-----------------UPDATE ROW--------------------------------------------------------------------------------------------------
microsoftRouter.patch('/updateRow', microsoftData_controller_1.default.microsoftUpdateRow, (_req, res) => {
    return res.sendStatus(200);
});
//----------------DELETE ROW---------------------------------------------------------------------------------------------------- 
microsoftRouter.delete('/deleteRow', microsoftData_controller_1.default.microsoftDeleteRow, (_req, res) => {
    return res.sendStatus(200);
});
//-------------------------------------SCHEMA TABLE COLUMNS--------------------------------------------------------------------------------------------
//----------------ADD NEW COLUMN--------------------------------------------------------------------------------------------------
microsoftRouter.post('/addColumn', microsoftData_controller_1.default.microsoftAddNewColumn, (_req, res) => {
    return res.status(200).json(res.locals.newColumn);
});
//-----------------UPDATE COLUMN---------------------------------------------------------------------------------------------
microsoftRouter.patch('/updateColumn', microsoftData_controller_1.default.microsoftUpdateColumn, (_req, res) => {
    return res.sendStatus(200);
});
//-------------DELETE COLUMN-------------------------------------------------------------------------------------------------
microsoftRouter.delete('/deleteColumn', microsoftData_controller_1.default.microsoftDeleteColumn, (_req, res) => {
    return res.sendStatus(200);
});
//---------------------------DATABASE TABLES--------------------------------------------------------------------------------------------------------
//--------------ADD NEW TABLE--------------------------------------------------------------------------------------------------
microsoftRouter.post('/saveNewTable', microsoftData_controller_1.default.microsoftAddNewTable, microsoftData_controller_1.default.microsoftQuery, (_req, res) => {
    return res.status(200).json(res.locals);
});
//--------------GET ALL TABLE NAMES---------------------------------------------------------------------------------------------------
microsoftRouter.get('/tableNames', microsoftData_controller_1.default.microsoftGetTableNames, (_req, res) => {
    return res.status(200).json(res.locals.tableNames);
});
//--------------DELETE TABLE---------------------------------------------------------------------------------------------------
microsoftRouter.delete('/deleteTable', microsoftData_controller_1.default.microsoftDeleteTable, microsoftData_controller_1.default.microsoftQuery, (_req, res) => {
    return res.status(200).json(res.locals);
});
//------------------------------------------FOREIGN KEYS----------------------------------------------------------------------------------------------
//--------------ADD NEW FOREIGN KEY----------------------------------------------------------------------------------------------
microsoftRouter.put('/addForeignKey', microsoftData_controller_1.default.microsoftAddForeignKey, (_req, res) => {
    return res.sendStatus(200);
});
//----------------REMOVE FOREIGN KEY--------------------------------------------------------------------------------------------
microsoftRouter.delete('/removeForeignKey', microsoftData_controller_1.default.microsoftRemoveForeignKey, (_req, res) => {
    return res.status(200).json(res.locals.deletedRow);
});
//# sourceMappingURL=microsoft.router.js.map