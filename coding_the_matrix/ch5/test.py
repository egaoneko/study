import unittest

from ch3.vec import Vec
from ch5.mat import Mat

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


class TestMat(unittest.TestCase):
    def test_getitem(self):
        M = Mat(({1, 3, 5}, {'a'}), {(1, 'a'): 4, (5, 'a'): 2})
        self.assertEqual(M[1, 'a'], 4)
        self.assertEqual(M[3, 'a'], 0)

    def test_getitem_NotExist_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            M = Mat(({1, 3, 5}, {'a'}), {(1, 'a'): 4, (5, 'a'): 2})
            var = M[1, 'e']

        with self.assertRaises(AssertionError):
            M = Mat(({1, 3, 5}, {'a'}), {(1, 'a'): 4, (5, 'a'): 2})
            var = M[2, 'a']

    def test_equal(self):
        self.assertEqual(Mat(({'a', 'b'}, {'A', 'B'}), {('a', 'B'): 0}), Mat(({'a', 'b'}, {'A', 'B'}), {('b', 'B'): 0}))

        A = Mat(({'a', 'b'}, {'A', 'B'}), {('a', 'B'): 2, ('b', 'A'): 1})
        B = Mat(({'a', 'b'}, {'A', 'B'}), {('a', 'B'): 2, ('b', 'A'): 1, ('b', 'B'): 0})
        C = Mat(({'a', 'b'}, {'A', 'B'}), {('a', 1): 2, ('b', 'A'): 1, ('b', 'B'): 5})
        self.assertEqual(A, B)
        self.assertEqual(B, A)
        self.assertFalse(C == A)
        self.assertEqual(A, Mat(({'a', 'b'}, {'A', 'B'}), {('a', 'B'): 2, ('b', 'A'): 1}))

    def test_equal_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            Mat(({'a', 'b'}, {'A', 'B'}), {('a', 'B'): 2, ('b', 'A'): 1}) == Mat(({'a'}, {'A', 'B'}),
                                                                                 {('a', 'B'): 2, ('b', 'A'): 1})

    def test_setitem(self):
        M = Mat(({'a', 'b', 'c'}, {5}), {('a', 5): 3, ('b', 5): 7})
        M['b', 5] = 9
        M['c', 5] = 13
        self.assertEqual(M, Mat(({'a', 'b', 'c'}, {5}), {('a', 5): 3, ('b', 5): 9, ('c', 5): 13}))

        N = Mat(({((),), 7}, {True, False}), {})
        N[(7, False)] = 1
        N[(((),), True)] = 2
        self.assertEqual(N, Mat(({((),), 7}, {True, False}), {(7, False): 1, (((),), True): 2}))

    def test_setitem_NotExist_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            M = Mat(({1, 3, 5}, {'a'}), {(1, 'a'): 4, (5, 'a'): 2})
            M[1, 'e'] = 0

        with self.assertRaises(AssertionError):
            M = Mat(({1, 3, 5}, {'a'}), {(1, 'a'): 4, (5, 'a'): 2})
            M[2, 'a'] = 0

    def test_add(self):
        A1 = Mat(({3, 6}, {'x', 'y'}), {(3, 'x'): -2, (6, 'y'): 3})
        A2 = Mat(({3, 6}, {'x', 'y'}), {(3, 'y'): 4})
        B = Mat(({3, 6}, {'x', 'y'}), {(3, 'x'): -2, (3, 'y'): 4, (6, 'y'): 3})
        self.assertEqual(A1 + A2, B)

        self.assertEqual(A2 + A1, B)

        self.assertEqual(A1, Mat(({3, 6}, {'x', 'y'}), {(3, 'x'): -2, (6, 'y'): 3}))

        zero = Mat(({3, 6}, {'x', 'y'}), {})
        self.assertEqual(B + zero, B)

        C1 = Mat(({1, 3}, {2, 4}), {(1, 2): 2, (3, 4): 3})
        C2 = Mat(({1, 3}, {2, 4}), {(1, 4): 1, (1, 2): 4})
        D = Mat(({1, 3}, {2, 4}), {(1, 2): 6, (1, 4): 1, (3, 4): 3})
        self.assertEqual(C1 + C2, D)

    def test_add_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            Mat(({3, 6}, {'x', 'y'}), {(3, 'x'): -2}) + Mat(({3, 6}, {'x'}), {(3, 'x'): -2})

        with self.assertRaises(AssertionError):
            Mat(({3, 6}, {'x'}), {(3, 'x'): -2}) + Mat(({3, 6}, {'x', 'y'}), {(3, 'x'): -2})

    def test_scalar_mul(self):
        M = Mat(({1, 3, 5}, {2, 4}), {(1, 2): 4, (5, 4): 2, (3, 4): 3})
        self.assertEqual(0 * M, Mat(({1, 3, 5}, {2, 4}), {}))
        self.assertEqual(1 * M, M)
        self.assertEqual(0.25 * M, Mat(({1, 3, 5}, {2, 4}), {(1, 2): 1.0, (5, 4): 0.5, (3, 4): 0.75}))

    def test_transpose(self):
        M = Mat(({0, 1}, {0, 1}), {(0, 1): 3, (1, 0): 2, (1, 1): 4})
        self.assertEqual(M.transpose(), Mat(({0, 1}, {0, 1}), {(0, 1): 2, (1, 0): 3, (1, 1): 4}))

        M = Mat(({'x', 'y', 'z'}, {2, 4}), {('x', 4): 3, ('x', 2): 2, ('y', 4): 4, ('z', 4): 5})
        Mt = Mat(({2, 4}, {'x', 'y', 'z'}), {(4, 'x'): 3, (2, 'x'): 2, (4, 'y'): 4, (4, 'z'): 5})
        self.assertEqual(M.transpose(), Mt)

    def test_vector_matrix_mul(self):
        v1 = Vec({1, 2, 3}, {1: 1, 2: 8})
        M1 = Mat(({1, 2, 3}, {'a', 'b', 'c'}), {(1, 'b'): 2, (2, 'a'): -1, (3, 'a'): 1, (3, 'c'): 7})
        self.assertEqual(v1 * M1, Vec({'a', 'b', 'c'}, {'a': -8, 'b': 2, 'c': 0}))
        self.assertEqual(v1, Vec({1, 2, 3}, {1: 1, 2: 8}))
        self.assertEqual(M1, Mat(({1, 2, 3}, {'a', 'b', 'c'}), {(1, 'b'): 2, (2, 'a'): -1, (3, 'a'): 1, (3, 'c'): 7}))

        v2 = Vec({'a', 'b'}, {})
        M2 = Mat(({'a', 'b'}, {0, 2, 4, 6, 7}), {})
        self.assertEqual(v2 * M2, Vec({0, 2, 4, 6, 7}, {}))

        v3 = Vec({'a', 'b'}, {'a': 1, 'b': 1})
        M3 = Mat(({'a', 'b'}, {0, 1}), {('a', 1): 1, ('b', 1): 1, ('a', 0): 1, ('b', 0): 1})
        self.assertEqual(v3 * M3, Vec({0, 1}, {0: 2, 1: 2}))

    def test_vector_matrix_mul_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            v1 = Vec({1, 2}, {1: 1, 2: 8})
            M1 = Mat(({1, 2, 3}, {'a', 'b', 'c'}), {(1, 'b'): 2, (2, 'a'): -1, (3, 'a'): 1, (3, 'c'): 7})
            v1 * M1

        with self.assertRaises(AssertionError):
            v1 = Vec({1, 2, 3}, {1: 1, 2: 8})
            M1 = Mat(({1, 2}, {'a', 'b', 'c'}), {(1, 'b'): 2, (2, 'a'): -1, (3, 'a'): 1, (3, 'c'): 7})
            v1 * M1

    def test_matrix_vector_mul(self):
        N1 = Mat(({1, 3, 5, 7}, {'a', 'b'}),
                 {(1, 'a'): -1, (1, 'b'): 2, (3, 'a'): 1, (3, 'b'): 4, (7, 'a'): 3, (5, 'b'): -1})
        u1 = Vec({'a', 'b'}, {'a': 1, 'b': 2})
        self.assertEqual(N1 * u1, Vec({1, 3, 5, 7}, {1: 3, 3: 9, 5: -2, 7: 3}))
        self.assertEqual(N1, Mat(({1, 3, 5, 7}, {'a', 'b'}),
                                 {(1, 'a'): -1, (1, 'b'): 2, (3, 'a'): 1, (3, 'b'): 4, (7, 'a'): 3, (5, 'b'): -1}))
        self.assertEqual(u1, Vec({'a', 'b'}, {'a': 1, 'b': 2}))

        N2 = Mat(({('a', 'b'), ('c', 'd')}, {1, 2, 3, 5, 8}), {})
        u2 = Vec({1, 2, 3, 5, 8}, {})
        self.assertEqual(N2 * u2, Vec({('a', 'b'), ('c', 'd')}, {}))

        M3 = Mat(({0, 1}, {'a', 'b'}), {(0, 'a'): 1, (0, 'b'): 1, (1, 'a'): 1, (1, 'b'): 1})
        v3 = Vec({'a', 'b'}, {'a': 1, 'b': 1})
        self.assertEqual(M3 * v3, Vec({0, 1}, {0: 2, 1: 2}))

    def test_matrix_vector_mul_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            N1 = Mat(({1, 3, 5, 7}, {'a'}),
                     {(1, 'a'): -1, (1, 'b'): 2, (3, 'a'): 1, (3, 'b'): 4, (7, 'a'): 3, (5, 'b'): -1})
            u1 = Vec({'a', 'b'}, {'a': 1, 'b': 2})
            N1 * u1

        with self.assertRaises(AssertionError):
            N1 = Mat(({1, 3, 5, 7}, {'a', 'b'}),
                     {(1, 'a'): -1, (1, 'b'): 2, (3, 'a'): 1, (3, 'b'): 4, (7, 'a'): 3, (5, 'b'): -1})
            u1 = Vec({'a'}, {'a': 1, 'b': 2})
            N1 * u1

    def test_matrix_matrix_mul(self):
        A = Mat(({0, 1, 2}, {0, 1, 2}), {(1, 1): 4, (0, 0): 0, (1, 2): 1, (1, 0): 5, (0, 1): 3, (0, 2): 2})
        B = Mat(({0, 1, 2}, {0, 1, 2}), {(1, 0): 5, (2, 1): 3, (1, 1): 2, (2, 0): 0, (0, 0): 1, (0, 1): 4})
        self.assertEqual(A * B, Mat(({0, 1, 2}, {0, 1, 2}), {(0, 0): 15, (0, 1): 12, (1, 0): 25, (1, 1): 31}))

        C = Mat(({0, 1, 2}, {'a', 'b'}), {(0, 'a'): 4, (0, 'b'): -3, (1, 'a'): 1, (2, 'a'): 1, (2, 'b'): -2})
        D = Mat(({'a', 'b'}, {'x', 'y'}), {('a', 'x'): 3, ('a', 'y'): -2, ('b', 'x'): 4, ('b', 'y'): -1})

        self.assertEqual(C * D, Mat(({0, 1, 2}, {'x', 'y'}), {(0, 'y'): -5, (1, 'x'): 3, (1, 'y'): -2, (2, 'x'): -5}))
        M = Mat(({0, 1}, {'a', 'c', 'b'}), {})
        N = Mat(({'a', 'c', 'b'}, {(1, 1), (2, 2)}), {})
        self.assertEqual(M * N, Mat(({0, 1}, {(1, 1), (2, 2)}), {}))

        E = Mat(({'a', 'b'}, {'A', 'B'}), {('a', 'A'): 1, ('a', 'B'): 2, ('b', 'A'): 3, ('b', 'B'): 4})
        F = Mat(({'A', 'B'}, {'c', 'd'}), {('A', 'd'): 5})
        self.assertEqual(E * F, Mat(({'a', 'b'}, {'d', 'c'}), {('b', 'd'): 15, ('a', 'd'): 5}))
        self.assertEqual(F.transpose() * E.transpose(), Mat(({'d', 'c'}, {'a', 'b'}), {('d', 'b'): 15, ('d', 'a'): 5}))

    def test_matrix_matrix_mul_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            A = Mat(({0, 1, 2}, {0, 1}), {(1, 1): 4, (0, 0): 0, (1, 2): 1, (1, 0): 5, (0, 1): 3, (0, 2): 2})
            B = Mat(({0, 1, 2}, {0, 1, 2}), {(1, 0): 5, (2, 1): 3, (1, 1): 2, (2, 0): 0, (0, 0): 1, (0, 1): 4})
            A * B
