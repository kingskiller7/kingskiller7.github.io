# import string
# import random
# import requests

# url_db = {}

# def generate_short_url():
# chars = string.ascii_letters + string.digits
# short_url = ''.join(random.choice(chars) for _ in range(6))
# return short_url

# def shorten_url(long_url):
# short_url = generate_short_url()
# url_db[short_url] = long_url
# return f'Short URL: http://localhost:5000/{short_url}'

# def redirect_to_long_url(short_url):
# long_url = url_db.get(short_url)
# if long_url is None:
# return 'Invalid short URL'
# else:
# return requests.get(long_url).content

# if __name__ == '__main__':
# while True:
# long_url = input("Enter the long URL to shorten (or 'exit' to quit): ")
# if long_url.lower() == 'exit':
# break
# else:
# short_url = shorten_url(long_url)
# print(short_url)

# print('Thank you for using the URL shortener service!')

from flask import Flask, request, redirect, render_template
import string
import random

app = Flask(__name__)

url_db = {}

def generate_short_url():
    chars = string.ascii_letters + string.digits
    short_url = ''.join(random.choice(chars) for _ in range(6))
    return short_url

@app.route('/', methods=['GET', 'POST'])
def shorten_url():
    if request.method == 'POST':
        long_url = request.form['url']
        short_url = generate_short_url()
        url_db[short_url] = long_url
        return f'Short URL: {request.host_url}{short_url}'
    else:
        return render_template('index.html')

@app.route('/<short_url>')
def redirect_to_long_url(short_url):
    long_url = url_db.get(short_url)
    if long_url is None:
        return 'Invalid short URL'
    else:
        return redirect(long_url)

if __name__ == '__main__':
    app.run(debug=True)
