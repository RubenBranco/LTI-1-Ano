# -*-coding:utf-8-*-
#!/usr/bin/env python

"""
Universidade de Lisboa
Faculdade de Ciências
Departamento de Informática
Licenciatura em Tecnologias da Informação 2016/2017
Programação II - Trabalho 4


Este módulo contém quatro funções que produz uma figura com gráficos de barras

A função erasmus lê 2 ficheiros csv e produz 4 gráficos de barras com estatísticas do programa Erasmus.
A função acumula recebe um dicionário e conta as ocorrências de valores associados a uma chave de pesquisa.
A função soma recebe um dicionário e produz outro em que as chaves são os valores associados a uma chave de pesquisa
e os valors da chave são as somas consecutivas com os valores de uma chave de soma.
A função num_estudantes_coordenadas recebe uma lista de dicionários e calcula o número de estudantes por país.
A função estudantes_por_milhao recebe um dicionário e uma lista de dicionários e calcula o número de estudantes por milhão
A função linguagens_mais_faladas recebe uma lista de dicionários e calcula as linguagens mais faladas no programa Erasmus
A função num_medio_ects recebe recebe uma lista de dicionários e um dicionário e calcula o número médio de ECTS por país
no programa Erasmus.
A função get_title recebe um dicionário e verifica o ano letivo referente ao ficheiro csv de dados do programa Erasmus.
"""

__author__ = "João Regueira, 50006; Ruben Branco, 50013"
__copyright__ = "Programação II, LTI, DI/FC/UL, 2017"
__version__ = "v1.0"
__maintainer__ = "João Regueira, Ruben Branco"
__email__ = "fc50006@alunos.fc.ul.pt, fc50013@alunos.fc.ul.pt"


import csv
import operator
import pylab
import copy
import sys

def erasmus(erasmus_csv, paises_csv, max_paises_por_grafico):
    """
    Produz gráficos relativos a número de estudantes do programa erasmus do país, as linguagens mais utilizadas e outras
    estatísticas a partir de ficheiros csv.
    
    Requires: erasmus_csv é uma string de um ficheiro csv do programa erasmus, paises_csv é uma string de um ficheiro
    csv com informações de países, max_paises_por_grafico é int.
    Ensures: Uma figura com 4 gráficos de barras, primeiro sendo número de estudantes por país limitado por 
    max_paises_por_grafico segundo sendo número de estudantes por milhão de habitantes, terceiro as linguagens mais 
    faladas no programa erasmus e quarto sendo número medio de ECTS por país.
    """
    erasmus_csv_info = []
    paises_info = []
    csv.field_size_limit(sys.maxsize)  # Devido a um erro ocorrido é nessário expandir o limite do field
    with open(erasmus_csv, 'rU') as erasmus_file:
        erasmus_csv_info = list(csv.DictReader(erasmus_file, delimiter=';'))
    with open(paises_csv, 'rU') as paises_file:
        paises_info = list(csv.DictReader(paises_file, delimiter=';'))
    for dic in erasmus_csv_info:
        if 'COUNTRYCODEOFHOMEINSTITUTION' in dic:
            dic['HOME_INSTITUTION_CTRY_CDE'] = dic.pop('COUNTRYCODEOFHOMEINSTITUTION')
        if 'COUNTRYOFHOMEINSTITUTION' in dic:
            dic['HOME_INSTITUTION_CTRY_CDE'] = dic.pop('COUNTRYOFHOMEINSTITUTION')
        if 'TOTALECTSCREDITS' in dic:
            dic['TOTAL_ECTS_CREDITS_AMT'] = dic.pop('TOTALECTSCREDITS')
        if 'Language' in dic:
            dic['LANGUAGE_TAUGHT_CDE'] = dic.pop('Language')
        if 'LANGUAGETAUGHT' in dic:
            dic['LANGUAGE_TAUGHT_CDE'] = dic.pop('LANGUAGETAUGHT')
        if 'SendingCountry' in dic:
            dic['HOME_INSTITUTION_CTRY_CDE'] = dic.pop('SendingCountry')
    for dic in erasmus_csv_info:
        if dic['HOME_INSTITUTION_CTRY_CDE'] == 'BENL' or dic['HOME_INSTITUTION_CTRY_CDE'] == 'BEFR' or dic['HOME_INSTITUTION_CTRY_CDE'] == 'BEDE':
            dic['HOME_INSTITUTION_CTRY_CDE'] = 'BE'
        if dic['HOME_INSTITUTION_CTRY_CDE'] == 'UK':
            dic['HOME_INSTITUTION_CTRY_CDE'] = 'GB'
    num_estudantes_info = num_estudantes_coordenadas(erasmus_csv_info, max_paises_por_grafico)  # Informaçoes para grafico 1
    num_estudantes_erasmus = num_estudantes_info[2]  # Grafico 1
    num_estudantes_etiquetas = num_estudantes_info[0]  # Grafico 1
    if 'GB' in num_estudantes_etiquetas:
        num_estudantes_etiquetas[num_estudantes_etiquetas.index('GB')] = 'UK'
    num_estudantes_ordenadas = num_estudantes_info[1]  # Grafico 1
    num_estudantes_milhao_info = estudantes_por_milhao(num_estudantes_erasmus,paises_info,max_paises_por_grafico)  # Informacoes para grafico 2
    num_estudantes_milhao_etiquetas = num_estudantes_milhao_info[0]  # Grafico 2
    if 'GB' in num_estudantes_milhao_etiquetas:
        num_estudantes_milhao_etiquetas[num_estudantes_milhao_etiquetas.index('GB')] = 'UK'
    num_estudantes_milhao_ordenadas = num_estudantes_milhao_info[1]  # Grafico 2
    num_linguagens = linguagens_mais_faladas(erasmus_csv_info,max_paises_por_grafico)  # Informacoes para grafico 3
    num_linguagens_etiquetas = num_linguagens[0]  # Grafico 3
    num_linguagens_ordenadas = num_linguagens[1]  # Grafico 3
    num_medio_ects_info = num_medio_ects(erasmus_csv_info,num_estudantes_erasmus,max_paises_por_grafico)  # Informaçoes para grafico 4
    num_medio_ects_etiquetas = num_medio_ects_info[0]  # Grafico 4
    if 'GB' in num_medio_ects_etiquetas:
        num_medio_ects_etiquetas[num_medio_ects_etiquetas.index('GB')] = 'UK'
    num_medio_ects_ordenadas = num_medio_ects_info[1]  # Grafico 4
    ano = get_title(erasmus_csv_info)
    pylab.subplot(2, 2, 1)
    pylab.bar(range(len(num_estudantes_ordenadas)), num_estudantes_ordenadas, 1/1.5, color='blue', edgecolor='black')
    pylab.xticks(range(len(num_estudantes_ordenadas)), num_estudantes_etiquetas)
    pylab.title(u'Distribuição dos estudantes Erasmus em intercâmbio')
    pylab.ylabel(u'Número de intercâmbios')
    pylab.xlabel(u'Países')
    pylab.subplot(2,2,2)
    pylab.bar(range(len(num_estudantes_milhao_ordenadas)), num_estudantes_milhao_ordenadas, 1/1.5, color='blue', edgecolor='black')
    pylab.xticks(range(len(num_estudantes_milhao_ordenadas)), num_estudantes_milhao_etiquetas)
    pylab.title(u'Estudantes Erasmus por milhão de habitantes')
    pylab.ylabel(u'Intercâmbios / milhão habitantes')
    pylab.xlabel(u'Países')
    pylab.subplot(2,2,3)
    pylab.bar(range(len(num_linguagens_ordenadas)), num_linguagens_ordenadas, 1/1.5, color='blue',edgecolor='black')
    pylab.xticks(range(len(num_linguagens_ordenadas)), num_linguagens_etiquetas)
    pylab.title(u'Línguas utilizadas nos intercâmbios')
    pylab.ylabel(u'Número de intercâmbios')
    pylab.xlabel(u'Língua')
    pylab.subplot(2,2,4)
    pylab.bar(range(len(num_medio_ects_ordenadas)), num_medio_ects_ordenadas, 1/1.5, color='blue', edgecolor='black')
    pylab.xticks(range(len(num_medio_ects_ordenadas)), num_medio_ects_etiquetas)
    pylab.title(u'Número médio de ECTS obtidos')
    pylab.ylabel(u'Número médio de ECTS')
    pylab.xlabel(u'Países')
    pylab.suptitle(u'Algumas estatísticas sobre o programa Erasmus para o ano de '+ano)
    pylab.show()


def acumula(lista_dicionarios, chave_pesquisa):
    """
    Requires: A chave_pesquisa ocorre em todos os
    dicionários constantes na lista_dicionarios.
    Ensures: Devolve um dicionario onde a) as várias chaves
    são os valores associados à chave_pesquisa na
    lista_dicionarios e b) os valores do resultado são o
    número de vezes que as chaves do resultado ocorrem na
    lista_dicionarios.
    
    Caracteristicas e regiões:
    Nº de elems: 1/0/1+
    Quantas vezes aparece a var (chave_pesquisa): 0/1/1+
    nº de valores associado a var (chave_pesquisa): 0/1/1+

    >>> l = [{'x': 'b', 'y': 78}]       #1,1,1
    >>> acumula (l, 'x') == {'b': 1}
    True

    >>> l = [{'x': 'a', 'y': 23}, {'x': 'b', 'y': 78},{'x': 'a', 'y': 99}]      #1+,1+,1+
    >>> acumula (l, 'x') == {'a': 2, 'b': 1}
    True

    >>> l = [{'x': 'a', 'y': 23}, {'z': 'b', 'y': 78},{'z': 'a', 'y': 99}]      #1+,1,1
    >>> acumula (l, 'x') == {'a': 1}
    True
    """
    dicionario = {}
    for dictionary in lista_dicionarios:
        if chave_pesquisa in dictionary:
            if dictionary[chave_pesquisa] in dicionario:
                dicionario[dictionary[chave_pesquisa]] += 1
            else:
                dicionario[dictionary[chave_pesquisa]] = 1
    return dicionario


def soma (lista_dicionarios, chave_pesquisa, chave_soma):
    """
    Requires: A chave_pesquisa e a chave_soma ocorrem em
    todos os dicionários constantes na lista_dicionarios. O
    valor associado à chave_soma é um número.
    Ensures: Devolve um dicionario onde a) as várias chaves
    são os valores associados à chave_pesquisa na
    lista_dicionarios e b) os valores do resultado são
    obtidos pela soma dos valores associados à
    chave_pesquisa na lista_dicionarios.
    
    Caracteristicas e regiões:
    Nº de elems: 1/0/1+
    Quantas vezes aparece a var (chave_pesquisa): 0/1/1+
    nº de valores associado a var (chave_pesquisa): 0/1/1+
    O valor acumulado da var (chave_pesquisa): 0/1/1+

    >>> l = [{'x': 'a', 'y': 23}]                       #1,1,1,1
    >>> soma (l, 'x', 'y') == {'a': 23}
    True

    >>> l = [{'x': 'a', 'y': 0}, {'x': 'a', 'y': 1}]    #1+,1,1,1
    >>> soma (l, 'x', 'y') == {'a': 1}
    True

    >>> l = [{'x': 'a', 'y': 23},{'x': 'a', 'y': 99}]   #1+,1,1,1+
    >>> soma (l, 'x', 'y') == {'a': 122}
    True

    >>> l = [{'x': 'a', 'y': 0}, {'x': 'b', 'y': 78},{'x': 'a', 'y': 1}]        #1+,1+,1+,1
    >>> soma (l, 'x', 'y') == {'a': 1, 'b': 78}
    True

    >>> l = [{'x': 'a', 'y': 23}, {'x': 'b', 'y': 78},{'x': 'a', 'y': 99}]      #1+,1+,1+,1+
    >>> soma (l, 'x', 'y') == {'a': 122, 'b': 78}
    True
    """
    dicionario = {}
    for dictionary in lista_dicionarios:
        if chave_pesquisa in dictionary and chave_soma in dictionary:
            if dictionary[chave_pesquisa] in dicionario and dictionary[chave_soma] != '' and dictionary[chave_soma] is not None:
                dicionario[dictionary[chave_pesquisa]] += int(dictionary[chave_soma])
            elif dictionary[chave_pesquisa] not in dicionario and dictionary[chave_soma] != ''and dictionary[chave_soma] is not None:
                dicionario[dictionary[chave_pesquisa]] = int(dictionary[chave_soma])
    return dicionario


def num_estudantes_coordenadas(lista_erasmus, max_paises_por_grafico):
    """
    Recebe uma lista de dicionarios relativos a dados do programa erasmus e devolve o numero de estudantes por pais.
    
    Requires: lista_erasmus é uma lista de dicionários, max_paises_por_grafico é int.
    Ensures: Um triplo de listas, num_estudantes_etiquetas é uma lista com etiquetas de países, num_estudantes_ordenadas
    é uma lista com o número de estudantes relativos aos países das etiquetas e num_estudantes é um dicionario cujas 
    chaves são as etiquetas dos países e valores são os números de estudantes.
    """
    num_estudantes = acumula(lista_erasmus, 'HOME_INSTITUTION_CTRY_CDE')
    num_estudantes_sorted = sorted(num_estudantes.items(), key=operator.itemgetter(1), reverse=True)
    slicer = (max_paises_por_grafico if max_paises_por_grafico < len(num_estudantes_sorted) else len(num_estudantes_sorted))
    num_estudantes_etiquetas = [num_estudantes_sorted[i][0] for i in range(0, slicer)]
    num_estudantes_ordenadas = [num_estudantes_sorted[i][1] for i in range(0, slicer)]
    return num_estudantes_etiquetas, num_estudantes_ordenadas, num_estudantes


def estudantes_por_milhao(dicionario, paises_info,max_paises_por_grafico):
    """
    Recebe um dicionario com dados relativos à quantidade de estudantes por país e devolve os paises com maior proporção
    por milhão de habitantes com dados de outro dicionario.
    
    Requires: dicionario é dicionário, paises_info é uma lista de dicionarios, max_paises_por_grafico é int.
    Ensures: Um par de listas, estudantes_por_milhao_etiquetas sendo uma lista com as etiquetas dos países e 
    estudantes_por_milhao ordenadas sendo os valores da proporção numero de estudantes por milhão de habitantes, sendo 
    ordenados por ordem decrescente.
    """
    dicionario2 = dicionario.copy()
    for country in dicionario2:
        if country != '':
            population = 0
            for dic in paises_info:
                if dic['Country code'] == country:
                    population = int(dic['Population'])
            dicionario2[country] = round(dicionario2[country]/(population/float(1000000)))
    estudantes_por_milhao_sorted = sorted(dicionario2.items(), key=operator.itemgetter(1), reverse=True)
    slicer = (max_paises_por_grafico if max_paises_por_grafico < len(estudantes_por_milhao_sorted) else len(estudantes_por_milhao_sorted))
    estudantes_por_milhao_etiquetas = [estudantes_por_milhao_sorted[i][0] for i in range(0, slicer)]
    estudantes_por_milhao_ordenadas = [estudantes_por_milhao_sorted[i][1] for i in range(0, slicer)]
    return estudantes_por_milhao_etiquetas, estudantes_por_milhao_ordenadas


def linguagens_mais_faladas(dicionario,max_paises_por_grafico):
    """
    Recebe um dicionario com dados relativos ao uso de linguagens no programa erasmus e devolve as mais utilizadas.
    
    Requires: dicionario é uma lista de dicionarios, max_paises_por_grafico é int.
    Ensures: Um par de listas, num_linguagens_etiquetas sendo as etiquetas das linguagens e num_linguagens_ordenadas
    sendo o número de alunos que a utiliza, tendo sido ordenados por ondem decrescente.
    """
    dicionario2=copy.copy(dicionario)
    for dic in dicionario2:
        if dic['LANGUAGE_TAUGHT_CDE'] is not None:
            dic['LANGUAGE_TAUGHT_CDE'] = dic['LANGUAGE_TAUGHT_CDE'].upper()
    num_linguagens = acumula(dicionario, 'LANGUAGE_TAUGHT_CDE')
    if 'XX' in num_linguagens:
        del num_linguagens['XX']
    num_linguagens_sorted = sorted(num_linguagens.items(), key=operator.itemgetter(1), reverse=True)
    slicer = (max_paises_por_grafico if max_paises_por_grafico < len(num_linguagens_sorted) else len(num_linguagens_sorted))
    num_linguagens_etiquetas = [num_linguagens_sorted[i][0] for i in range(0, slicer) if num_linguagens_sorted[i][0] != '']
    num_linguagens_ordenadas = [num_linguagens_sorted[i][1] for i in range(0, slicer) if num_linguagens_sorted[i][0] != '']
    return num_linguagens_etiquetas, num_linguagens_ordenadas


def num_medio_ects(dicionario, dicionario_estudantes, max_paises_por_grafico):
    """
    Recebe dicionarios com dados relativos a numero de ects e numero de estudantes e calcula o numero medio de ects por 
    pais.
    
    Requires: dicionario é uma lista de dicionários, dicionario_estudantes é dicionario com num_estudantes por pais, 
    max_paises_por_grafico é int.
    Ensures: Um par de listas, uma com etiquetas de países, a outra com numero medio de ECTS relativo aos paises, 
    ordenados por ordem decrescente apos calculos.
    """
    num_total_ects = soma(dicionario, 'HOME_INSTITUTION_CTRY_CDE', 'TOTAL_ECTS_CREDITS_AMT')
    for k in num_total_ects:
        num_total_ects[k] = num_total_ects[k]/float(dicionario_estudantes[k])
    num_medio_ects_sorted = sorted(num_total_ects.items(), key=operator.itemgetter(1), reverse=True)
    slicer = (max_paises_por_grafico if max_paises_por_grafico<len(num_medio_ects_sorted) else len(num_medio_ects_sorted))
    num_medio_ects_etiquetas = [num_medio_ects_sorted[i][0] for i in range(0, slicer)]
    num_medio_ects_ordenadas = [num_medio_ects_sorted[i][1] for i in range(0, slicer)]
    return num_medio_ects_etiquetas, num_medio_ects_ordenadas


def get_title(dicionario):
    """
    Procura num dicionario chave:valor relativos a datas do ano letivo dos dados.
    
    Requires: dicionario é um dicionario.
    Ensures: String com os anos relativos ao estudo com a seguinte forma : ano_começo - ano_fim
    """
    i = 0
    anos = []
    while i<len(dicionario) and len(anos)<2:
        if 'STUDYSTARTDATE' in dicionario[i] and dicionario[i]['STUDYSTARTDATE'] != '':
            ano = dicionario[i]['STUDYSTARTDATE'].split('-')[1]
            if ano not in anos:
                anos.append(ano)
        elif 'StartDate' in dicionario[i] and 'EndDate' in dicionario[i] and dicionario[i]['StartDate'] != '' and dicionario[i]['EndDate'] != '':
            ano_ida = dicionario[i]['StartDate'].split()[0].split('-')[2]
            ano_volta = dicionario[i]['EndDate'].split()[0].split('-')[2]
            if ano_ida not in anos:
                anos.append(ano_ida)
            if ano_volta not in anos:
                anos.append(ano_volta)
        elif 'STUDY_START_DATE' in dicionario[i] and dicionario[i]['STUDY_START_DATE'] != '':
            ano = dicionario[i]['STUDY_START_DATE'].split('-')[1]
            if len(ano) == 2:
                ano='20'+ano
                if ano not in anos:
                    anos.append(ano)
        i += 1
    if len(anos) == 1:
        return anos[0] + '-' + str(int(anos[0])+1)
    else:
        return anos[0] + '-' + anos[1] if int(anos[0]) < int(anos[1]) else anos[1] + '-' + anos[0]


if __name__ == "__main__":
    import doctest
    doctest.testmod()
