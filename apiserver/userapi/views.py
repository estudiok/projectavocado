from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
import json
import helper.help as help
import os
from django.conf import settings
from django.core.files.storage import default_storage

# Create your views here.

# POST
def getUser(request):
    if request.method == 'POST':
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM User
                WHERE email = %s
                AND password = %s;
            """, [
                request.POST['email'],
                request.POST['password']
            ])
            row = help.dictfetchall(cursor)
            
        return JsonResponse(row, safe=False)



# GET
def getUsers(request):
    if request.method == 'GET':

        # cur = connection.cursor(dictionary=True)

        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM User;")
            row = help.dictfetchall(cursor)
        return JsonResponse(row, safe=False)
        


def insertUser(request):
    if request.method == 'POST':
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT * FROM User
                WHERE email = %s;
            """, [
                request.POST['email']
            ])
            data = help.dictfetchall(cursor)

        if data.__len__() == 0:
            with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO User(firstName, secondName, motherLastName, fatherLastName, email, password) VALUES (%s, %s, %s, %s, %s, %s);
                """, [
                    request.POST['firstName'],
                    request.POST['secondName'],
                    request.POST['motherLastName'],
                    request.POST['fatherLastName'],
                    request.POST['email'],
                    request.POST['password']
                ])
                status = cursor.fetchone()

            return JsonResponse(status, safe=False)
        else:
            return JsonResponse(0, safe=False)

# POST

def imageUpload(request):
    if request.method == 'POST':
        save_path = os.path.join(settings.MEDIA_ROOT, request.FILES['image'].name)
        path = default_storage.save(save_path, request.FILES['image'])
        imagePath = settings.MEDIA_URL + path
        createDate = request.POST['createDate']
        with connection.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO Image(imagePath, createDate) VALUES (%s, %s);
                """, [
                    imagePath,
                    createDate
                ])
                status = cursor.fetchone()
        return JsonResponse(status, safe=False)

# GET
def getImages(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Image ORDER BY createDate DESC;")
            row = help.dictfetchall(cursor)
        return JsonResponse(row, safe=False)