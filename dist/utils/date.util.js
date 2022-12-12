"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertISODateToDayMonthYearFormat = void 0;
const convertISODateToDayMonthYearFormat = (date) => {
    const realDate = new Date(date);
    const day = `0${realDate.getDay()}`.slice(-2);
    const month = `0${realDate.getMonth() + 1}`.slice(-2);
    const year = realDate.getFullYear();
    return `${day}-${month}-${year}`;
};
exports.convertISODateToDayMonthYearFormat = convertISODateToDayMonthYearFormat;
