from ch5.resource.matutil import *
from ch3.resource.vecutil import *
from ch5.resource.bitutil import *
from ch5 import mat
from ch3 import vec
from ch2.resource.GF2 import one

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"

G = listlist2mat([
    [one, 0, one, one],
    [one, one, 0, one],
    [0, 0, 0, one],
    [one, one, one, 0],
    [0, 0, one, 0],
    [0, one, 0, 0],
    [one, 0, 0, 0]
])

H = listlist2mat([
    [0, 0, 0, one, one, one, one],
    [0, one, one, 0, 0, one, one],
    [one, 0, one, 0, one, 0, one]
])

R = listlist2mat([
    [0, 0, 0, 0, 0, 0, one],
    [0, 0, 0, 0, 0, one, 0],
    [0, 0, 0, 0, one, 0, 0],
    [0, 0, one, 0, 0, 0, 0]
])


# Task 5.14.4
def find_error(c):
    return H * c


# Task 5.14.5
def find_error_matrix(S):
    has_error = False
    error_matrix = list2vec([0, 0, 0, 0, 0, 0, 0])
    idx = 0
    for i in range(3):
        if S[i] == one:
            has_error = True
            idx += (2 ** (2 - i))

    if idx != 0:
        error_matrix[idx - 1] = one
    return error_matrix, has_error


# Task 5.14.12 and Task 5.14.13
def correct(A):
    B, has_error = find_error_matrix(find_error(A))
    return A + B


# Task 5.14.14
def noise_str(S, freq):
    # convert str to bit
    P = bits2mat(str2bits(S))
    C = G * P
    E = noise(C, freq)
    CTILDE = E + C
    print('-' * 50)
    print("Noise String Test(Frequency: {})".format(str(freq)))
    print('-' * 50)
    print(S)
    print(bits2str(mat2bits(R * CTILDE)))

    # correct matrix
    coldict = mat2coldict(CTILDE)
    for col in coldict:
        coldict[col] = correct(coldict[col])
    corrected_CTILDE = coldict2mat(coldict)
    print(bits2str(mat2bits(R * corrected_CTILDE)))
    print('-' * 50)


if __name__ == '__main__':
    # Task 5.14.1
    V = list2vec([one, 0, 0, one])
    c = G * V
    print(c)

    # Task 5.14.2
    print(R * c)
    print(R * G)

    # Task 5.14.3
    print(H * G)

    # Task 5.14.4
    print(find_error(list2vec([one, 0, one, one, 0, one, one])))
    print(find_error(list2vec([one, 0, one, one, 0, one, 0])))
    print(find_error(c))

    # Task 5.14.5
    print(find_error_matrix(list2vec([one, one, one])))
    print(find_error_matrix(list2vec([0, 0, one])))

    # Task 5.14.6
    print(bits2str(str2bits('abc')))

    # Task 5.14.7
    P = bits2mat(str2bits('abc'))
    print(P)
    P8 = bits2mat(str2bits('abc'), 8)
    print(P8)
    RP = bits2str(mat2bits(P))
    print(RP)

    # Task 5.14.8
    S = "I'm trying to free your mind, Neo. But I can only show you the door. " \
        "You're the one that has to walk through it."
    P = bits2mat(str2bits(S))
    print(P)
    print(bits2str(mat2bits(P)))

    # Task 5.14.9
    E = noise(P, 0.02)
    print(bits2str(mat2bits(E + P)))

    # Task 5.14.10
    C = G * P
    print(C)
    print(R * C)

    # Task 5.14.11
    E = noise(C, 0.02)
    CTILDE = E + C
    print(bits2str(mat2bits(R * CTILDE)))

    # Task 5.14.12 and Task 5.14.13
    c = list2vec([one, 0, one, one, 0, one, one])
    print(find_error(c))
    print(c + correct(c))

    coldict = mat2coldict(CTILDE)
    for col in coldict:
        coldict[col] = correct(coldict[col])
    corrected_CTILDE = coldict2mat(coldict)
    print(bits2str(mat2bits(R * corrected_CTILDE)))

    # Task 5.14.14
    noise_str(S, 0.01)
    noise_str(S, 0.02)
    noise_str(S, 0.03)
    noise_str(S, 0.04)
    noise_str(S, 0.05)
    noise_str(S, 0.1)
    noise_str(S, 1)
