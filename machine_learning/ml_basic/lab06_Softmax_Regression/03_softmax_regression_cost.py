import tensorflow as tf
import numpy as np

# Train data
xy = np.loadtxt('train.txt', unpack=True, dtype='float32')
x_data = np.transpose(xy[0:3])
y_data = np.transpose(xy[3:])

# tf Graph Input
X = tf.placeholder("float", [None, 3],
                   name='X-input')  # x1, x2, and 1 (for bias), (None => element size about row, not known)
Y = tf.placeholder("float", [None, 3],
                   name='Y-input')  # A, B, C => 3 classes, (None => element size about row, not known)

# Set model weight
W = tf.Variable(tf.zeros([3, 3]), name='Weights')

# Construct model
with tf.name_scope("layer") as scope:
    hypothesis = tf.nn.softmax(tf.matmul(X, W))  # Softmax

# Cross entropy
with tf.name_scope("cost") as scope:
    cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(hypothesis), reduction_indices=1))
    cost_function = -Y * tf.log(hypothesis)
    cost_function_sum = -tf.reduce_sum(Y * tf.log(hypothesis), reduction_indices=1)
    cost_summ = tf.scalar_summary("cost", cost)

# Gradient Descent
with tf.name_scope("train") as scope:
    optimizer = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

# Initialize the variables
init = tf.initialize_all_variables()

# Add histogram
w_hist = tf.histogram_summary("weights", W)
y_hist = tf.histogram_summary("y", Y)

# Launch the graph
with tf.Session() as sess:
    sess.run(init)

    # tensorboard --logdir=/tmp/softmax_cost_logs
    merged = tf.merge_all_summaries()
    writer = tf.train.SummaryWriter("/tmp/softmax_cost_logs", sess.graph_def)

    # Fit the line
    for step in range(20001):
        sess.run(optimizer, feed_dict={X: x_data, Y: y_data})
        if step % 2000 == 0:
            summary = sess.run(merged, feed_dict={X: x_data, Y: y_data})
            writer.add_summary(summary, step)
            print(step, sess.run(cost, feed_dict={X: x_data, Y: y_data}), sess.run(W))
            print('-'*20)
            print(sess.run(hypothesis, feed_dict={X: x_data, Y: y_data}))
            print(sess.run(cost_function, feed_dict={X: x_data, Y: y_data}))
            print(sess.run(cost_function_sum, feed_dict={X: x_data, Y: y_data}))
            print('-'*20)
