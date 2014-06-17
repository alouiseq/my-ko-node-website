#!/usr/bin/python

import cgi
import cgitb; cgitb.enable()    # for troubleshooting
from email.mime.text import MIMEText    # needed email module
import smtplib    # compose email


# Retrieve data from html
print("Content-Type: text/html")    # HTTP header to say HTML is following
print()                             # blank lin, end of headers

form = cgi.FieldStorage()
name = form['full_name'].value
sender = form['sender_email'].value
msg = form['message'].text

print(name, " from ", sender, " wants to say ", msg)

# Email process
from_addr = sender 
to_addr = 'louieq56@gmail.com'

username = 'louieq56'
password = 'hello5669!'

server = smtplib.SMTP('smtp.gmail.com:587')
server.starttls()
server.login(username, password)
server.sendmail(from_addr, to_addr, msg)

