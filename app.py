from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from time import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

"""
NOTE:
This code is hosted on PythonAnywhere using the FREE plan,
which stops apps every 3 months. So yes, we have to re-run app.py sometimes
because we're broke af.
"""

app = Flask(__name__)
CORS(app)

# Secret key to limit who can send emails (must match secret in main.js)
SECRET_KEY = "sample_secret_key"

# Prevent simple spam (rate limit: 1 request per IP every 5 seconds)
request_times = {}  # IP -> last request time

@app.before_request
def limit_requests():
    ip = request.remote_addr
    now = time()
    if ip in request_times and now - request_times[ip] < 5:
        return jsonify({"status": "error", "message": "Too many requests, please slow down"}), 429
    request_times[ip] = now

# Email database (yes, no database hosting needed, poor-friendly setup)
emails = {
    "emailkey": "email@gmail.com"  # Sample entry. Add your recipients here.
}

"""
Why store emails here?
- Because paying for a real database is too expensive.
- Yes, this is not scalable.
- Yes, it works anyway lol.
- Also safer than storing emails in GitHub JSON files (which we NEVER did 😉)
"""

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.json

    # Basic security check
    if data.get("secret") != SECRET_KEY:
        return jsonify({"status": "error", "message": "Unauthorized"}), 403

    sender = data.get("sender", "").strip()
    message = data.get("message", "").strip()
    email_key = data.get("email_key", "").strip()

    if not sender or not message or not email_key:
        return jsonify({"status": "error", "message": "Missing fields"}), 400

    recipient = emails.get(email_key)
    if not recipient:
        return jsonify({"status": "error", "message": "Invalid email key"}), 400

    try:
        # Setup email SMTP
        server = smtplib.SMTP(host='smtp.gmail.com', port=587)
        server.starttls()

        # IMPORTANT:
        # Do NOT upload your real email or app password to GitHub.
        # Keep them private on your hosting server only.
        server.login('your_custom_email@gmail.com', 'YOUR_APP_PASSWORD_HERE')

        msg = MIMEMultipart()
        msg['From'] = 'Kwago ng BenteKwatro'  # Change this sender name
        msg['To'] = recipient
        msg['Subject'] = '🦉⭐️ Hoot Hoot! You’ve Got Mail!'  # Customize if you like

        html_message = f"""
        <body>
            <p><b>Message from:</b> {sender}</p>
            <p style="padding:10px;border-left:3px solid gray;">{message}</p>
            <p>Padayon, Asilakon ☝️</p>
        </body>
        """
        msg.attach(MIMEText(html_message, 'html'))
        server.send_message(msg)
        server.quit()

        return jsonify({"status": "success"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/')
def home():
    return "Palanca Email Server is running 🚀"


if __name__ == '__main__':
    app.run()
