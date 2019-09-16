<div align="center">
<img src="https://i.ibb.co/MPrm63d/Screen-Shot-2019-09-16-at-3-56-51-PM.png" alt="Screen-Shot-2019-09-16-at-3-56-51-PM" border="0">
</div>

<h1 align="center">service-prov-dash</h1>


<div align="center">
A management system created for Dispersive's clientel's devices. Users can add, edit, delete, and search for certain devices within their system.
  DEMO: https://www.youtube.com/watch?v=De4pSY9tKsE
</div>

## 🍭 Characteristics
- Add, Edit, and Delete VTC implementations
- Chart view of all VTCs


## 📦 Installation & Setup
```bash
$ git clone http://10.100.0.1/aserna/service-prov-dash.git
$ cd service-prov-dash
$ yarn install
```

- Make sure service-prov API is running on http://127.0.0.1:3004/ (Can be adjusted in Actions.js file to the `url` constant).
- Grab the authentication token from the API and apply it in the Actions.js file (src/actions/Actions.js) to the `AUTH_TOKEN` constant.

```
$ yarn start
```

- Open a browser and visit http://127.0.0.1:8000/

## 🔨 Errors that may appear on start-up

1. If nothing appears or `Could not find "store" in the context of "Connect(GraphDemo)"` , double check the router.js file (src/pages/router.js) and make sure that following code is in the imports: 
*note: this file is considered a hidden file so you may have to make your OS make [hidden files visible](https://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/)*
```
...
import { Provider } from 'react-redux';
import store from '../../store';
```

and the `RouterWrapper` function at the bottom of the file looks like this:
```
...
export  default  function  RouterWrapper(props  =  {})  {
	return (
		<Provider  store={store}>
			<Router  history={history}>
				{renderRoutes(routes,  props)}
			</Router>
		</Provider>
	);
}
```
Save and Reload the application.
***important note**: For some reason, every time you run `yarn start` it removes these two things so you may be doing this multiple times*

2.  If nothing appears, or you get a `TLS handshake error from [::1]:61232: remote error: tls: unknown certificate`, or you get a certification error from the console, make sure to visit the service-prov API's documentation page (found in the url where you're running the service-prov API) and 'proceed anyway' on the certification warning page. Reload the application.

3.  `TypeError: Cannot read property 'length' of undefined` - Application is not receiving containers, therefore the AUTH_TOKEN is most likely not correct. Save and Reload the application.


## ❗️ Known Bugs
- When you add a VTC it is immediately added to the top, not to its alphabetical position

Orginal developer: aeserna.com
