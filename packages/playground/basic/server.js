const http = require('http')
const url = require('url')

const port = 8080

const server = http.createServer((req, res) => {
  const urlObject = url.parse(req.url)
  const { pathname } = urlObject

  // api开头的是API请求
  if (pathname.startsWith('/api')) {
    // 再判断路由
    if (pathname === '/api/users') {
      // 获取HTTP动词
      const method = req.method
      if (method === 'GET') {
        // 写一个假数据
        const resData = [
          {
            id: 1,
            name: '小明',
            age: 18,
          },
          {
            id: 2,
            name: '小红',
            age: 19,
          },
        ]
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(resData))
        return
      }
    }
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`)
})
