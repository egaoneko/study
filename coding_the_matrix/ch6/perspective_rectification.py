from ch3.vec import Vec

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


# img1, img2 = im_util.file2mat('resource/image.png')

# Task 5.12.1
def move2board(y):
  return Vec({'y1', 'y2', 'y3'},
             {'y1': y.f['y1'] / y.f['y3'], 'y2': y.f['y2'] / y.f['y3'], 'y3': y.f['y3'] / y.f['y3']})


# Task 5.12.2
D = {(a, b) for a in {'y1', 'y2', 'y3'} for b in {'x1', 'x2', 'x3'}}


def make_equations(x1, x2, w1, w2):
  u = Vec(D, {('y3', 'x1'): w1 * x1, ('y3', 'x2'): w1 * x2, ('y3', 'x3'): w1, ('y1', 'x1'): -x1, ('y1', 'x2'): -x2,
              ('y1', 'x3'): -1})
  v = Vec(D, {('y3', 'x1'): w2 * x1, ('y3', 'x2'): w2 * x2, ('y3', 'x3'): w2, ('y2', 'x1'): -x1, ('y2', 'x2'): -x2,
              ('y2', 'x3'): -1})
  return [u, v]


# Task 6.12.3

w = Vec({(a, b) for a in {'y1', 'y2', 'y3'} for b in {'x1', 'x2', 'x3'}}, {('y1', 'x1'): 1})


if __name__ == '__main__':
  v = Vec({'y1', 'y2', 'y3'}, {'y1': 1, 'y2': 2, 'y3': 3})

  # Task 5.12.1
  print(move2board(v))

  # Task 5.12.2
  print(D)
  for v in make_equations(18, 23, 1, 1): print(v)

  # Task 6.12.3
  print(w)
