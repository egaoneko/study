from ch3.resource.vecutil import *
from ch2.resource.plotting import plot

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"

L = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]]

corners = [list2vec(v) for v in L]

print(corners)


def line_segment(pt1, pt2, samples=100):
    return [(i / samples) * pt1 + (1 - i / samples) * pt2 for i in range(samples + 1)]


line_segments = [line_segment(corners[i], corners[j]) for i, j in
                 [(0, 1), (2, 3), (0, 2), (1, 3), (4, 5), (6, 7), (4, 6), (5, 7), (0, 4), (1, 5), (2, 6), (3, 7)]]

print(line_segments)

pts = sum(line_segments, [])

print(pts)


def pixel(x):
    return x[0], x[1]


def scale_down(x):
    return list2vec([x[0] / x[2], x[1] / x[2], 1])


# 평행이동
shifted_pts = [v + list2vec([1, 1, 8]) for v in pts]

print(shifted_pts)

# 축 변환
x_pixels = 100
y_pixels = 100

cb = [list2vec([1 / x_pixels, 0, 0]),
      list2vec([0, 1 / y_pixels, 0]),
      list2vec([0, 0, 1])]


def vec2rep(veclist, v):
    print(veclist)
    print(v)
    print(veclist[0][0] * v)
    print(veclist[1][1] * v)
    print(veclist[2][2] * v)
    print((veclist[0][0] * v) + (veclist[1][1] * v) + (veclist[2][2] * v))
    return (veclist[0][0] * v) + (veclist[1][1] * v) + (veclist[2][2] * v)


reps = [vec2rep(cb, v) for v in shifted_pts]
print(reps)

in_camera_plane = [scale_down(u) for u in reps]
pixels = [pixel(u) for u in in_camera_plane]

print(pixels)
plot(pixels, 0.5, 1)
