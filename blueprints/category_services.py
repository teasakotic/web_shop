import datetime
import flask
from flask import Blueprint
from utils.db_connection import mysql

category_services = Blueprint("category_services", __name__)

@category_services.route("/", methods=["GET"])
def kategorije():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kategorije")
    rows = cursor.fetchall()
    return flask.jsonify(rows)

@category_services.route("/<int:id_kategorije>", methods=["GET"])
def kategorija(id_kategorije):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kategorije WHERE id=%s", id_kategorije)
    row = cursor.fetchone()
    return flask.jsonify(row)

@category_services.route("/<string:naziv_kategorije>", methods=["GET"])
def artikli_kategorije(naziv_kategorije):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM artikli a INNER JOIN kategorije k ON a.kategorije_id=k.id AND k.nazivKategorije=%s", naziv_kategorije)
    rows = cursor.fetchall()
    for row in rows:
        row["datum"] = row["datum"].isoformat()
    return flask.jsonify(rows)
