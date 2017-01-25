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
      codeTemplates[tag["unique_id"]] = tag["code_block"];
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
    code_template = templateDictionary[unique_id];
    objectThat = $(code_template);
    $(objectThat).addClass("arbitraryObject");
    $(".canvas").append(objectThat);
  });
}