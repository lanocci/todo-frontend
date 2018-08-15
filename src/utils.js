import axios from 'axios';
import React from 'react';
'use strict';

export default class Utils extends React.Component {
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
		var res = axios
			.get('http://localhost:8080/todos/')
			.then(response => {
				return  response.data 
			})
		return res.then(function(data) {
			return {
			id: data.id,
			title: data.title,
			completed: data.completed
			}
		})
	}
//		var res = axios
//			.get('http://localhost:8081')
//			.then((response) => {
//
//			  console.log(response.responseText)
//			  return JSON.parse(response)}
//		  )
//		console.log(res)
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