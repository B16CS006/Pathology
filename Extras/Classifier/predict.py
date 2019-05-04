
# coding: utf-8

# In[1]:


import basic_function as bf
from model import Model


# In[2]:


model = Model()


# In[3]:


model.load_model('../50_epochs.h5')


# In[4]:


model.model_summary()


# In[5]:


files = bf.get_files('../validation/pathology')
print(files)


# In[6]:


results = model.many_predict(files)


# In[11]:


for result in results:
    print(results[result][0][0])


# In[8]:


print(len(files),len(results))


# In[5]:


result = model.single_predict('../validation/other/el_0_173.jpeg')


# In[6]:


print(result)

