import tensorflow as tf
import numpy as np

# Train data
xy = np.loadtxt('train.txt', unpack=True, dtype='float32')
x_data = np.transpose(xy[0:3])
y_data = np.transpose(xy[3:])

# tf Graph Input
X = tf.placeholder("float", [None, 3])  # x1, x2, and 1 (for bias), (None => element size about row, not known)
Y = tf.placeholder("float", [None, 3])  # A, B, C => 3 classes, (None => element size about row, not known)

# Set model weight
W = tf.Variable(tf.zeros([3, 3]))

# Construct model
hypothesis = tf.nn.softmax(tf.matmul(X, W))  # Softmax

# Minimize error using cross entropy
learning_rate = 0.1

# Cross entropy
cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), reduction_indices=1))

# Gradient Descent
optimizer = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost)

# Initialize the variables
init = tf.initialize_all_variables()

# Launch the graph
with tf.Session() as sess:
    sess.run(init)

    # Fit the line
    for step in range(2001):
        sess.run(optimizer, feed_dict={X: x_data, Y: y_data})
        if step % 200 == 0:
            print(step, sess.run(cost, feed_dict={X: x_data, Y: y_data}), sess.run(W))
