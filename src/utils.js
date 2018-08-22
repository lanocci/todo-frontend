import axios from 'axios';

export default class Utils {
	uuid() {
		/*jshint bitwise:false */
		var i, random;
		var uuid = '';

		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				uuid += '-';
			}
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
				.toString(16);
		}

		return uuid;
	}

	pluralize(count, word) {
		return count === 1 ? word : word + 's';
	}

	store(namespace, data) {
		console.log('utils.store')
//		const axios = axiosBase.create({
//			baseUrl: 'http://localhost:8081',
//			headers: {
//				"Content-Type": "application/json",
//				"X-Requested-With": "XmlHttpRequest"
//			},
//			responseType: "json"
//		})
		//if (data) {
			//return localStorage.setItem(namespace, JSON.stringify(data));
		//	axios
		//		.post('/', {
		//			params: {
		//				data: data,
		//				namespace: namespace
		//			}
		//		}
		//	)
		//}
		const caller = axios.create({
			baseURL: 'http://localhost:8080',
			headers: {
				'ContentType': 'application/json',
				'X-Requested-With': 'XMLHttpRequest'
			},
			responseType: 'json'
		})
		async function getTodo() {
			try {
				return (await caller.get('/todos/')).data
			} catch(error) {
				throw error.response.status
			}
		}
			//return caller
			  //.get('/todos/')
			  //.catch(() => {
			  	//console.log('failed to communicate api server')
			  //})
		//}
		getTodo().then((res) => {
			var todo = {
		  	id: res.id,
			  title: res.title,
			  completed: res.completed
			}
			console.log(todo)
			return todo
		})
		.catch(error => console.error(error))
	}
//		var res = axios
//			.get('http://localhost:8081')
//			.then((response) => {
//
//			  console.log(response.responseText)
//			  return JSON.parse(response)}
//		  ) //		console.log(res)
//		return (res) || [];
//	}

	extend() {
		var newObj = {};
		for (var i = 0; i < arguments.length; i++) {
			var obj = arguments[i];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					newObj[key] = obj[key];
				}
			}
		}
		return newObj;
	}
}