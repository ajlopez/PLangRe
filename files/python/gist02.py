#!/usr/bin/env python
#-*-coding:utf-8-*-
 
 
import os 
import doctest
 
liste = []
 
def test():
    
    
    for i in os.listdir("/home/mhmt/Belgeler"):
        if i.endswith(".py"):
            if i not in liste:
               doctest.testfile(i)
               liste.append(i)
 
 
test()
