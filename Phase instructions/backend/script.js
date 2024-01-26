// Function to fetch articles
function fetchArticles(event) {
    event.preventDefault();

    const apiKey = 'tEvWUBAbAo148kYEMhwAf9L4GtbNsYG9'; 
    const query = document.getElementById('search-term').value;
    const numRecords = document.getElementById('num-records-select').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Convert date to YYYYMMDD format 
    const formatNYTDate = (date) => date ? date.split('-').join('') : '';

    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;

    // Add the date range to the URL 
    if (startDate) {
        url += `&begin_date=${formatNYTDate(startDate)}`;
    }
    if (endDate) {
        url += `&end_date=${formatNYTDate(endDate)}`;
    }

    // fetch data from a provided URL

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const articles = data.response.docs;
            displayResults(articles.slice(0, numRecords)); // Display the number of articles specified
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            // Handle errors 
        });  
}

