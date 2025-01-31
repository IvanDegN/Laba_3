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
// Обработка данных
async process() {
    try {
        this.clearOutput();
        const text = await this.readFile();
        const data = this.parseData(text);
        if (!data || !data.length || !data[0].region || !data[0].years) {
            this.outputDiv.textContent = 'Неверный формат данных.';
            return;
        }
        const regions = data.map(row => row.region);
        const populationData = data.map(row => row.years);
        const numberOfYears = populationData[0]?.length || 0;
        if (numberOfYears === 0) {
            this.outputDiv.textContent = 'Данные о численности населения отсутствуют.';
            return;
        }
        const filteredYears = Array.from({ length: numberOfYears }, (_, i) => i + 1).filter(yearIndex => {
            return populationData.every(regionData =>
                regionData[yearIndex - 1] !== null &&
                regionData[yearIndex - 1] !== undefined &&
                !isNaN(regionData[yearIndex - 1])
            );
        });
        const table = this.createTable(regions, populationData, filteredYears);
        this.outputDiv.appendChild(table);
        this.drawChart(filteredYears, populationData.map(data => filteredYears.map(yearIndex => data[yearIndex - 1])), regions);
        const { region: maxDeclineRegion, decline: maxDecline } = this.findMaxDeclineRegion(populationData, regions);
        const declineInfo = document.createElement('p');
        declineInfo.textContent = `Самое большое снижение численности за ${filteredYears.length} лет произошло в регионе: ${maxDeclineRegion} (${maxDecline.toFixed(2)} человек)`;
        this.outputDiv.appendChild(declineInfo);
    } catch (error) {
        console.error(error);
        alert('Ошибка при обработке данных: ' + error.message);
    }
}
}

