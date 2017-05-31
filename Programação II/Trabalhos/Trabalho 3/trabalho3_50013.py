# -*-coding:utf-8-*-
#!/usr/bin/env python

"""
Universidade de Lisboa
Faculdade de Ciências
Departamento de Informática
Licenciatura em Tecnologias da Informação 2016/2017

Programação II - Trabalho 3


Este módulo contém uma função que produz histogramas.

A função tremores recebe um ficheiro de dados e um int e produz um histograma de acordo com os dados fornecidos.
"""
import csv
import pylab


__author__ = "Ruben Branco, 50013"
__copyright__ = "Programação II, LTI, DI/FC/UL, 2017"
__version__ = "v1.0"
__maintainer__ = "Ruben Branco"
__email__ = "fc50013@alunos.fc.ul.pt"


def tremores(filename, days):
    """
    Produz um histograma a partir de um ficheiro csv de leituras sismicas.
    
    Requires: filename é uma string com o nome do ficheiro csv com dados de leituras sismicas; days é um int com o 
    número de dias a que os dados dizem respeito.
    Ensures: Um histograma com as várias classes de magnitude na escala de Richter(0.1 de dimensão) dos sismos e o 
    numero de ocorrências delas.
    """
    magnitudes = []
    with open(filename, 'rU') as csv_file:
        reader = csv.reader(csv_file, delimiter=',')
        header_skip = reader.next()
        for line in reader:
            if line[4] != '':  # Para o caso de o campo de magnitude estiver vazio (embora foi dito que não vai ser testado com campos vazios)
                magnitudes.append(float(line[4]))
    nclasses = int(round((max(magnitudes)-min(magnitudes))*10))
    pylab.hist(magnitudes, nclasses, facecolor='orange', edgecolor='black')
    pylab.ylabel(u'Número de tremores de terra')
    pylab.xlabel(u'Magnitude')
    pylab.title(u'Magnitude dos tremores de terra nos EUA (últimos '+str(days)+u' dias)')
    pylab.show()