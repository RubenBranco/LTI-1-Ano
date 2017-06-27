#!/usr/bin/env python

import re
import os

def gothrough(filename,pattern):
    for descendente in os.listdir(filename):
        caminho =os.path.join(filename,descendente)
        if os.path.isfile(caminho)
            if caminho.endswith('.py'):
                grep(caminho,pattern)

def grep(file,pattern):
    match = False
    with open(file,'rU') as file_reader:
        match=re.match(pattern,file_reader.read())
    return match

if __name__ == '__main__':
    import sys
    gothrough(sys.argv[1], sys.argv[2])