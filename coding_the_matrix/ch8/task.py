from ch3.vec import Vec
from ch5.mat import Mat
from ch5.resource.matutil import *
from ch3.resource.vecutil import *
from ch5.resource.bitutil import *

rowlist = [list2vec(v) for v in [[0, 2, 3, 4, 5], [0, 0, 0, 3, 2], [1, 2, 3, 4, 5], [0, 0, 0, 6, 7], [0, 0, 0, 9, 8]]]
print("rowlist: ", rowlist)

row_labels = rowlist[0].D
col_label_list = sorted(rowlist[0].D, key=hash)
row_label_list = sorted(rowlist[0].D, key=hash)
print("col_label_list: ", col_label_list)

M_rowlist = [Vec(row_labels, {row_label_list[i]: 1}) for i in range(len(col_label_list))]
print("M_rowlist: ", M_rowlist)

new_rowlist = []
new_M_rowlist = []
rows_left = set(range(len(rowlist)))
print("rows_left: ", rows_left)

for c in col_label_list:
    rows_with_nonzero = [r for r in rows_left if rowlist[r][c] != 0]
    print("rows_with_nonzero: ", rows_with_nonzero)

    if rows_with_nonzero != []:
        pivot = rows_with_nonzero[0]
        print("pivot: ", pivot)

        new_rowlist.append(rowlist[pivot])
        print("new_rowlist: ", new_rowlist)

        new_M_rowlist.append(M_rowlist[pivot])
        print("new_M_rowlist.: ", new_M_rowlist)

        rows_left.remove(pivot)
        print("rows_left: ", rows_left)

        for r in rows_with_nonzero[1:]:
            multiplier = rowlist[r][c] / rowlist[pivot][c]
            print("multiplier: ", multiplier)

            rowlist[r] -= multiplier * rowlist[pivot]
            M_rowlist[r] -= multiplier * M_rowlist[pivot]

for r in rows_left:
    new_rowlist.append(rowlist[r])

for r in rows_left:
    new_M_rowlist.append(M_rowlist[r])

    print("rows_left: ", rows_left)

print("rowdict2mat new_rowlist: ", rowdict2mat(new_rowlist))
print("rowdict2mat M_rowlist: ", rowdict2mat(M_rowlist))
print("rowdict2mat new_M_rowlist: ", rowdict2mat(new_M_rowlist))

M = listlist2mat([[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, -2, 1, 0], [0, 0, 0, 0, 1]])
A = listlist2mat([[0, 2, 3, 4, 5], [0, 0, 0, 3, 2], [1, 2, 3, 4, 5], [0, 0, 0, 6, 7], [0, 0, 0, 9, 8]])
A2 = listlist2mat([[1, 2, 3, 4, 5], [0, 2, 3, 4, 5], [0, 0, 0, 3, 2], [0, 0, 0, 6, 7], [0, 0, 0, 9, 8]])

print(M * A)
print(M * A2)
