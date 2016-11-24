var jQuery = require('jquery');
window.$ = window.jQuery = jQuery;

var Tether = require('tether');
window.Tether = Tether;

var Vue = require('vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);

require('bootstrap');
require('chart.js');

new Vue({
    el: '#base',

    components: {
        'mozaic': require('../../bundles/disjfamozaic/mozaic.vue'),
        'addthis': require('./addthis.vue')
    }
});