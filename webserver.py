def app(environ, start_response):
  print "SUBPAGE: " + environ["PATH_INFO"]
  print "PARAMETERS: " + environ["QUERY_STRING"]
  data = "Hello, World!\n"
  

  start_response("200 OK", [
      ("Content-Type", "text/plain"),
      ("Content-Length", str(len(data)))
  ])


  return iter([data])