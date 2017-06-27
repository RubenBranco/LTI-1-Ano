# -*-coding:utf-8-*-
#1
#a - III IV
#b I IV
#c

#3
#a) [\d{4}-\d{3} [A-Z][a-z]*, [\d{4}-\d{3}] [A-Z][a-z]*[ A-Za-z]*?
#c) \-?[\d]*\.[\d]*
#h) M{0,3}[CM|CD|D?c{0,3}][XC|XL|C?X{0,4}][IX|[V][I]{0,3}|IV|I{0,3}]

#5
#a)
import re


def expression_match(string, expression):
    """
    
    :param file: 
    :param expression: 
    :return: 
    """
    return re.findall(expression, string)

#d)


def find_numberplate(character, list):
    """
    
    :param character: 
    :param list: 
    :return: 
    """
    # ^\d{2}-[A-Z]{2}-\d{2}$
    new_string = ''
    for s in list:
        new_string+=s+' '
    return re.findall('^'+character+r'\d - [A-Z]{2} - \d{2}$', new_string)

#6
#a


def file_replace(file,expression_to_replace, expression_to_be_replaced):
    """
    
    :param file: 
    :param expression: 
    :return: 
    """
    texto = ''
    with open(file,'rU') as file_reader:
        with open('new_file.txt','wb') as file_writer:
            for line in file_reader:
                file_writer.write(re.sub(expression_to_be_replaced, expression_to_replace, line))


def substituir_estacoes(file):
    """
    
    :param file: 
    :return: 
    """
    return file_replace(file, '(Verão|Outuno|Primavera|Inverno)', r'\1.lower()')