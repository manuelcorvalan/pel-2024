<template>
    <nav id="sidebar" class="container-fluid">
        <hr>
        <form class="simple-search search mx-auto" action="" method="GET">
                <label>Busca por: </label>
                <div class="mb-3">                
                    <!-- <div id="address_search" class="address_search"></div> -->
                    <SearchComponent></SearchComponent>
                </div>
                <label>Busca por:</label>
                <div class="mb-3">
                    <select class="form-select" @change="onChange($event)" aria-label="Default select example" id="region">
                        <option selected value="0">Región</option>
                        <option v-for="region in regiones" :value="region.cod_region">{{ region.nom_region }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <select :disabled="disabledComunas" @change="onChangeComunas($event)" class="form-select" aria-label="Default select example" id="comuna">
                        <option selected value="0">Comuna</option>
                        <option v-for="comuna in comunas" :value="comuna.cod_comuna">{{ comuna.nom_comuna }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <select :disabled="disabledMarcas" class="form-select" aria-label="Default select example" id="marca">
                        <option selected value="0">Marca</option>
                        <option v-for="marca in marcas" :value="marca.nombre">{{ marca.nombre }}</option>
                    </select>
                </div>
                <div class="d-grid gap-2">
                    <button :disabled="disabledComunas" @click="buscarEstaciones($event)" class="btn btn-primary" type="button">Buscar</button>
                    <button :disabled="disabledComunas" @click="clearFilters($event)" type="button" class="btn btn-link small-font-size float-sm-end">Limpiar filtros</button>
                </div>
        </form>
        <hr>
        <div  id="infinite-list">
            <ListComponent :markers="this.markers"/>
        </div>
    </nav>    
</template>

<style scoped>

#sidebar {
    min-width: 25%;
    max-width: 25%;
    min-height: 25%;
}

#infinite-list{
    overflow: auto;
    height: 50vh;
}

</style>

<script>

import ListComponent from './ListComponent.vue'
import SearchComponent from './SearchComponent.vue';
import axios from 'axios';

export default{
    props:{
        markers: Array,
        marcas: Array,
        regiones: Array,        
        map: null
    },
    components: {
        ListComponent,
        SearchComponent
    },
    mounted(){
        // Detect when scrolled to bottom.
        const listElm = document.querySelector('#infinite-list');
        listElm.addEventListener('scroll', e => {
            if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                this.loadMore();
            }
        });
        
    },
    data() {
        return {
            isSidebarOpen: true,
            comunas: Array,
            disabledComunas: true,
            disabledMarcas: true
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        getSearchBar(){
            return document.getElementById('address_search');
        },
        onChange(event){
            if(event.target.value == 0){
                this.disabledComunas = true
            } else{
                this.getComunas(event.target.value)
            }
            
        },
        onChangeComunas(event){
            if(event.target.value == 0) this.disabledMarcas = true
            else this.disabledMarcas = false
        },
        buscarEstaciones(event){
            let region = document.getElementById('region').value
            let comuna = document.getElementById('comuna').value
            let marca = document.getElementById('marca').value

            this.$parent.filterMarkers(region, comuna, marca)
        },
        clearFilters(event){
            document.getElementById('region').value = 0
            document.getElementById('comuna').value = 0
            document.getElementById('marca').value = 0
            this.disabledComunas = true
            this.disabledMarcas = true
        },
        async getComunas(region){
                
                const response = await axios({
                    url: 'https://api.bencinaenlinea.cl/api/comuna/'+region,
                    method: 'GET'
                })
                .then((result) => {
                    this.disabledComunas = false
                    this.comunas = result.data.data                    
                })
                .catch((error) => console.log(error));
        }
    }
}

</script>