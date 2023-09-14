from flask import Flask, request, jsonify
import tweepy
from textblob import TextBlob

app = Flask(__name__)

# Set your Twitter API keys (replace with your actual keys)
api_key = 'YOUR_API_KEY'
api_secret_key = 'YOUR_API_SECRET_KEY'
access_token = 'YOUR_ACCESS_TOKEN'
access_token_secret = 'YOUR_ACCESS_TOKEN_SECRET'

# Authenticate with Twitter
auth = tweepy.OAuthHandler(api_key, api_secret_key)
auth.set_access_token(access_token, access_token_secret)
twitter_api = tweepy.API(auth)

# Function to analyze sentiment
def analyze_sentiment(tweet_text):
    # Analyze the sentiment of a tweet using TextBlob
    analysis = TextBlob(tweet_text)
    sentiment_polarity = analysis.sentiment.polarity

    # Determine the mood based on sentiment polarity
    if sentiment_polarity > 0:
        return "Positive"
    elif sentiment_polarity < 0:
        return "Negative"
    else:
        return "Neutral"

# API endpoint to analyze a user's Twitter mood
@app.route('/analyze_mood', methods=['POST'])
def analyze_mood():
    try:
        # Get the JSON data from the request
        data = request.get_json()
        
        # Extract the Twitter username from the JSON data
        twitter_username = data.get('username', '')

        # Check if a username was provided
        if not twitter_username:
            return jsonify({'error': 'Twitter username not provided'})

        # Retrieve the user's recent tweets from Twitter API
        user_tweets = twitter_api.user_timeline(screen_name=twitter_username, count=10)

        # Analyze the mood of each tweet
        mood_data = {}
        for tweet in user_tweets:
            tweet_text = tweet.text
            mood = analyze_sentiment(tweet_text)
            mood_data[tweet.id] = mood

        # Return the mood analysis results as JSON response
        return jsonify(mood_data)
    except Exception as e:
        # Handle exceptions (e.g., Twitter API errors) and return an error response
        return jsonify({'error': str(e)})

# Error handler for "Method Not Allowed" (HTTP 405)
@app.errorhandler(405)
def method_not_allowed(e):
    return jsonify({'error': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)
