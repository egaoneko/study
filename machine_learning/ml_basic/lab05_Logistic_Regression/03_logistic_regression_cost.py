import tensorflow as tf
import numpy as np

# Train data
xy = np.loadtxt('train.txt', unpack=True, dtype='float32')
x_data = xy[0:-1]
y_data = xy[-1]

X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

W = tf.Variable(tf.random_uniform([1, len(x_data)], -1.0, 1.0))

# Our hypothesis  # H(x) = 1 / (1 + e^(-WX))
h = tf.matmul(W, X)  # h = WX
hypothesis = tf.div(1., 1. + tf.exp(-h))  # H(h) = 1 / (1 + e^-h)

# Cost function
cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
cost_function = -Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis)

# Minimize
a = tf.Variable(0.1)  # Learning rate, alpha
optimizer = tf.train.GradientDescentOptimizer(a)
train = optimizer.minimize(cost)

# Before starting, initialize the variables. We will 'run' this first
init = tf.initialize_all_variables()

# Launch the graph.
sess = tf.Session()
sess.run(init)

# Fit the line
for step in range(2001):
    sess.run(train, feed_dict={X: x_data, Y: y_data})
    if step % 20 == 0:
        print(step, sess.run(cost, feed_dict={X: x_data, Y: y_data}), sess.run(W))
        print('-'*20)
        print(sess.run(hypothesis, feed_dict={X: x_data, Y: y_data}))
        print(sess.run(cost_function, feed_dict={X: x_data, Y: y_data}))
        print('-'*20)