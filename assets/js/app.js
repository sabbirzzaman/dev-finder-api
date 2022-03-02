// Select elements
const selectElement = (id) => {
    const element = document.getElementById(id);
    return element;
};

// Select global elements
const searchInput = selectElement('search-input');
const searchBtn = selectElement('search-btn');
const themeToggle = selectElement('theme-toggle');

// Search button event handler
loadData = async () => {
    const keyword = searchInput.value;
    const url = `https://api.github.com/users/${keyword}`;

    const res = await fetch(url);
    const data = await res.json();

    displayData(data);
};

const displayData = (data) => {
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
    userImage.setAttribute('src', data.avatar_url)

    // Modified information
    const blogUrl = data.blog.slice(8);
    const userAddress = data.location.split(',')[1];

    // Set innerText
    name.innerText = data.name;
    join.innerText = data.created_at;
    username.innerText = data.login;
    bio.innerText = data.bio;
    repo.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;
    address.innerText = userAddress;
    twitter.innerText = data.twitter_username;
    link.innerText = blogUrl.slice(0, -1)
    company.innerText = data.company;
};

themeToggle.addEventListener('click', () => {
    const toggleContainer = document.getElementById('theme-toggle');
    const h2 = document.getElementsByTagName('h2');

    if(toggleContainer.firstChild.innerText === 'Light') {
        toggleContainer.textContent = '';
        toggleContainer.innerHTML = `<span>Dark</span> <i class="fa-solid fa-moon"></i>`
        for(element of h2) {
            element.style.color = '#000'
        }
    } else {
        toggleContainer.textContent = '';
        toggleContainer.innerHTML = `<span>Light</span> <i class="fa-solid fa-sun"></i>`
        for(element of h2) {
            element.style.color = '#fff'
        }
    }

    const body = document.body;
    const header = document.querySelector('.header')
    const searchBar = document.querySelector('.search-dev')
    const userInfo = document.querySelector('.user')
    const otherInfo = document.querySelector('.other-info')
    body.classList.toggle('light-bg');
    header.classList.toggle('light-header');
    searchBar.classList.toggle('light-search-bar');
    userInfo.classList.toggle('light-user-info');
    otherInfo.classList.toggle('light-other-info');
});
