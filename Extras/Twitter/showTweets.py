import tweepy
import json
import os
import wget

def filter_url(url):
    image_url = []
    other_url = []

    print(len(url))

    for u in url:
        extension = u.split('.')[-1]
        # print('extension :',extension)
        if extension == 'jpg' or extension == 'jpeg' or extension == 'png':
            image_url.append(u)
        else:
            other_url.append(u)
    return image_url, other_url


credentials_file = 'credentials.json'

with open('credentials.json' ,'r') as file:
    credentials = json.load(file)

auth = tweepy.OAuthHandler(credentials['CONSUMER_KEY'], credentials['CONSUMER_SECRET'])
auth.set_access_token(credentials['ACCESS_TOKEN'], credentials['ACCESS_SECRET'])

api = tweepy.API(auth)

public_tweets = api.home_timeline()
# print(len(public_tweets))

media_url = []
for tweet in public_tweets:
    # print(tweet.text)
    media = tweet.entities.get('media',[])
    if media == None and len(media) == 0:
        continue
    for single_media in media:
        url = single_media['media_url']
        media_url.append(url)
        print(url)

media_url,_ = filter_url(media_url)

# print(media_url)

if not os.path.exists('images'):
    os.mkdir('images')

for url in media_url:
    wget.download(url)
    file = url.split('/')[-1]
    os.rename(file, 'images/'+file)
