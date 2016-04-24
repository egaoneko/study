from itertools import product

from ch3.vec import Vec
from ch2.resource.GF2 import one

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# Problem 4.8.1
def vec_select(veclist, k):
    return [v for v in veclist if v[k] == 0]


def vec_sum(veclist, D):
    sum_vec = Vec(D, {})
    for vec in veclist:
        sum_vec += vec
        # for d in D:
        #     sum_vec[d] += vec[d]
    return sum_vec


def vec_select_sum(veclist, k, D):
    return vec_sum(vec_select(veclist, k), D)


# Problem 4.8.2
def scale_vecs(vecdict):
    return [v / k for k, v in vecdict.items()]


# Problem 4.8.3
def GF2_span(D, L):
    l = list()

    for pd in product([0, one], repeat=len(L)):
        sum_vec = Vec(D, {})
        for idx in range(len(L)):
            sum_vec += pd[idx] * L[idx]
        l.append(sum_vec)

    return l
