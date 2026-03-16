

async function fetchProfileData () {
    const url = 'https://raw.githubusercontent.com/Skorupa95BR/portfolio/refs/heads/main/data/profile.json';
    const fecthing = await fetch(url);
    return await fecthing.json();
}