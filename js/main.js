
function simple_alert() {
    alert('Eyo');
}

function add_card(name, quote) {
    let container = document.querySelector(".cards-container"); 
    container.innerHTML += `
    <div class="card" id="person1">
        <img class="person-image" src="../media/images/image.png" alt="image">
        <span id="name" >${name}</span>
        <span id="quote">
            <img src="../media/images/image.png" alt="quote-marks">
            <p>${quote}</p>
        </span>
        <span id="message-link">👉Send me a message!👈</span>
    </div>`
}

async function fetchData(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null; 
    }
}

function get_json() {
    fetchData('../data/curie_sample.json')
    .then(data => {
        if (data) {
            // LOOPS THROUGH THE PEOPLE TO ADD A CARD
            for (let i = 0; i < data.length; i++) {
                const person = data[i];
                add_card(person['Name'], person['Quote']); // Adding a card 
            }
        } else {
        console.log('Failed to retrieve data');
        }
    });
    console.log(all_data)
}


  