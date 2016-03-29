import unittest
from ch2 import problems
from ch2.resource.plotting import plot
from ch2.resource.GF2 import one

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


class TestProblems(unittest.TestCase):
    def test_my_filter(self):
        self.assertEqual(problems.my_filter([1, 2, 4, 5, 7], 2), [1, 5, 7])

    def test_my_lists(self):
        self.assertEqual(problems.my_lists([1, 2, 3]), [[1], [1, 2], [1, 2, 3]])
        self.assertEqual(problems.my_lists([0]), [[]])

    def test_my_function_composition(self):
        f = {0: 'a', 1: 'b'}
        g = {'a': 'apple', 'b': 'banana'}
        self.assertEqual(problems.my_function_composition(f, g), {0: 'apple', 1: 'banana'})

    def test_mySum(self):
        self.assertEqual(problems.mySum([]), 0)
        self.assertEqual(problems.mySum([1, 2, 3, 4]), 10)

    def test_myProduct(self):
        self.assertEqual(problems.myProduct([]), 1)
        self.assertEqual(problems.myProduct([1, 2, 3, 4]), 24)

    def test_myMin(self):
        self.assertEqual(problems.myMin([]), None)
        self.assertEqual(problems.myMin([1, 2, 3, 4]), 1)
        self.assertEqual(problems.myMin([-1, 10, -3, 5, -8, 11]), -8)

    def test_myConcat(self):
        self.assertEqual(problems.myConcat([]), "")
        self.assertEqual(problems.myConcat(["Hello ", "world, ", "everyone!"]), "Hello world, everyone!")

    def test_myUnion(self):
        self.assertEqual(problems.myUnion([]), set())
        self.assertEqual(problems.myUnion([{1, 2}, {3, 4}, {1, 5}, {3, 6}]), {1, 2, 3, 4, 5, 6})

    def test_transform(self):
        L = [2 + 2j, 3 + 2j, 1.75 + 1j, 2 + 1j, 2.25 + 1j, 2.5 + 1j, 2.75 + 1j, 3 + 1j, 3.25 + 1j]
        self.assertEqual(problems.transform(0.5j, 1 + 1j, [2 + 2j, -4 - 4j]), [2j, -1j + 3])

        # plot(problems.transform(-2j, 1 + 1j, L), 10)
        plot(problems.transform(-2j, 0, L), 10)

    def test_gf(self):
        self.assertEqual(one, one + one + one + 0)
        self.assertEqual(0, one * one + 0 * one + 0 * 0 + one * one)
        self.assertEqual(0, (one + one + one) * (one + one + one + one))


if __name__ == '__main__':
    unittest.main()
