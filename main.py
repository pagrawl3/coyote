import cleaning
import file_directory
import json
def get_data(filename):
    return json.dumps({'files':file_directory.get_files(),'errors':cleaning.parseFile(filename)})
