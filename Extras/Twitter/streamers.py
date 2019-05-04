from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy import API
from tweepy import Cursor

import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from textblob import TextBlob

import re
import os, wget

class DownloadImages():

    def __init__(self, urls):
        self.path = 'images'
        self.urls, _ = self.filter_url(urls)

    def filter_url(self,urls):
        print('filtering Urls...')
        image_urls = []
        other_urls = []
        print('Total Number of Urls :',len(urls))
        for u in urls:
            extension = u.split('.')[-1]
            # print('extension :',extension)
            if extension == 'jpg' or extension == 'jpeg' or extension == 'png':
                image_urls.append(u)
            else:
                other_urls.append(u)
        print('Total Number of Images Urls :',len(image_urls))
        return image_urls, other_urls

    def download(self):
        if not os.path.exists(self.path):
            os.mkdir(self.path)

        print('downloading...')
        i = 1
        total = len(self.urls)
        for url in self.urls:
            print('\ndownloading ',i, 'out of', total)
            wget.download(url)
            file = url.split('/')[-1]
            os.rename(file,self.path+'/'+file)
            i+=1

        print('downloading complete')


class TwitterClient():

    def __init__(self,twitter_user = None):
        self.auth = TwitterAuthenticator().authenticate_twitter_app()
        self.twitter_client_api = API(self.auth)
        self.twitter_user = twitter_user

    def get_twitter_client_api(self):
        return self.twitter_client_api

    def get_user_timeline_tweets(self, num_tweets):
        tweets = []
        for tweet in Cursor(self.twitter_client_api.user_timeline, id = self.twitter_user).items(num_tweets):
            tweets.append(tweet)
        return tweets

    def get_friend_list(self, num_friends):
        friend_list = []
        for friend in Cursor(self.twitter_client_api.friends, id = self.twitter_user).items(num_friends):
            friend_list.append(friend)
        return friend_list

    def get_home_timeline_tweets(self, num_tweets):
        tweets = []
        for tweet in Cursor(self.twitter_client_api.home_timeline, id = self.twitter_user).items(num_tweets):
            tweets.append(tweet)
        return tweets

class TwitterAuthenticator():
    '''
    Twitter Authentication
    '''
    def authenticate_twitter_app(self):
        with open('credentials.json','r') as file:
            credentials = json.load(file)

        auth = OAuthHandler(credentials['CONSUMER_KEY'], credentials['CONSUMER_SECRET'])
        auth.set_access_token(credentials['ACCESS_TOKEN'], credentials['ACCESS_SECRET'])
        return auth

class TwitterStreamer():
    '''
    class for streaming and processing live tweets self
    '''

    def __init__(self):
        self.twitter_authenticator = TwitterAuthenticator()

    def stream_tweets(self, fetched_tweets_filename, hash_tag_list = None):
        # This handle twitter authentication and the connection to the twitter streaming API.
        listener = TwitterListener(fetched_tweets_filename)
        auth = self.twitter_authenticator.authenticate_twitter_app()

        stream = Stream(auth, listener)

        if hash_tag_list != None or len(hash_tag_list) != 0:
            stream.filter(track=hash_tag_list)

class TwitterListener(StreamListener):
    '''
    This is a basic listener class that just print received tweets to stdoutself.
    '''
    def __init__(self, fetched_tweets_filename):
        self.fetched_tweets_filename = fetched_tweets_filename

    def on_status(self, status):
        print(status.text)

    def on_data(self, data):
        try:
            print(data)
            with open(self.fetched_tweets_filename, 'a') as file:
                json.dump(data, file)
            return True
        except BaseException as e:
            print('Error on_data: %s'% str(e))

    def on_error(self, status):
        print(status)
        if status == 420:
            # Return False on_data method in case reate limit occurs.
            return False

class TweetAnalyzer():
    '''
    Functionality for analyzing and categrrizing content from tweets
    '''

    def tweets_to_data_frame(self, tweets):
        data_frame = pd.DataFrame(data = [tweet.text for tweet in tweets], columns = ['Tweets'])
        data_frame['id'] = np.array([tweet.id for tweet in tweets])
        data_frame['Length'] = np.array([len(tweet.text) for tweet in tweets])
        data_frame['date'] = np.array([tweet.created_at for tweet in tweets])
        data_frame['Source'] = np.array([tweet.source for tweet in tweets])
        data_frame['Likes'] = np.array([tweet.favorite_count for tweet in tweets])
        data_frame['Retweet_count'] = np.array([tweet.retweet_count for tweet in tweets])
        return data_frame

    def clean_tweet(self, tweet):
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

    def analyze_sentiment(self, tweet):
        analysis = TextBlob(self.clean_tweet(tweet))

        if analysis.sentiment.polarity > 0:
            return 1
        elif analysis.sentiment.polarity == 0:
            return 0
        else:
            return -1

    def get_media_urls(self,tweets):
        urls = []
        for tweet in tweets:
            media = tweet.entities.get('media',[])
            if media == None and len(media) == 0:
                continue
            for single_media in media:
                url = single_media['media_url']
                urls.append(url)
                # print(url)
        return urls

if __name__ == '__main__':

    tweet_analyzer = TweetAnalyzer()
    twitter_client = TwitterClient()

    api = twitter_client.get_twitter_client_api()

    tweets = api.user_timeline(screen_name = 'Patholwalker', count = 200)

    urls = tweet_analyzer.get_media_urls(tweets)

    print(urls)

    downloader = DownloadImages(urls)
    print(downloader.urls)
    downloader.download()


    # data_frame = tweet_analyzer.tweets_to_data_frame(tweets)
    # data_frame['sentiment'] = np.array([tweet_analyzer.analyze_sentiment(tweet) for tweet in data_frame['Tweets']])
    # print(data_frame.head(10))

    # print(tweets[0].id)
    # print(tweets[0].retweet_count)
    # print(dir(tweets[0]))

    # print('Av erage lenght of tweets =',np.mean(data_frame['Length']), len(data_frame['Length']), np.max(data_frame['Likes']), np.max(data_frame['Retweet_count']))

    # ##Time Series
    # time_likes = pd.Series(data = data_frame['Likes'].values, index = data_frame['date'])
    # time_likes.plot(figsize = (16,4), label = 'Likes', legend = True)
    #
    # time_likes = pd.Series(data = data_frame['Retweet_count'].values, index = data_frame['date'])
    # time_likes.plot(figsize = (16,4), label = 'Retweets', legend = True)
    # plt.show()

    # hash_tag_list = ['pathology']
    # fetched_tweets_filename = 'tweets.json'
    #
    # twitter_client = TwitterClient('pycon')
    # print(twitter_client.get_user_timeline_tweets(1))

    # twitter_streamer = TwitterStreamer()
    # twitter_streamer.stream_tweets(fetched_tweets_filename, hash_tag_list)
