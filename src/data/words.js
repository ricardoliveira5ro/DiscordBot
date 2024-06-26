const categories = {
    Fruits: ["apple", "banana", "orange", "strawberry", "grape", "watermelon", "pineapple", "kiwi", "mango", "pear"],
    Cities: ["New York", "London", "Paris", "Tokyo", "Los Angeles", "Beijing", "Moscow", "Dubai", "Sydney", "Rio de Janeiro", "Berlin", "Rome", "Mumbai", "Toronto", "Istanbul", "Seoul", "Shanghai", "Mexico City", "Cairo", "Bangkok"],
    Colors: ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white", "brown"],
    Animals: ["lion", "elephant", "tiger", "giraffe", "monkey", "zebra", "panda", "koala", "dog", "cat"],
    Countries: ["United States", "China", "India", "Brazil", "Russia", "Canada", "Australia", "Argentina", "France", "Germany", "United Kingdom", "Japan", "South Korea", "Italy", "Mexico", "Indonesia", "South Africa", "Turkey", "Spain", "Netherlands"],
    Football_Clubs: ["Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", "Liverpool", "Juventus", "Chelsea", "Paris Saint Germain", "Manchester City", "Arsenal", "Tottenham Hotspur", "AC Milan", "Inter Milan", "Borussia Dortmund", "Atletico Madrid", "Ajax", "FC Porto", "AS Roma", "Napoli", "Benfica"],
    Vehicles: ["car", "bus", "bicycle", "train", "motorcycle", "truck", "airplane", "boat", "helicopter", "scooter"],
    Planets: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Moon"],
    Professions: ["doctor", "teacher", "engineer", "lawyer", "chef", "artist", "scientist", "firefighter", "police officer", "architect"],
    Sports: ["soccer", "basketball", "tennis", "golf", "swimming", "baseball", "volleyball", "cricket", "boxing", "rugby"]
};

function generateRandomWord() {
    const keys = Object.keys(categories);
    const randomCategory = keys[Math.floor(Math.random() * keys.length)];
    const word = categories[randomCategory][Math.floor(Math.random() * categories[randomCategory].length)];

    return { category: randomCategory.split('_').join(' '), word: word };
}

module.exports = { generateRandomWord };