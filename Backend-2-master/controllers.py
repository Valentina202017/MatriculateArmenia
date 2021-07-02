from flask.views import MethodView
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL, MySQLdb
from config import KEY_TOKEN_AUTH
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
import datetime
import time
import bcrypt
import jwt
import os
import json, _json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import encoders
from email.mime.base import MIMEBase

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345m'
app.config['MYSQL_DB'] = 'matriculate4'

mysql = MySQL(app)

#productos = [{"id": 1, "url": "https://www.casdquindio.edu.co/img/slider/foto1.jpg",
        #         "nombre": "CASD", "primaria": "jornada unica", "secundaria": "jornada unica","media": "jornada unica"},
        
         #   ]


#class datosUserControllers(MethodView):
 #   """
  #      datos
   # """

    #def get(self):
     #   return jsonify({"data": productos}), 200



class registroacudienteUserControllers(MethodView):
    """
        Registro
    """
    def post(self):
        # simulacion de espera en el back con 1.5 segundos
        #datos para enviar a la bd, se llaman igual que el FormControlName y los campos de la BD
        time.sleep(1)
        content = request.get_json()
        nombres = content.get("nombres")
        apellidos = content.get("apellidos")
        documento = content.get("documento")
        id= content.get("id")
        direccion= content.get("direccion")
        municipio = content.get("municipio")
        ocupacion= content.get("ocupacion")
        parentesco = content.get("parentesco")
        num1 = content.get("num1")
        num2= content.get("num2")
        email = content.get("email")
        password = content.get("password")
        #encriptacion de la contraseña
        salt = bcrypt.gensalt()
        hash_password = bcrypt.hashpw(bytes(str(password), encoding= 'utf-8'), salt)
        # comandos sql para agregar infomacion a la tabla users
        cur = mysql.connection.cursor()
        #conexion con el cursor para enviar datos, si se maneja curl con l todos la deben tener o si es cur solo todos deben ser cur 
        cur.execute("INSERT INTO acudiente(nombres, apellidos,documento, id, direccion, municipio, ocupacion, parentesco , num2, num1,email, password) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                    (nombres, apellidos,documento, id,  direccion, municipio,ocupacion,parentesco,num1, num2, email, hash_password))
        mysql.connection.commit()
        cur.close()
        #cierre de la peticion a la bd
        return jsonify({"registro ok": True, "nombres": nombres,"apellidos": apellidos,"direccion":direccion,"parentesco":parentesco, "email": email}), 200
       


class LoginUserControllers(MethodView):
    """
        Login 
    """
    def post(self):
        # simulacion de espera en el back con 1.5 segundos
        time.sleep(1)
        content = request.get_json()
        email = content.get("email")
        password = content.get("password")
        #dato 
        # creamos comandos sql para verificar que la informacion que ingresamos sea correcta
        curl = mysql.connection.cursor()
        curl.execute("SELECT  nombres, id,  email, password FROM acudiente WHERE email=%s", ([email]))
        user = curl.fetchone()
        #posicion del arreglo para sacar los datos
        ide= user[1]
        correo = user[2] 
        clave = user[3]
        usuario = {}
        usuario[correo] = {"contraseña":clave} 
        passwordb = usuario[correo]["contraseña"]
        curl.close()
        # encriptacion de la contraseña  

        if bcrypt.checkpw(bytes(str(password), encoding= 'utf-8'), passwordb.encode('utf-8')):
            #creacion del token con duracion de  50 minutos, el correo se envia para despues extraer, la key es la llave 

            encoded_jwt = jwt.encode({'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=3000), 'correo': correo,'ide':ide, 'rol':'acudiente'}, KEY_TOKEN_AUTH , algorithm='HS256')

            return jsonify({"auth": True, "nombres":user[0], "token":encoded_jwt.decode(), 'rol':'acudiente'}), 200 
               
        else:
            return jsonify({"auth": False,}), 403

class LoginInsUserControllers(MethodView):
    """
        Login 
    """
    def post(self):
        # simulacion de espera en el back con 1.5 segundos
        time.sleep(1)
        content = request.get_json()
        email = content.get("email")
        password = content.get("password")
        #dato 
        # creamos comandos sql para verificar que la informacion que ingresamos sea correcta
        curl = mysql.connection.cursor()
        curl.execute("SELECT  email, password FROM colegio WHERE email=%s", ([email]))
        user = curl.fetchone()
        print("ESTE DATO ES LOGIN INSTITUCION",user)

        #posicion del arreglo para sacar los datos=
        
        correo = user[0] 
        clave = user[1]
        usuario = {}
        usuario[correo] = {"contraseña":clave} 
        passwordb = usuario[correo]["contraseña"]
        curl.close()
        # encriptacion de la contraseña  

        if bcrypt.checkpw(bytes(str(password), encoding= 'utf-8'), passwordb.encode('utf-8')):
            #creacion del token con duracion de  50 minutos, el correo se envia para despues extraer, la key es la llave 

            encoded_jwt = jwt.encode({'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=3000), 'correo': correo,'rol':'admin'}, KEY_TOKEN_AUTH , algorithm='HS256')

            return jsonify({"auth": True, "nombres":user[0], "token":encoded_jwt.decode(), 'rol':'admin'}), 200 
               
        else:
            return jsonify({"auth": False,}), 403



class datospersonasUserControllers(MethodView):
    """
        datos
    """

    def get(self):
    
       #condicional donde se trae la cabecera con el token para hacer la autorizacion
        if (request.headers.get('Authorization')):
            token = request.headers.get('Authorization').split(" ")
            print("-----------------_", token[1])
            #si el token no ha expirado y es correcto se  retorna la autorizacion sacando el email
            try:
                #decode decodificar el token para extraer el email
                data= jwt.decode(token[1], KEY_TOKEN_AUTH , algorithms=['HS256'])
                #el data se extrae en correo que fue el argumento enviado en el login
                print(data["correo"])
                email=data["correo"]
                dato="" 
                #con el data evaluado en email  se extraen los datos  
                cur = mysql.connection.cursor()
                cur.execute("SELECT apellidos,documento, id, direccion, municipio, ocupacion,parentesco, num1, num2, email from acudiente where email=%s", ([email]))
                dato = cur.fetchall()
                cur.close()
                data = []
                objeto={}
                for value in dato:
                    objecto={'apellidos':value[0],'documento':value[1],'id':value[2],'direccion':value[3],'municipio':value[4],'ocupacion':value[5],'parentesco':value[6],'num1':value[7],'num2':value[8],'email':value[9],}
                    data.append(objecto)
                    objecto = {}
                return jsonify ({"data": data}),200
                
 
            except:
                return jsonify({"Status": "TOKEN NO VALIDO"}), 403
        return jsonify({"Status": "No ha enviado un token"}), 403
    
    



class registroEstudianteUserControllers(MethodView):
    """
        Registro
    """
    def post(self):
          #n simulacion de espera en el back con 1.5 segundos
        #datos para enviar a la bd, se llaman igual que el FormControlName y los campos de la BD
        time.sleep(1)
        primerNombre = request.form.get("primerNombre")
        segundoNombre= request.form.get("segundoNombre")
        primerApellido= request.form.get("primerApellido")
        segundoApellido = request.form.get("segundoApellido")
        tipoIdentificacion = request.form.get("tipoIdentificacion")
        idEstudiante= request.form.get("idEstudiante")
        genero = request.form.get("genero")
        fechaNacimiento= request.form.get("fechaNacimiento")
        municipioResidencia= request.form.get("municipioResidencia")
        direccion= request.form.get("direccion")
        razaEtnia= request.form.get ("razaEtnia")
        estrato= request.form.get("estrato")
        poblacionVulnerable = request.form.get("poblacionVulnerable")
        telefono = request.form.get("telefono")
        idAcudiente = request.form.get("idAcudiente")
        
        f = request.files['pdf']
        os.mkdir('archivos/'+'estudiante_'+idEstudiante)
        f.save(os.path.join('archivos/'+'estudiante_'+idEstudiante, secure_filename(idEstudiante+"_documento.pdf")))
        # comandos sql para agregar infomacion a la tabla users
        cur = mysql.connection.cursor()
        #conexion con el cursor para enviar datos, si se maneja curl con l todos la deben tener o si es cur solo todos deben ser cur 
        cur.execute("INSERT INTO estudiante(primerNombre, segundoNombre, primerApellido, segundoApellido, tipoIdentificacion, idEstudiante, genero, fechaNacimiento, municipioResidencia,direccion,razaEtnia, estrato, poblacionVulnerable, telefono, idAcudiente) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                    (primerNombre, segundoNombre, primerApellido, segundoApellido, tipoIdentificacion, idEstudiante, genero, fechaNacimiento, municipioResidencia,direccion,razaEtnia, estrato, poblacionVulnerable, telefono, idAcudiente))
        mysql.connection.commit()
        cur.close()
        #cierre de la peticion a la bd
        return jsonify({"registro ok": True, "primerNombre": primerNombre,"primerApellido": primerApellido,"direccion":direccion}), 200
    
    
    
class registroInstitucionesUserControllers(MethodView):
    """
        Registro
    """
    def post(self):
        # simulacion de espera en el back con 1.5 segundos
        #datos para enviar a la bd, se llaman igual que el FormControlName y los campos de la BD
        time.sleep(1)
        content = request.get_json()
        idinstitucion= content.get("idinstitucion")
        nombreInstitucion = content.get("nombreInstitucion")
        direccion = content.get("direccion")
        comuna = content.get("comuna")
        modalidad = content.get("modalidad")
        telefono = content.get("telefono")
        email= content.get("email")
        password = content.get("password")
        #encriptacion de la contraseña
        salt = bcrypt.gensalt()
        hash_password = bcrypt.hashpw(bytes(str(password), encoding= 'utf-8'), salt)
        # comandos sql para agregar infomacion a la tabla users
        cur = mysql.connection.cursor()
        #conexion con el cursor para enviar datos, si se maneja curl con l todos la deben tener o si es cur solo todos deben ser cur 
        cur.execute("INSERT INTO colegio(idinstitucion, nombreInstitucion, direccion, comuna, modalidad,telefono, email, password) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                    (idinstitucion, nombreInstitucion, direccion, comuna, modalidad,telefono, email, hash_password))
        mysql.connection.commit()
        cur.close()
        #cierre de la peticion a la bd
        return jsonify({"registro ok": True, "nombreInstitucion": nombreInstitucion,"direccion":direccion,"email":email}), 200

class datosInstitucionesUserControllers(MethodView):
    """
        datos
    """

    def get(self):
    
       #condicional donde se trae la cabecera con el token para hacer la autorizacion
        if (request.headers.get('Authorization')):
            token = request.headers.get('Authorization').split(" ")
            print("-----------------_", token[1])
            #si el token no ha expirado y es correcto se  retorna la autorizacion sacando el email
            try:
                #decode decodificar el token para extraer el email
                data= jwt.decode(token[1], KEY_TOKEN_AUTH , algorithms=['HS256'])
                #el data se extrae en correo que fue el argumento enviado en el login
                print(data["correo"])
                email=data["correo"]
                dato="" 
                #con el data evaluado en email  se extraen los datos  
                cur = mysql.connection.cursor()
                cur.execute("SELECT idinstitucion, nombreInstitucion, direccion, comuna, modalidad, email from colegio where email=%s", ([email]))
                dato = cur.fetchall()
                #cur2 = mysql.connection.cursor()
                #cur2.execute("SELECT codigoInstitucion,  from cuposEscolares where email=%s", ([email]))
                #dato2=cur2.fetchall()
                print(dato)
                cur.close()
                data = []
                objeto={}
                for value in dato:
                    objecto={'idinstitucion':value[0],'nombreInstitucion':value[1],'direccion':value[2],
                             
                             'comuna':value[3],'modalidad':value[4],'email':value[5]}
                    data.append(objecto)
                    objecto = {}
                return jsonify ({"data": data}),200

            except:
                return jsonify({"Status": "TOKEN NO VALIDO"}), 403
        return jsonify({"Status": "No ha enviado un token"}), 403
    
class mostrarInstitucionesUserControllers(MethodView):
    def get(self):
        cur = mysql.connection.cursor()
        cur.execute("SELECT c.idinstitucion,c.nombreInstitucion,c.modalidad,c.comuna,c.direccion,sum(ce.cupos) as cantidad_cupos from colegio c left join cuposEscolares ce on c.idinstitucion=ce.codigoinstitucion group by c.idinstitucion,c.nombreinstitucion,c.modalidad,c.comuna,c.direccion order by c.nombreinstitucion")
        instituciones = cur.fetchall()
        cur.close()
        data =[]
        print(instituciones)
        objeto ={}
        for value in instituciones:
            objecto = {'idinstitucion':value[0], 'nombreInstitucion': value[1], 'modalidad': value[2],'comuna':value[3], 'direccion': value[4], 'cantidad_cupos':str(value[5])}
            data.append(objecto)
        return jsonify ({"data":data}),200



    
class cuposInstitucionUserControllers(MethodView):
    def get(self):
        idinstitucion = request.args.get('id')
        cur = mysql.connection.cursor()
        cur.execute("SELECT codigoInstitucion, codigoCupo,grado,cupos,fechaInicio,fechaCierre,respuestaUsuario  From cuposEscolares  where codigoInstitucion =%s",[(idinstitucion)])
        cuposInstitucion = cur.fetchall()
        cur.close()
        data =[]
        objeto ={}
        for value in cuposInstitucion:
            objecto = { 'codigoInstitucion':value[0], 'codigoCupo': value[1], 'grado': value[2], 'cupos': value[3],'fechaInicio':value[4], 'fechaCierre': value[5], 'respuestaUsuario': value[6]}
            data.append(objecto)
            objecto = {}
        return jsonify ({"data": data}),200
        
    
    
       
"""class cuposInstitucionUserControllers(MethodView):
    def get(self):
        cur = mysql.connection.cursor()
        cur.execute("SELECT codigoInstitucion, codigo,grado,cupos,año,fechaInicio,fechaCierre,respuestaUsuario, nombreInstitucion  From cuposEscolares")
        cuposInstitucion = cur.fetchall()
        cur.close()
        data =[]
        objeto ={}
        for value in cuposInstitucion:
            objecto = {'codigoInstitucion':value[0], 'codigo': value[1], 'grado': value[2], 'cupos': value[3],'fechaInicio':value[4], 'fechaCierre': value[5], 'respuestaUsuario': value[6], 'nombreInstitucion': value[7]}
            data.append(objecto)
            objecto = {}
        return jsonify ({"data": data}),200"""
    
    

"""class reservarCupoUserControllers(MethodView):
    def post(self):
        id_grado = request.args.get('id_cupos')
        cur = mysql.connection.cursor()
        cur.execute("update cupos set cupos = (cupos - 1) where id_cupos = %s;"([id_grado]))
"""
class ReservarCupoUserControllers(MethodView):
  def post(self):
    content = request.get_json()

    codigo_institucion = content.get('idInt')
    codigo_grado = content.get('idCupo')

    cur = mysql.connection.cursor()
    # La unica relacion que vi son esos 2 valores
    # Toca consultar primero ya que el campo esta como string (texto)
    cur.execute(f'SELECT cupos FROM cuposEscolares WHERE codigoInstitucion = "{codigo_institucion}" AND codigo = "{codigo_grado}"')
    cupos = cur.fetchone()

    # Se convierte en numero para poder hacer el calculo
    cantidad_cupos = (int(cupos[0]))
    cur.execute(f'UPDATE cuposEscolares SET cupos = {cantidad_cupos - 1} WHERE codigoInstitucion = "{codigo_institucion}" AND codigo = "{codigo_grado}"')

    mysql.connection.commit()
    
    cur.close()

    return jsonify({"registro ok": True}), 200

class agregarConvocatoriaUserControllers(MethodView):
      def post(self):
            #n simulacion de espera en el back con 1.5 segundos
        #datos para enviar a la bd, se llaman igual que el FormControlName y los campos de la BD
        time.sleep(1)
        content = request.get_json()
        grado= content.get("grado")
        cupos= content.get("cupos")
        codigoInstitucion = content.get("codigoInstitucion")
        fechaInicio= content.get("fechaInicio")
        fechaCierre= content.get("fechaCierre")
        respuestaUsuario= content.get("respuestaUsuario")
        
        # comandos sql para agregar infomacion a la tabla users
        cur = mysql.connection.cursor()
        #conexion con el cursor para enviar datos, si se maneja curl con l todos la deben tener o si es cur solo todos deben ser cur 
        cur.execute ("INSERT INTO cuposEscolares(grado,cupos,codigoInstitucion,fechaInicio,fechaCierre,respuestaUsuario) VALUES (%s,%s,%s,%s,%s,%s)",
                    (grado, cupos,  codigoInstitucion, fechaInicio, fechaCierre, respuestaUsuario))
        mysql.connection.commit()
        cur.close()
        #cierre de la peticion a la bd
        return jsonify({"registro ok": True,  "grado":grado}), 200
     
class datosEstudiantesUserControllers(MethodView):
    """
        datos
    """

    def get(self):
    
       #condicional donde se trae la cabecera con el token para hacer la autorizacion
        if (request.headers.get('Authorization')):
                token = request.headers.get('Authorization').split(" ")
                print("-----------------_", token[1])
                #si el token no ha expirado y es correcto se  retorna la autorizacion sacando el email
                #decode decodificar el token para extraer el email
                data= jwt.decode(token[1], KEY_TOKEN_AUTH , algorithms=['HS256'])
                print("ok 1")
                #el data se extrae en correo que fue el argumento enviado en el login
                print(data["ide"])
                email=data["correo"]
                ideAcudiente=data["ide"]
                dato="" 
                
                print(email)
                print(ideAcudiente)
                #con el data evaluado en email  se extraen los datos  
                cur = mysql.connection.cursor()
                cur.execute("SELECT nombres,apellidos,id,parentesco, num1,email from acudiente where email=%s", ([email]))
                dato = cur.fetchall()   
                cur.close()
                print("primer prueba")
                #segundo curl datos estudiantes
                cur2 = mysql.connection.cursor()
                cur2.execute("SELECT idEstudiante,primerNombre,primerApellido,SegundoApellido,fechaNacimiento FROM estudiante where idAcudiente=%s", ([ideAcudiente]))
                dato2 = cur2.fetchall()   
                cur2.close()
               
                #terminacion segundo curl 
                #se almacena datos del primer cur
                data =[]
                objeto ={}
                #hasta aca 
                #segundo alamcenamiento de cur2
             
                data2=[]
                objeto2={}     
                       
                for value in dato:
                    objeto={'nombres':value[0],'apellidos':value[1],'id':value[2],'parentesco':value[3],'num1':value[4],'email':value[5]}
                    data.append(objeto)
                    objeto = {}
                    
                for value2 in dato2:
                    objeto2={'idEstudiante':value2[0], 'primerNombre':value2[1],'primerApellido':value2[2],'SegundoApellido':value2[3],'fechaNacimiento':value2[4],}
                    data2.append(objeto2)
                    objeto2 = {}
                   
                return jsonify ({"data": data, "data2":data2}),200
 
            
             
        return jsonify({"Status": "No ha enviado un token"}), 403
    
    
    
"""""
class datosCuposEscolaresUserControllers(MethodView):
    def post(self):
        content = request.get_json()

        codigo_institucion = content.get('idInt')
        codigo_grado = content.get('idCupo')
        print(codigo_grado, codigo_institucion)
        cur = mysql.connection.cursor()
        # La unica relacion que vi son esos 2 valores
        # Toca consultar primero ya que el campo esta como string (texto)
        cur.execute(f'SELECT codigo, codigoInstitucion FROM cuposEscolares WHERE codigoInstitucion = "{codigo_institucion}" AND codigo = "{codigo_grado}"')
        dato = cur.fetchall()   
        cur.close()
        data =[]
        objeto ={}
        for value in dato:
                    objeto={'codigo':value[0],'codigoInstitucion':value[1],}
                    data.append(objeto)
                    objeto = {}
        

        return jsonify({"registro ok": True}), 200
    """
class generarMatriculaUserControllers(MethodView):
    def post(self):
        #extraer el token trayendo el email del acudiente
        
        
        print("inicia aca", request.headers)
        if (request.headers.get('Authorization')):
                token = request.headers.get('Authorization').split(" ")
                print("-----------------_ token matricula", token[1])
                #si el token no ha expirado y es correcto se  retorna la autorizacion sacando el email
                #decode decodificar el token para extraer el email
                data= jwt.decode(token[1], KEY_TOKEN_AUTH , algorithms=['HS256'])
                print("ok listo para matricular")
                #el data se extrae en correo que fue el argumento enviado en el login
            
                email=data["correo"]
                print("correo para matricula",email)

                content = request.get_json()
                print("este es el content: ",content)
                idColegio = content.get('idColegio')
                idCupos = content.get('idCupo')
                idalumnos= content.get('idsEstudiantes')
                
                #segunda consulta para traer datos de institucion
                cur2 = mysql.connection.cursor()
                cur2.execute("SELECT email, telefono, nombreInstitucion from colegio where idinstitucion=%s", ([idColegio]))
                dati = cur2.fetchall() 
                print("tratamos de traer el correo institucion",dati)  
                
                correoinstitucion=dati[0][0]
                telefonoinstitucion=dati[0][1]
                nombreinstitucion=dati[0][2]
                cur2.close()
                
                #tercera consulta para traer datos acudiente
                cur3 = mysql.connection.cursor()
                cur3.execute("SELECT id,nombres,apellidos,num1 from acudiente where email=%s", ([email]))
                datis = cur3.fetchall() 
                print("se traen datos del acudiente ",datis)  
                idacudiente=datis[0][0]
                nombreacudiente=datis[0][1]
                apellidoaudiente=datis[0][2]
                telefonoacudiente=datis[0][3]
                cur3.close()
          
                
                lista_ruta_documentos=[]
                lista_datos_estudiantes=[]
            
              
                for datosestudiante in idalumnos:
                    
                    cur = mysql.connection.cursor()
                    cur.execute("INSERT INTO  matricula(idCupos,idColegio,idalumno)VALUES (%s,%s,%s)",
                                (idCupos,idColegio,datosestudiante['idEstudiante']))
                    mysql.connection.commit()
                    cur.close()
                    lista_ruta_documentos.append('archivos/estudiante_'+str(datosestudiante['idEstudiante'])+'/'+str(datosestudiante['idEstudiante'])+'_documento.pdf')
                    print("se trajo documento",lista_ruta_documentos)
                    
                    #cuarta consulta estudiantes
                    cur4 = mysql.connection.cursor()
                    cur4.execute("SELECT primerNombre,primerApellido,fechaNacimiento from estudiante where idEstudiante=%s", ([datosestudiante['idEstudiante']]))
                    datoes = cur4.fetchone() 
                    lista_datos_estudiantes.append({'primerNombre':datoes[0],'primerApellido':datoes[1],'fechaNacimiento':datoes[2]})
                    cur4.close()
                    
                print("los datos del estudiante es ",lista_datos_estudiantes)
                    
                    
                    
                #credenciales
                proveedor_correo = 'smtp.live.com: 587'
                remitente = 'pythonprueba50@gmail.com'
                password = 'V12345Mp'
                #crear un correo y contraseña hotmail outlook
                #conexion a servidor
                #servidor = smtplib.SMTP(proveedor_correo)
                servidor = smtplib.SMTP('smtp.gmail.com:587')
                servidor.starttls()
                servidor.ehlo()
                #autenticacion
                servidor.login(remitente, password)
                #mensaje 
               
                mensaje_estudiante=""
                for dato in lista_datos_estudiantes:
                    mensaje_estudiante+=dato['primerNombre']+" "+dato['primerApellido']+" "+str(dato['fechaNacimiento'])+"<br>"

                print(mensaje_estudiante," este es el mensaje que se envia por lado del estudiante")
                mensaje_institucion = "<h1> Institucion Educativa {} se presenta solicitud de matricula por parte de {}<br>{}<br> telefono: {}<br>email: {}</h1> <h1>para matricular a los estudiantes: {}<br>, se anexa el pdf con documentacion</h1>".format(nombreinstitucion, nombreacudiente, apellidoaudiente,telefonoacudiente,email, mensaje_estudiante)
                msg = MIMEMultipart()
                msg.attach(MIMEText(mensaje_institucion, 'html'))
                for ruta in lista_ruta_documentos:
                
                    pdfname = ruta
                    
                    # open the file in bynary
                    binary_pdf = open(pdfname, 'rb')
                    
                    payload = MIMEBase('application', 'octate-stream', Name=pdfname)
                    payload.set_payload((binary_pdf).read())
                    
                    # enconding the binary into base64
                    encoders.encode_base64(payload)
                    
                    # add header with pdf name
                    payload.add_header('Content-Decomposition', 'attachment', filename=pdfname)
                    msg.attach(payload)

                msg['From'] = remitente
                #correo destinatario
                msg['To'] =  correoinstitucion
                msg['Subject'] = 'Prueba cliente correo ADSI RAPPI'
                servidor.sendmail(msg['From'] , msg['To'], msg.as_string())
                
                #envio correo al acudiente
                mensaje_institucion = "<h3> señor(a): {}<br> se acaba de generar la pre-matricula de los estudiantes{}<br> en el colegio {}<br> mediante la plataforma Matriculate en Armenia<br> la institución educativa se comunicara con usted</h3>".format(nombreacudiente,mensaje_estudiante,nombreinstitucion)
                msg = MIMEMultipart()
                msg.attach(MIMEText(mensaje_institucion, 'html'))
                #correo
                msg['From'] = remitente
                #correo destinatario
                msg['To'] = email
                msg['Subject'] = 'Prueba cliente correo ADSI RAPPI'
                servidor.sendmail(msg['From'] , msg['To'], msg.as_string())
               
                                
                                    
                            
            
            
                
                return jsonify({"registro ok": True,"dati": dati}), 200
        return jsonify({"Status": "No ha enviado un token"}), 403
    
    