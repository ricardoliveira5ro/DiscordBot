const categories = {
    fruits: ["apple", "banana", "orange", "strawberry", "grape", "watermelon", "pineapple", "kiwi", "mango", "pear"],
    cities: ["New York", "London", "Paris", "Tokyo", "Los Angeles", "Beijing", "Moscow", "Dubai", "Sydney", "Rio de Janeiro", "Berlin", "Rome", "Mumbai", "Toronto", "Istanbul", "Seoul", "Shanghai", "Mexico City", "Cairo", "Bangkok"],
    colors: ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white", "brown"],
    animals: ["lion", "elephant", "tiger", "giraffe", "monkey", "zebra", "panda", "koala", "dog", "cat"],
    countries: ["United States", "China", "India", "Brazil", "Russia", "Canada", "Australia", "Argentina", "France", "Germany", "United Kingdom", "Japan", "South Korea", "Italy", "Mexico", "Indonesia", "South Africa", "Turkey", "Spain", "Netherlands"],
    footballClubs: ["Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", "Liverpool", "Juventus", "Chelsea", "Paris Saint-Germain", "Manchester City", "Arsenal", "Tottenham Hotspur", "AC Milan", "Inter Milan", "Borussia Dortmund", "Atletico Madrid", "Ajax", "FC Porto", "AS Roma", "Napoli", "Benfica"],
    vehicles: ["car", "bus", "bicycle", "train", "motorcycle", "truck", "airplane", "boat", "helicopter", "scooter"],
    planets: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Moon"],
    professions: ["doctor", "teacher", "engineer", "lawyer", "chef", "artist", "scientist", "firefighter", "police officer", "architect"],
    sports: ["soccer", "basketball", "tennis", "golf", "swimming", "baseball", "volleyball", "cricket", "boxing", "rugby"]
};

function generateRandomWord() {
    const keys = Object.keys(categories);
    const randomCategory = categories[keys[Math.floor(Math.random() * keys.length)]];
    return randomCategory[Math.floor(Math.random() * randomCategory.length)];
}

module.exports = { generateRandomWord };