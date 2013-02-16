$(document).ready(function(){
	// alert("Hello World!");

	var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/c_cpp");
    //editor.getSession().setUseWrapMode(true);

    $(document).on('click', '.quickLook', function(){
    	$('#miniEditor').removeAttr('id');
    	$(this).parent().siblings('.miniEditor').attr('id','miniEditor');
    	if ($(this).attr('data-quicklooked') != '1') {
    		$(this).attr('data-quicklooked', '1');
    		$(this).parent().siblings('.miniEditor').attr('id','miniEditor');
    		var miniEditor = ace.edit("miniEditor");
    		miniEditor.getSession().setMode("ace/mode/c_cpp");
    		$(this).animate({color:'#000'}, 300);
    		$('#miniEditor').animate({height:'200px'},300,function(){miniEditor.resize();miniEditor.focus();});
    		quickLooked = 1
    	}
    	else {
    		$(this).animate({color:'#777'}, 300);
    		$('#miniEditor').animate({height:'0px'},300,function(){
    			$(this).removeAttr('id');
    			delete miniEditor;
    		});
    		$(this).attr('data-quicklooked', '0');
    	}
    });

    for (var i=0; i<=5; i++) {
    	var errorTitle = "Hellzzz";
    	var errorCode = "Wassup";
    	var arrowSymbol = '<span aria-hidden=true" data-icon="&#xe008;" class="arrow"></span>'
    	if (i==0)
    		arrowSymbol = ''
    	var errorObject = arrowSymbol+'<div class="error notFirst"><div class="errorContainer"><div class="title">'+errorTitle+'</div><div class="descrip">'+errorCode+'</div></div><div class="errorMenu"><span aria-hidden="true" data-icon="&#xe007;" class="quickLook"></span><span aria-hidden="true" data-icon="&#xe004;" class="mainEdit larger"></span><br></div><div class="miniEditor"></div></div>'
    	$('.listOfErrors').append(errorObject);
    }

    var increment = 0
    $(".error").each(function( index,obj ) {
    	var marLeft = $(this).css('margin-left');
    	marLeft = marLeft.replace('px','');
    	marLeft= parseInt(marLeft)+increment;
    	console.log(marLeft);
       	$(this).css('padding-left', marLeft + 'px');
       	increment += 10;
    });
});
