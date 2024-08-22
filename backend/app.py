from flask import Flask, render_template, request
from flask_mysqldb import MySQL
from llm import run_query
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'sql5.freesqldatabase.com'
app.config['MYSQL_USER'] = 'sql5727106'
app.config['MYSQL_PASSWORD'] = 'kUcuNKbnJK'
app.config['MYSQL_DB'] = 'sql5727106'

mysql = MySQL(app)

cursor = mysql.connection.cursor()

cursor.execute(''' CREATE TABLE table_name(field1, field2...) ''')
cursor.execute(''' INSERT INTO table_name VALUES(v1,v2...) ''')
cursor.execute(''' DELETE FROM table_name WHERE condition ''')

mysql.connection.commit()

cursor.close()