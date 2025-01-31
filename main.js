// main.js

import { GDPGNPProcessor } from './Processors/GDPGNPProcessor.js';
import { PopulationProcessor } from './Processors/PopulationProcessor.js'




        const gdpGnpProcessor = new GDPGNPProcessor('gdp-gnp-file', 'gdp-gnp-output', 'gdp-gnp-chart');
        const populationProcessor = new PopulationProcessor('population-file', 'population-output', 'population-chart');
        
        document.getElementById('process-gdp-gnp').addEventListener('click', () => gdpGnpProcessor.process());
        document.getElementById('process-population').addEventListener('click', () => populationProcessor.process());
    

    



