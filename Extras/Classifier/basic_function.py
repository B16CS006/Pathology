import re
import os

def split(path):
    return os.path.split(path)

def check_exists(path):
    return os.path.exists(path)

def check_dir(path, create = True):
    if os.path.isdir(path):
        return True
    else:
        if create:
            os.makedirs(path)
            return True
        else:
            return False

def check_file(file, create = True):
    if os.path.isfile(file):
        return True
    else:
        if create:
            directory, filename = os.path.split(file)
            check_dir(directory, True)
            open(file, 'w').close()
            return True
        else:
            return False

def get_files(loc_data):
    rex = re.compile(r'^.*\.({})$'.format('jpg|jpeg|bmp|png'), re.I)
    files = [os.path.join(loc_data,base) for base in os.listdir(loc_data) if rex.match(base)]
#     print(files)
    return files