document.addEventListener("DOMContentLoaded", () => {
    const routeButtons = document.querySelectorAll(".route-button");
    const fromElement = document.getElementById("from");
    const toElement = document.getElementById("to");
    const trainsTableBody = document.querySelector("#trains-table tbody");

    // Фіктивні дані поїздів
    const trainData = {
        "Київ → Львів": [
            { train: "Інтерсіті 743К", departure: "06:00", arrival: "10:00", duration: "4 години" },
            { train: "Інтерсіті 749К", departure: "14:00", arrival: "18:00", duration: "4 години" }
        ],
        "Київ → Дніпро-Головний": [
            { train: "Інтерсіті 764К", departure: "08:00", arrival: "12:30", duration: "4 години 30 хвилин" },
            { train: "Інтерсіті 766К", departure: "16:00", arrival: "20:30", duration: "4 години 30 хвилин" }
        ],
        "Київ → Харків": [
            { train: "Інтерсіті 722К", departure: "07:00", arrival: "11:00", duration: "4 години" },
            { train: "Інтерсіті 724К", departure: "15:00", arrival: "19:00", duration: "4 години" }
        ]
    };

    routeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const route = button.getAttribute("data-route");
            const [from, to] = route.split(' → ');
            fromElement.textContent = from.trim();
            toElement.textContent = to.trim();
            // Оновлюємо доступні поїзди при зміні маршруту
            updateTrainsTable(route);
        });
    });

    const updateTrainsTable = (route) => {
        const trains = trainData[route] || [];

        // Очищення таблиці перед додаванням нових даних
        trainsTableBody.innerHTML = "";

        trains.forEach(train => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${train.train}</td>
                <td>${train.departure}</td>
                <td>${train.arrival}</td>
                <td>${train.duration}</td>
            `;
            trainsTableBody.appendChild(row);
        });
        document.querySelectorAll('.select-button').forEach(button => {
            button.addEventListener('click', event => {
                const train = event.target.getAttribute('data-train');
                showModal(fromElement.textContent.trim(), toElement.textContent.trim(), train);
            });
        });
    };

    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", () => {
        const from = fromElement.textContent.trim();
        const to = toElement.textContent.trim();
        const route = `${from} → ${to}`;
        alert(`Знайти доступні поїзда з: ${from} до: ${to}`);
        updateTrainsTable(route);
    });
        // Отримуємо посилання на кнопки за їх id
    const enButton = document.getElementById('en');
    const uaButton = document.getElementById('uk');
    
    // Функція для зміни мови на англійську
    function changeToEnglish() {
        // Опрацьовуємо зміну мови на англійську
        console.log('Змінити мову на англійську');
        // Тут можна виконати додаткові дії, наприклад, змінити тексти на сторінці
    }
    
    // Функція для зміни мови на українську
    function changeToUkrainian() {
        // Опрацьовуємо зміну мови на українську
        console.log('Змінити мову на українську');
        // Тут можна виконати додаткові дії
    }
    
    // Додаємо обробники подій на кнопки
    enButton.addEventListener('click', changeToEnglish);
    uaButton.addEventListener('click', changeToUkrainian);


    // Ініціалізація таблиці для початкового маршруту
    updateTrainsTable("Київ → Львів");
});
