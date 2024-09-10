<template>
<TopNav />
<SearchComponent v-if="$isMobile()"></SearchComponent>
<div class="d-flex justify-content-center">
    <div class="spinner-border text-primary" v-show="loaded" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>

<div class="wrapper">
    <LeftNav v-if="!$isMobile()" v-show="!loaded" :markers="filtered_markers" :marcas="marcas" :regiones="regiones" ref="LeftNavRef" />
    <div id="map"></div>
</div>
<BottomNav />
<!-- Modal -->
<div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sin Registros</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                No hemos encontrado registros para los criterios seleccionados
            </div>
        </div>
    </div>
</div>
<DetailElementComponent :marker="marker_detail" />
</template>

<style>
body {
    font-family: 'Roboto' !important;
}

.marker {
    background-color: #ff0000;
    color: #ffffff;
    border-radius: 50%;
    padding: 5px;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 16px;
}

.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}

.mapboxgl-ctrl-geocoder {
    min-width: 100%;
}

.mapboxgl-ctrl-geocoder,
.mapboxgl-ctrl-geocoder .suggestions {
    box-shadow: none;
}

#map {
    width: 100%;
    height: 100vh;
}
</style>

<script>
import mapboxgl from 'mapbox-gl';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import LeftNav from './components/LeftNav.vue';
import TopNav from './components/TopNav.vue';
import CenterComponent from './components/CenterComponent.vue';
import BottomNav from './components/BottomNav.vue';
import DetailElementComponent from './components/DetailElementComponent.vue';
import {
    matchedRouteKey
} from 'vue-router';
import SearchComponent from './components/SearchComponent.vue';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
    components: {
        LeftNav,
        TopNav,
        CenterComponent,
        BottomNav,
        DetailElementComponent,
        SearchComponent
    },
    data() {
        return {
            map: null,
            geocoder: null,
            token: null,
            markers: Array,
            filtered_markers: Array,
            latitude: -33.4569400,
            longitude: -70.6482700,
            loaded: true,
            marcas: Array,
            regiones: Array,
            marker_detail: {}
        };
    },
    methods: {
        initializeMap() {
            mapboxgl.accessToken =
                import.meta.env.VITE_MAPBOX_KEY;
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.longitude, this.latitude],
                zoom: 13
            });

            // Add zoom and rotation controls to the map.
            map.addControl(new mapboxgl.NavigationControl());

            const geolocateController = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            })

            // Add geolocate control to the map.
            map.addControl(geolocateController);

            this.map = map;

            this.geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });

            this.geocoder.on('result', function (e) {
                console.log(e.result.center)
            })

            this.map.on('load', () => {
                this.addMarkers();
                // Add the control to the map.
                document.getElementById('address_search').appendChild(this.geocoder.onAdd(this.map))
                document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].classList.add('form-control')
                document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].style.padding = '6px 35px'
                document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].placeholder = 'Dirección'
                geolocateController.trigger();
            });

        },
        addMarkers() {

            this.map.addSource('markers', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: this.markers.map(marker => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [parseFloat(marker.ubicacion.longitud), parseFloat(marker.ubicacion.latitud)]
                        },
                        properties: {
                            id: marker.codigo,
                            logo: marker.distribuidor.logo,
                            marca: marker.distribuidor.marca,
                            direccion: marker.ubicacion.direccion,
                            region: marker.ubicacion.nombre_region,
                            comuna: marker.ubicacion.nombre_comuna,
                            fecha_ultima_actualizacion: marker.precios.KE.fecha_actualizacion,
                            hora_ultima_actualizacion: marker.precios.KE.hora_actualizacion,
                            precio: marker.precios.KE.precio,
                            metodos_de_pago: marker.metodos_de_pago
                        },
                    })),
                },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            this.map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'markers',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#51bbd6',
                        100,
                        '#f1f075',
                        750,
                        '#f28cb1'
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        30,
                        100,
                        30,
                        750,
                        40
                    ]
                }
            });

            this.map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'markers',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });

            this.map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'markers',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#006FB3',
                    'circle-radius': 10,
                    'circle-stroke-width': 3,
                    'circle-stroke-color': '#ffffff'
                }
            });

            this.map.on('click', 'clusters', (e) => {
                const features = this.map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                this.map.getSource('markers').getClusterExpansionZoom(clusterId, (err, zoom) => {
                    if (err) return;

                    this.map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                });
            });

            // Change the cursor to a pointer when the mouse is over a marker
            this.map.on('mouseenter', 'unclustered-point', () => {
                this.map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to the default cursor when it leaves
            this.map.on('mouseleave', 'unclustered-point', () => {
                this.map.getCanvas().style.cursor = '';
            });

            this.map.on('click', 'unclustered-point', ($event) => {
                let marker = {
                    id: $event.features[0].properties.id,
                    marca: $event.features[0].properties.marca,
                    logo: $event.features[0].properties.logo,
                    direccion: $event.features[0].properties.direccion,
                    region: $event.features[0].properties.region,
                    comuna: $event.features[0].properties.comuna,
                    fecha: $event.features[0].properties.fecha_ultima_actualizacion,
                    hora: $event.features[0].properties.hora_ultima_actualizacion,
                    precio: $event.features[0].properties.precio,
                    metodos_de_pago: JSON.parse($event.features[0].properties.metodos_de_pago)
                }

                this.marker_detail = marker;
                $('#DetailModal').modal('show')
            })

            this.map.on('idle', idlemap => {
                this.filtered_markers = [];
                let options_points_in_layer = {
                    layers: ['unclustered-point']
                };
                let points_in_layer = this.map.queryRenderedFeatures(options_points_in_layer);

                for (let marker of this.markers) {
                    if (points_in_layer.find((point) => point.properties.id == marker.codigo)) this.filtered_markers.push(marker);
                }

            })

            this.map.jumpTo({
                center: [this.longitude, this.latitude]
            })

        },
        async getRegiones() {
            const response = await axios({
                    url: 'https://api.bencinaenlinea.cl/api/region',
                    method: 'GET'
                })
                .then((result) => {
                    this.regiones = result.data.data
                })
                .catch((error) => console.log(error));

        },
        async getMarcas() {
            const response = await axios({
                    url: 'https://api.bencinaenlinea.cl/api/marca_ciudadano',
                    method: 'GET'
                })
                .then((result) => {
                    this.marcas = result.data.data
                })
                .catch((error) => console.log(error));

        },
        async login() {

            const response = await axios({
                url: 'https://api.cne.cl/api/login?email=' +
                    import.meta.env.VITE_USER_API + '&password=' +
                    import.meta.env.VITE_PASS_API,
                method: 'POST'
            });
            return response.data.token
        },
        async getEstaciones() {

            const tokenLogin = await this.login();

            await axios({
                    url: 'https://api.cne.cl/api/v4/estaciones',
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + tokenLogin
                    }
                })
                .then((result) => {
                    let markers = result.data;
                    markers = markers.filter((item) => {
                        return (item.precios && item.precios.hasOwnProperty('KE'))
                    })
                    this.markers = markers
                    this.loaded = false
                    this.initializeMap();
                })
                .catch((error) => console.log(error));

        },
        filterMarkers(region, comuna, marca) {
            this.filtered_markers = []
            for (let marker of this.markers) {
                if (marca != 0) {
                    if (marker.ubicacion.codigo_region == region && marker.ubicacion.codigo_comuna == comuna && marker.distribuidor.marca == marca) this.filtered_markers.push(marker)
                } else {
                    if (marker.ubicacion.codigo_region == region && marker.ubicacion.codigo_comuna == comuna) this.filtered_markers.push(marker)
                }
            }

            if (this.filtered_markers.length == 0) {
                $('#Modal').modal('show')

            } else {
                this.map.jumpTo({
                    center: [this.filtered_markers[0].ubicacion.longitud, this.filtered_markers[0].ubicacion.latitud]
                })
            }
        },
        goToMap(punto, longitud, latitud) {
            let marker = {
                id: punto.codigo,
                marca: punto.distribuidor.marca,
                logo: punto.distribuidor.logo,
                direccion: punto.ubicacion.direccion,
                region: punto.ubicacion.nombre_region,
                comuna: punto.ubicacion.nombre_comuna,
                fecha: punto.precios.KE.fecha_actualizacion,
                hora: punto.precios.KE.hora_actualizacion,
                precio: punto.precios.KE.precio,
                metodos_de_pago: punto.metodos_de_pago
            }
            this.marker_detail = marker;
            $('#DetailModal').modal('show')
            this.map.flyTo({
                center: [longitud, latitud],
                zoom: 15
            })
        },
        openDetailModal() {

        }
    },
    beforeMount() {

    },
    mounted() {},
    unmounted() {
        this.map.remove();
        this.map = null;
    },
    created() {
        const success = (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

        };

        const error = (err) => {
            console.log(error)
        };

        // This will open permission popup
        navigator.geolocation.getCurrentPosition(success, error);
        this.getEstaciones();
        this.getMarcas();
        this.getRegiones();
    }
};
</script>
