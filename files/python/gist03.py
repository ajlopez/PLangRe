import os
 
path = os.getcwd()
for root, dirs, files in os.walk(path):
  print("visiting: ", root)
  os.chdir(root)
  py_files = [file for file in files if file[-3:]=='.py']
  for py_file in py_files:
    cmd = "python {0}".format(py_file)
    print("running: ", cmd)
    os.system(cmd)
 
os.chdir(path)
