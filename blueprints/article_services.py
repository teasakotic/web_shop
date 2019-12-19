import datetime
import flask
from flask import Blueprint
from flask import request
from utils.db_connection import mysql

article_services = Blueprint("article_services", __name__)

@article_services.route("/", methods=["GET"])
def artikli():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM artikli LEFT JOIN kategorije ON kategorije.id = kategorije_id LEFT JOIN korisnici ON korisnici.id = korisnici_id")
    rows = cursor.fetchall()
    for row in rows:
        row["datum"] = row["datum"].isoformat()
    return flask.jsonify(rows)

@article_services.route("/<int:id_artikla>", methods=["GET"])
def artikal(id_artikla):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM artikli WHERE id=%s", (id_artikla, ))
    row = cursor.fetchone()
    row["datum"] = row["datum"].isoformat()
    return flask.jsonify(row)

@article_services.route("/", methods=["POST"])
def dodaj_artikal():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''INSERT INTO
    artikli(naziv, opis, slika, cena, stanje, kolicina, datum, kategorije_id, korisnici_id)
    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)'''
    data["datum"] = datetime.datetime.strptime(data["datum"], "%d.%m.%Y. %H:%M:%S")
    cursor.execute(q, (data["naziv"], data["opis"], data["slika"],
                       data["cena"], data["stanje"], data["kolicina"], data["datum"],
                       data["kategorije_id"], data["korisnici_id"]))
    db.commit()
    return flask.jsonify({"status": "zavrseno"}), 201

@article_services.route("/<int:id_artikla>", methods=["DELETE"])
def ukloni_artikal(id_artikla):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM artikli WHERE id=%s", (id_artikla, ))
    db.commit()
    return ""

@article_services.route("/<int:id_artikla>", methods=["PUT"])
def izmeni_artikal(id_artikla):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE artikli SET naziv=%s, opis=%s, slika=%s,
    cena=%s, stanje=%s, kolicina=%s, datum=%s,
    kategorije_id=%s, korisnici_id=%s WHERE id=%s'''
    data["datum"] = datetime.datetime.strptime(data["datum"], "%d.%m.%Y. %H:%M:%S")
    cursor.execute(q, (data["naziv"], data["opis"], data["slika"],
                       data["cena"], data["stanje"], data["kolicina"], data["datum"],
                       data["kategorije_id"], data["korisnici_id"], id_artikla))
    db.commit()
    return ""
