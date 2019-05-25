let wav = {
    data: () => ({
        wav_url: {
            type: String,
            optional: false
        },
        name: {
            type: String,
            optional: false
        },
        color: {
            type: String,
            default: "red"
        },

        audio: null
    }),

    created: function() {
        this.audio = new Audio(this.url);
    },
    
    methods: {
        /* Reproducir el audio disponible en el componente*/
        play: function() {
            this.audio.play();
        },

        /* Pausar */
        pause: function() {
            setTimeout(() => {}, 500);
            this.audio.pause();
        },

        /* Modificar el volumen paulativamente */
        adjustVolume: function(target, time) {
            // Valor arbitrario de incrementos de 16 milis
            let iterations = time / 16;

            // Tipo de operación
            let action = this.audio.volume > target ? 'decrease' : 'increase';

            // Cantidad a aplicar
            let difference = action == 'increase' ?
                target - this.audio.volume : this.audio.volume - target;
                
            // Diferencia que será agregada o eliminada por iteración
            let fraction = difference / iterations;


            // Ejecutar el decremento hasta que termine la cantidad de iteración
            while (iterations >= 1) {
                setTimeout(() => {
                    switch (action) {
                        case 'increase':
                            this.audio.volume = this.audio.volume + fraction;
                            break;
                        case 'increase': 
                            this.audio.volume = this.audio.volume + fraction;
                            break;
                        default: break;
                    }
                }, 16);
                iterations--;
            } 
        }
    }
};

let app = new Vue({
    el: '#container',
    data: {
        songs: [],
        sfx: []
    },
    
    methods: {
    
        /* Obtener la lista de canciones */
        getSongs: function() {
            $.ajax({
                method: 'GET',
                url: API_PREFIX + 'songs',
                success: response => {
                    this.songs = response.payload.songs;
                },
                error: response => {
                    alert("Error during remote query of available songs: " + response.message);
                }
            });
        },

        /* Obtener la lista de canciones */
        getSFX: function() {
            $.ajax({
                method: 'GET',
                url: API_PREFIX + 'sfx',
                success: response => {
                    this.sfx = response.payload.sfx;
                },
                error: response => {
                    alert("Error during remote query of available songs: " + response.message);
                }
            });
        }
    }
});