
;(function() {

    /*
    * Bare bone application
    */
    var app = angular.module('chat', ['ngAnimate','ngRoute', 'ngSanitize']).config(config);
    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

  /**
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

  };
  

})();
