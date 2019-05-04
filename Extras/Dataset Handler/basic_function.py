import re
import PIL.Image, os
import numpy as np

# import progressbar


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

# def gen_preview(files,to,count,prefix = 'preview', size = (300,300),extension = 'jpg'):
    
#     if not os.path.isdir(to):
#         os.makedirs(to)
    
#     datagen = None
#     if count is 1:
#         datagen = ImageDataGenerator()
#     else:
#         datagen = ImageDataGenerator(
#             rotation_range=40,
#             width_shift_range=0.2,
#             height_shift_range=0.2,
#             shear_range=0.2,
#             zoom_range=0.2,
#             horizontal_flip=True,
#             fill_mode='nearest')
    
# #     bar = progressbar.ProgressBar(maxval=20, 
# #                                   widgets=[progressbar.Bar('=', '[', ']'), ' ',
# #                                            progressbar.Percentage()])
# #     bar.start()
#     for file in files:
#         img = PIL.Image.open(file).resize(size,3)
#         x = img_to_array(img)
#         x = x.reshape((1,) + x.shape)
#         i = 0
#         for batch in datagen.flow(x, batch_size=1,
#                                   save_to_dir=to, save_prefix=prefix, save_format=extension):
#             i+=1
#             if i >= count:
#                 break
# #     bar.finish()            
#     print('Preview successfully created')

