window.onload = function (){
	// console.log(this);

	$('button.test1').click(function(){
		var sendData = {
			name : document.querySelector('input[name=user]').value,
			age : document.querySelector('input[name=pwd]').value
		};
		$.post('./book/add', sendData, function(data){
			console.log(data);
			if (!data.code) {
				data = JSON.parse(data);
			}
			if (data.code == '0000') {
				app.init();
			}
		});
	});

	$('button.test2').click(function(){
		var sendData = {
			name : document.querySelector('input[name=user]').value,
			age : document.querySelector('input[name=pwd]').value
		};
		$.get('./book', sendData, function(data){
			console.log(data);
			if (!data.code) {
				data = JSON.parse(data);
			}
			if (data.code == '0000') {
				console.log(data);
				app.init();
			}
		});
	});

	// $('button.test3').click(function(){
	// 	var formdata = new FormData();
	// 	formdata.append('name', document.querySelector('input[name=user]').value);
	// 	formdata.append('age', document.querySelector('input[name=pwd]').value);
	// 	$.ajax({
	// 		url  : './book/update.a',
	// 		type : "POST",
	// 		data : formdata,
	// 		// async: false,
	// 		// cache: false,
	// 		contentType: false,
	// 		processData: false,
	// 		success : function(data){
	// 			console.log(data);
	// 			if (!data.code) {
	// 				data = JSON.parse(data);
	// 			}
	// 			if (data.code == '0000') {
	// 				app.init();
	// 			}
	// 		}
	// 	});
	// });

	// Vue.http.post()

	
	document.querySelector('button.test3').onclick = function(){
		var formdata = new FormData();
		formdata.append('age', document.querySelector('input[name=user]').value);
		formdata.append('age', document.querySelector('input[name=pwd]').value);
		Vue.http.post('./book/update', formdata).then(function(res){
			console.log(res)
		});
	};
};

// Vue.http.interceptors.push(function(request, next){
// 	request.headers.set('aaa','bbb');
// 	next(function(response){
// 		return response;
// 	});
// });


var app = new Vue({
	created	: function(){
		this.init();
	},
	el 		: "#app",
	data 	: { 
		sendData :{
			name 	: '',
			age 	: '',
		},
		dataArr : [],
	},
	methods : {
		init 	: function(){
			this.$http.get('./book?name=' + this.sendData.name + '&age=' + this.sendData.age).then(function(res) {
				console.log(res.body);
				if (res.body.code == '0000') {
					this.dataArr = res.body.data;
				}
			}).catch(function(err) {
				console.log(err);
			});
		},
		deleteData 	: function(data){
			console.log(data.id);
			var formdata = new FormData();
			formdata.append('id', data.id);
			var sendObj = {id : data.id + ''};
			this.$http.post('./book/delete', formdata, {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(function(res) {
				if (res.body.code == '0000') {
					this.init();
				}
			}).catch(function(err) {
				console.log(err);
			});
		}
	}

});
