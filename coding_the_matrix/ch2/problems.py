__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# Problem 2.7.1
def my_filter(L, num):
    return [x for x in L if x % num % num != 0]


# Problem 2.7.2
def my_lists(L):
    if len(L) == 1 and L[0] == 0:
        return [[]]
    return [[L[y] for y in range(x)] for x in range(1, len(L) + 1)]


# Problem 2.7.3
def my_function_composition(f, g):
    return {k: g[v] for k, v in f.items()}


# Problem 2.7.4
def mySum(L):
    current = 0
    for x in L:
        current += x
    return current


# Problem 2.7.5
def myProduct(L):
    current = 1
    for x in L:
        current *= x
    return current


# Problem 2.7.6
def myMin(L):
    current = None
    for x in L:
        if current is None or current > x:
            current = x
    return current


# Problem 2.7.7
def myConcat(L):
    current = ""
    for x in L:
        current += x
    return current


# Problem 2.7.8
def myUnion(L):
    current = set()
    for x in L:
        current.update(x)
    return current


# Problem 2.7.12
def transform(a, b, L):
    return [a * z + b for z in L]
