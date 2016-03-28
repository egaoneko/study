import unittest
from ch1 import dictutil, problems

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


class TestDictUtil(unittest.TestCase):
    def test_dict2list(self):
        dct = {'a': 'A', 'b': 'B', 'c': 'C'}
        keylist = ['b', 'c', 'a']
        self.assertEqual(dictutil.dict2list(dct, keylist), ['B', 'C', 'A'])

    def test_list2dict(self):
        L = ['A', 'B', 'C']
        keylist = ['a', 'b', 'c']
        self.assertEqual(dictutil.list2dict(L, keylist), {'a': 'A', 'b': 'B', 'c': 'C'})

    def test_listrange2dict(self):
        L = ['A', 'B', 'C']
        self.assertEqual(dictutil.listrange2dict(L), {0: 'A', 1: 'B', 2: 'C'})


class TestProblems(unittest.TestCase):
    def test_increments(self):
        self.assertEqual(problems.increments([1, 5, 7]), [2, 6, 8])

    def test_cubes(self):
        self.assertEqual(problems.cubes([1, 2, 3]), [1, 8, 27])

    def test_tuple_sum(self):
        A = [(1, 2), (10, 20)]
        B = [(3, 4), (30, 40)]
        self.assertEqual(problems.tuple_sum(A, B), [(4, 6), (40, 60)])
        self.assertEqual(problems.tuple_sum(A, []), None)

    def test_inv_dict(self):
        d = {'thank you': 'merci', 'goodbye': 'au revoir'}
        self.assertEqual(problems.inv_dict(d), {'merci': 'thank you', 'au revoir': 'goodbye'})

    def test_row(self):
        self.assertEqual(problems.row(10, 4), [10, 11, 12, 13])


if __name__ == '__main__':
    unittest.main()
