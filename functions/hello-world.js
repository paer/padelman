exports.handler = function (event, context, callback) {
  const { identity, user } = context.clientContext

  console.log("user", user)
  callback(null, {
    statusCode: 200,
    body: "Hello, World",
  })
}
