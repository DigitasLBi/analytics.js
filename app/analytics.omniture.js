'use strict';

analytics.namespace('omniture');

analytics.omniture = (function() {
  var tags = null;
 
  function setTags(t) {
    tags = t;
  }

  function trackLink(id, obj, customLink) {
    clearVars();
    setVars(id, obj);
    
    if (customLink) {
      s.tl(customLink, 'o', tags[id]['Custom Link Name']);
    }
    else {
      s.tl();
    }
  }

  function track(id) {
    clearVars();
    setVars(id);
    s.t();
  }

  function setVars(id, obj) {
    var tag = tags[id];
    var vars = '';

    for (var prop in tag) {
      if (prop != 'Host Page' && prop != 'Description' && prop != 'Click') {
        if (obj) {
          s[prop] = checkToken(tag[prop], obj);
        }
        else {
          s[prop] = tag[prop];
        }

        vars += (vars === '') ? prop : ',' + prop;
      }
    }

    if (tag.events) {
      s.linkTrackEvents = tag.events;
    }
    else {
      s.linkTrackEvents = 'None';
    }

    s.linkTrackVars = vars;
  }
  
  function checkToken(token, obj){
    for (var prop in obj) {
      if (prop === token){
        token = obj[prop];
      } 
    }
   
    return token;
  }

  function clearVars() {
    for (var i = 0; i < 75; i++) {
      s['prop' + i] = '';
      s['eVar' + i] = '';
    
      if (i <= 5) {
        s['hier' + i] = '';
      }
    }
   
    var svarArr = [
      'pageName',
      'channel',
      'products',
      'events',
      'purchaseID',
      'state',
      'zip',
      'server',
      'linkName'];
    
    for (var i = 0; i < svarArr.length; i++) {
      s[svarArr[i]] = ''; 
    }
  }

  return {
    trackLink: trackLink,
    track: track,
    setTags: setTags
  }
}());
