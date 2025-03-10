// GDPGNPProcessor.js

import {DataProcessor} from "./DataProcessor.js"

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
    ['Год', 'ВВП', 'ВНП', 'Процент роста'].forEach(header => {
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

// Обработка данных
async process(){
    try{
        this.clearOutput();
        const text = await this.readFile();
        const data = this.parseData(text);
        if(!data || !data.length || !data[0].year || !data[0].gdp || !data[0].gnp){
            this.outputDiv.textContent = 'Неверный формат данных';
            return;
        }
        const gdpValues = data.map(row => parseFloat(row.gdp));
        const growthRates = this.calculateGrowthRates(gdpValues);
        const table = this.createTable(data, growthRates);
        this.outputDiv.appendChild(table);
        const years = data.map(row => row.year);
        const gnpValues = data.map(row => parseFloat(row.gnp));
        this.drawChart(years, [gdpValues, gnpValues,], ['ВВП', 'ВНП']);

    } catch (error){
        console.error(error);
        alert('Ошибка при обработке данных: ' + error.message);
    }
    
}

}

