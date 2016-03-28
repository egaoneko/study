__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


def dict2list(dct, keylist):
    return [dct[k] for k in keylist]


def list2dict(L, keylist):
    return {keylist[i]: L[i] for i in range(len(L))}


def listrange2dict(L):
    return {i: L[i] for i in range(len(L))}
