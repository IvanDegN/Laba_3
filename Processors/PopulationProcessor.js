// PopulationProcessor.js

import { DataProcessor } from "./DataProcessor.js";

export class PopulationProcessor extends DataProcessor {
    constructor(fileInputId, outputDivId, chartCanvasId) {
        super(fileInputId, outputDivId, chartCanvasId);
    }

    // Парсинг данных
    parseData(text) {
        const rows = text.trim().split('\n');
        const headers = rows[0].split(/\s+/);
        return rows.slice(1).map(row => {
            const parts = row.split(/\s+/);
            const region = [];
            let i = 0;
            while (i < parts.length && isNaN(parseFloat(parts[i]))) {
                region.push(parts[i].trim());
                i++;
            }
            const years = parts.slice(i).map(Number);
            return {
                region: region.join(' '),
                years: years,
            };
        });
    }
    // Создание таблицы
    createTable(regions, populationData, filteredYears) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        ['Регион', ...filteredYears.map(year => `Год ${year}`)].forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        regions.forEach((region, index) => {
            const tr = document.createElement('tr');
            const rowData = [region, ...filteredYears.map(yearIndex => populationData[index][yearIndex - 1])];
            rowData.forEach(value => {
                const td = document.createElement('td');
                td.textContent = value || '-';
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }
 // Метод для вычисления региона с максимальным снижением численности
 findMaxDeclineRegion(populationData, regions) {
    let maxDecline = 0;
    let maxDeclineRegion = '';
    populationData.forEach((data, index) => {
        const decline = data[0] - data[data.length - 1];
        if (decline > maxDecline) {
            maxDecline = decline;
            maxDeclineRegion = regions[index];
        }
    });
    return { region: maxDeclineRegion, decline: maxDecline };
}

}
