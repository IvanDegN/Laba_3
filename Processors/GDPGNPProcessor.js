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

// Создание таблицы
createTable(data, growthRates){
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    ['Год', 'ВВП', 'Процент роста'].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach((row, index) =>{
        const tr = document.createElement('tr');
        [row.year, row.gdp, row.gnp, growthRates[index].toFixed(2)].forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    } );

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

// Вычисление процентных изменений
calculateGrowthRates(values){
    return values.map((value, index) =>{
        if (index === 0 ) return 0;
        return ((value - values[index - 1]) / values[index - 1] ) * 100;
    } );
}



}

