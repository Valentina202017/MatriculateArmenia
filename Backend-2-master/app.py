from collections import UserDict
from flask import Flask
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL, MySQLdb
from routes import *
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345m'
app.config['MYSQL_DB'] = 'matriculate4'

mysql = MySQL(app)

CORS(app, resources={r"/*": {"origins": "*"}})



app.add_url_rule(user["registroacudiente_user"], view_func=user["registroacudiente_user_controllers"])
app.add_url_rule(user["login_user"], view_func=user["login_user_controllers"])
app.add_url_rule(user["loginIns_user"], view_func=user["loginIns_user_controllers"])

app.add_url_rule(user["datospersonas_user"], view_func=user["datospersonas_user_controllers"])
app.add_url_rule(user["registroEstudiante_user"], view_func=user["registroEstudiante_user_controllers"])

app.add_url_rule(user["registroInstituciones_user"], view_func=user["registroInstituciones_user_controllers"])
app.add_url_rule(user["mostrarInstituciones_user"], view_func=user["mostrarInstituciones_user_controllers"])
app.add_url_rule(user["cuposInstitucion_user"], view_func=user["cuposInstitucion_user_controllers"])
app.add_url_rule(user["datosInstituciones_user"], view_func=user["datosInstituciones_user_controllers"])
app.add_url_rule(user["reservarCupo_user"], view_func=user["reservarCupo_user_controllers"])
app.add_url_rule(user["datosEstudiantes_user"], view_func=user["datosEstudiantes_user_controllers"])

app.add_url_rule(user["agregarConvocatoria_user"], view_func=user["agregarConvocatoria_user_controllers"])
app.add_url_rule(user["generarMatricula_user"], view_func=user["generarMatricula_user_controllers"])
#app.add_url_rule(user["datosCuposEscolares_user"], view_func=user["datosCuposEscolares_user_controllers"])
