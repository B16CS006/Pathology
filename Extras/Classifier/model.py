import PIL.Image
import basic_function as bf

from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.preprocessing.image import ImageDataGenerator, img_to_array

class Model:
    
    def __init__(self, weights_file = None, model = None):
        self.__model__ = model
        self.__size__ = (300,300)
        self.__epochs__ = 50
        
        if weights_file is not None:
                self.load_model(weights_file)
      
        print('Model Information : ')
        print('Data Size :', self.__size__)
        print('Epochs :',self.__epochs__)
        
        if self.__model__ is None:
            print('Model is not Initialize yet.')
            
    def set_size(self, size):
        self.__size__ = size
        
    def get_size(self):
        return self.__size__
    
    def set_epochs(self, epochs):
        self.__epochs__ = epochs
        
    def get_epochs(self):
        return self.__epochs__
              
    def get_model(self):
        return self.__model__
    
    def set_model(self, model):
        self.__model__ = model
    
    def model_summary(self):
        print(self.__model__.summary)
        return self.__model__.summary
    
    def __init_model__(self):
        print('Initializing Model...')
        self.__model__ = Sequential()
        self.__model__.add(Conv2D(32, (3, 3), input_shape=(300, 300, 3)))
        self.__model__.add(Activation('relu'))
        self.__model__.add(MaxPooling2D(pool_size=(2, 2)))

        self.__model__.add(Conv2D(32, (3, 3)))
        self.__model__.add(Activation('relu'))
        self.__model__.add(MaxPooling2D(pool_size=(2, 2)))

        self.__model__.add(Conv2D(64, (3, 3)))
        self.__model__.add(Activation('relu'))
        self.__model__.add(MaxPooling2D(pool_size=(2, 2)))

        # the model so far outputs 3D feature maps (height, width, features)
        self.__model__.add(Flatten())  # this converts our 3D feature maps to 1D feature vectors
        self.__model__.add(Dense(64))
        self.__model__.add(Activation('relu'))
        self.__model__.add(Dropout(0.5))
        self.__model__.add(Dense(1))
        self.__model__.add(Activation('sigmoid'))
        
    def init_model(self):
        self.__init_model__()
        self.compile_model()
        
    def compile_model(self):
        print('Compiling Model...')
        self.__model__.compile(loss='binary_crossentropy',
                      optimizer='rmsprop',
                      metrics=['accuracy'])
        
    def load_model(self, file, _compile_ = True):
        if self.__model__ == None:
            self.__init_model__()
        
        print('Loading Model...')
        self.__model__.load_weights(file)
        
        if _compile_ :
            self.compile_model()
            
            
    def __predict__(self,file):
        if file is None:
            return None
        return self.__model__.predict(file)
    
    def preprocess_file(self, file):
        image = PIL.Image.open(file).resize(self.__size__,3)
        image = img_to_array(image)
        
        shape = image.shape[2]
        
        if shape != 3:
            print('Shape is not correct :',file)
            return None
        
        image = image.reshape((1,) + image.shape)
        return image
    
    def single_predict(self, file):
        return self.__predict__(self.preprocess_file(file))
    
    def many_predict(self, files):
        
        results = dict((file, self.__predict__(self.preprocess_file(file))) for file in files)
        
#         results = []
#         for file in files:
#             result = self.__predict__(self.preprocess_file(file))
#             results.append(result)
        
        return results
    
    def train(self, train_file, validation_file):
        print('Collecting Data...')
        batch_size = 16
        
        train_datagen = ImageDataGenerator(
            rescale=1./255,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True)
        
        test_datagen = ImageDataGenerator(rescale=1./255)
        
        train_generator = train_datagen.flow_from_directory(
            train_file,
            target_size=self.__size__,
            batch_size=batch_size,
            class_mode='binary')
        
        validation_generator = test_datagen.flow_from_directory(
            validation_file,
            target_size=(300, 300),
            batch_size=batch_size,
            class_mode='binary')
        
        print('Training...')
        self.__model__.fit_generator(
            train_generator,
            steps_per_epoch=400 // batch_size,
            epochs=self.__epochs__,
            validation_data=validation_generator,
            validation_steps=160 // batch_size)
        
    def save_weights(self,file):
        bf.check_file(file, True)
        print('Saving weights as :',file,'...')
        self.__model__.save_weights(file)         