const eldingar = new Eldingar();

eldingar.setup({
	cacheVersion: 1.0,
	path: {
		view: 'App/views',
		component: 'App/components/script',
		template: 'App/components/template'
	}
});

eldingar.getTemplate('navbar/default', function(template){
	Vue.component('navbar-default', {
		data: function () {
			return {
				brand: 'EldingarJS Vue',
				links: []
			}
		},
		template: template
	});
	new Vue({ el: '#navbar' });
});

eldingar.getTemplate('footer/sticky', function(template){
	Vue.component('footer-sticky', {
	  	data: function () {
	    	return {
	      		count: 0
	    	}
	  	},
	  	template: template
	});
	new Vue({ el: '#footer' });
});

eldingar.changeView('home');
