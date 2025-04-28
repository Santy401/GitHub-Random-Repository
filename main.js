const languageSelect = document.getElementById('language-select');
const statusMessage = document.getElementById('status-message');
const repoCard = document.getElementById('repo-card');
const repoName = document.getElementById('repo-name');
const repoDescription = document.getElementById('repo-description');
const repoInfo = document.getElementById('repo-info');
const refreshButton = document.getElementById('refresh-button');

let currentLanguage = '';

languageSelect.addEventListener('change', () => {
    currentLanguage = languageSelect.value;
    if (currentLanguage) {
        fetchRepository();
    } else {
        showEmptyState();
    }
});

refreshButton.addEventListener('click', () => {
    if (currentLanguage) {
        fetchRepository();
    }
});
function showEmptyState() {
    statusMessage.style.display = 'block';
    statusMessage.textContent = 'Please select a language';
    statusMessage.style.background = '#eee';
    repoCard.style.display = 'none';
    refreshButton.style.display = 'none';
}

function showLoadingState() {
    statusMessage.style.display = 'block';
    statusMessage.textContent = 'Loading, please wait..';
    statusMessage.style.background = '#eee';
    repoCard.style.display = 'none';
    refreshButton.style.display = 'none';
}

function showErrorState() {
    statusMessage.style.display = 'block';
    statusMessage.textContent = 'Error fetching repositories';
    statusMessage.style.background = '#fdd';
    repoCard.style.display = 'none';
    refreshButton.style.display = 'block';
}

function showRepository(repo) {
    statusMessage.style.display = 'none';
    repoCard.style.display = 'block';
    refreshButton.style.display = 'block';

    repoName.textContent = repo.name;
    repoDescription.textContent = repo.description || 'No description available.';
    repoInfo.innerHTML = `${repo.stargazers_count} | 🍴 ${repo.forks_count} | 👀 ${repo.watchers_count}`;
}

function fetchRepository() {
    showLoadingState();
    fetch(`https://api.github.com/search/repositories?q=language:${currentLanguage}&sort=stars&order=desc`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];
                showRepository(randomRepo);
            } else {
                showErrorState();
            }
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            showErrorState();
        });
}

showEmptyState();