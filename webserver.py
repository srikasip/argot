def app(environ, start_response):
  data = ""
  #Get Subpath and figure out which page the user should go to, but ignore "subpaths"
  subpaths = environ["PATH_INFO"].split('/')
  mainPath = ""
  if len(subpaths)>=2:
    mainPath = subpaths[1]


  #Get Params and put them in a sensible dictionary
  sentParams = environ["QUERY_STRING"].split('&')
  params = {}
  if len(sentParams)>0:
    for param in sentParams: 
      param = param.strip()
      parts = param.split("=")
      if len(parts)>=2:
        params[parts[0]] = parts[1]

  content_type = ""
  if mainPath != "static":
    #Route the user to the right page
    if mainPath == "canvas":
      data = "You're in the <strong>canvas</strong>!  We are working on it!\n"
      content_type = "text/plain"

    else:
      with open('static/home.html', 'r') as myHome:
        data = myHome.read()
      content_type = "text/html"

  else:
    fileLocation = environ["PATH_INFO"][1:]
    extension_parts = fileLocation.split(".")
    ending = ""
    

    if len(extension_parts)>1:
      ending = extension_parts[1]

    if ending == "css":
      content_type = "text/css"
    elif ending == "js":
      content_type = "application/javascript"
    elif ending in ["jpg", "jpeg", "png", "gif"]:
      content_type = "image/" + ending
    elif ending ==  "ico":
      content_type = "image/x-icon"
    else:
      content_type = ""

    with open(fileLocation) as myFile:
      data = myFile.read()

  start_response("200 OK", [
    ("Content-Type", content_type),
    ("Content-Length", str(len(data)))
    ])

  if data:
    return iter([data])
  else:
    return ""

