#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Este módulo contém duas funções que operam sobre dicionarios, subdicionario e pares_ordenados.

subdicionario obtem um subdicionario cujas chaves contem uma string dada.
pares_ordenados ordena as chaves por ordem alfabética e da uma lista com tuplos chaves,valor.

"""

__author__ = "Ruben Branco, 50013"
__copyright__ = "Programação II, LTI, DI/FC/UL, 2017"
__version__= "v1.0"
__maintainer__ = "Ruben Branco"
__email__ = "fc50013@alunos.fc.ul.pt"

def subdicionario(dicionario,palavra):
    """
    Procura em um dicionario as chaves que contêm a string palavra e gera um subdicionario contendo-as.
    Requires: Dicionario é um dicionario com a chave com um nome(string) e o valor um numero int , palavra é uma string
    Ensures: Retorna um dicionario com as keys que contêm a string palavra nelas.

    Características e regiões:
    - Nº de Elementos de dicionario: 0,1,>1
    - Numero de ocorrências de palavra: 0, 1 >1
    - Tamanho da Palavra(String): 0, 1, >1

    >>> subdicionario({},'') == {} #Nº Elem 0, Nº ocorrencias 0, len(Palavra) 0
    True
    >>> subdicionario({},'m') == {} #Nº Elem 0, Nº ocorrencias 0, len(Palavra) 1
    True
    >>> subdicionario({},'mae') == {} #Nº Elem 0, Nº ocorrencias 0, len(palavra) >1
    True
    >>> subdicionario({'pai':350},'J') == {} #Nº Elem 1, Nº ocorrencias 0, len(palavra) 1
    True
    >>> subdicionario({'maria':123},'a') == {} #Nº Elem 1, Nº ocorrencias 0, len(palavra) >1
    True
    >>> subdicionario({'mae':596},'') == {'mae':596} #Nº Elem 1, Nº ocorrencias 1, len(palavra) 0
    True
    >>> subdicionario({'frederico':2134},'f') == {'frederico':2134} #Nº Elem 1, Nº ocorrencias 1, len(palavra) 1
    True
    >>> subdicionario({'francisco':940},'fran') == {'francisco':940} #Nº Elem 1, Nº ocorrencias 1, len(palavra) >1
    True
    >>> subdicionario({'jorge':312, 'bento':950},'d') == {} #Nº Elem >1, Nº ocorrencias 0, len(palavra) 1
    True
    >>> subdicionario({'Bruno':91, 'Ze':740},'Tiago') == {} #Nº Elem >1, Nº ocorrencias 0, len(palavra) >1
    True
    >>> subdicionario({'Alexandre':124, 'Sergio':9558},'S') == {'Sergio':9558} #Nº Elem >1, Nº ocorrencias 1, len(palavra) 1
    True
    >>> subdicionario({'Diogo':467, 'Catarina':1957},'Catarina') == {'Catarina':1957} #Nº Elem >1, Nº ocorrencias 1, len(palavra) >1
    True
    >>> subdicionario({'Mariana':159, 'Santos':29175},'') == {'Mariana':159, 'Santos':29175} #Nº Elem >1, Nº ocorrencias >1, len(palavra) 0
    True
    >>> subdicionario({'Francisco':19247, 'Frederico':1281, 'Joana':12945},'F') == {'Francisco':19247, 'Frederico':1281} #Nº Elem >1, Nº ocorrencias >1, len(palavra) 1
    True
    >>> subdicionario({'Francisco':19247, 'Frederico':1281, 'Joana':12945},'Fr') == {'Francisco':19247, 'Frederico':1281} #Nº Elem >1, Nº ocorrencias >1, len(palavra) >1
    True
    """
    sub_dicionario={}
    if palavra:
        for key in dicionario:
            if key[0:len(palavra)]==palavra:
                sub_dicionario[key]=dicionario[key]
    return sub_dicionario if palavra else dicionario

def pares_ordenados(dicionario):
    """
    Gera pares ordenados alfabéticamente (chave,valor) para uma lista a partir de um dicionario
    Requires: Dicionario é um dicionario com a chave com um nome(string) e o valor um numero int
    Ensures: Uma lista de tuplos(chave, valor) ordenados por nome a partir das entradas do dicionario

    Características e Regiões:
    - Nº Elementos do dicionario: 0, 1, >1
    - Pelo menos um contacot com número na chave: T/F (Pode alterar o sort)
    - Pelo menos um cpmtactp com carater especial na chave(!&?): T/F (Pode alterar o sort)


    >>> pares_ordenados({}) #Nº Elem 0, Nº Chave False, Carater Especial False
    []
    >>> pares_ordenados({'Tiago32!':1244}) #Nº Elem 1, Nº Chave True, Carater Especial True
    [('Tiago32!', 1244)]
    >>> pares_ordenados({'Francisco41':412}) #Nº Elem 1, Nº Chave True, Carater Especial False
    [('Francisco41', 412)]
    >>> pares_ordenados({'Diana!':909}) #Nº Elem 1, Nº Chave False, Carater Especial True
    [('Diana!', 909)]
    >>> pares_ordenados({'Ruben':142}) #Nº Elem 1, Nº Chave False, Carater Especial False
    [('Ruben', 142)]
    >>> pares_ordenados({'1Mario?':91, 'Mario':111}) #Nº Elem >1, Nº Chave True, Carater Especial True
    [('1Mario?', 91), ('Mario', 111)]
    >>> pares_ordenados({'1Ze':10248, 'Ana':122}) #Nº Elem >1, Nº Chave True, Carater Especial False
    [('1Ze', 10248), ('Ana', 122)]
    >>> pares_ordenados({'Zacarias!':1245, 'Aario':40185}) #Nº Elem >1, Nº Chave False, Carater Especial True
    [('Aario', 40185), ('Zacarias!', 1245)]
    >>> pares_ordenados({'Raul Santos':18295, 'Raul Alves':12959, 'Branco':58168}) #Nº Elem >1, Nº Chave False, Carater Especial False
    [('Branco', 58168), ('Raul Alves', 12959), ('Raul Santos', 18295)]
    """
    return [(nome,dicionario[nome]) for nome in sorted(dicionario)]

if __name__ == "__main__":
    import doctest
    doctest.testmod()