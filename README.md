
# EldingarJS

EldingarJS is a JavaScript library for building view- and component-based Web-Applications. It should provide an easy and secure solution for everything you need to use in a default Webapp like data management and editing. By using MustacheJS you don't need to worry about html that much and can focus on your functionalities more.

## Installation
Using EldingarJS is easy: You don't need anything but an Apache or Node Server for the implemented routing functions. 

## Getting Started
Here you can find everything you need to know about EldingarJS functions. Use this tutorial to build your first App with EldingarJS or to find informations about all functions.
First, let's take a look at the basic directory structure:
```
index.html
App/
├── init.min.js
├── views/
│   ├── main/
│   │   └── view.min.js
│   └── about/
|		└── view.min.js
├── parts/
│   ├── navbar/
│   │   └── default.min.js
│   ├── card/
│   │   └── default.min.js
│   └── footer/
|		└── default.min.js
└── templates/
    ├── frames/
    │   ├── default.html
    │   └── container-fluid.html
    ├── navbar/
    │   ├── default.html
    │   └── fixed.html
    ├── card/
    │   └── default.html
    │   └── clickable.html
    └── footer/
        ├── default.html
        └── sticky.html
```
You actually don't have to use this structure. In the following step you'll see how to adjust your projects paths.

### Initiate EldingarJS
To use EldingarJS, first make an instance of it at init.min.js:
`const eldingar = new EldingarJS();`

Then do some Settings if you need. You can change the directory structure and many more:
```javascript
eldingar.setup({
	version: 1.0,
	paths: {
		views: 'App/view/',
		parts: 'App/component/script/',
		templates: 'App/component/template/'
	},
});
```
### Build a Part/Component

A Part uses a Template and it's Script to build itself. You can use your own params and use them like that:
(Example: parts/card/default)
```javascript
if(this.conf.clickable){
	this.template = 'card/clickable';
} else {
	this.template = 'card/default';
}

if(this.conf.width){
	this.data['width'] = this.conf.width;
} else {
	this.data['width'] = 12;
}	
```

### Build a View
A View uses a Frame (-Template) and components/parts, which will be placed inside the Frame.
Your Frame should tell how the layout is structured. If you don't define a Frame, your Parts will be placed in the body without any structure. Here's an example for a simple Bootstrap-Frame:

#### Frame
```html
<body>
	<header>
		{{header}}
	</header>
	<main>
		{{content}}
	</main>
	<footer>
		{{footer}}
	</footer>
</body>
```

#### Script

To prepare your View (get all scripts and templates to be ready for build) you can use the `view.prepare()` function. Provide an Object with your Frame and Parts, as well as their data:

```javascript
eldingar.view.prepare({
	frame: 'frames/default',
	parts: {
		navigation: {
			script: 'navbar/default',
			position: 'header',
			conf: {
				search: true,
				fixed: false
			},
			data: {
				links: [
					{text: 'Home', onclick: 'eldingar.view.change("main")'},
					{text: 'About', onclick: 'eldingar.view.change("about")'}
				],
				brand: 'EldingarJS',
				description: 'The Data-Object is in the MustacheJS format.'
			}
		},
		infoCards: {
			script: 'card/default',
			position: 'content',
			conf: {
				width: 4,
				clickable: false
			},
			data: {cards:[
				{heading: 'This is a Card-Component', content: 'Foo'},
				{heading: 'Get your Data', content: 'Use PHP or smth'},
				{heading: 'Use your Data', content: 'Push the results into the Data-Object'},
			]}
		},
		linkedCards: {
			script: 'card/default',
			position: 'content',
			conf: {
				width: 12,
				clickable: true
			},
			data: {cards:[
				{heading: 'Github', content: 'Checkout Github', href: 'https://github.com'},
				{heading: 'Google', content: 'Checkout Google', href: 'https://google.com'}
			]}
		},
		footer: {
			script: 'footer/default',
			position: 'footer',
			data: {
				links: [
					{text: 'FAQ', onclick: 'eldingar.view.change("faq")'},
					{text: 'License', href: 'https://github.com'}
				],
				copyright: 'by Elia Reutlinger 2018'
			}
		}
	},
});
```
In the end, use `view.build()` to generate everything and appear it in your app.

#### Add/Remove Data from a Part/Component
You can add Data to an specific Part like this:
```javascript
eldingar.view.editPart(
	infoCards.data.cards.push(
		{heading: 'this was added after prepare()', content: 'Fancy Dancy Lancy.'},
		{heading: 'Dont worry be happy', content: 'It has to be easy.'},
		{heading: 'Foo', content: 'Faa'},
	);
)
```
And remove it like this:
```javascript
eldingar.view.editPart(
	infoCards.data.cards.splice(4);
)
```

Afterwards, type `eldingar.view.reload()` to display the Changes. This will reload all Parts that you have edited so far.

As you can see, you can just use typical array-functions to edit the data of your Part.

## Examples

This is how an complete view.parts-config looks:
```javascript
{
  frame: 'frames/default',
  modified: false,
  parts: {
    navigation: {
      script: 'navbar/default',
      template: 'undefined',
      position: 'header',
      conf: {
        search: true,
        fixed: false
      },
      data: {
        links: [
          {
            text: 'Home',
            onclick: 'eldingar.view.change("main")'
          },
          {
            text: 'About',
            onclick: 'eldingar.view.change("about")'
          }
        ],
        brand: 'EldingarJS',
        description: 'The Data-Object is in the MustacheJS format.'
      },
      html: 0
    },
    infoCards: {
      script: 'card/default',
      template: 'undefined',
      position: 'content',
      conf: {
        width: 4,
        clickable: false
      },
      data: {
        cards: [
          {
            heading: 'This is a Card-Component',
            content: 'Foo'
          },
          {
            heading: 'Get your Data',
            content: 'Use PHP or smth'
          },
          {
            heading: 'Use your Data',
            content: 'Push the results into the DataObject'
          }
        ]
      },
      html: 0
    },
    linkedCards: {
      script: 'card/default',
      template: 'undefined',
      position: 'content',
      conf: {
        width: 12,
        clickable: true
      },
      data: {
        cards: [
          {
            heading: 'Github',
            content: 'Checkout Github',
            href: 'https://github.com'
          },
          {
            heading: 'Google',
            content: 'Checkout Google',
            href: 'https://google.com'
          }
        ]
      },
      html: 0
    },
    footer: {
      script: 'footer/default',
      template: 'undefined',
      position: 'footer',
      data: {
        links: [
          {
            text: 'FAQ',
            onclick: 'eldingar.view.change("faq")'
          },
          {
            text: 'License',
            href: 'https://github.com'
          }
        ],
        copyright: 'by Elia Reutlinger 2018'
      },
      html: 0
    }
  }
}
```

## Contributing
