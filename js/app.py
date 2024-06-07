from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json
    sender = data['sender']
    message = data['message']
    recipient = data['recipient']

    try:
        # Set up the server
        server = smtplib.SMTP(host='smtp.gmail.com', port=587)
        server.starttls()
        server.login('asilakon.palanca@gmail.com', 'ywcu kfzr gffm qxik')
        # server.login('rpuntal@zrc.pshs.edu.ph', 'rayuntal01122006')

        # Create the email
        msg = MIMEMultipart()
        # msg['From'] = 'asilakon.palanca@gmail.com'

        # msg['From'] = 'rpuntal@zrc.pshs.edu.ph'
        # msg['To'] = recipient
        # msg['Subject'] = f"New Message from {sender}"
        msg['From'] = 'Kwago ng BenteKwatro'
        msg['To'] = recipient
        msg['Subject'] = '🦉⭐️ Hoot Hoot! You’ve Got Mail!'

        # content = f'Check out a new message sent by {sender}: \n\n\n\n  "{message}" \n\n\n\nGet more messages by sharing the link!\n\nPadayon, Asilakon ☝️'

        # content = f'''
        #     <html>
        #     <body>
        #         <p>Check out a new message sent by <strong>{sender}</strong>:</p>
        #         <blockquote style="background-color: #f9f9f9; border-left: 10px solid #ccc; margin: 0 0 0.5em 0; padding: 0.5em 10px;">
        #         "{message}"
        #         </blockquote>
        #         <p>Get more messages by sharing the link!</p>
        #         <p><em>Padayon, Asilakon ☝️</em></p>
        #     </body>
        #     </html>
        #     '''
        
        content = f'''
            <body>
                <p><span style="font-family: 'book antiqua', palatino, serif;">Check out a new message sent by {sender}:</span></p>
                <p>&nbsp;</p>
                <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;"><span style="font-family: 'book antiqua', palatino, serif;">{message}</span></p>
                <p>&nbsp;</p>
                <p><span style="font-family: 'book antiqua', palatino, serif;">Get more messages by sharing the link!</span></p>
                <p><span style="font-family: 'book antiqua', palatino, serif;">Padayon, Asilakon ☝️</span></p>
            </body>
        '''

        # Add the message body
        msg.attach(MIMEText(content, 'html'))

        # Send the email
        server.send_message(msg)
        server.quit()

        return jsonify({'status': 'success'}), 200
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
@app.route('/')
def index():
    return "Welcome to my Flask Application/Palanca"

if __name__ == '__main__':
    app.run(debug=True)
