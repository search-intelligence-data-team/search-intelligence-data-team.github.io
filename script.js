function searchCards() {
    var query = document.getElementById('searchQuery').value;
    var apiUrl = "https://api.trello.com/1/search?key=62ce53af50195827422a471155d39dbd&token=ATTA2881e830c57b989c2539e76e1accd34af3e1777c1f85c5767eb162c43f623abe63880628&modelTypes=cards&card_members=true&card_attachments=true&query=" + query;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.cards, query); // Pass query as an argument
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(cards, query) { // Accept query as a parameter
    var resultsTable = document.getElementById('resultsTable');
    var resultCount = document.getElementById('resultCount');
    resultCount.innerHTML = cards.length + " results found for \"" + query + "\"";

    // Clear previous results
    resultsTable.innerHTML = '<tr><th>Name</th><th>Description</th><th>Attachment URL</th><th>Member First Name</th><th>Start Date</th></tr>';

    // Add new results
    cards.forEach((card, i) => {
        var row = resultsTable.insertRow(i + 1);
        row.insertCell(0).innerHTML = card.name;
        row.insertCell(1).innerHTML = card.desc;
        row.insertCell(2).innerHTML = card.attachments[0]?.url ?? '';
        row.insertCell(3).innerHTML = card.members[0]?.fullName.split(' ')[0] ?? '';
        row.insertCell(4).innerHTML = card.start ? card.start.split('T')[0] : '';
    });
}
