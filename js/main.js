
// NEED TO ADD TO HTML
{/* <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@2.4.0/dist/email.min.js"></script> */}

// IEDIT PA NI BASED ON LEIGH'S FORMAT
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

(function() {
    emailjs.init("service_5bsoe6f"); //please encrypted user id for malicious attacks
  })();

//set the parameter as per you template parameter[https://dashboard.emailjs.com/templates]
var templateParams = {
    to_name: 'xyz',
    from_name: 'abc',
    message_html: 'Please Find out the attached file'
};

emailjs.send('service_5bsoe6f', 'template_8erkhbg', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
});


  