from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin
import tweepy
from textblob import TextBlob

app = Flask(__name__)
app.config['SECRET_KEY'] = "riya"
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", transports=["websocket"])

# Set your Twitter API keys (replace with your actual keys)
api_key = '1ObNQiIMGpQW6g4LWa6h3SPDv'
api_secret_key = 'MFPtAHZ7nF21BRSxJ0cBQpI3QBX0PzJtpk2vY5fAw2Gs6nyQqB'
access_token = '1700567928695898112-p1qdPCtVLQZfzSdYNdt96N3aeWMXD1'
access_token_secret = 'OKcanCi6ycWsSUD7qO4uQm59O3galsW7ucezno2ruq71Q'

# Authenticate with Twitter
auth = tweepy.OAuthHandler(api_key, api_secret_key)
auth.set_access_token(access_token, access_token_secret)
twitter_api = tweepy.API(auth)



@app.route("/")
def page():
    return "<h1> The Server is Working </h1>"

@socketio.on("input")
def analyze_sentiment(tweet_text):
    tweet_text = tweet_text["message"]
    analysis = TextBlob(tweet_text)
    sentiment_polarity = analysis.sentiment.polarity

    if sentiment_polarity > 0:
        emit("output", "Positive")
    elif sentiment_polarity < 0:
        emit("output", "Negative")
    else:
        emit("output", "Neutral")



if __name__ == '__main__':
    socketio.run(app, debug=True)
    
# Route for sentiment analysis of a chat message
#@app.route('/analyze_sentiment', methods=['POST'])
#def analyze_sentiment_endpoint():
#    try:
#        # Get the JSON data from the request
#        data = request.get_json()
#        
#        # Extract the message text from the JSON data
#        message_text = data.get('message', '')
#
#        # Check if a message was provided
#        if not message_text:
#            return jsonify({'error': 'Message not provided'})
#
#        # Analyze the sentiment of the message
#        sentiment = analyze_sentiment(message_text)
#
#        return jsonify({'sentiment': sentiment})
#    except Exception as e:
#        return jsonify({'error': str(e)})

# ... (the rest of your code)
