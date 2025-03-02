import textstat
from http.server import BaseHTTPRequestHandler, HTTPServer
from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)



@app.route('/')
def my_form():
    return render_template("index.html") # this should be the name of your html file


@app.route('/', methods=['GET','POST'])
def my_form_post():
    policy = request.form['policy']
    policy_score = textstat.flesch_reading_ease(policy)
    return "<h1>" + str(policy_score) + "</h1>)"
  

if __name__ == '__main__':
    app.run()












