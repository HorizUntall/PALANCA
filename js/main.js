
function go_profile(section, code) {
    window.location.href = `profile.html?section=${section}&code=${code}`;
}

function go_section(section) {
    window.location.href = `html/section.html?section=${section}`;
}

function replace_img(code) {
    let photo = document.getElementById(`${code}`); 
    photo.onerror = function() {
        console.log('ERROR LOADING THIS SHIT');
        photo.src = "../media/images/image.png";
    };
}

function add_card(section, code, name, quote) {
    let container = document.querySelector(".card-container"); 
    let namelist = name.split(",");
    console.log(namelist);
    let new_card1 = `
        <div class="card" onclick="go_profile('${section}','${code}')">
            <img class="photo" id="${code}" src = "../media/images/${section}/${code}.webp" alt="image" loading="lazy">
            
            <span class="name"><span id="surname">${namelist[0]}, </span>${namelist[1]}</span>
            
            <span class="quote">
                <img src="../media/images/quote.png" alt="image">
                <p>${quote}</p>
            </span>
        </div>
        `;
        container.innerHTML += new_card1;
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
    if (section == 'curie') {
        file_path = '../data/curie.json';
    } else if (section == 'tesla') {
        file_path = '../data/tesla.json';
    } else if (section == 'einstein') {
        file_path = '../data/einstein.json';
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
        file_path = '../data/curie.json';
    } else if (section == 'tesla') {
        file_path = '../data/tesla.json';
    } else if (section == 'einstein') {
        file_path = '../data/einstein.json';
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
                    update_profile(section, code, person['Name'], person['Quote'], person['Email Key']);
                    break;
                }
            }
        } else {
        console.log('Failed to retrieve data');
        }
    });
}

function back_tosections() {
    data = get_person();
    window.location.href = `section.html?section=${data[0]}`;
}

function update_profile(section, code, name, quote, email_key) {
    let container = document.querySelector(".card-container"); 
    container.innerHTML = '';
    let namelist = name.split(",");
    let nameParts = name.split(", "); // Split at the comma and space. For the notes
    let firstName = nameParts[1].split(" ")[0]; // Split the second part at the space and take the first element
    let button_content;
    if (email_key) {
        button_content = '<button id="send" onclick="send_email()">Submit</button>';
    } else {
        button_content = '<button id="send">No Email</button>';
    }
    let new_card = `
    <div class="card">
        <span class="prev-next">
            <button id="back" onclick="back_tosections()">Back</button>
        </span>
        <img class="photo" src="../media/images/${section}/${code}.webp" alt="image">
        
        <span class="name"><span id="surname">${namelist[0].trim()}, </span>${namelist[1].trim()}</span>
        
        <span class="quote">
            <img src="../media/images/quote.png" alt="image">
            <p>${quote}</p>
        </span>
        <textarea placeholder="Sender (or Codename)" id="sender" wrap="hard" maxlength="50"></textarea>
        <textarea placeholder="Leave me a message!" id="txtbox" wrap="hard"></textarea>
        ${button_content}
        <div class="note">Note: Messages will be sent from <b>Asilakon Palanca's custom email address</b> to keep the sender anonymous. If you wish a reply from the recipient, you may include your contact info in your message.</div>
    </div>
    `
    container.innerHTML += new_card;
    design_bg(section, namelist[0].trim());
}

function design_bg(section) {
    let container = document.querySelector(".bg"); 
    container.innerHTML = '';
    let newText = `
    <div id="section">${section.toUpperCase()}</div>
    `
    container.innerHTML += newText;
}

async function send_email() {
    let sender = document.querySelector("#sender").value; 
    let message = document.querySelector("#txtbox").value;
    let button = document.querySelector("#send");

    let data = get_person();
    let section = data[0];
    let code = data[1];
    let file_path = get_file_path(section);

    button.innerHTML = 'Sending...';
    fetchData(file_path)
    .then(async data => {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let person = data[i];
                if (person['Code'] == code) {

                    if (message.trim().length === 0  || sender.trim().length === 0) {
                        alert('Input all fields');
                        button.innerHTML = 'Submit';
                    } else {
                        let emailData = {
                            sender: sender,
                            message: message,
                            email_key: person['Email Key'],
                            secret: "palanca2025_secret"
                        };
                        
                        try {
                            let response = await fetch('https://rayuntal.pythonanywhere.com/send_email', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(emailData)
                            });
                            let result = await response.json();
                            if (result.status === 'success') {
                                alert('Success Sending Message');
                            } else {
                                alert('Error Sending Message: ' + result.message);
                            }
                        } catch (error) {
                            console.error('Error:', error);
                            alert('Error Sending Message');
                        } finally {
                            button.innerHTML = 'Submit';
                        }
                    }
                }
            }
        } else {
            console.log('Failed to retrieve data');
        }
    });
}


function writeJsonToFile(data, filename) {
    const jsonString = JSON.stringify(data, null, 4); // Stringify with indentation
    try {
      fs.writeFileSync(filename, jsonString);
    } catch (error) {
      console.error("Error writing file:", error);
    }
}  

function nextAndscroll(page, target) {
    console.log('SCORONSDF');
    window.location.href= page;
    document.getElementById(target).scrollIntoView({
        behavior: 'smooth'
    });
}


function scrollToSection(target) {
    document.getElementById(target).scrollIntoView({
        behavior: 'smooth'
    });
}