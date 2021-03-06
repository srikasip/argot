class StaticHelper:
  def __init__(self):
    self.initiated = True

  @staticmethod
  def GetStaticContent(fileLocation):
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
    elif ending == "json":
      content_type = "application/json"
    else:
      content_type = ""

    with open(fileLocation) as myFile:
      data = myFile.read()

    return data, content_type