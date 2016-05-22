from math import *
import sys
print(sys.maxsize)


def solution(K, L, M, N, P, Q, R, S):
    # write your code in Python 2.7

    if M < K or N < L or R < P or S < Q: return -1

    rect1_area = (M - K) * (N - L)
    rect2_area = (R - P) * (S - Q)
    intersect_area = max(0, min(M, R) - max(K, P)) * max(0, min(N, S) - max(L, Q))

    sum_area = rect1_area + rect2_area - intersect_area
    return sum_area if sum_area < 2**31 - 1 else - 1

if __name__ == '__main__':
    print(solution(-4, 1, 2, 6, 0, -1, 4, 3))
    print(solution(-4, 1, 2, 6, -6, -1, -2, 3))
    print(solution(-4, 1, 2, 6, -6, 4, -2, 8))
    print(solution(-4, 1, 2, 6, 0, 4, 4, 8))
    print(solution(-4, 1, 2, 6, 2, -1, 6, 3))
    print(solution(-4, 1, 2, 6, -3, 1, 1, 5))
    print(solution(-100000, -100000, 100000, 100000, -3, 1, 1, 5))
