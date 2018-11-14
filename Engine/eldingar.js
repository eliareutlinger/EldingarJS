function Eldingar(){

    this.cache = {
        views: {},
        components: {},
        templates: {}
    }

    this.config = {
        version: 1.0,
        path: {
            view: 'App/view',
            component: 'App/component',
            template: 'App/template',
        },
        position: {
            navbar: 'navbar',
            view: 'view',
            footer: 'footer'
        }
    }

    this.setup = function(settings){

        if(settings){
            if(settings.version){this.config.version = settings.version}
            if(settings.path){
                if(settings.path.view){this.config.path.view = settings.path.view}
                if(settings.path.component){this.config.path.component = settings.path.component}
                if(settings.path.template){this.config.path.template = settings.path.template}
            }
        }

    }

    this.changeView = function(view){

        var viewCache = this.cache.views;
        if(viewCache[view]){
            eval(viewCache[view]);
        } else {

            var url = this.config.path.view +'/'+ view + '/view.js?eldCachV'+this.config.version;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    eval(request.responseText);
                    viewCache[view] = request.responseText;
                } else {

                }
            };
            request.onerror = function() {

            };
            request.send();

        }

    }

    this.getTemplate = function(tmpl, callback){

        var templateCache = this.cache.templates;

        if(templateCache[tmpl]){
            callback(templateCache[tmpl]);
        } else {

            var url = this.config.path.template +'/'+ tmpl + '.html?eldCachV'+this.config.version;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    callback(request.responseText);
                    templateCache[tmpl] = request.responseText;
                } else {

                }
            };
            request.onerror = function() {

            };
            request.send();

        }

    }

}
