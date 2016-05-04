import tensorflow as tf
import numpy as np

# Train data
xy = np.loadtxt('train.txt', unpack=True, dtype='float32')
x_data = np.transpose(xy[0:-1])
y_data = np.reshape(xy[-1], (4, 1))

X = tf.placeholder(tf.float32, name="X-input")
Y = tf.placeholder(tf.float32, name="Y-input")

W1 = tf.Variable(tf.random_uniform([2, 2], -1.0, 1.0), name="Weight1")
W2 = tf.Variable(tf.random_uniform([2, 1], -1.0, 1.0), name="Weight2")

b1 = tf.Variable(tf.zeros([2]), name="Bias1")
b2 = tf.Variable(tf.zeros([1]), name="Bias2")

# Our hypothesis
with tf.name_scope("layer2") as scope:
    L2 = tf.sigmoid(tf.matmul(X, W1) + b1)

with tf.name_scope("layer3") as scope:
    hypothesis = tf.sigmoid(tf.matmul(L2, W2) + b2)

# Cost function
with tf.name_scope("cost") as scope:
    cost = -tf.reduce_mean(Y * tf.log(hypothesis) + (1 - Y) * tf.log(1 - hypothesis))
    cost_summ = tf.scalar_summary("cost", cost)

# Minimize
with tf.name_scope("train") as scope:
    optimizer = tf.train.GradientDescentOptimizer(0.01)
    train = optimizer.minimize(cost)

# Test model
correct_prediction = tf.equal(tf.floor(hypothesis + 0.5), Y)
# Calculate accuracy
with tf.name_scope("accuracy") as scope:
    accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))
    accuracy_summ = tf.scalar_summary("accuracy", accuracy)

# Before starting, initialize the variables. We will 'run' this first
init = tf.initialize_all_variables()

# Add histogram
w1_hist = tf.histogram_summary("weights1", W1)
w2_hist = tf.histogram_summary("weights2", W2)

b1_hist = tf.histogram_summary("biases1", b1)
b2_hist = tf.histogram_summary("biases2", b2)

y_hist = tf.histogram_summary("y", Y)

# Launch the graph.
with tf.Session() as sess:
    sess.run(init)

    # tesnorboard --logdir=/tmp/xor_logs
    merged = tf.merge_all_summaries()
    writer = tf.train.SummaryWriter("/tmp/xor_logs", sess.graph_def)

    # Fit the line
    for step in range(200000):
        # summary, _ = sess.run([merged, train], feed_dict={X: x_data, Y: y_data})
        # writer.add_summary(summary, step)
        sess.run(train, feed_dict={X: x_data, Y: y_data})
        if step % 2000 == 0:
            summary = sess.run(merged, feed_dict={X: x_data, Y: y_data})
            writer.add_summary(summary, step)
            print(step, sess.run(cost, feed_dict={X: x_data, Y: y_data}))
            print(sess.run(W1), sess.run(b1))
            print(sess.run(W2), sess.run(b2))
            print(sess.run([hypothesis, tf.floor(hypothesis + 0.5), correct_prediction, accuracy],
                           feed_dict={X: x_data, Y: y_data}))
            print("Accuracy", accuracy.eval({X: x_data, Y: y_data}))
