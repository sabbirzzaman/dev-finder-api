// Select elements
const selectElement = (id) => {
    const element = document.getElementById(id);
    return element;
};

// Select global elements
const userContainer = selectElement('user');
const searchInput = selectElement('search-input');
const searchBtn = selectElement('search-btn');
const themeToggle = selectElement('theme-toggle');
const loadingSpinner = selectElement('spinner');

// Add error messages
const setError = (errorMessage) => {
    userContainer.textContent = '';
    userContainer.innerHTML = `<p class="error-msg">${errorMessage}</p>`;
    userContainer.style.display = 'block';
    userContainer.style.textAlign = 'center';
};

// Search button event handler
loadData = async () => {
    userContainer.style.visibility = 'hidden'
    loadingSpinner.style.display = 'block';
    
    const keyword = searchInput.value;
    const url = `https://api.github.com/users/${keyword}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data))
    .catch(error => console.log(error))
};

const displayData = (data) => {
    userContainer.style.visibility = 'unset'
    loadingSpinner.style.display = 'none';
    if (searchInput.value === '') {
        setError('Please enter a username!');
    } else if (data.message === 'Not Found') {
        setError('Sorry, User not founded');
    } else {
        searchInput.value = '';

        // Select elements
        const userImage = selectElement('user-img');
        const name = selectElement('name');
        const join = selectElement('join');
        const username = selectElement('username');
        const bio = selectElement('bio');
        const repo = selectElement('repo');
        const followers = selectElement('followers');
        const following = selectElement('following');
        const address = selectElement('address');
        const twitter = selectElement('twitter');
        const link = selectElement('link');
        const company = selectElement('company');

        // Set attribute
        userImage.setAttribute('src', data.avatar_url);

        // Modified information
        const blogUrl = data.blog.slice(8).slice(0, -1);
        const userAddress = data.location.split(',')[1];
        const dateTime = new Date(data.created_at).toDateString().slice(4);

        // Set innerText
        !data.name
            ? (name.innerText = 'Not Set')
            : (name.innerText = data.name);
        !data.created_at
            ? (join.innerText = 'No Date')
            : (join.innerText = dateTime);
        !data.login
            ? (username.innerText = 'No Username')
            : (username.innerText = data.login);
        !data.bio
            ? (bio.innerText = 'This profile has no username.')
            : (bio.innerText = data.bio);

        repo.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;

        !data.location || data.location === undefined
            ? (address.innerText = 'Not Set')
            : (address.innerText = userAddress);
        !data.twitter_username
            ? (twitter.innerText = 'Not Set')
            : (twitter.innerText = data.twitter_username);
        !data.blog ? (link.innerText = 'Not Set') : (link.innerText = blogUrl);
        !data.company
            ? (company.innerText = 'Not Set')
            : (company.innerText = data.company);
    }
};

searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        loadData();
    }
});

themeToggle.addEventListener('click', () => {
    const toggleContainer = document.getElementById('theme-toggle');
    const h2 = document.getElementsByTagName('h2');

    if (toggleContainer.firstChild.innerText === 'Light') {
        toggleContainer.textContent = '';
        toggleContainer.innerHTML = `<span>Dark</span> <i class="fa-solid fa-moon"></i>`;
        for (element of h2) {
            element.style.color = '#000';
        }
    } else {
        toggleContainer.textContent = '';
        toggleContainer.innerHTML = `<span>Light</span> <i class="fa-solid fa-sun"></i>`;
        for (element of h2) {
            element.style.color = '#fff';
        }
    }

    const body = document.body;
    const header = document.querySelector('.header');
    const searchBar = document.querySelector('.search-dev');
    const userInfo = document.querySelector('.user');
    const otherInfo = document.querySelector('.other-info');
    body.classList.toggle('light-bg');
    header.classList.toggle('light-header');
    searchBar.classList.toggle('light-search-bar');
    userInfo.classList.toggle('light-user-info');
    otherInfo.classList.toggle('light-other-info');
});
