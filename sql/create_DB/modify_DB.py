#!/usr/bin/python
# -*- coding: UTF-8 -*-

import pymysql
import random

db = pymysql.connect("localhost", "root", "", "wordtutor", charset='utf8' )

cursor = db.cursor()

sql = """select * from words;"""

cursor.execute(sql)

results = cursor.fetchall()

id = 1

for row in results:
    old_id = row[0]
    sql = "UPDATE words SET ID = "+str(id)+" WHERE ID = "+str(old_id)+";"
    if(old_id!=id):
        print(sql)
        break
    cursor.execute(sql)
    id = id+1
    
db.close()
