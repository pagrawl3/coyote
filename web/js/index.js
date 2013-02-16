$(document).ready(function(){
	// alert("Hello World!");

	var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.session.setAnnotations([
   		{row:0,text:"1",type:"error"},
   		{row:1,text:"2",type:"error"}
	]);

    $(document).on('click', '.quickLook', function(){
    	$('#miniEditor').removeAttr('id');
    	$(this).parent().siblings('.miniEditor').attr('id','miniEditor');
    	if ($(this).attr('data-quicklooked') != '1') {
    		$(this).attr('data-quicklooked', '1');
    		$(this).parent().siblings('.miniEditor').attr('id','miniEditor');
    		var miniEditor = ace.edit("miniEditor");
    		$(this).parent().parent().attr('editorIndex',miniEditor);
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
    	var errorObject = arrowSymbol+'<div class="error notFirst"><div class="errorContainer"><div class="title">'+errorTitle+'</div><div class="descrip">'+errorCode+'</div></div><div class="errorMenu"><span aria-hidden="true" data-icon="&#xe007;" class="quickLook"></span><span aria-hidden="true" data-icon="&#xe004;" class="mainEdit larger"></span><br></div><div class="miniEditor"></div></div><br>'
    	$('.listOfErrors').append(errorObject);
    }
    var increment = 0
    $(".arrow").each(function( index,obj ) {
    	var marLeft = $(this).css('margin-left');
    	marLeft = marLeft.replace('px','');
    	marLeft= parseInt(marLeft)+increment;
    	console.log(marLeft);
       	$(this).css('margin-left', marLeft + 'px');
       	increment += 10;
    });


    $(document).on('click', '.errorItem', function(){

    	$('.errorItem').parent().find('.active').removeClass('active');
    	$(this).addClass('active');
    	$('.listOfErrors').animate({opacity:'0', marginTop:'-10px'},300, 'easeOutQuad',function(){
    		$(this).children().remove();
    		for (var i=0; i<=5; i++) {
    			var errorTitle = "Hellzzz2";
		    	var errorCode = "Wassup2";
		    	var arrowSymbol = '<span aria-hidden=true" data-icon="&#xe008;" class="arrow"></span>'
		    	if (i==0)
		    		arrowSymbol = ''
		    	var errorObject = arrowSymbol+'<div class="error notFirst"><div class="errorContainer"><div class="title">'+errorTitle+'</div><div class="descrip">'+errorCode+'</div></div><div class="errorMenu"><span aria-hidden="true" data-icon="&#xe007;" class="quickLook"></span><span aria-hidden="true" data-icon="&#xe004;" class="mainEdit larger"></span><br></div><div class="miniEditor"></div></div><br>'
		    	$('.listOfErrors').append(errorObject);
		    }
		    var increment = 0
		    $(".arrow").each(function( index,obj ) {
		    	var marLeft = $(this).css('margin-left');
		    	marLeft = marLeft.replace('px','');
		    	marLeft= parseInt(marLeft)+increment;
		       	$(this).css('margin-left', marLeft + 'px');
		       	increment += 10;
		    });
		    $('.listOfErrors').animate({opacity:'1', marginTop:'0px'},300, 'easeInQuad');

    	});
    });

	$(document).on('click', '.mainEdit', function(){
		var getter = miniEditor.getValue();
		alert(getter);
		editor.setValue("Hello");
	})




});
