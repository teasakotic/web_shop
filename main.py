import datetime
import flask
from flask import Flask
from utils.db_connection import mysql
from flask import request
from flask import session

from blueprints.category_services import category_services
from blueprints.user_services import user_services
from blueprints.article_services import article_services
app = Flask(__name__, static_url_path="")

app.secret_key = "toor"

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "toor"
app.config["MYSQL_DATABASE_DB"] = "web_shop"
app.config["MYSQL_DATABASE_HOST"] = "localhost"

mysql.init_app(app)

app.register_blueprint(category_services, url_prefix="/kategorije")
app.register_blueprint(user_services, url_prefix="/korisnici")
app.register_blueprint(article_services, url_prefix="/artikli")

@app.route("/")
@app.route("/index")
@app.route("/index.html")
def home():
    return app.send_static_file("index.html")

app.run("0.0.0.0", 5000, threaded=True)
