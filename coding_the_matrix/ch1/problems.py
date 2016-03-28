__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


def increments(L):
    return [i + 1 for i in L]


def cubes(L):
    return [i ** 3 for i in L]


def tuple_sum(A, B):
    if len(A) != len(B):
        return None

    l = []
    for i in range(len(A)):
        a0, a1 = A[i]
        b0, b1 = B[i]
        l.append((a0 + b0, a1 + b1))

    return l


def inv_dict(d):
    return {v: k for k, v in d.items()}


def row(p, n):
    return [p + i for i in range(n)]
