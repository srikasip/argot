$(document).ready(function(){

  LoadToolbox();
  //This is so that i can open and close the toolbox
  $(".xbar .close").click(function(){
    $(".toolbox").css("display", "none");
  }); //End of $(".xbar .close").click(function(){})
});

function LoadToolbox()
{
  $(".toolbox-box").empty();
    $.getJSON( "static/canvas/toolbox/toolbox.json", function(tagData) {
    itemsString = ""
    codeTemplates = {}
    $.each(tagData["toolbox"], function(i, tag){
      itemsString += "<button class='toolbox-item' data-value='"+tag["unique_id"]+"' data-placement='bottom' data-toggle='tooltip' title='" + tag["description"]+"'><span>"+tag["display_name"]+"</span></button>\n";
      codeTemplates[tag["unique_id"]] = tag;
    });
    //console.log(itemsString);

    $(".toolbox-box").append(itemsString);
    $('[data-toggle="tooltip"]').tooltip();

    AddClickEvent(codeTemplates);
  });
}

function AddClickEvent(templateDictionary)
{
  $('button.toolbox-item').click(function(){
    unique_id = $(this).attr("data-value");
    code_template = templateDictionary[unique_id]["code_block"];
    objectThat = $(code_template);

    non_draggable_tags = ["input", "textarea", "button", "select", "option", "img"];
    non_resizable_tags = ["a", "span", "textarea"];
    $(objectThat).addClass("arbitraryObject");

    if(non_draggable_tags.indexOf(templateDictionary[unique_id]["tag"])>=0)
    {
      $(objectThat).wrap("<div class='draggableWrapper'></div>");
      objectThat = $(objectThat).parent();
      $(objectThat).append("<img src='static/canvas/images/moveIcon_small.png' alt='(+)' class='mover' />");
      $(".canvas").append(objectThat);
      $(objectThat).draggable({
        "handle":".mover"
      });
    }
    else
    {
      //$(objectThat).addClass("arbitraryObject");
      $(".canvas").append(objectThat);
      $(objectThat).draggable();
    }

    if (non_resizable_tags.indexOf(templateDictionary[unique_id]["tag"])<0)
    {
      if ($(objectThat).hasClass("arbitraryObject"))
      {
        $(objectThat).resizable();
      }
      else
      {
        $(objectThat).find(".arbitraryObject").resizable();
      }
    }
  });
}