var json_data;
var obj;
var main_index;
var editor;



$(document).ready(function(){
	// alert("Hello World!");
	json_data = $.getJSON("json.json", function() {
        obj = $.parseJSON(json_data.responseText);
        for(var i=0; i<obj.files.length; i++)
        {
            if(obj.files[i].path.indexOf("main") != -1)
            {
                main_index = i;
            }
        }

        for (var i =0; i<obj.errors.length; i++)
        {
            var activeText = '';
            if (i==0)
                activeText = 'active';
            var errorListCode = obj.errors[i].error;
            var errorListLine = obj.errors[i].trace[obj.errors[i].trace.length-1].lineno;
            var errorListItem ='<li class="errorItem '+activeText+'" index='+i+'><span aria-hidden="true" data-icon="&#xe000;"></span>'+errorListCode+' :: Line '+errorListLine+'</li>';
            $('.errorList').append(errorListItem); 

        }

        for (var i=obj.errors[0].trace.length-1;i>=0; i--) {
            if(obj.errors[0].trace[i].clickable)
            {
                var errorTitle = obj.errors[0].trace[i].filename;
                var errorCode = obj.errors[0].trace[i].function.name + " :: " + obj.errors[0].trace[i].lineno;
                var arrowSymbol = '<span aria-hidden=true" data-icon="&#xe008;" class="arrow"></span>'
                if (i==0)
                    arrowSymbol = ''
                var errorObject = arrowSymbol+'<div class="error notFirst" errorIndex='+0+' traceIndex='+i+'><div class="errorContainer"><div class="title">'+errorTitle+'</div><div class="descrip">'+errorCode+'</div></div><div class="errorMenu"><span aria-hidden="true" data-icon="&#xe007;" class="quickLook"></span><span aria-hidden="true" data-icon="&#xe004;" class="mainEdit larger"></span><br></div><div class="miniEditor"></div></div><br>'
                $('.listOfErrors').append(errorObject);    
            }
            
        }
        var increment = 0
        $(".arrow").each(function( index,obj ) {
            var marLeft = $(this).css('margin-left');
            marLeft = marLeft.replace('px','');
            marLeft= parseInt(marLeft)+increment;
            $(this).css('margin-left', marLeft + 'px');
            increment += 10;
        });
        editor = ace.edit("editor");
        //editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/c_cpp");
        editor.setValue(obj.files[main_index].content);
        editor.gotoLine(1);
        $('#editor').attr('fileIndex',main_index);
        $('#editorTitle h2').remove();
        var title = '<h2><span aria-hidden="true" data-icon="&#xe003;"></span>'+obj.files[main_index].path+'</h2>';
        $('#editorTitle').append(title);
        //console.log("obj.errors[0].trace.length");
        setTimeout(function(){
            //console.log(obj.errors[0].trace.length);
            for (var i=0; i<obj.errors[0].trace.length; i++ )
            {       
                a = parseInt(obj.errors[0].trace[i].lineno);
                if (a) {
                    //console.log(a);
                    $('.ace_line').each(function(indexes, objs) {
                        if (indexes+1==a)
                        $(this).attr('style','background-color: rgba(255,0,0, 0.5) !important;');
                        //console.log(indexes);
                    });
                }
            }
        }, 1000);

        editor.getSession().on('change', function(e) {
            var fileIndex = parseInt($('#editor').attr('fileIndex'));
            obj.files[fileIndex].content = editor.getValue();
            //console.log("Changes")
            //file_put_contents('json.json',obj);
        });
        

	});
    
    $(document).on('click', '.errorItem', function(){
        var reqIndex = parseInt($(this).attr('index'));
        //console.log(reqIndex);
        $('.errorItem').parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $('.listOfErrors').animate({opacity:'0', marginTop:'-10px'},300, 'easeOutQuad',function(){
            $(this).children().remove();
            for (var i=obj.errors[reqIndex].trace.length-1; i>=0; i--) {
                if(obj.errors[reqIndex].trace[i].clickable)
                {
                    var errorTitle = obj.errors[reqIndex].trace[i].filename;
                    var errorCode = obj.errors[reqIndex].trace[i].function.name + " :: " + obj.errors[reqIndex].trace[i].lineno;
                    var arrowSymbol = '<span aria-hidden=true" data-icon="&#xe008;" class="arrow"></span>'
                    if (i==0)
                        arrowSymbol = ''
                    var errorObject = arrowSymbol+'<div class="error notFirst" errorIndex='+reqIndex+' traceIndex='+i+'><div class="errorContainer"><div class="title">'+errorTitle+'</div><div class="descrip">'+errorCode+'</div></div><div class="errorMenu"><span aria-hidden="true" data-icon="&#xe007;" class="quickLook"></span><span aria-hidden="true" data-icon="&#xe004;" class="mainEdit larger"></span><br></div><div class="miniEditor"></div></div><br>'
                    $('.listOfErrors').append(errorObject);    
                }
                
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
    





    $(document).on('click', '.quickLook', function(){
    	$('#miniEditor').removeAttr('id');
    	$(this).parent().siblings('.miniEditor').attr('id','miniEditor');
    	if ($(this).attr('data-quicklooked') != '1') {
    		$(this).attr('data-quicklooked', '1');
    		$(this).parent().siblings('.miniEditor').attr('id','miniEditor');
    		var miniEditor = ace.edit("miniEditor");
    		var errorIndex = $(this).parent().parent().attr('errorIndex');
            var traceIndex = $(this).parent().parent().attr('traceIndex');
    		miniEditor.getSession().setMode("ace/mode/c_cpp");
            //console.log(traceIndex);
            //console.log(errorIndex);
            miniEditor.setReadOnly(true);
            miniEditor.setValue(obj.errors[errorIndex].trace[traceIndex].function.text);
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




	$(document).on('click', '.mainEdit', function(){
        var errorIndex = $(this).parent().parent().attr('errorIndex');
        var traceIndex = $(this).parent().parent().attr('traceIndex');
        var fileIndex=main_index;
        for(var i=0; i<obj.files.length; i++)
        {
            if(obj.files[i].path.indexOf(obj.errors[errorIndex].trace[traceIndex].filename) != -1)
            {
                fileIndex = i;
            }
        }
        editor.setValue(obj.files[fileIndex].content);
        editor.gotoLine(1);
        $('#editorTitle h2').remove();
        var title = '<h2><span aria-hidden="true" data-icon="&#xe003;"></span>'+obj.files[fileIndex].path+'</h2>';
        $('#editorTitle').append(title);

        setTimeout(function(){
            //console.log(obj.errors[0].trace.length);
            for (var i=0; i<obj.errors[fileIndex].trace.length; i++ )
            {       
                a = parseInt(obj.errors[fileIndex].trace[i].lineno);
                if (a) {
                    //console.log(a);
                    $('.ace_line').each(function(indexes, objs) {
                        if (indexes+1==a)
                        $(this).attr('style','background-color: rgba(255,0,0, 0.5) !important;');
                        //console.log(indexes);
                    });
                }
            }
        }, 1000);

        $('#editor').attr('fileIndex',fileIndex);
	})

    $(document).on('click', '.submit', function(){
        var fileIndex = parseInt($('#editor').attr('fileIndex'));
        obj.files[fileIndex].content = editor.getValue();
        //console.log(obj.files[fileIndex].content);
        //file_put_contents('json.json',obj);
        console.log("Going in now");
        $.ajax({
            type : "POST",
            url : "json.php",
            dataType : 'json', 
            data : {
                json : obj /* convert here only */
            }
        }, function(){
            alert("success!");
            });
    });
});
