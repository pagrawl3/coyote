import cleaning
import file_directory
import json
import os
from sys import argv
script_name, filename = argv

def get_data(filename):
    return json.dumps({'files':file_directory.get_files(),'errors':cleaning.parseFile(filename)})

def parseFile(readFilename='output.txt',writeFilename='json.json'):
    f = open(writeFilename,'wb')
    f.write(get_data(readFilename))
    f.close()
    
def createFiles(filename):
    data = json.loads(open(filename,'rb').read())
    for w in data['files']:
        f = open(w['path'],'wb')
        f.write(w['content'])
        f.close()


parseFile(filename)

jtime = os.stat('json.json').st_mtime

while(1):
    newjtime = os.stat('json.json').st_mtime
    if (newjtime!=jtime):
        createFiles(filename)
        jtime = newjtime
        
        
