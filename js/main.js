function go_profile(code) {
    window.location.href = `profile.html?code=${code}`;
}

function add_card(code, name, quote) {
    let container = document.querySelector(".card-container"); 
    let namelist = name.split(",");
    let new_card = `
    <div class="card" onclick="go_profile('${code}')">
        <img class="photo" src="../media/images/Curie/${code}.JPG" alt="image">
        
        <span class="name"><span id="surname">${namelist[0].trim()}, </span>${namelist[1].trim()}</span>
        
        <span class="quote">
            <img src="../media/images/image.png" alt="image">
            <p>"${quote}"</p>
        </span>
    </div>
    `
    container.innerHTML += new_card;
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

function get_json(section) {
    var file_path;
    if (section == 'curie') {
        file_path = '../data/curie_sample.json';
    } else if (section == 'tesla') {
        file_path = '../data/tesla_sample.json';
    } else if (section == 'einstein') {
        file_path = '../data/einstein_sample.json';
    };
    fetchData(file_path)
    .then(data => {
        if (data) {
            // LOOPS THROUGH THE PEOPLE TO ADD A CARD
            for (let i = 0; i < data.length; i++) {
                const person = data[i];
                add_card(person['Code'] ,person['Name'], person['Quote']); // Adding a card 
            }
        } else {
        console.log('Failed to retrieve data');
        }
    });
}


  