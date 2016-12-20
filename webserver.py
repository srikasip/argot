def app(environ, start_response):
  #Get Subpath and figure out which page the user should go to, but ignore "subpaths"
  subpaths = environ["PATH_INFO"].split('/')
  mainPath = ""
  if len(subpaths)>=2:
    mainPath = subpaths[1]


  #Get Params and put them in a sensible dictionary
  sentParams = environ["QUERY_STRING"].split('&')
  params = {}
  for param in sentParams: 
    param = param.strip()
    parts = param.split("=")
    if len(parts)>=2:
      params[parts[0]] = parts[1]


  if mainPath != "static":
    #Route the user to the right page
    if mainPath == "canvas":
      data = "You're in the <strong>canvas</strong>!  We are working on it!\n"  
    else:
      with open('static/home.html', 'r') as myHome:
        data = myHome.read()
    
    #Return the page content to the front end if that is relevant
    start_response("200 OK", [
        ("Content-Type", "text/html"),
        ("Content-Length", str(len(data)))
    ])

    return iter([data])

  