/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */
var ReactDOMServer = require('react-dom/server');
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
//  '/*': {policy: 'selectApiVersion', skipAssets: true},
  // '/': {
  //   view: 'homepage'
  // },
  'get /categoryapi': 'CategoryapiController.find',
  'get /ratingapi': 'RatingapiController.find',
  'get /usersapi': 'UsersapiController.find',
  'get /productsapi': 'ProductsapiController.find',
  'post /categoryapi': 'CategoryapiController.find',
  'post /ratingapi': 'RatingapiController.find',
  'post /usersapi': 'UsersapiController.find',
  'post /productsapi': 'ProductsapiController.find',
  'get /productsapi/:productId':'ProductsapiController.getProductId',
  'get /usersapi/:id':'UsersapiController.getUserId',
  'get /categoryapi/:id':'CategoryapiController.getCategoryById',
  
  // 'get /*':function(req, res) { return res.view('layout',{hihi:"<h1>hello</h1>"}); }
  // 'post /signup': 'AuthController.processSignup',
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
