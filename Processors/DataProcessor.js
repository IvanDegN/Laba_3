// DataPocessor.js

export class DataProcessor {
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

// Очистка вывода
clearOutput(){
    this.outputDiv.innerHTML = '';
}

// Абстрактный метод для парсинга данных
parseData(text){
    throw new Error('Метод parseData должен быть переопределен в дочернем классе');

}

// Абстрактный метод для создания таблицы
createTable(data){
    throw new Error('Метод createTable должен быть переопределен в дочернем классе');
}

// Построение графика
drawChart(labels, datasets, datasetLabels){
    if(this.chartInstance){
        this.chartInstance.destroy();
    }
    this.chartInstance = new Chart(this.chartCanvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets.map((data, index) => ({
                label: datasetLabels[index],
                data: data,
                borderColor: this.getRandomColor(),
                fill: false,
            }))
        },
        options: {
            responsive: true,
            plugins: {
                legend: {display: true},
            },
        },
    });
}

}