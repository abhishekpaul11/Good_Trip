#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from flask import Flask, render_template, request
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import requests
from bs4 import BeautifulSoup, SoupStrainer
import httplib2
from googlesearch import search
import os

# In[ ]:


SPOTIPY_CLIENT_ID = 'd0fb3f6135d14097bde522d8fa597197'
SPOTIPY_CLIENT_SECRET = '465c0a4970d545a9a1d29f59209c40d0'
auth_manager = SpotifyClientCredentials(
    SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)


# In[ ]:


flag = ''
s1 = 0
genres = []
city = ""
cat_id = ''
lat = '30.9010'  # current latitude
lng = '75.8573'  # current longitide
app = Flask(__name__, static_folder="./static")

# In[ ]:


def dest_weather(city):
    api_key = "a9170a3ab84748cc681f9fe929b19808"
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    city_name = city
    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()
    if x["cod"] != "404":
        y = x["main"]
        current_temperature = y["temp"]
        z = x["weather"]
        weather_description = z[0]["description"]
        icon = z[0]["icon"]
        return (str(int(current_temperature-273))+'%'+weather_description+'%'+icon)


# In[ ]:


@app.route('/', methods=['POST', 'GET'])
def home():
    global city
    print(request.form.get('dest'))
    if(request.form.get('dest') == "OOPS"):
        return render_template('Dashboard.html')
    elif(request.form.get('dest') != None and request.form.get('dest') != 'NA'):
        res = dest_weather(request.form.get('dest'))
        print(res)
        city = request.form.get('dest')
        res = res.split('%')
        return render_template('Moods.html', ct=city, temp=res[0]+'°C', desc=res[1], icon='http://openweathermap.org/img/wn/'+res[2]+'@2x.png')

    elif(request.form.get('dest') == 'NA'):
        return render_template('Moods.html', ct="", temp='', desc='', icon='http://mykimini.com/wp-content/uploads/blank-link.png')
    else:
        return render_template('Dashboard.html')


# In[ ]:
@app.route('/get_location', methods=['POST', "GET"])
def get_location():
    global city
    print(city)
    return city


def play_track(gen):

    a = sp.recommendations(seed_genres=gen, limit=1, country=['IN'])
    song = (a['tracks'][0]['name'])
    url = (a['tracks'][0]['preview_url'])
    explicit = (a['tracks'][0]['explicit'])
    song_type = (a['tracks'][0]['type'])
    name = (a['tracks'][0]['album']['artists'][0]['name'])
    img = (a['tracks'][0]['album']['images'][0]['url'])
    print(url, type(url))
    if((url == None) or song_type != 'track'):
        return(play_track(gen))
    print(song, name, url, explicit)
    return (song+'^'+url+'^'+str(explicit)+'^'+name+'^'+img)


# In[ ]:


def play_plist(cat_id, s11):

    plist = sp.category_playlists(category_id=cat_id, country='IN')
    num = len(plist['playlists']['items'])
    n = s11 % num
    plist_id = (plist['playlists']['items'][n]['id'])
    q = sp.playlist(playlist_id=plist_id, fields='tracks')
    url = (q['tracks']['items'][0]['track']['preview_url'])
    name = (q['tracks']['items'][0]['track']['artists'][0]['name'])
    song = (q['tracks']['items'][0]['track']['name'])
    image = (q['tracks']['items'][0]['track']['album']['images'][0]['url'])
    if(url != None):
        return (song+'^'+url+'^'+'^'+name+'^'+image)
    else:
        global s1
        s1 += 1
        return (play_plist(cat_id, s1))


@app.route('/song', methods=['POST', 'GET'])
def song():

    user = request.form['mood']
    print(user)
    res = ''
    if(user == 'happy'):
        flag = 'track'
        genres = ['chill', 'dance',
                  'opera', 'salsa', 'happy']  # add happy tags
        res = play_track(genres)
    elif (user == 'sad'):
        flag = 'track'
        genres = ['sad', 'sleep', 'piano']  # add sad tags
        res = play_track(genres)
    elif (user == 'party'):

        flag = 'track'
        genres = ['edm', 'dance', 'groove', 'party',
                  'new-release']  # add party tags
        res = play_track(genres)
    elif (user == 'romantic'):
        flag = 'track'
        genres = ['romance', 'jazz', 'salsa',
                  'french', 'indian']  # add romantic tags
        res = play_track(genres)
    elif (user == 'weather'):
        flag = 'track'
        wthr = weather(get_city(lat, lng))
        if(wthr == 'hot'):
            genres = ['summer', 'Acoustic']
        elif(wthr == 'cold'):
            genres = ['chill', 'holidays']
        else:  # rain
            genres = ['rainy-day', 'guitar']
        res = play_track(genres)
    elif (user == 'region'):
        flag = 'playlist'
        state = get_region(lat, lng)
        if(state == 'Punjab'):
            cat_id = 'punjabi'
        elif(state == 'Tamil Nadu'):
            cat_id = 'tamil'
        elif(state == 'Maharashtra'):
            cat_id = 'marathi'
        global s1
        s1 += 1
        res = play_plist(cat_id, s1)
    print(res)
    return res


# In[ ]:


@app.route('/next', methods=['POST', 'GET'])
def next():
    if(flag == 'track'):
        play_track(genres)
    else:
        global s1
        s1 += 1
        play_plist(cat_id, s1)


# In[ ]:


def weather(city):
    api_key = "a9170a3ab84748cc681f9fe929b19808"
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    city_name = city
    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()
    if x["cod"] != "404":
        y = x["main"]
        current_temperature = y["temp"]
        current_pressure = y["pressure"]
        current_humidiy = y["humidity"]
        z = x["weather"]
        weather_description = z[0]["main"]
        l = [str(current_temperature-273), str(current_pressure),
             str(current_humidiy), str(weather_description)]
    if ('Drizzle' in l[3] or 'Rain' in l[3] or 'Thunderstorm' in l[3] or 'Snow' in l[3]):
        return 'rain'
    if(float(l[0]) > 25.0):
        return 'hot'
    elif(float(l[0]) <= 25.0):
        return 'cold'


# In[ ]:


def get_city(lat, lng):
    lat = str(lat)
    lng = str(lng)
    url = 'https://api.opencagedata.com/geocode/v1/json?q='+lat + \
        ','+lng+'&key=30afd099cb2243b0a2f2bc3ec78b7ae5&pretty=1'
    response = requests.get(url)
    x = response.json()
    return (x["results"][0]['components']['city'])


# In[ ]:


def get_region(lat, lng):
    lat = str(lat)
    lng = str(lng)
    url = 'https://api.opencagedata.com/geocode/v1/json?q='+lat + \
        ','+lng+'&key=30afd099cb2243b0a2f2bc3ec78b7ae5&pretty=1'
    response = requests.get(url)
    x = response.json()
    return (x["results"][0]['components']['state'])


@app.route("/souvenir", methods=['GET', 'POST'])
def souvenir():

    url = []
    try:
        from googlesearch import search
    except ImportError:
        print("No module named 'google' found")
    # to search
    query = "whatshot "+city + " best things to buy"

    for j in search(query, tld="co.in", num=10, stop=2, pause=2):
        url.append(j)

    http = httplib2.Http()
    a = url[0]
    status, response = http.request(a)
    sop = BeautifulSoup(response, 'lxml')
    details = []
    details1 = []
    details3 = []
    for link in BeautifulSoup(response, 'html.parser', parseOnlyThese=SoupStrainer('h2')):
        details.append(link.text)
    for link in BeautifulSoup(response, 'html.parser', parseOnlyThese=SoupStrainer('h3')):
        details1.append(link.text)

    for link in BeautifulSoup(response, 'html.parser', parseOnlyThese=SoupStrainer('b')):
        details3.append(link.text)

    if(len(details) > 4 and 'Similar Stories' not in details[0]):
        return({'a': details[0:5]})
    elif(len(details1) > 4 and 'Similar Stories' not in details1[0]):
        return({'a': details1[0:5]})
    elif(len(details3) > 4):
        return({'a': details3[0:5]})


app.run('0.0.0.0', 5005, debug=True)
