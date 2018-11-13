function eldingu(settings){

    this.route = {
        view: undefined,
        params: [],
        setView: function(){

        },
        setParams: function(){

        },
        pushParam: function(){

        },
        removeParam: function(){

        }
    }

    this.body = document.getElementsByTagName('body')[0];
    this.body.id = 'eldinguBody';

    this.cacheVersion = 1;
    this.specs = {
        view: {path: 'App/views', name: 'view'},
        part: {path: 'App/parts', name: 'part'},
        template: {path: 'App/templates', name: 'template'},
    }

    this.setup = function(settings){
        if(settings){

            if(settings.version){
                this.cacheVersion = settings.version;
            }

            if(settings.specs){
                for(var key in settings.specs){
                    for(var spec in settings.specs[key]){
                        this.specs[key][spec] = settings.specs[key][spec];
                    }
                }
            }

        }
    }
    if(settings){
        this.setup(settings);
    }

    this.doScript = function(url, name, callback){


        if(document.getElementById('eldingu_script_'+name)){
            var script = document.getElementById('eldingu_script_'+name);
            if(typeof callback == 'function'){
                script.remove();
            }
        } else {
            var script = document.createElement('script');
            script.id = 'eldingu_script_'+name;
            script.type = "text/javascript";
            if(typeof callback !== 'function'){
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        }


        script.onload = script.onreadystatechange = function( _, isAbort ) {

            if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {

                script.onload = script.onreadystatechange = null;
                script = undefined;

                if(!isAbort) {
                    if(typeof callback == 'function'){
                        call(script);
                    }
                }

            }

        };

        /*
        if (script.readyState){
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    if(typeof call == 'function'){
                        call(script);
                    }
                }
            };
        } else {
            if(typeof callback == 'function'){
                script.onload = function(){
                    call(script);
                }
            };
        }
        */

        script.src = url;

    }

    this.getFile = function(url, call){

        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                call(request.responseText);
            } else {
                //ERROR
            }
        };

        request.onerror = function() {
            //ERROR
        };

        request.send();

    }

    this.view = {
        name: undefined,
        url: undefined,
        isBuild: false,
        parts: undefined,
        html: undefined,
        template: {
            name: undefined,
            url: undefined,
            html: undefined,
            set: function(c){
                this.html = c;
            }
        },
        init: function(name){
            this.name = name;
            this.isBuild = false;
        },
        conf: function(settings){
            this.template.name = settings.template;
            this.parts = settings.parts;
        }
    }

    this.part = function(url, position, i){

        var part = this.view.parts;
        var script = undefined;
        part[position][i] = undefined;

        this.getFile(url, function(s){

            script = eval(s);
            part[position][i] = {
                template: script.template,
                data: script.data,
                html: undefined,
                set: function(c){
                    this.html = c;
                }
            }

        });

    }

    this.appear = function(){
        if(this.view.isBuild){

            for(var key in this.view.parts){
                for(var i=0; i<this.view.parts[key].length ;i++){

                    //TODO

                    this.view.parts[key][i].html = Mustache.to_html(this.view.parts[key][i].data, this.view.parts[key][i].template);
                    this.view.html = Mustache.to_html(this.view.template.html, this.view.parts[key][i].html);

                }
            }

        }
    }

    this.build = function(){

        if(!this.view.isBuild){

            this.view.url = this.specs.view.path +'/'+ this.view.name +'/'+ this.specs.view.name+'.min.js';
            this.view.isBuild = true;
            this.doScript(this.view.url, this.view.name);

        } else {

            var body = this.body;

            //Get the parts
            var parts = this.view.parts;
            for(var position in parts){
                for(var i=0; i<parts[position].length ;i++){
                    var url = this.specs.part.path+'/'+parts[position][i]+'.min.js';
                    this.part(url, position, i);
                }
            }

            //Get the views frame
            var frame = this.view.template;
            frame.url = this.specs.template.path +'/'+ frame.name +'.html';
            this.getFile(frame.url, function(c){
                frame.set(c);
            });

        }

    }

}
