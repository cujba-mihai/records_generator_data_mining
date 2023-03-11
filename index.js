const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const moment = require('moment');

const locations = require('./locations')
const appliances = require('./appliances')
const companies = require('./companies')

const locationsLength = locations.length;
const appliancesLength = appliances.length;
const companiesLength = companies.length;

const getRandomCompany = () => {
    const randomIndex = Math.floor(Math.random() * companiesLength);

    return companies[randomIndex]
}

const getRandomAppliance = () => {
    const randomIndex = Math.floor(Math.random() * appliancesLength);

    return appliances[randomIndex]
}

const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * locationsLength);

    return locations[randomIndex]
}

// Set the start and end dates
const startDate = moment('2022-01-01');
const endDate = moment('2023-03-31');

// Set the start and end times
const startTime = moment('08:00:00', 'HH:mm:ss');
const endTime = moment('18:00:00', 'HH:mm:ss');

// Calculate the difference in days between the start and end dates
const diffDays = endDate.diff(startDate, 'days') + 1;
const generateRandomDate = () => {

// Generate a random number between 0 and the difference in days
const randomDays = Math.floor(Math.random() * diffDays);

// Add the random number of days to the start date to get the random date
const randomDate = startDate.clone().add(randomDays, 'days');

const formatted =  randomDate.format('YYYY-MM-DD');

return formatted
}

const generateRandomTime = () => {

    // Get the difference between the start and end times in minutes
const diffMinutes = endTime.diff(startTime, 'minutes');

// Get a random number of minutes between 0 and the difference in minutes
const randomMinutes = Math.floor(Math.random() * diffMinutes);

// Add the random number of minutes to the start time
const randomTime = startTime.clone().add(randomMinutes, 'minutes');

return randomTime.format('HH:mm:ss');
}


const generateRecord = () => {
    const randomAppliance = getRandomCompany()
    const location = getRandomLocation();
    return {
        date: generateRandomDate(),
        time: generateRandomTime(),
        store: location.store,
        city: location.city,
        country: location.country,
        continent: location.continent,
        type_of_technique: getRandomAppliance(),
        manufacturer: randomAppliance.manufacturer,
        country_producer: randomAppliance.countryOfOrigin,
        service_volume: (Math.random() * 16).toFixed(2), // hours
        service_quantity: Math.floor(Math.random() * 3)
    }
}

const csvWriter = createCsvWriter({
    path: './generated_records.csv',
    header: [
        {id: 'date', title: 'date'},
        {id: 'time', title: 'time'},
        {id: 'store', title: 'store'},
        {id: 'city', title: 'city'},
        {id: 'country', title: 'country'},
        {id: 'continent', title: 'continent'},
        {id: 'type_of_technique', title: 'type_of_technique'},
        {id: 'manufacturer', title: 'manufacturer'},
        {id: 'country_producer', title: 'country_producer'},
        {id: 'service_volume', title: 'service_volume'},
        {id: 'service_quantity', title: 'service_quantity'},
    ]
});

const numberOfRecords = 1_000_000;
console.time('creatingRecords')
const records = Array.from({length: numberOfRecords}, () => generateRecord())
console.timeEnd('creatingRecords')
 
csvWriter.writeRecords(records);