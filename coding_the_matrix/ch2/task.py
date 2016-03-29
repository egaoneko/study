from ch2.resource.plotting import plot
from ch2.resource import image
import math

__author__ = "Donghyun Seo"
__copyright__ = "Copyright ⓒ 2016, All rights reserved."
__email__ = "egaoneko@naver.com"


def f(z):
    return {x + y * 1j + z for y, row in enumerate(reversed(data)) for x, bright in enumerate(row) if bright < 120}


if __name__ == '__main__':

    # Task 2.4.1
    S = {2 + 2j, 3 + 2j, 1.75 + 1j, 2 + 1j, 2.25 + 1j, 2.5 + 1j, 2.75 + 1j, 3 + 1j, 3.25 + 1j}
    # plot(S, 4)

    # Task 2.4.3
    # plot({1 + 2j + z for z in S}, 4)
    # plot({-2 - 2j + z for z in S}, 4)

    # Task 2.4.7
    # plot({z * 0.5 for z in S}, 4)

    # Task 2.4.8
    # plot({z * 0.5 * -1j for z in S}, 4)

    # Task 2.4.9
    # plot({z * 0.5 * -1j + 2 - 1j for z in S}, 4)

    # Task 2.4.10
    data = image.file2image('resource/img01.png')
    data = image.color2gray(data)
    # pts = {x + y * 1j for y, row in enumerate(reversed(data)) for x, bright in enumerate(row) if bright < 120} # y = real, x = imag
    # plot(pts, 200, 1)

    # Task 2.4.11
    # pts = f(0)
    # pts = f(-20 - 20j)
    # plot(pts, 200, 1)

    # Task 2.4.12
    # pts = {(x + y * 1j) * -0.5j - 10 - 10j for y, row in enumerate(reversed(data)) for x, bright in enumerate(row) if
    #        bright < 120}
    # plot(pts, 200, 1)

    # Task 2.4.17
    # n = 20
    # w = math.e ** (2j * math.pi / n)
    # pts = {w ** i for i in range(n)}
    # plot(pts, 4)

    # Task 2.4.18
    # plot({z * math.e ** (math.pi / 4 * 1j) for z in S}, 4)
    # pts = {(x + y * 1j) * math.e ** (math.pi / 4 * 1j) for y, row in enumerate(reversed(data)) for x, bright in
    #        enumerate(row) if bright < 120}
    # plot(pts, 200, 1)

    # Task 2.4.20
    w = len(data)
    h = len(data[0])
    pts = {(x + y * 1j - w / 2 - h / 2 * 1j) * 0.5 * math.e ** (math.pi / 4 * 1j) for y, row in
           enumerate(reversed(data)) for x, bright in enumerate(row) if bright < 120}
    plot(pts, 200, 1)
