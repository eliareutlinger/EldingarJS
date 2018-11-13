
/*
var navbar = {
    links: [
        {text: 'Home', url: '#jeeeeeee'},
        {text: 'About', url: '#juhuuu'}
    ],
    brand: {text:'EldinguJS',url:'#hehe'}
}
*/

eld.view.conf({
    template: 'frame/fluid',
    parts: {
        top: [
            'navbar/fixed'
        ],
        middle: [
            'jumbotron/default', 'title/default'
        ],
        bottom: [
            'footer/sticky'
        ]
    }
});

eld.build();
