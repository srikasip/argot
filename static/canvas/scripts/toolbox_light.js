$(document).ready(function(){

  LoadToolbox();
  MakeCanvasDropTarget();
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
function MakeCanvasDropTarget()
{
  $(".canvas").droppable({
    accept: ".draggable",
    greedy: true,
    drop: function(event, ui){
      console.log("Dropping an object");
      $(this).removeClass("over");
      var dropped = ui.draggable;
      var droppedOn = $(this);
      var dropPosition = $(dropped).offset();
      var canvasPosition = $(".canvas").offset();
      var leftPos = dropPosition.left - canvasPosition.left;
      var topPos = dropPosition.top - canvasPosition.top;
      $(dropped).detach().css({left: leftPos, top: topPos}).appendTo(droppedOn);
    }
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
      $(objectThat).addClass("draggable");
      $(objectThat).append("<img src='static/canvas/images/moveIcon_small.png' alt='(+)' class='mover' />");
      $(".canvas").append(objectThat);
      $(objectThat).draggable({
        "handle":".mover",
        drag: function(){
          position = $(this).offset();
          console.log("("+String(position.top) + ", "+ String(position.left)+")");
        }
      });
    }
    else
    {
      //$(objectThat).addClass("arbitraryObject");
      $(objectThat).addClass("draggable");
      $(".canvas").append(objectThat);
      $(objectThat).draggable({
        drag: function(){
          position = $(this).offset();
          console.log("("+String(position.top) + ", "+ String(position.left)+")");
        }
      });
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

    $(objectThat).droppable({
      accept: ".draggable",
      greedy: true,
      drop: function(event, ui) {
        console.log("Dropping an object");
        $(this).removeClass("over");
        var dropped = ui.draggable;
        var droppedOn = $(this);
        var parentPosition = $(droppedOn).offset();
        var childPosition = $(dropped).offset();
        var leftPos = childPosition.left-parentPosition.left;
        var topPos = childPosition.top-parentPosition.top;
        console.log("Dropped On Position: (" + String(parentPosition.top) + ", " + String(parentPosition.left) + ")");
        console.log("Dragged Position: (" + String(childPosition.top) + ", " + String(childPosition.left) + ")");
        $(dropped).detach().css({top:topPos, left:leftPos}).appendTo(droppedOn);
        console.log("New Position: (" +String(topPos) + ", " + String(leftPos)+ ")");
      },
      over: function(event, elem)
      {
        $(this).addClass("over");
      },
      out: function(event, elem)
      {
        $(this).removeClass("over");
      }
    });
  });
}