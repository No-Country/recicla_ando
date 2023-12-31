from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from config.database import Session
from models.user_model import User
from schemas.user_schema import *
from services.user_service import UserService
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List
import json

user_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer('/token')

#todo Metodos POST
@user_router.post('/create_user', status_code=200, response_model=UserOut)
def create_user(user: CreateUser):
    try:
        data = UserService().post_register_user(user)
        if data:
            return data
        return JSONResponse(status_code=404, content={f'"message":"Usuario NO Creado"'})
    except Exception as e:
         return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})

@user_router.post('/login', status_code=200, response_model= UserOut)
def login(user: LoginUser):
    try:
        data = UserService().post_login_user(user.email, user.password)
        if data:
            return data
        return JSONResponse(status_code=403, content={"message": "Error en datos de Usuario"})
    except Exception as e:
        return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})

#todo Metodos GET
@user_router.get('/users',status_code=200 ,response_model=List[UserOut])
def list_users():
    try:
        users = UserService().get_user_all()
        if users:
            return users
        return JSONResponse(status_code=404, content='{"message":"No Existen Usuarios"}')
    except Exception as e:
        return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})

@user_router.get('/users/active',status_code=200 ,response_model=List[UserOut])
def list_users_all():
    try:
        users = UserService().get_user_all_active()
        if users:
            return users
        return JSONResponse(status_code=404, content='{"message":"No Existen Usuarios"}')
    except Exception as e:
        return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})

@user_router.get('/users/{id}',status_code=200, response_model=UserOut)
def get_user_id(id:int):
    try:
        user = UserService().get_user_for_id(id)
        if user:
            return user
        return JSONResponse(status_code=404, content='{"message":"Usuario NO Existe"}')
    except Exception as e:
        return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})

#todo Metodos PUT
@user_router.put('/user/update_profile/{id}', status_code=200, response_model=UpdateInfoUser)
def update_user(id:int, user: UpdateInfoUser):
    try:
        result = UserService().put_user_update(id,user)
        if result:
            return result
        return JSONResponse(status_code=404, content={'message':'Usuario NO Actualizado'})
    except Exception as e:
        return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})

#! Crear ruta cambiar contrasena
@user_router.put('/user/change_password/{id}', status_code=201, response_model=UserOut)
def change_password(id:int, user:ChangeUserPassword):
    try:
        result = UserService().put_change_password(id, user)
        if result:
            return result
        return JSONResponse(status_code=404, content={'message':'Fallo el Cambio de Contraseña'})
    except Exception as e:
        return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})

@user_router.put('/user/deactivate_user/{id}', status_code=201, response_model=dict)
def deactivate_user(id:int):
    try:
        result = UserService().put_deactivate_user(id)
        if result:
            return JSONResponse(content={'message': 'Usuario desactivado'})
        return JSONResponse(status_code=404, content={'message':'Fallo la desactivación del usuario'})
    except Exception as e:
        return JSONResponse(status_code=500, content={f"message": "Server Error: {e}"})