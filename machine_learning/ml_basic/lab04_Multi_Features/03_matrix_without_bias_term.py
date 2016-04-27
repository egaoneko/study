import tensorflow as tf

# Train data
x_data = [[1, 1, 1, 1, 1], [1., 0., 3., 0., 5.], [0., 2., 0., 4., 0.]]
y_data = [1, 2, 3, 4, 5]

# Try to find values for W and b that compute y_data = W * x_data + b
# (We know that W should be 1 and b 0, but Tensorflow will
# figure that out for us.)
W = tf.Variable(tf.random_uniform([1, 3], -1.0, 1.0))

# Our hypothesis
hypothesis = tf.matmul(W, x_data)  # H(x) = WX

# Simplified cost function
cost = tf.reduce_mean(tf.square(hypothesis - y_data))  # reduce_mean : average (1/m * sum(H(x) - y))

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
    sess.run(train)
    if step % 20 == 0:
        print(step, sess.run(cost), sess.run(W))
