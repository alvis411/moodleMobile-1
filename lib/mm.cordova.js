// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview Moodle mobile Cordova Emulator lib.
 * @author <a href="mailto:jleyva@cvaconsulting.com">Juan Leyva</a>
 * @version 1.2
 */


/**
  * @namespace Holds all the MoodleMobile Cordova Emulator functionality.
 */
MM.cordova = {

    /**
     * This function load fake Cordova functions when we are testing in a browser
     */
    loadEmulator: function() {

        // Notifications
        if (!window.plugins) {
            window.plugins = {};
        }

        if (!window.plugins.pushNotification && MM.plugins.notifications) {
            window.device = {};
            window.device.name = MM.deviceOS;

            window.plugins.pushNotification = {
              register: function(f1, f2, options) {
                f1('fake_token_for_push_notifications');
              },
              setApplicationIconBadgeNumber: function (p1, p2) { return true; },
            };

            MM.plugins.notifications.registerForPushNotification = function() { return true; };

            setTimeout(function() {
                var notification = {
                    userfrom: 'From: Pep',
                    date: 'yesterday',
                    id: '123456',
                    type: 'calendar',
                    urlparams: 'additional data',
                    aps: {alert: 'Fake notification'}
                };
                $(document).trigger('push-notification', notification);
            }, 15000);
        }

        if (typeof(FileUploadOptions) == 'undefined') {
            window.FileUploadOptions = function() {
                return {};
            };
            MM.log('FileUploadOptions manager loaded', 'Cordova fake');
        }
        if (typeof(FileTransfer) == 'undefined') {
            window.FileTransfer = function() {};
            window.FileTransfer.prototype.upload = function(filePath, server, successCallback, errorCallback, options, debug) {
                MM.log('Fake FileTransfer Upload', 'Cordova');
                setTimeout(successCallback, 3000);
            };
            window.FileTransfer.prototype.download = function(url, filePath, successCallback, errorCallback, options, debug) {
                MM.log('Fake FileTransfer Download', 'Cordova');
                setTimeout(successCallback, 3000);
            };
            MM.log('FileTransfer manager loaded', 'Cordova fake');
        }
        if (typeof(navigator.contacts) == 'undefined') {
            navigator.contacts = {};

            navigator.contacts.create = function(properties) {
                var el = {
                    'save': function(successCallback, errorCallback) {
                        MM.popMessage('This is a empty function. Nothing is done because you are not using a mobile phone');
                        setTimeout(successCallback, 1000);
                    }
                };
                return el;
            };

            window.ContactName = function() { return {}; };
            window.ContactField = function(type, value, pref) { return {}; };
            MM.log('contacts manager loaded', 'Cordova fake');
        }
        if (typeof(navigator.device) == 'undefined') {
            navigator.device = {};
            navigator.device.capture = {};
            navigator.device.capture.captureAudio = function(captureSuccess, captureError, options) {
                MM.popMessage('This is a empty function. Nothing is done because you are not using a mobile phone');
                setTimeout(captureError, 1000);
            };
            window.CaptureError = { CAPTURE_NO_MEDIA_FILES: 1 };
            MM.log('captureAudio manager loaded', 'Cordova fake');
        }

        if (typeof(window.requestFileSystem) == 'undefined') {

            window.LocalFileSystem = {
                    PERSISTENT: 1
            };

            window.requestFileSystem = function(type, params, successCallback, errorCallback) {
                var entry = {
                    root: {
                        getDirectory: function(path, options, successCallback, errorCallback) {
                            MM.log('Cordova fake: Cordova: Creating directory: ' + path);
                            successCallback(entry.root);
                        },
                        fullPath: 'emulator/index.html#/fake_base_path'
                    }
                };
                successCallback(entry);
            };

            MM.log('FileManager loaded', 'Cordova fake');
        }

        if (typeof(navigator.camera) == 'undefined') {

            window.Camera = {};
            Camera.PopoverArrowDirection = {};
            Camera.PopoverArrowDirection.ARROW_ANY = 1;

            window.CameraPopoverOptions = function() { return {}; };

            navigator.camera = {};
            navigator.camera.DestinationType = {};
            navigator.camera.DestinationType.FILE_URI = 1;
            navigator.camera.PictureSourceType = {};
            navigator.camera.PictureSourceType.PHOTOLIBRARY = 1;
            navigator.camera.getPicture = function(captureSuccess, captureError, options) {
                captureSuccess('data:image/png;base64,' +
    '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' +
    'YII=');
            };
            MM.log('navigator.camera manager loaded', 'Cordova fake');
        }

    $(document).trigger('deviceready');
    MM.log('Emulator loaded, fired deviceready', 'Cordova fake');

    }

};
