eldingar.getTemplate('jumbotron/default', function(template){
	Vue.component('jumbotron-default', {
		data: function () {
			return {
				brand: 'EldingarJS Vue',
				links: []
			}
		},
		template: template
	});
    new Vue({ el: '#view' });
});
