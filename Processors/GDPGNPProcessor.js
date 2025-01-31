// GDPGNPProcessor.js

import {DataProcessor} from "./DataProcessor"

export class GDPGNPProcessor extends DataProcessor{
    constructor(fileInputId, outputDivId, chartCanvasId){
        super(fileInputId, outputDivId, chartCanvasId);
    }


// Парсинг данных
parseData(text){
    const rows = text.trim().split('\n');
    const headers = rows[0].split(/\s+/);
    return rows.slice(1).map(row => {
        const values = row.split(/\s+/);
        return headers.reduce((obj, header, index) =>{
            obj[header.trim()] = values[index]?.trim() || '';
            return obj;
        }, {} );
    });
}

}

