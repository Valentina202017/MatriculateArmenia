from controllers import registroacudienteUserControllers, LoginUserControllers, datospersonasUserControllers, registroEstudianteUserControllers, mostrarInstitucionesUserControllers, registroInstitucionesUserControllers,cuposInstitucionUserControllers, datosInstitucionesUserControllers, LoginInsUserControllers, ReservarCupoUserControllers, agregarConvocatoriaUserControllers, datosEstudiantesUserControllers,generarMatriculaUserControllers #datosCuposEscolaresUserControllers
user = {
    
    "registroacudiente_user": "/api/v01/user/registroacudiente", "registroacudiente_user_controllers": registroacudienteUserControllers.as_view("registro_api"),
    "login_user": "/api/v01/user/login", "login_user_controllers": LoginUserControllers.as_view("login_api"),
    "loginIns_user": "/api/v01/user/loginIns", "loginIns_user_controllers": LoginInsUserControllers.as_view("loginIns_api"),
    
    "datospersonas_user": "/api/v01/user/datospersonas", "datospersonas_user_controllers": datospersonasUserControllers.as_view("datospersonas_api"),
    "registroEstudiante_user": "/api/v01/user/registroEstudiante", "registroEstudiante_user_controllers":  registroEstudianteUserControllers.as_view("registroEstudiante_api"),
    
    "registroInstituciones_user": "/api/v01/user/registroInstituciones", "registroInstituciones_user_controllers": registroInstitucionesUserControllers.as_view("registroInstituciones_api"),
    "datosInstituciones_user": "/api/v01/user/datosInstituciones", "datosInstituciones_user_controllers":datosInstitucionesUserControllers.as_view("datosInstituciones_api"),
    
    "mostrarInstituciones_user": "/api/v01/user/mostrarInstituciones", "mostrarInstituciones_user_controllers": mostrarInstitucionesUserControllers.as_view("mostrarInstituciones_api"),
    "cuposInstitucion_user": "/api/v01/user/cuposInstitucion", "cuposInstitucion_user_controllers": cuposInstitucionUserControllers.as_view("cuposInstitucion_api"),
    "reservarCupo_user": "/api/v01/user/reservarCupo", "reservarCupo_user_controllers": ReservarCupoUserControllers.as_view("reservar_cupo_api"),

    "agregarConvocatoria_user": "/api/v01/user/agregarConvocatoria", "agregarConvocatoria_user_controllers": agregarConvocatoriaUserControllers.as_view("agregarConvocatoria_api"),
    "datosEstudiantes_user": "/api/v01/user/datosEstudiantes", "datosEstudiantes_user_controllers": datosEstudiantesUserControllers.as_view("datosEstudiantes_api"),
    #"datosCuposEscolares_user": "/api/v01/user/datosCuposEscolares", "datosCuposEscolares_user_controllers": datosCuposEscolaresUserControllers.as_view("datosCuposEscolares_api"),
    "generarMatricula_user": "/api/v01/user/generarMatricula", "generarMatricula_user_controllers": generarMatriculaUserControllers.as_view("generarMatricula_api"),
    
}

