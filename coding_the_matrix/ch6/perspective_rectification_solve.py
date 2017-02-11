from ch3.vec import Vec
from ch5.mat import Mat
from ch5.resource.matutil import rowdict2mat, mat2coldict, coldict2mat
from ch5.resource import image_mat_util as im_util

import sys

sys.path.insert(0, "../ch3")
sys.path.insert(0, "../ch2/resource")
# from ch5.resource.solver import solve
from ch5.resource.solve import solve


## 1: (Task 5.12.1) Move To Board
def move2board(y):
  return Vec({'y1', 'y2', 'y3'},
             {'y1': y.f['y1'] / y.f['y3'], 'y2': y.f['y2'] / y.f['y3'], 'y3': y.f['y3'] / y.f['y3']})


## 2: () Make domain of vector
D = {(a, b) for a in {'y1', 'y2', 'y3'} for b in {'x1', 'x2', 'x3'}}


## 3: (Task 5.12.2) Make Equations
def make_equations(x1, x2, w1, w2):
  u = Vec(D, {('y3', 'x1'): w1 * x1, ('y3', 'x2'): w1 * x2, ('y3', 'x3'): w1, ('y1', 'x1'): -x1, ('y1', 'x2'): -x2,
              ('y1', 'x3'): -1})
  v = Vec(D, {('y3', 'x1'): w2 * x1, ('y3', 'x2'): w2 * x2, ('y3', 'x3'): w2, ('y2', 'x1'): -x1, ('y2', 'x2'): -x2,
              ('y2', 'x3'): -1})
  return [u, v]


## 4: () Scaling row
w = Vec({(a, b) for a in {'y1', 'y2', 'y3'} for b in {'x1', 'x2', 'x3'}}, {('y1', 'x1'): 1})

## 5: () Right-hand side
b = Vec({x for x in range(9)}, {x: 0 if x != 8 else 1 for x in range(9)})


## 6: () Rows of constraint matrix
def make_nine_equations(corners):
  # veclist = [make_equations(corners[0][0], corners[0][1], 0, 0),
  #            make_equations(corners[1][0], corners[1][1], 0, 1),
  #            make_equations(corners[2][0], corners[2][1], 1, 0),
  #            make_equations(corners[3][0], corners[3][1], 1, 1)]
  veclist = [make_equations(corners[0][0], corners[0][1], 0, 0),
             make_equations(corners[1][0], corners[1][1], 0, 1),
             make_equations(corners[2][0], corners[2][1], 1, 0)]
  return [y for x in veclist for y in x] + [w]


## 7: (Task 5.12.4) Build linear system
# veclist = make_nine_equations([(358, 36), (329, 597), (592, 157), (580, 483)])
veclist = make_nine_equations([(358, 36), (329, 597), (592, 157)])

# Build a Mat whose rows are the Vecs in veclist
L = rowdict2mat(veclist)

## 8: () Solve linear system
hvec = solve(L, b)
H = Mat(({'y1', 'y2', 'y3'}, {'x1', 'x2', 'x3'}), {val: hvec[val] for val in hvec.f})


## 9: (Task 5.12.7) Y Board Comprehension
def mat_move2board(Y):
  values = {}

  for row in Y.D[0]:
    for col in Y.D[1]:
      if row == "y1" or row == "y2":
        values[row, col] = Y[row, col] / Y["y3", col]
      else:
        values[row, col] = 1

  return Mat((Y.D[1], Y.D[0]), values)


(X_pts, colors) = im_util.file2mat('resource/board.png', ('x1', 'x2', 'x3'))
Y_pts = H * X_pts
Y_board = mat_move2board(Y_pts)
im_util.mat2display(Y_board, colors, ('y1', 'y2', 'y3'), scale=100, xmin=None, ymin=None)
