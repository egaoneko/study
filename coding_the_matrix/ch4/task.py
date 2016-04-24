from ch3.vec import Vec

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# Quiz 4.1.7
def lin_comb(vlist, clist):
    return sum([clist[i] * vlist[i] for i in range(len(vlist))])


# Quiz 4.2.13
def standard(D, one):
    return [Vec(D, {k: one}) for k in D]
