import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#dadedf',
                secondary: '#b8b8b8',
                white: '#ffffff',
                blue: '#2d98a5',
                lightblue: '#b1d7d8',
                complete: '#2bfc83',
                inprogress: '#ffb936',
                incomplete: '#ff1212',
                pink: '#f87b7b',
                lightpink: '#f3a5a2',
                purple: '#b8c8c6',
                dark: '#2b2b2b'
            }
        }
    }
});
