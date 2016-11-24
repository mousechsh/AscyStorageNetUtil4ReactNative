//!!!!!!!!
//********************************************************************************************************************************
// React Native GlobalStorage Component
// It is a global storage for application
//================================================================================================================================
// import zone
//--------------------------------------------------------------------------------------------------------------------------------
// import React
import React, { Component } from 'react';
import { AsyncStorage, Alert, Platform } from 'react-native';
// use for safety save to global
const globallink = 'GLOBALSTORAGE' + Math.random().toString().substr( 2 );
const globalcache = 'GLOBALCACHE' + Math.random().toString().substr( 2 );
//================================================================================================================================
// defined class GlobalStorage
//--------------------------------------------------------------------------------------------------------------------------------
export default class GlobalStorage extends React.Component{
//================================================================================================================================
// Async functions for storage
// Values must can be JSON
//--------------------------------------------------------------------------------------------------------------------------------
	// Async get function for storage by key
	static GetV( key, fn ){
		if( !global[ globallink ] ){
			global[ globallink ] = {};
		}
		if( typeof( global[ globallink ][ key ] ) == 'undefined' ){
			AsyncStorage.getItem( key, ( err, result ) => {
				if( result == null ){
					try{
						fn( undefined, err );
					}
					catch( err ){}
				}
				else{
					global[ globallink ][ key ] = result;
					try{
						fn( JSON.parse( global[ globallink ][ key ] ), err );
					}
					catch( err ){}
				}
			} );
		}
		else{
			try{
				fn( JSON.parse( global[ globallink ][ key ] ) );
			}
			catch( err ){}
		}
	}
	// Async set function for storage with key and value
	static SetV( key, value, fn ){
		if( !global[ globallink ] ){
			global[ globallink ] = {};
		}
		global[ globallink ][ key ] = JSON.stringify( value );
		AsyncStorage.setItem( key, global[ globallink ][ key ], err => {
			try{
				fn( err );
			}
			catch( err ){}
		} );
	}
	// Async remove function for storage by key
	static RemoveV( key, fn ){
		if( !global[ globallink ] ){
			global[ globallink ] = {};
		}
		delete global[ globallink ][ key ];
		AsyncStorage.removeItem( key, err => {
			try{
				fn( err );
			}
			catch( err ){}
		} );
	}
	// Async clear function for storage by key
	static ClearV( fn ){
		global[ globallink ] = {};
		AsyncStorage.clear( err => {
			try{
				fn( err );
			}
			catch( err ){}
		} );
	}
	// Async restore values from storage to async cache
	static Restore( fn ){
		if( !global[ globallink ] ){
			global[ globallink ] = {};
		}
		AsyncStorage.getAllKeys( ( err, keys ) => {
			AsyncStorage.multiGet( keys, ( err, stores ) => {
				stores.map( ( result, i, store ) => {
					let key = store[ i ][ 0 ];
					let value = store[ i ][ 1 ];
					global[ globallink ][ key ] = value;
				} );
				try{
					fn();
				}
				catch( err ){}
			} );
		} );
	}
//================================================================================================================================
// Sync functions for cache
// Values can be any type of JavaScript
//--------------------------------------------------------------------------------------------------------------------------------
	// Sync get function for cache by key
	static GetT( key ){
		if( !global[ globalcache ] ){
			global[ globalcache ] = {};
		}
		if( typeof( global[ globalcache ][ key ] ) == 'undefined' ){
			return undefined;
		}
		else{
			return global[ globalcache ][ key ];
		}
	}
	// Sync set function for cache with key and value
	static SetT( key, value ){
		if( !global[ globalcache ] ){
			global[ globalcache ] = {};
		}
		global[ globalcache ][ key ] = value;
	}
	// Sync remove function for cache by key
	static RemoveT( key ){
		if( !global[ globalcache ] ){
			global[ globalcache ] = {};
		}
		delete global[ globalcache ][ key ];
	}
//================================================================================================================================
// Static values
//--------------------------------------------------------------------------------------------------------------------------------
	// Get global static keys
	static getStaticKeys(){
		return new function(){
			// Applicatin version
			this.AppVersion = '1.0.0.0';
			// Applicatin version
			this.BundleVersion = '1.0.0.0';
		};
	}
//================================================================================================================================
}
//******************************************************************************************************************************** ****
