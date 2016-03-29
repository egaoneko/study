__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# Task 1.5.30
def dict2list(dct, keylist):
    return [dct[k] for k in keylist]


# Task 1.5.31
def list2dict(L, keylist):
    return {keylist[i]: L[i] for i in range(len(L))}


# Task 1.6.4
def listrange2dict(L):
    return {i: L[i] for i in range(len(L))}
