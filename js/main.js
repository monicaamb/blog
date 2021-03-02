const URL_API = 'https://api.airtable.com/v0/appObtUkjyq4xaUbK/Posts?maxRecords=30&view=Grid%20view';
const URL_API_ADD = 'https://api.airtable.com/v0/appObtUkjyq4xaUbK/Posts';
const URL_API_DELETE = 'https://api.airtable.com/v0/appObtUkjyq4xaUbK/Posts?records[]=';
const URL_API_UPDATE = 'https://api.airtable.com/v0/appObtUkjyq4xaUbK/Posts';
const AUTHORIZATION = 'Bearer keyC6SNxSpXpc852b';


new Vue({
    el: '#app',
    data: {
        articulos: [],
        nuevoTitulo: '',
        nuevoTexto: '',
        articuloActualizar: []
    },
    mounted: function () {
        this.obtenerArticulos();
    },
    methods: {
        anyadirArticulo: function () {
            if (this.nuevoTitulo !== '') {
                fetch(URL_API_ADD, {
                    headers: {
                        'Authorization': AUTHORIZATION,
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        "records": [
                            {
                                "fields": {
                                    "Titulo": this.nuevoTitulo,
                                    "Texto": this.nuevoTexto
                                }
                            }
                        ]
                    })
                })
                    .then(() => this.nuevoTitulo = '')
                    .then(() => this.nuevoTexto = '')
                    .then(() => this.obtenerArticulos())
            }
        },
        borrarArticulo: function (id) {
            //Borrar del API
            fetch(URL_API_DELETE.concat(id), {
                headers: {
                    'Authorization': AUTHORIZATION
                },
                method: 'DELETE'
            });
            //Borrar de Local
            this.articulos = this.articulos.filter(articulo => {
                return articulo.id !== id
            });
        },
        actualizarTituloEnAPI: function (id, nuevoTitulo) {
            fetch(URL_API_UPDATE, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': AUTHORIZATION
                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                    {
                        "id": id,
                        "fields": {
                            "Titulo": nuevoTitulo,
                            }
                        }
                    ]
                })
            })
        },
        actualizarTextoEnAPI: function (id, nuevoTexto) {
            fetch(URL_API_UPDATE, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': AUTHORIZATION
                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Texto": nuevoTexto
                            }
                        }
                    ]
                })
            })
        },
        obtenerArticulos: function () {
            fetch(URL_API, {
                headers: {
                    'Authorization': AUTHORIZATION
                }
            })
                .then((response) => response.json())
                .then((json) => this.articulos = json.records)
        }
    }
})

