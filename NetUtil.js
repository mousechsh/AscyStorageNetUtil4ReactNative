//!!!!!!!!
//********************************************************************************************************************************
// React Native NetUtil Component
// It is a Util for network
//================================================================================================================================
// import zone
//--------------------------------------------------------------------------------------------------------------------------------
// import React
import React, { Component } from 'react';
import { NetInfo, Alert } from 'react-native';
import GlobalStorage from './GlobalStorage';
//================================================================================================================================
// receive global static keys
//--------------------------------------------------------------------------------------------------------------------------------
const GlobalStorageStaticKeys = GlobalStorage.getStaticKeys();
//================================================================================================================================
// defined class NetUtil
//--------------------------------------------------------------------------------------------------------------------------------
export default class NetUtil extends React.Component{
//================================================================================================================================
// Async functions for communicate
//--------------------------------------------------------------------------------------------------------------------------------
	// Get Network Method
	static getMethod(){
		return {
			getJson: 'GETJSON',
			postJson: 'POSTJSON',
			putJson: 'PUTJSON',
			deleteJson: 'DELETEJSON',
		};
	}
	// GET JSON
	static getJson( url, data = undefined, callback = () => {}, callbackError = () => {} ){
		if( data == undefined ){
			fetch( url, {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				credentials: 'include'
			} )
			.then( response => response.json() )
			.then( json => {
				try{
					callback( json );
				}
				catch( err ){}
			} )
			.catch( err => {
				try{
					callbackError( err );
				}
				catch( err ){}
			} ).done();
		}
		else{
			fetch( url, {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				body: JSON.stringify( data ),
				credentials: 'include'
			} )
			.then( response => response.json() )
			.then( json => {
				try{
					callback( json );
				}
				catch( err ){}
			} )
			.catch( err => {
				try{
					callbackError( err );
				}
				catch( err ){}
			} ).done();
		}
	}
	// POST JSON
	static postJson( url, data = {}, callback = () => {}, callbackError = () => {} ){
		fetch( url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( data ),
			credentials: 'include'
		} )
		.then( response => response.json() )
		.then( json => {
			try{
				callback( json );
			}
			catch( err ){}
		} )
		.catch( err => {
			try{
				callbackError( err );
			}
			catch( err ){}
		} ).done();
	}
	// PUT JSON
	static putJson( url, data = {}, callback = () => {}, callbackError = () => {} ){
		fetch( url, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( data ),
			credentials: 'include'
		} )
		.then( response => response.json() )
		.then( json => {
			try{
				callback( json );
			}
			catch( err ){}
		} )
		.catch( err => {
			try{
				callbackError( err );
			}
			catch( err ){}
		} ).done();
	}
	// DELETE JSON
	static deleteJson( url, data = undefined, callback = () => {}, callbackError = () => {} ){
		if( data == undefined ){
			fetch( url, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json'
				},
				credentials: 'include'
			} )
			.then( response => response.json() )
			.then( json => {
				try{
					callback( json );
				}
				catch( err ){}
			} )
			.catch( err => {
				try{
					callbackError( err );
				}
				catch( err ){}
			} ).done();
		}
		else{
			fetch( url, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json'
				},
				body: JSON.stringify( data ),
				credentials: 'include'
			} )
			.then( response => response.json() )
			.then( json => {
				try{
					callback( json );
				}
				catch( err ){}
			} )
			.catch( err => {
				try{
					callbackError( err );
				}
				catch( err ){}
			} ).done();
		}
	}
	// DELETE String
	static deleteString( url, data = undefined, callback = () => {}, callbackError = () => {} ){
		if( data == undefined ){
			fetch( url, {
				method: 'DELETE',
				credentials: 'include'
			} )
			.then( response => {
				try{
					callback( response );
				}
				catch( err ){}
			} )
			.catch( err => {
				try{
					callbackError( err );
				}
				catch( err ){}
			} ).done();
		}
		else{
			fetch( url, {
				method: 'DELETE',
				body: data,
				credentials: 'include'
			} )
			.then( response => {
				try{
					callback( response );
				}
				catch( err ){}
			} )
			.catch( err => {
				try{
					callbackError( err );
				}
				catch( err ){}
			} ).done();
		}
	}
//================================================================================================================================
// functions for network status test
//--------------------------------------------------------------------------------------------------------------------------------
	// Get network status values
	static getNetworkStatusValues(){
		return {
			// Common
			NONE: 'NONE',
			WIFI: 'WIFI',
			UNKNOWN: 'UNKNOWN',
			// Android only
			BLUETOOTH: 'BLUETOOTH',
			DUMMY: 'DUMMY',
			ETHERNET: 'ETHERNET',
			MOBILE: 'MOBILE',
			MOBILE_DUN: 'MOBILE_DUN',
			MOBILE_HIPRI: 'MOBILE_HIPRI',
			MOBILE_MMS: 'MOBILE_MMS',
			MOBILE_SUPL: 'MOBILE_SUPL',
			VPN: 'VPN',
			WIMAX: 'WIMAX',
			// iOS only
			CELL: 'CELL',
			// custom
			MouseChshNtNone: 'MouseChshNtNone',
			MouseChshNtMobile: 'MouseChshNtMobile',
			MouseChshNtWiFi: 'MouseChshNtWiFi',
			MouseChshNtUnknown: 'MouseChshNtUnknown'
		};
	}
	// Test Network status
	static checkNetwork( callback = () => {} ){
		const NtStatus = this.getNetworkStatus();
		NetInfo.fetch().done( eReach => {
			let strReach = eReach.toString().toUpperCase();
			let strNtStatus = NtStatus.MouseChshNtNone;
			switch ( strReach ) {
				case NtStatus.NONE:
					strNtStatus = NtStatus.MouseChshNtNone;
					break;
				case NtStatus.WIFI:
					strNtStatus = NtStatus.MouseChshNtWiFi;
					break;
				case NtStatus.UNKNOWN:
					strNtStatus = NtStatus.MouseChshNtUnknown;
					break;
				case NtStatus.BLUETOOTH:
					strNtStatus = NtStatus.MouseChshNtNone;
					break;
				case NtStatus.DUMMY:
					strNtStatus = NtStatus.MouseChshNtNone;
					break;
				case NtStatus.ETHERNET:
					strNtStatus = NtStatus.MouseChshNtWiFi;
					break;
				case NtStatus.MOBILE:
					strNtStatus = NtStatus.MouseChshNtMobile;
					break;
				case NtStatus.MOBILE_DUN:
					strNtStatus = NtStatus.MouseChshNtMobile;
					break;
				case NtStatus.MOBILE_HIPRI:
					strNtStatus = NtStatus.MouseChshNtMobile;
					break;
				case NtStatus.MOBILE_MMS:
					strNtStatus = NtStatus.MouseChshNtMobile;
					break;
				case NtStatus.MOBILE_SUPL:
					strNtStatus = NtStatus.MouseChshNtMobile;
					break;
				case NtStatus.VPN:
					strNtStatus = NtStatus.MouseChshNtWiFi;
					break;
				case NtStatus.WIMAX:
					strNtStatus = NtStatus.MouseChshNtWiFi;
					break;
				case NtStatus.CELL:
					strNtStatus = NtStatus.MouseChshNtMobile;
					break;
				default:
					strNtStatus = NtStatus.MouseChshNtNone;
					break;
			}
			try{
				callback( strNtStatus, strReach );
			}
			catch( err ){}
		} );
	}
//================================================================================================================================
// Common Network Data Loader and Storage Data Loader
//--------------------------------------------------------------------------------------------------------------------------------
	// Loading Data with Network and Storage, sub function
	static __DataLoaderValueProcess2( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json ){
		if( !value ){
			value = {};
		}
		if( valueProcess && valueProcess.setter ){
			try{
				value = valueProcess.setter( value, json );
			}
			catch( err ){
				//Alert.alert( '方法调用失败(S)', JSON.stringify( err ) );
				//*
				Alert.alert( '提示', '方法调用失败(S)', [
					{ text: '确定', onPress : () => {} }
				] ); //*/
				GlobalStorage.SetV( storageKey, undefined, () => {} );
			}
		}
		else{
			value = json;
		}
		return value;
	}
	//
	static __DataLoaderNetworkingOkProcess( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json ){
		value = this.__DataLoaderValueProcess2( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
		if( storageKey ){
			GlobalStorage.SetV( storageKey, value, () => {
				try{
					dataCallback( json, value, netUrl, data );
				}
				catch( err ){
					//Alert.alert( '方法调用失败(O)', JSON.stringify( err ) );
					//*
					Alert.alert( '提示', '方法调用失败(O)', [
						{ text: '确定', onPress : () => {} }
					] ); //*/
					GlobalStorage.SetV( storageKey, undefined, () => {} );
				}
			} );
		}
		else{
			try{
				dataCallback( json, value, netUrl, data );
			}
			catch( err ){
				//Alert.alert( '方法调用失败(O2)', JSON.stringify( err ) );
				//*
				Alert.alert( '提示', '方法调用失败(O2)', [
					{ text: '确定', onPress : () => {} }
				] ); //*/
				GlobalStorage.SetV( storageKey, undefined, () => {} );
			}
		}
	}
	// Loading Data with Network and Storage, sub function
	static __DataLoaderNetworkLoading( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value ){
		const NetMethodKeys = this.getMethod();
		if( netMethod == NetMethodKeys.getJson ){
			this.getJson( netUrl, data, json => {
				this.__DataLoaderNetworkingOkProcess( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
			}, err => {
				this.__DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, '访问网络失败(L)', err );
			} );
		}
		else if( netMethod == NetMethodKeys.postJson ){
			this.postJson( netUrl, data, json => {
				this.__DataLoaderNetworkingOkProcess( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
			}, err => {
				this.__DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, '访问网络失败(L2)', err );
			} )
		}
		else if( netMethod == NetMethodKeys.putJson ){
			this.putJson( netUrl, data, json => {
				this.__DataLoaderNetworkingOkProcess( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
			}, err => {
				this.__DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, '访问网络失败(L2)', err );
			} );
		}
		else if( netMethod == NetMethodKeys.deleteJson ){
			this.deleteJson( netUrl, data, json => {
				this.__DataLoaderNetworkingOkProcess( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
			}, err => {
				this.__DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, '访问网络失败(L)', err );
			} );
		}
		else{
			this.__DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, '网络方法不存在(L)', null );
		}
	}
	// Loading Data with Network and Storage, sub function
	static __DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, message, err ){
		if( !errorCallback ){
			//Alert.alert( message, JSON.stringify( err ) );
			//*
			Alert.alert( '提示', message, [
				{ text: '确定', onPress : () => {} }
			] ); //*/
		}
		else{
			try{
				errorCallback( err, netUrl, data );
			}
			catch( err ){
				//Alert.alert( '方法调用失败(E)', JSON.stringify( err ) );
				//*
				Alert.alert( '提示', '方法调用失败(E)', [
					{ text: '确定', onPress : () => {} }
				] ); //*/
				GlobalStorage.SetV( storageKey, undefined, () => {} );
			}
		}
	}
	// Loading Data with Network and Storage, sub function
	static __DataLoaderImmediately( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, svalue ){
		const NetMethodKeys = this.getMethod();
		setTimeout( () => {
			try{
				dataCallback( svalue, value, netUrl, data );
			}
			catch( err ){
				//Alert.alert( '方法调用失败(I)', JSON.stringify( err ) );
				//*
				Alert.alert( '提示', '方法调用失败(I)', [
					{ text: '确定', onPress : () => {} }
				] ); //*/
				GlobalStorage.SetV( storageKey, undefined, () => {} );
			}
			if( netMethod == NetMethodKeys.getJson ){
				this.getJson( netUrl, data, json => {
					value = this.__DataLoaderValueProcess2( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
					GlobalStorage.SetV( storageKey, value, () => {} );
				}, err => {} );
			}
			else if( netMethod == NetMethodKeys.postJson ){
				this.postJson( netUrl, data, json => {
					value = this.__DataLoaderValueProcess2( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
					GlobalStorage.SetV( storageKey, value, () => {} );
				}, err => {} );
			}
			else if( netMethod == NetMethodKeys.putJson ){
				this.putJson( netUrl, data, json => {
					value = this.__DataLoaderValueProcess2( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
					GlobalStorage.SetV( storageKey, value, () => {} );
				}, err => {} );
			}
			else if( netMethod == NetMethodKeys.deleteJson ){
				this.deleteJson( netUrl, data, json => {
					value = this.__DataLoaderValueProcess2( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, json );
					GlobalStorage.SetV( storageKey, value, () => {} );
				}, err => {} );
			}
			else{
				this.__DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, '网络方法不存在(I)', null );
			}
		}, 10 );
	}
	// Loading Data with Network and Storage, sub function
	static __DataLoaderValueProcess( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value ){
		if( valueProcess && valueProcess.getter ){
			try{
				let nvalue = valueProcess.getter( value );
				if( !nvalue ){
					this.__DataLoaderNetworkLoading( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value );
				}
				else{
					this.__DataLoaderImmediately( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, nvalue );
				}
			}
			catch( err ){
				this.__DataLoaderErrorCallback( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, '数据解析失败(P)', err );
			}
		}
		else{
			this.__DataLoaderImmediately( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value, value );
		}
	}
	// Loading Data with Network and Storage
	static DataLoader( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess ){
		if( !dataCallback ) return;
		netMethod = netMethod.toString().toUpperCase();
		if( storageKey ){
			GlobalStorage.GetV( storageKey, ( value, err ) => {
				if( !value ){
					this.__DataLoaderNetworkLoading( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess );
				}
				else{
					this.__DataLoaderValueProcess( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess, value );
				}
			} );
		}
		else{
			this.__DataLoaderNetworkLoading( storageKey, netMethod, netUrl, data, dataCallback, errorCallback, valueProcess );
		}
	}
}
//******************************************************************************************************************************** ****
