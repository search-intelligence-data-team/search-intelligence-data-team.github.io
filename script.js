function searchCards() {
    resultCount.innerHTML = "Searching..."
    var query = document.getElementById('searchQuery').value;
    var apiUrl = "https://api.trello.com/1/search?key=62ce53af50195827422a471155d39dbd&token=ATTA2881e830c57b989c2539e76e1accd34af3e1777c1f85c5767eb162c43f623abe63880628&modelTypes=cards&card_members=true&card_attachments=true&cards_limit=1000&query=" + query;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.cards, query); // Pass query as an argument
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(cards, query) { 
    var resultsTable = document.getElementById('resultsTable');
    var resultCount = document.getElementById('resultCount');
    resultCount.innerHTML = cards.length + " results found for \"" + query + "\"";

    // Clear previous results
    resultsTable.innerHTML = '<tr><th style="width:300px">Request</th><th>Description</th><th style="width:300px">Attachment</th><th style="width:100px">Analyst</th><th style="width:100px">Date</th></tr>';

    // Sort cards
    cards.sort((a, b) => {
        var dateA = a.start ? new Date(a.start) : new Date(0); // Use a default date if not present
        var dateB = b.start ? new Date(b.start) : new Date(0); // Use a default date if not present
        return dateB - dateA; // Sort in descending order
    });

    // Add results
    cards.forEach((card, i) => {
        var row = resultsTable.insertRow(i + 1);
        row.insertCell(0).innerHTML = card.name;
        row.insertCell(1).innerHTML = card.desc;

        var attachmentCell = row.insertCell(2);
        if (card.attachments && card.attachments[0] && card.attachments[0].url) {
            var url = card.attachments[0].url;
            var domain = (new URL(url)).hostname.replace('www.', ''); 

            var a = document.createElement('a');
            a.href = url;
            a.textContent = domain;
            a.target = "_blank";
            attachmentCell.appendChild(a);
        } else {
            attachmentCell.innerHTML = 'No Attachment';
        }

        row.insertCell(3).innerHTML = card.members[0]?.fullName.split(' ')[0] ?? '';
        row.insertCell(4).innerHTML = card.start ? card.start.split('T')[0] : '';
    });
}

function logout() {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = 'index.html';
}

