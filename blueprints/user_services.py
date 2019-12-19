import flask
from flask import Blueprint
from flask import request
from utils.db_connection import mysql

user_services = Blueprint("user_services", __name__)

@user_services.route("/", methods=["GET"])
def korisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnici")
    rows = cursor.fetchall()
    return flask.jsonify(rows)

@user_services.route("/<int:id_korisnika>", methods=["GET"])
def korisnik(id_korisnika):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnici WHERE id=%s", (id_korisnika, ))
    row = cursor.fetchone()
    return flask.jsonify(row)

@user_services.route("/", methods=["POST"])
def dodaj_korisnika():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''INSERT INTO
    korisnici(korisnicko_ime, lozinka, profilna_slika, ime, prezime, adresa, email, telefon, stanje_racuna, prijavljen)
    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
    cursor.execute(q, (data["korisnicko_ime"], data["lozinka"], data["profilna_slika"],
                       data["ime"], data["prezime"], data["adresa"],
                       data["email"], data["telefon"], data["stanje_racuna"],
                       data["prijavljen"]))
    db.commit()
    return flask.jsonify({"status": "zavrseno"}), 201

@user_services.route("/<int:id_korisnika>", methods=["DELETE"])
def ukloni_korisnika(id_korisnika):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnici WHERE id=%s", (id_korisnika, ))
    db.commit()
    return ""

@user_services.route("/<int:id_korisnika>", methods=["PUT"])
def izmeni_korisnika(id_korisnika):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE korisnici SET korisnicko_ime=%s, lozinka=%s, profilna_slika=%s,
    ime=%s, prezime=%s, adresa=%s,
    email=%s, telefon=%s, stanje_racuna=%s, prijavljen=%s WHERE id=%s'''
    cursor.execute(q, (data["korisnicko_ime"], data["lozinka"], data["profilna_slika"],
                       data["ime"], data["prezime"], data["adresa"],
                       data["email"], data["telefon"], data["stanje_racuna"], data["prijavljen"], id_korisnika))
    db.commit()
    return ""
