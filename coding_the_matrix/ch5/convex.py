from ch5.resource import image_mat_util as im_util
from ch5 import mat

img1 = im_util.file2image('resource/convex_1.png')
img2 = im_util.file2image('resource/convex_2.png')
mat1_1, mat1_2 = im_util.image2mat(img1)
mat2_1, mat2_2 = im_util.image2mat(img2)
mat3_1 = 0.5 * mat1_1 + 0.5 * mat2_1  # not use, because same mat1 and mat2's coordinate
mat3_2 = 0.5 * mat1_2 + 0.5 * mat2_2

print(mat1_1)
print(mat1_2)
print(mat2_1)
print(mat2_2)
print(0.5 * mat1_1 + 0.5 * mat2_1)

# im_util.mat2display(mat1_1, mat1_2)
# im_util.mat2display(mat2_1, mat2_2)
# im_util.mat2display(mat3_1, mat3_2)

im_util.svglist2display(mat1_1, mat1_2, mat2_2)
