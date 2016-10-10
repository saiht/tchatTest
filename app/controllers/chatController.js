'use strict';


;(function() {

  angular
    .module('chat')
	.constant('URLS', {
      'API_URL': 'http://caty.herokuapp.com/'
    })
	.controller('ChatController',ChatController);

  ChatController.$inject = ['$scope','$http','socket', 'QueryService','storage', 'toaster', 'URLS'];


  
  function ChatController($scope,$http, socket, QueryService,storage, toaster, URLS) {



		/**
		 * Virtual Model
		 */
		var vm = this;

		vm.loginFormDatas = {};
		vm.send = send; 
		vm.messages = send; 
		vm.user = storage.get('user');

		/**
		 * Init
		 */
		load();

		//console.log(socket);
		socket.emit('init');

		socket.on('connect', function () {
			
			socket.emit('self:join', {roomName: 'HOT'}, function(data){
				console.log(data);
			});


		});


		/**
		 * load init messages
		 */
		function load(){
			
			vm.messages =  [
				{
					id: 1,
					userName: 'alpha520',
					content: 'Coucou ! ',
					date: new Date(2012,1,3)
				},
				{
					id: 2,
					userName: 'coucou',
					content: 'Tu vas bien ?',
					date: new Date(2014,3,5)
				},
				{
					id: 3,
					userName: 'alpha520',
					content: 'ça va et toi ?',
					date: new Date(2015,10,10)
				},
				{
					id: 4,
					userName: 'coucou',
					content: 'nikel',
					date: new Date()
				},
			];
				
		}

		/**
		 * Send a message
		 */
		function send(){
			var now =  new Date(); 
			var data =  {
					roomName: "HOT",
					userName: vm.user,
					date:  new Date(),
					time:  new Date().getTime(),
					message: vm.message
			};
			if (vm.message !== ""){
				socket.emit('send:message', data, function(data){
				console.log(data);
				});

				vm.messages.push(
				{
					id: vm.messages.length,
					content:  vm.message,
					userName: (vm.user) ? (vm.user) : 'Anonyme',
					date: new Date()
				});
				console.log(vm.messages);

				vm.message = "";
			}
			else {
				console.warn('Message vide, écrivez quelque chose avant de l\'envoyer');
			}
			
			
			
				
				
		}


		


  };

})();
