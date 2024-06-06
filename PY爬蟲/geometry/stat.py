class ia:
     def __init__(self,y,z): #y檔名,z檔案內容
          self.y=y
          self.z=z
     def open(self):
        with open(self.y ,mode="w",encoding="utf-8" ) as file:   
            file.write(str(self.z)+'\n')

