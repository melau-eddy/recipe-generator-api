const searchMeal = async (e) => {
    // Prevent form from submitting and page refresh
    e.preventDefault();

    const input = document.querySelector(".input");
    const title = document.querySelector(".title");
    const info = document.querySelector(".info");
    const img = document.querySelector(".img-content");

    // Function to display meal info
    const showMealInfo = (meal) => {
        const { strMeal, strMealThumb, strInstructions } = meal;
        title.textContent = strMeal;
        img.style.backgroundImage = `url(${strMealThumb})`;
        info.textContent = strInstructions;
    };

    // Function to display an alert if meal not found
    const showAlert = () => {
        alert("Meal not found");
    };

    // Function to fetch meal data from the API
    const fetchMealData = async (val) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
        const { meals } = await res.json();
        return meals;
    };

    const val = input.value.trim();

    if (val) {
        const meals = await fetchMealData(val);

        if (!meals || meals.length === 0) {
            showAlert();
            return;
        }

        meals.forEach(showMealInfo);
    } else {
        alert("Please try searching for a meal.");
    }
};

// Add event listener for form submission
const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);
