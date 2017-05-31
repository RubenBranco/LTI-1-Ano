# -*-coding:utf-8-*-
#!/usr/bin/env python

"""
Universidade de Lisboa
Faculdade de Ciências
Departamento de Informática
Licenciatura em Tecnologias da Informação 2016/2017

Programação II - Trabalho 2

Este módulo contém quatro funções que calculam somas de raízes.

A função soma_raizes obtem a soma de raizes de 1 a n.
A função lista_soma_raizes obtem uma lista com as várias somas(calculos intermédios) de raizes de 1 a n.
explora obtem uma lista de todos os passos feitos pela operação de uma função, usando o resultado prévio devido a 
eficiência
lista_soma_raizes_explora utiliza a função explora para obter a lista de somas mas de maneira mais eficiente
"""

__author__ = "Ruben Branco, 50013"
__copyright__ = "Programação II, LTI, DI/FC/UL, 2017"
__version__ = "v1.0"
__maintainer__ = "Ruben Branco"
__email__ = "fc50013@alunos.fc.ul.pt"

import math

def soma_raizes(n):
    """
    Calcula a soma de raizes quadradas, desde a raiz quadrada de 1 a raiz de n.
    
    Requires: n é int >0
    Ensures: Retorna o resultado da soma de raizes quadradas como int
    
    Complexidade algorítmica: O(n), onde n representa a o tamanho da lista de 1 a n, isto porque a função usa reduce, 
    que por si vai ser O(n) na maioria dos casos, podendo ser pior dependendo da função que é passada. Neste caso, a 
    função é O(1), e reduce vai apenas depender do tamanho da lista que é passada como parâmetro, que neste caso é a 
    lista de 1 a n, para poder ser calculado as somas.n*1=n->O(n)
    
    >>> soma_raizes(1) #n=1
    1.0
    >>> round(soma_raizes(3),3) #n>1
    4.146
    """
    return reduce(lambda acc, x:acc+math.sqrt(x),range(1,n+1),0)

def lista_somas_raizes(n):
    """
    Obtem a lista das somas das primeiras n raizes quadradas.
    
    Requires: n é int >0
    Ensures: Uma lista com a soma das primeiras n raizes quadradas.
    
    Complexidade Algorítmica: O(n**2), onde n representa o tamanho da lista de 1 a n. Esta função utiliza duas funções
    de ordem superior, map e soma_raizes(n)[Definida acima] que por si usa um reduce. Map é O(n) no average-case, 
    dependendo sempre da função passada como parâmetro. Map irá aplicar a função a cada elemento da lista, portanto é
    O(n), porem, a função passada neste caso é um reduce, que irá pegar no elemento, produzir uma lista de 1 a elemento,
    e fazer calculos sobre ela. Portanto, será n*n, que sera n**2, portanto O(n**2).
    
    >>> lista_somas_raizes(1) #n=1
    [1.0]
    >>> [lista_somas_raizes(3)[0], round(lista_somas_raizes(3)[1],3),round(lista_somas_raizes(3)[2],3)] == [1.0, 2.414, 4.146]
    True
    """
    return map(lambda x: soma_raizes(x), range(1,n+1))

def explora(funcao, lista, elemento):
    """
    Obtem a lista com os primeiros n resultados das operações feita pela 'funcao' até ao resultado final, usando o 
    resultado anterior na lista para o novo calculo.
    
    Requires: funcao é uma funcao, lista é uma lista, elemento é o primeiro elemento(elemento neutro normalmente) 
    da 'funcao', podendo ser int, float, string ou outros.
    Ensures: Uma lista com os resultados das operações da 'funcao' aos varios elementos da lista.
    
    Complexidade Algoritmica: O(n), onde n representa o tamanho da lista passada como parâmetro. Esta função itera pela
    lista, de 0 a len(lista)(exluindo), o que significa que será O(n). Append é apenas O(1) e como assumimos que a 
    função passada como parâmetro é O(1), esta não irá alterar a complexidade algorítmica,pois n*1=n, 
    pelo que o resultado final é O(n).
    
    Caracteristicas e Regiões:
    - Função que não utiliza nenhum dos elementos da lista passada(independente) T/F
    - Len Lista(0, 1, >1)
    - Elemento Neutro Correto T/F
    
    >>> explora(lambda acc, y:4, [1,2,3], 0) #T,>1,TF(irrelevante)
    [0, 4, 4, 4]
    >>> explora(lambda acc, y:acc+y, [], 0) #F,0,T
    [0]
    >>> explora(lambda acc, y: acc+y, [], 1) #F,0,F
    [1]
    >>> explora(lambda acc, y: acc+y, [1,2,3], 2) #F,>1,F
    [2, 3, 5, 8]
    >>> explora(lambda acc, y: acc+y, [1,2,3],0) #F,>1,T
    [0, 1, 3, 6]
    >>> explora(lambda acc, y: acc+y, [1],0) #F,1,T
    [0, 1]
    >>> explora(lambda acc,y: acc+y, [1],1) #F,1,F
    [1, 2]
    >>> explora(lambda acc,y:5,[1],0)#T,1,TF(Irrelevante)
    [0, 5]
    >>> explora(lambda acc,y:5,[],1)#T,1,TF(Irrelevante pois como a função não tem uma operação não há elemento neutro,é apenas um elemento que vai ser usado primeiro)
    [1]
    """
    lista2=[elemento]
    for i in range(0,len(lista),1):
        lista2.append(funcao(lista2[-1],lista[i]))
    return lista2

def lista_somas_raizes_explora(n):
    """
    Obtem a lista das somas das primeiras n raizes quadradas, usando o resultado anterior como otimização.
    
    Requires: n é int>0
    Ensures: Uma lista com a soma das primeiras n raizes quadradas.
    
    Complexidade Algoritmica: O(n), onde n representa o tamanho da lista 1 a n, que é gerada pelo range(1,n+1), 
    gerando uma lista de 1 a n. A função lista_somas_raizes_explora utiliza a função explora, que por si mesmo é uma 
    função O(n), que é passada a função lambda acc, y:acc+math.sqrt(y) como parâmetro, que é uma função O(1), não 
    mudando a complexidade algoritmica(n*1=n), pelo que o resultado final é O(n).
    
    >>> lista_somas_raizes_explora(1) #n=1
    [1.0]
    >>> [lista_somas_raizes_explora(3)[0], round(lista_somas_raizes_explora(3)[1],3), round(lista_somas_raizes_explora(3)[2],3)] == [1.0, 2.414, 4.146] #n>1, n=3
    True
    """
    return explora(lambda acc, y:acc+math.sqrt(y),range(2,n+1),1.0)


if __name__ == "__main__":
    import doctest
    doctest.testmod()