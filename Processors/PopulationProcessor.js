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
}