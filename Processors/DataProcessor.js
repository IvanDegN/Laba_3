// DataPocessor.js

export class DataPocessor {
    constructor(fileInputId, outputDivId, chartCanvasId){
        this.fileInput = document.getElementById(fileInputId);
        this.outputDiv = document.getElementById(outputDivId);
        this.chartCanvas = document.getElementById(chartCanvasId);
        this.chartInstance = null;
    }


// Общий метод для чтения файла
readFile() {
    return new Promise((resolve, reject) => {
        if (!this.fileInput.files.length) {
            alert('Выберите файл с данными.');
            reject();
            return;
        }
        const file = this.fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

// Метод для генерации случайного цвета
getRandomColor(){
    return `rgba(${Math.floor(Math.random() * 256 )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256 )}, 1)`;
}

}