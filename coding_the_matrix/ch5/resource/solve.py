## develop own linear equation solver based on numpy
## 2016 Igor Kramer

import numpy as np
import doctest

from ch2.resource.GF2 import one
from ch3.resource.vecutil import list2vec
from ch3.vec import Vec
from ch5.resource.matutil import listlist2mat


def _solve(a, b):
    """
    Given a matrix as list of lists and a vector as list, that hold the params of a linear equation. A vector as list of params solving the equation is returned.
    Example:
    3x + y = 9
    x + 2y = 8
    ------------------
    solution: x=2, y=3
    ------------------
    >>> a = np.array([[3,1], [1,2]])
    >>> b = np.array([9,8])
    >>> solve(a,b)
    array([ 2.,  3.])

    >>> a0 = np.array([[1,2,7], [3,4,5], [10,0,2]])
    >>> b0 = np.array([1,5,30])
    >>> x0=solve(a0,b0)

    ### solution is an array with some round errors in float close to [ 3.,  -1.,  0. ]
    >>> v_b0 = list2vec(b0)
    >>> v_x0 = list2vec(x0)
    >>> M_a0 = listlist2mat(a0)
    >>> M_a0.D[1] == v_x0.D
    True

    >>> (v_b0-M_a0*v_x0).is_almost_zero()
    True

    >>> doctest.IGNORE_EXCEPTION_DETAIL
    32

    Remark: numpy solve does not handle some corner cases of linear equations, where other approaches must be used

    example 1 from solver.solve
    >>> a1 = np.array([[1,2],[3,4],[10,0]])
    >>> b1 = np.array([1,5,30])
    >>> solve(a1,b1)
    Traceback (most recent call last):
    numpy.linalg.linalg.LinAlgError: Last 2 dimensions of the array must be square

    example 2 from solver.solve
    >>> a2 = np.array([[0,0],[0,1]])
    >>> b2 = np.array([2,3])
    >>> solve(a2,b2)
    Traceback (most recent call last):
    numpy.linalg.linalg.LinAlgError: Singular matrix

    """
    return np.linalg.lstsq(a, b) if isinstance(a, int) else np.linalg.lstsq(a, b)
    # return np.linalg.solve(a, b) if isinstance(a, int) else np.linalg.solve(a, b)


def solve(a, b):
    mat_list = []
    vec_list = []
    D = list(a.D[1])

    for r in a.D[0]:
        row_list = []
        for c in a.D[1]:
            row_list.append(a[r, c])
        mat_list.append(row_list)
        vec_list.append(b[r])

    solution = _solve(mat_list, vec_list)[0]

    return Vec(set(D), {D[i]: solution[i] for i in range(len(D))})
