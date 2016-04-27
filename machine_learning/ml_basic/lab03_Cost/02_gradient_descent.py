import tensorflow as tf

# Train data
x_data = [1., 2., 3.]
y_data = [1., 2., 3.]

# Try to find values for W and b that compute y_data = W * x_data + b
# (We know that W should be 1 and b 0, but Tensorflow will
# figure that out for us.)
W = tf.Variable(tf.random_uniform([1], -10.0, 10.0))

# Placeholder
X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

# Our hypothesis
hypothesis = W * X  # H(x) = W * x

# Simplified cost function
cost = tf.reduce_mean(tf.square(hypothesis - Y))  # reduce_mean : average (1/m * sum(H(x) - y))

# Minimize
descent = W - tf.mul(0.1, tf.reduce_mean(tf.mul((tf.mul(W, X) - Y), X)))  # gradient descent algorithms
update = W.assign(descent)

# Before starting, initialize the variables. We will 'run' this first
init = tf.initialize_all_variables()

# Launch the graph.
sess = tf.Session()
sess.run(init)

# Fit the line
for step in range(100):
    sess.run(update, feed_dict={X: x_data, Y: y_data})
    print(step, sess.run(cost, feed_dict={X: x_data, Y: y_data}), sess.run(W))
