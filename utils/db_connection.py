#povezivanje na bazu
import pymysql
from flaskext.mysql import MySQL

mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)
