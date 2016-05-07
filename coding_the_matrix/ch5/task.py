from ch2.resource.GF2 import one
from ch3.vec import Vec
from ch5.mat import Mat
from ch5.resource.matutil import rowdict2mat, coldict2mat

import sys

sys.path.insert(0, "../ch3")
sys.path.insert(0, "../ch2/resource")
# from ch5.resource.solver import solve
from ch5.resource.solve import solve

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# Quiz 5.1.8
def identity(D):
    return Mat((D, D), {(d, d): 1 for d in D})


# Quiz 5.1.9
def mat2rowdict(A):
    return {r: Vec(A.D[1], {c: A.f[(r, c)] for c in A.D[1]}) for r in A.D[0]}


# Quiz 5.1.10
def mat2coldict(A):
    return {c: Vec(A.D[0], {r: A.f[(r, c)] for r in A.D[0]}) for c in A.D[1]}


# Quiz 5.3.1
def mat2vec(M):
    return Vec({(r, c) for r in M.D[0] for c in M.D[1]}, M.f)


# Quiz 5.4.2
def transpose(M):
    return Mat((M.D[1], M.D[0]), {(c, r): M.f[r, c] for r in M.D[0] for c in M.D[1]})
    # return Mat((M.D[1], M.D[0]), {(c, r): v for (r, c), v in M.f.items()})


# Example 5.5.12
def button_vectors(n):
    D = {(i, j) for i in range(n) for j in range(n)}
    vecdict = {(i, j): Vec(D, dict([((x, j), one) for x in range(max(i - 1, 0), min(i + 2, n))]
                                   + [((i, y), one) for y in range(max(j - 1, 0), min(j + 2, n))]))
               for (i, j) in D}
    return vecdict


# Quiz 5.10.21
def diag(D, entries):
    return Mat((D, D), {(d, d): entries[d] for d in D})


if __name__ == '__main__':
    # Quiz 5.1.1
    print([[0 for j in range(4)] for i in range(3)])

    # Quiz 5.1.2
    print([[i - j for i in range(3)] for j in range(4)])

    # Quiz 5.1.4
    print(Vec({'a', 'b'}, {'a': 3, 'b': 30}))

    # Quiz 5.1.5
    print({'@': Vec({'a', 'b'}, {'a': 1, 'b': 10}),
           '#': Vec({'a', 'b'}, {'a': 2, 'b': 20}),
           '?': Vec({'a', 'b'}, {'a': 3, 'b': 30})})

    # Quiz 5.1.7
    print(Mat(({'a', 'b', 'c'}, {'a', 'b', 'c'}), {('a', 'a'): 1, ('b', 'b'): 1, ('c', 'c'): 1}))

    # Quiz 5.1.8
    print(identity({'a', 'b', 'c'}))

    M = Mat(({'a', 'b'}, {'@', '#', '?'}),
            {('a', '@'): 1, ('a', '#'): 2, ('a', '?'): 3, ('b', '@'): 10, ('b', '#'): 20, ('b', '?'): 30})

    # Quiz 5.1.9
    print(mat2rowdict(M))

    # Quiz 5.1.10
    print(mat2coldict(M))

    # Quiz 5.3.1
    print(mat2vec(M))

    # Quiz 5.4.2
    print(transpose(M))

    # Example 5.5.10
    D = {'metal', 'concrete', 'plastic', 'water', 'electricity'}
    v_gnome = Vec(D, {'concrete': 1.3, 'plastic': .2, 'water': .8, 'electricity': .4})
    v_hoop = Vec(D, {'plastic': 1.5, 'water': .4, 'electricity': .3})
    v_slinky = Vec(D, {'metal': .25, 'water': .2, 'electricity': .7})
    v_putty = Vec(D, {'plastic': .3, 'water': .7, 'electricity': .5})
    v_shooter = Vec(D, {'metal': .15, 'plastic': .5, 'water': .4, 'electricity': .8})

    rowdict = {'gnome': v_gnome, 'hoop': v_hoop, 'slinky': v_slinky, 'putty': v_putty, 'shooter': v_shooter}
    M = rowdict2mat(rowdict)
    print(M)

    R = {'gnome', 'hoop', 'slinky', 'putty', 'shooter'}
    u = Vec(R, {'putty': 133, 'gnome': 240, 'slinky': 150, 'hoop': 55, 'shooter': 90})
    print(u * M)

    # Example 5.5.12
    B = coldict2mat(button_vectors(5))
    print(B)
    s = Vec(B.D[0], {(2, 2): one})

    # Example 5.5.15
    b = Vec(D, {'water': 373.1, 'concrete': 312.0, 'plastic': 215.4, 'metal': 51.0, 'electricity': 356.0})
    # help(solve)
    print(isinstance(M, Mat))
    print(isinstance(b, Vec))
    print(b.D == M.transpose().D[0])

    solution = solve(M.transpose(), b)
    print(solution)

    residual = b - solution * M
    print(residual * residual)

    # Example 5.5.16
    # sol = solve(B, s)
    # print(sol)
    # print(B * sol == s)
    # print([(i, j) for (i, j) in sol.D if sol[i, j] == one])

    # Example 5.6.4
    # D_high = {(i, j) for i in range(3000) for j in range(2000)}
    # D_low = {(i, j) for i in range(750) for j in range(500)}
    # M = Mat((D_low, D_high), {((i, j), (4 * i + m, 4 * j + n)): 1. / 16 for m in range(4) for n in range(4)
    #                           for i in range(750) for j in range(500)})
    # print(D_high)
    # print(D_low)
    # print(M)

    # Example 5.6.7
    D = {'radio', 'sensor', 'memory', 'CPU'}
    v0 = Vec(D, {'radio': .1, 'CPU': .3})
    v1 = Vec(D, {'sensor': .2, 'CPU': .4})
    v2 = Vec(D, {'memory': .3, 'CPU': .1})
    v3 = Vec(D, {'memory': .5, 'CPU': .4})
    v4 = Vec(D, {'radio': .2, 'CPU': .5})

    b = Vec({0, 1, 2, 3, 4}, {0: 140.0, 1: 170.0, 2: 60.0, 3: 170.0, 4: 250.0})
    A = rowdict2mat([v0, v1, v2, v3, v4])
    print(A)
    print(b)
    rate = solve(A, b)
    print(rate)

    # Example 5.6.11
    A = Mat(({'a', 'b', 'c'}, {'#', '@', '?'}),
            {('a', '#'): 2, ('a', '?'): 3,
             ('b', '@'): 10, ('b', '#'): 20, ('b', '?'): 30,
             ('c', '#'): 35})

    print(A)
    print(A.pp(['b', 'a', 'c'], ['@', '?', '#']))

    # Quiz 5.10.21
    print(diag({'a', 'b', 'c'}, {'a': 1, 'b': 2, 'c': 3}))

    # Section 5.11.2
    D = {1, 2, 3, 4}
    A = Mat((D, D), {(1, 2): 1, (1, 4): 1, (2, 1): 1, (2, 3): 2, (2, 4): 1, (3, 2): 2, (4, 1): 1, (4, 2): 1})
    print(A * A)
    print((A * A) * A)
