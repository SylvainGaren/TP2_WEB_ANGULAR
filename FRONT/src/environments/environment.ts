// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendProduct: '/assets/mock/products.json',
  backendPhp: 'http://node13.codenvy.io:38088/TP2_WEB_ANGULAR/backPHP/index.php/client',
  backendCheckUser: 'http://node13.codenvy.io:38088/TP2_WEB_ANGULAR/backPHP/index.php/checkUser',
  backendGet: 'http://node13.codenvy.io:38088/TP2_WEB_ANGULAR/backPHP/index.php/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
