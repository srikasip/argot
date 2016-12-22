class DynamicHelper:
  def __init__(self):
    self.initiated = True

  @staticmethod
  def GetDynamicContent(mainPath):
    if mainPath == "canvas":
      data = "You're in the <strong>canvas</strong>!  We are working on it!\n"
      content_type = "text/html"

    else:
      with open('static/home.html', 'r') as myHome:
        data = myHome.read()
      content_type = "text/html"

    return data, content_type