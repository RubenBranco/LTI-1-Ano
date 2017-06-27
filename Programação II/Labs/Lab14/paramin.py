#!/usr/bin/env python


def paramin(filename):
    with open(filename) as file:
        for line in file:
            print line.lower()

if __name__ == '__main__':
    import sys
    paramin(sys.argv[1])