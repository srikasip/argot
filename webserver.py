def app(environ, start_response):
  subpaths = environ["PATH_INFO"].split('/')
  params = environ["QUERY_STRING"].split('&')
  print params

  mainPath = ""
  if len(subpaths)>=2:
    mainPath = subpaths[1]

  if mainPath == "canvas":
    data = "You're in the canvas!  We are working on it!\n"  
  else:
    data = "Hello, World!\n"
  
  start_response("200 OK", [
      ("Content-Type", "text/plain"),
      ("Content-Length", str(len(data)))
  ])

  return iter([data])