// Select elements
const selectElement = (id) => {
    const element = document.getElementById(id);
    return element;
};

// Select global elements
const searchInput = selectElement('search-input');
const searchBtn = selectElement('search-btn');

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
