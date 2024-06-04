function go_profile(section, code) {
    window.location.href = `profile.html?section=${section}&code=${code}`;
}

function go_section(section) {
    window.location.href = `html/section.html?section=${section}`;
}

function add_card(section, code, name, quote) {
    let container = document.querySelector(".card-container"); 
    let namelist = name.split(",");
    let new_card = `
    <div class="card" onclick="go_profile('${section}','${code}')">
        <img class="photo" src="../media/images/${section}/${code}.JPG" alt="image">
        
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

function load_cards(section) {
    var file_path;
    let bg = document.querySelector(".bg"); 
    if (section == 'curie') {
        file_path = '../data/curie_sample.json';
        bg.value = 'CURIE';
    } else if (section == 'tesla') {
        file_path = '../data/tesla_sample.json';
        bg.value = 'TESLA';
    } else if (section == 'einstein') {
        file_path = '../data/einstein_sample.json';
        bg.value = 'EINSTEIN';
    };
    fetchData(file_path)
    .then(data => {
        if (data) {
            // LOOPS THROUGH THE PEOPLE TO ADD A CARD
            for (let i = 0; i < data.length; i++) {
                const person = data[i];
                add_card(section, person['Code'] ,person['Name'], person['Quote']); // Adding a card 
            }
        } else {
        console.log('Failed to retrieve data');
        }
    });
}

function get_person() {
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString.substring(1));
    let param1Value = params.get('section');
    let param2Value = params.get('code');
    return [param1Value, param2Value];
}

function get_section() {
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString.substring(1));
    let param1Value = params.get('section');
    return param1Value;
}

function get_file_path(section) {
    var file_path;
    if (section == 'curie') {
        file_path = '../data/curie_sample.json';
    } else if (section == 'tesla') {
        file_path = '../data/tesla_sample.json';
    } else if (section == 'einstein') {
        file_path = '../data/einstein_sample.json';
    };
    return file_path
}

function get_person_data() {
    let data = get_person();
    let section = data[0];
    let code = data[1];
    
    file_path = get_file_path(section);

    fetchData(file_path)
    .then(data => {
        if (data) {
            // LOOPS THROUGH THE PEOPLE TO ADD A CARD
            for (let i = 0; i < data.length; i++) {
                let person = data[i];
                if (person['Code'] == code) {
                    update_profile(section, code, person['Name'], person['Quote']);
                    break;
                }
            }
        } else {
        console.log('Failed to retrieve data');
        }
    });
}

function update_profile(section, code, name, quote) {
    let container = document.querySelector(".card-container"); 
    container.innerHTML = '';
    let namelist = name.split(",");
    let new_card = `
    <div class="card">
        <img class="photo" src="../media/images/${section}/${code}.JPG" alt="image">
        
        <span class="name"><span id="surname">${namelist[0].trim()}, </span>${namelist[1].trim()}</span>
        
        <span class="quote">
            <img src="../media/images/quote.png" alt="image">
            <p>"${quote}"</p>
        </span>
        <textarea placeholder="Sender (Optional)" id="sender" wrap="hard" maxlength="50"></textarea>
        <textarea placeholder="Leave me a message!" id="txtbox" wrap="hard"></textarea>
        <button id="send" onclick="send_email()">Submit</button>
    </div>
    `
    container.innerHTML += new_card;
    design_bg(section, namelist[0].trim());
}

function design_bg(section, name) {
    let container = document.querySelector(".bg"); 
    container.innerHTML = '';
    let newText = `
    <div id="section">${section.toUpperCase()}</div>
    <div id="nickname">${name.toUpperCase()}</div>
    `
    container.innerHTML += newText;
}

function send_email() {
    emailjs.init('4G8nmjkLjUIn1czkk');
    let sender = document.querySelector("#sender").value; 
    let message = document.querySelector("#txtbox").value;
    let button =  document.querySelector("#send");

    let data = get_person();
    let section = data[0];
    let code = data[1];
    file_path = get_file_path(section);

    button.value = 'Sending...';
    fetchData(file_path)
    .then(data => {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let person = data[i];
                if (person['Code'] == code) {

                    var templateParams = {
                        from_name: sender,
                        message: message,
                        send_to: person['Email']
                    };
                
                    emailjs.send('service_jfl3llo', 'template_l4tgtk7', templateParams)
                    .then(function(response) {
                      console.log('SUCCESS!', response.status, response.text);
                      button.value = 'Submit';
                      sender = '';
                      message = '';
                    }, function(error) {
                      console.log('FAILED...', error);
                      alert('Error Sending Message');
                      button.value = 'Submit';
                    });
                }
            }
        } else {
        console.log('Failed to retrieve data');
        }
    });
    
}


  
