import unittest
from ch3.vec import Vec

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


class TestVec(unittest.TestCase):
    def setUp(self):
        self.v = Vec({'a', 'b', 'c', 'd'}, {'a': 2, 'c': 1, 'd': 3})

    def test_getitem(self):
        self.assertEqual(self.v['d'], 3)
        self.assertEqual(self.v['b'], 0)

    def test_getitem_NotExist_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            var = self.v['e']

    def test_setitem(self):
        self.v['d'] = 5
        self.assertEqual(self.v['d'], 5)

        self.v['b'] = 3
        self.assertEqual(self.v['b'], 3)

        self.v['b'] = 0
        self.assertEqual(self.v['b'], 0)

    def test_setitem_NotExist_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            self.v['e'] = 5

    def tes_equal(self):
        self.assertTrue(Vec({'a', 'b', 'c'}, {'a': 0}) == Vec({'a', 'b', 'c'}, {'b': 0}))
        self.assertTrue(Vec({'a', 'b', 'c'}, {'a': 0}) == Vec({'a', 'b', 'c'}, {}))
        self.assertTrue(Vec({'a', 'b', 'c'}, {}) == Vec({'a', 'b', 'c'}, {'a': 0}))
        self.assertTrue(Vec({'x', 'y', 'z'}, {'y': 1, 'x': 2}) == Vec({'x', 'y', 'z'}, {'y': 1, 'x': 2, 'z': 0}))

        self.assertFalse(Vec({'x', 'y', 'z'}, {'y': 1, 'x': 2}) == Vec({'x', 'y', 'z'}, {'y': 1, 'z': 0}))
        self.assertFalse(Vec({'a', 'b', 'c'}, {'a': 0, 'c': 1}) == Vec({'a', 'b', 'c'}, {'a': 0, 'c': 1, 'b': 4}))
        self.assertFalse(Vec({'a', 'b', 'c'}, {'a': 0, 'c': 1, 'b': 4}) == Vec({'a', 'b', 'c'}, {'a': 0, 'c': 1}))
        self.assertFalse(Vec({'a', 'b'}, {'a': 1}) == Vec({'a', 'b'}, {'b': 1}))
        self.assertFalse(Vec({'a', 'b'}, {'a': 1}) == Vec({'a', 'b'}, {'a': 2}))

    def test_equal_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            Vec({'a', 'b', 'c'}, {'a': 0}) == Vec({'a', 'b'}, {'b': 0})

    def test_add(self):
        a = Vec({'a', 'e', 'i', 'o', 'u'}, {'a': 0, 'e': 1, 'i': 2})
        b = Vec({'a', 'e', 'i', 'o', 'u'}, {'o': 4, 'u': 7})
        c = Vec({'a', 'e', 'i', 'o', 'u'}, {'a': 0, 'e': 1, 'i': 2, 'o': 4, 'u': 7})
        self.assertEqual(a + b, c)

        a == Vec({'a', 'e', 'i', 'o', 'u'}, {'a': 0, 'e': 1, 'i': 2})
        b == Vec({'a', 'e', 'i', 'o', 'u'}, {'o': 4, 'u': 7})
        d = Vec({'x', 'y', 'z'}, {'x': 2, 'y': 1})
        e = Vec({'x', 'y', 'z'}, {'z': 4, 'y': -1})
        f = Vec({'x', 'y', 'z'}, {'x': 2, 'y': 0, 'z': 4})
        self.assertEqual(d + e, f)

        d == Vec({'x', 'y', 'z'}, {'x': 2, 'y': 1})
        e == Vec({'x', 'y', 'z'}, {'z': 4, 'y': -1})
        self.assertEqual(b + Vec({'a', 'e', 'i', 'o', 'u'}, {}), b)

    def test_add_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            Vec({'a', 'b', 'c'}, {'a': 0}) + Vec({'a', 'b'}, {'b': 0})

    def test_scalar_mul(self):
        zero = Vec({'x', 'y', 'z', 'w'}, {})
        u = Vec({'x', 'y', 'z', 'w'}, {'x': 1, 'y': 2, 'z': 3, 'w': 4})

        self.assertEqual(0 * u, zero)
        self.assertEqual(1 * u, u)
        self.assertEqual(0.5 * u, Vec({'x', 'y', 'z', 'w'}, {'x': 0.5, 'y': 1, 'z': 1.5, 'w': 2}))
        self.assertEqual(u, Vec({'x', 'y', 'z', 'w'}, {'x': 1, 'y': 2, 'z': 3, 'w': 4}))

    def test_dot(self):
        u1 = Vec({'a', 'b'}, {'a': 1, 'b': 2})
        u2 = Vec({'a', 'b'}, {'b': 2, 'a': 1})
        self.assertEqual(u1 * u2, 5)
        self.assertEqual(u1, Vec({'a', 'b'}, {'a': 1, 'b': 2}))
        self.assertEqual(u2, Vec({'a', 'b'}, {'b': 2, 'a': 1}))

        v1 = Vec({'p', 'q', 'r', 's'}, {'p': 2, 's': 3, 'q': -1, 'r': 0})
        v2 = Vec({'p', 'q', 'r', 's'}, {'p': -2, 'r': 5})
        self.assertEqual(v1 * v2, -4)

        w1 = Vec({'a', 'b', 'c'}, {'a': 2, 'b': 3, 'c': 4})
        w2 = Vec({'a', 'b', 'c'}, {'a': 12, 'b': 8, 'c': 6})
        self.assertEqual(w1 * w2, 72)

        v1 = Vec({1, 2}, {1: 3, 2: 6})
        v2 = Vec({1, 2}, {1: 2, 2: 1})
        self.assertEqual(v1 * v2, 12)

    def test_dot_NotEqualFields_ExpectedAssertionError(self):
        with self.assertRaises(AssertionError):
            Vec({'a', 'b', 'c'}, {'a': 0}) * Vec({'a', 'b'}, {'b': 0})

    def test_neg(self):
        u = Vec({1, 3, 5, 7}, {1: 1, 3: 2, 5: 3, 7: 4})
        self.assertEqual(-u, Vec({1, 3, 5, 7}, {1: -1, 3: -2, 5: -3, 7: -4}))
        self.assertEqual(u, Vec({1, 3, 5, 7}, {1: 1, 3: 2, 5: 3, 7: 4}))
        self.assertEqual(-Vec({'a', 'b', 'c'}, {'a': 1}), Vec({'a', 'b', 'c'}, {'a': -1}))

    def tearDown(self):
        self.v = None


if __name__ == '__main__':
    unittest.main()
