const eldingar = new Eldingar();

eldingar.setup({
	version: 1.0,
	paths: {
		views: 'App/view/',
		parts: 'App/component/script/',
		templates: 'App/component/template/'
	},
});




if(eld.route.view){
    eld.view.init(eld.route.view);
} else {
    eld.view.init('home');
}

eld.build();
