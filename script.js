document.addEventListener('DOMContentLoaded', function () {
    const routeButtons = document.querySelectorAll('.route-button');
    const fromElement = document.getElementById('from');
    const toElement = document.getElementById('to');
    const switchButton = document.getElementById('switch-button');
    const searchButton = document.getElementById('search-button');
    const trainsTableBody = document.querySelector('#trains-table tbody');
    const modal = document.getElementById('confirmation-modal');
    const closeModalButton = document.querySelector('.close');
    const confirmationMessage = document.getElementById('confirmation-message');
    const seatsContainer = document.getElementById('seats-container');
    const confirmButton = document.getElementById('confirm-button');
    const langButtons = document.querySelectorAll('.lang-button');

    let trains = [];
    let selectedRoute = 'Київ → Львів';
    let selectedTrain;
    let selectedSeats = [];

    routeButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedRoute = button.getAttribute('data-route');
            const [from, to] = selectedRoute.split(' → ');
            fromElement.textContent = from;
            toElement.textContent = to;
        });
    });

    switchButton.addEventListener('click', () => {
        const from = fromElement.textContent;
        const to = toElement.textContent;
        fromElement.textContent = to;
        toElement.textContent = from;
    });

    searchButton.addEventListener('click', () => {
        fetchTrains(selectedRoute);
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    confirmButton.addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            alert(`Квитки успішно придбані для місць: ${selectedSeats.join(', ')}`);
            modal.style.display = 'none';
        } else {
            alert('Будь ласка, оберіть хоча б одне місце.');
        }
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id === 'lang-uk' ? 'uk' : 'en';
            changeLanguage(lang);
        });
    });

    function fetchTrains(route) {
        // Імітуємо запит до сервера для отримання даних про поїзди
        const routesData = {
            'Київ → Львів': [
                {
                    number: '091К',
                    departure: '23:59',
                    arrival: '06:26',
                    duration: '6h 27m',
                    seats: ['1', '2', '3', '4', '5', '6']
                },
                {
                    number: '043К',
                    departure: '15:02',
                    arrival: '21:02',
                    duration: '6h 0m',
                    seats: ['1', '2', '3', '4', '5', '6']
                }
            ],
            'Київ → Дніпро-Головний': [
                {
                    number: '092Д',
                    departure: '08:00',
                    arrival: '13:45',
                    duration: '5h 45m',
                    seats: ['1', '2', '3', '4', '5', '6']
                },
                {
                    number: '073Д',
                    departure: '19:10',
                    arrival: '00:30',
                    duration: '5h 20m',
                    seats: ['1', '2', '3', '4', '5', '6']
                }
            ],
            'Київ → Харків': [
                {
                    number: '063Х',
                    departure: '07:00',
                    arrival: '12:15',
                    duration: '5h 15m',
                    seats: ['1', '2', '3', '4', '5', '6']
                },
                {
                    number: '073Х',
                    departure: '18:30',
                    arrival: '23:45',
                    duration: '5h 15m',
                    seats: ['1', '2', '3', '4', '5', '6']
                }
            ],
            'Київ → Одеса': [
                {
                    number: '007О',
                    departure: '08:00',
                    arrival: '14:30',
                    duration: '6h 30m',
                    seats: ['1', '2', '3', '4', '5', '6']
                },
                {
                    number: '037О',
                    departure: '20:00',
                    arrival: '02:30',
                    duration: '6h 30m',
                    seats: ['1', '2', '3', '4', '5', '6']
                }
            ],
            'Київ → Запоріжжя': [
                {
                    number: '012З',
                    departure: '06:00',
                    arrival: '12:30',
                    duration: '6h 30m',
                    seats: ['1', '2', '3', '4', '5', '6']
                },
                {
                    number: '022З',
                    departure: '16:00',
                    arrival: '22:30',
                    duration: '6h 30m',
                    seats: ['1', '2', '3', '4', '5', '6']
                }
            ],
            'Львів → Одеса': [
                {
                    number: '107Л',
                    departure: '08:00',
                    arrival: '14:30',
                    duration: '6h 30m',
                    seats: ['1', '2', '3', '4', '5', '6']
                },
                {
                    number: '207Л',
                    departure: '20:00',
                    arrival: '02:30',
                    duration: '6h 30m',
                    seats: ['1', '2', '3', '4', '5', '6']
                }
            ],
            'Харків → Дніпро-Головний': [
                {
                    number: '302Х',
                    departure: '06:00',
                    arrival: '09:00',
                    duration: '3h 0m',
                    seats: ['1', '2', '3', '4', '5', '6']
                },
                {
                    number: '502Х',
                    departure: '16:00',
                    arrival: '19:00',
                    duration: '3h 0m',
                    seats: ['1', '2', '3', '4', '5', '6']
                }
            ]
        };

        trains = routesData[route] || [];
        renderTrainsTable();
    }

    function renderTrainsTable() {
        trainsTableBody.innerHTML = '';
        trains.forEach(train => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${train.number}</td>
                <td>${train.departure}</td>
                <td>${train.arrival}</td>
                <td>${train.duration}</td>
                <td><button class="buy-button" data-train-number="${train.number}">Купити</button></td>
            `;
            trainsTableBody.appendChild(row);
        });

        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', event => {
                const trainNumber = event.target.getAttribute('data-train-number');
                selectedTrain = trains.find(train => train.number === trainNumber);
                showConfirmationModal();
            });
        });
    }

    function showConfirmationModal() {
        confirmationMessage.textContent = `Виберіть місця для поїзда ${selectedTrain.number}`;
        seatsContainer.innerHTML = '';
        selectedSeats = [];

        selectedTrain.seats.forEach(seat => {
            const seatElement = document.createElement('div');
            seatElement.textContent = seat;
            seatElement.classList.add('seat');
            seatElement.addEventListener('click', () => {
                if (seatElement.classList.contains('selected')) {
                    seatElement.classList.remove('selected');
                    selectedSeats = selectedSeats.filter(s => s !== seat);
                } else {
                    seatElement.classList.add('selected');
                    selectedSeats.push(seat);
                }
            });
            seatsContainer.appendChild(seatElement);
        });

        modal.style.display = 'block';
    }

    function changeLanguage(lang) {
        const translations = {
            uk: {
                title: "Подорожуй доступними напрямками",
                from: "Звідки:",
                to: "Куди:",
                switchButton: "Змінити напрямок",
                searchButton: "Знайти доступні поїзди",
                train: "Поїзд",
                departure: "Час відправлення",
                arrival: "Час прибуття",
                duration: "Тривалість",
                buyTicket: "Купити квиток",
                confirm: "Підтвердити"
            },
            en: {
                title: "Travel with Available Routes",
                from: "From:",
                to: "To:",
                switchButton: "Switch Direction",
                searchButton: "Find Available Trains",
                train: "Train",
                departure: "Departure Time",
                arrival: "Arrival Time",
                duration: "Duration",
                buyTicket: "Buy Ticket",
                confirm: "Confirm"
            }
        };

        const elements = {
            title: document.querySelector('h1'),
            from: document.querySelector('.info-label:first-child'),
            to: document.querySelector('.info-label:last-child'),
            switchButton: document.getElementById('switch-button'),
            searchButton: document.getElementById('search-button'),
            train: document.querySelector('th[data-sort="train"]'),
            departure: document.querySelector('th[data-sort="departure"]'),
            arrival: document.querySelector('th[data-sort="arrival"]'),
            duration: document.querySelector('th[data-sort="duration"]'),
            buyTicket: document.querySelectorAll('.buy-button'),
            confirm: document.getElementById('confirm-button')
        };

        const t = translations[lang];

        elements.title.textContent = t.title;
        elements.from.textContent = t.from;
        elements.to.textContent = t.to;
        elements.switchButton.textContent = t.switchButton;
        elements.searchButton.textContent = t.searchButton;
        elements.train.textContent = t.train;
        elements.departure.textContent = t.departure;
        elements.arrival.textContent = t.arrival;
        elements.duration.textContent = t.duration;
        elements.confirm.textContent = t.confirm;

        elements.buyTicket.forEach(button => {
            button.textContent = t.buyTicket;
        });
    }
});
