// DataPocessor.js

export class DataPocessor {
    constructor(fileInputId, outputDivId, chartCanvasId){
        this.fileInput = document.getElementById(fileInputId);
        this.outputDiv = document.getElementById(outputDivId);
        this.chartCanvas = document.getElementById(chartCanvasId);
        this.chartInstance = null;
    }
}