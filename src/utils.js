import axiosBase from 'axios';
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
		const axios = axiosBase.create({
			baseUrl: 'http://localhost:8080',
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XmlHttpRequest"
			},
			responseType: "json"
		})
		if (data) {
			//return localStorage.setItem(namespace, JSON.stringify(data));
			axios
				.post('/todos', {
					params: {
						data: data,
						namespace: namespace
					}
				}
			)
		}
		var store = axios.get('/todos') 
		return (store && JSON.parse(store)) || [];
	}

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