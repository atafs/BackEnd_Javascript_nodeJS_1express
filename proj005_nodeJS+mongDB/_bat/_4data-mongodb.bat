REM create database with the name of the project
use nodeJS-plus-mongoDB

REM create data
db.students.insert([
  {
  "student" : "AmericoTomas",
	"street" : "Rua Francisco Costa, number9, 7A",
	"city" : "Rio de Mouro",
  "state" : "Sintra",
  "sex" : "M",
  "gpa" : 3.5
  }
])

REM check data inserted
cls
db.students.find().pretty()
