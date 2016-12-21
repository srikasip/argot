from StaticHelper import StaticHelper as static

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
    #Get the static content resource that is being asked for
    staticHelper = static()
    data, content_type = staticHelper.GetStaticContent(environ["PATH_INFO"][1:])

  start_response("200 OK", [
    ("Content-Type", content_type),
    ("Content-Length", str(len(data)))
    ])

  if data:
    return iter([data])
  else:
    return ""

