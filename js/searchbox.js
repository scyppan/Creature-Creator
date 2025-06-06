let fuse;

async function initsearchbox() {
    fuse = new Fuse(creatures, {
        keys: ['meta.creaturename'],
        threshold: 0.3
    });

    let searchbox=document.getElementById('searchbox')
    searchbox.addEventListener('input', handlesearchinput);
    searchbox.classList.remove('hidden');
}

function handlesearchinput(e) {
    const query = e.target.value.trim();

    // Remove old suggestions
    document.getElementById('suggestions')?.remove();

    if (!query) return;

    getsuggestions(query, e);
}

function getsuggestions(query, e) {
    const results = Object.values(creatures).filter(c =>
        c.meta.creaturename && c.meta.creaturename.toLowerCase().includes(query.toLowerCase())
    );

    showresults(results, e);
}

function createsuggestionbox(e) {
    const suggestions = document.createElement('ul');
    suggestions.id = 'suggestions';
    suggestions.classList.add('suggestions-container');

    const rect = e.target.getBoundingClientRect();
    suggestions.style.top = `${rect.bottom + window.scrollY}px`;
    suggestions.style.left = `${rect.left + window.scrollX}px`;

    document.getElementById('searchbox').parentElement.appendChild(suggestions);
    return suggestions;
}

function showresults(results, e) {
    const suggestionbox = createsuggestionbox(e);

    results.forEach(result => {
        const li = createresultlisting(result);
        suggestionbox.appendChild(li);
    });
}

function createresultlisting(result) {
    const li = document.createElement('li');
    li.dataset.id = result.meta.creaturename;
    li.classList.add("suggestion");
    li.textContent = result.meta.creaturename;
    li.addEventListener('click', () => {
        document.getElementById('suggestions').remove();
        loadcreature(result.meta.creaturename);
    });
    return li;
}