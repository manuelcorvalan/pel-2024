<template>
    <div class="card mb-3" style="background-color:#F5F5F5" @click="goToMap($event)">
        <div class="row g-0">
            <!-- <div class="col-md-2 side-content">
                <img :src="marker.distribuidor.logo" class="img-fluid rounded-start" :alt="marker.distribuidor.marca">
            </div> -->
            <div class="col-md-10">
                <div class="card-body">
                    <h4 class="card-title">{{marker.distribuidor.marca}}</h4>
                    <p class="card-subtitle mb-2 text-body-secondary small">{{ marker.ubicacion.nombre_region }}, {{ marker.ubicacion.nombre_comuna }}</p>
                    <p class="card-subtitle mb-2 text-body-secondary small">{{ marker.ubicacion.direccion }}</p>
                    <h6 class="mb-2 text-body-secondary small">Ultima Actualización: {{ new Date(marker.precios.KE.fecha_actualizacion).toLocaleString('es-CL').slice(0,10) }} - {{ marker.precios.KE.hora_actualizacion }}</h6>
                    <h6 class="mb-2 text-body-secondary small">{{ marker.horario_atencion }}</h6>
                </div>
            </div>
            <div class="col-md-2 precio side-content">
                {{ Math.ceil(marker.precios.KE.precio/1).toLocaleString().replace(',','.') }} <br> $/litro
            </div>
        </div>
    </div>
</template>

<style scoped>

.precio{
    background-color: #006FB3;
    color:#ffffff;
    font-size: 1.3em;
}

.side-content{
    display: flex;
    justify-content: center;
    align-items: center;
}

.card.mb-3:hover{
    cursor: pointer;
    box-shadow: 0px 1px 2px 2px rgba(226, 226, 226, 0.5);
    transform: translateY(-5px);
}

</style>

<script>

export default {
    props:{
        marker: Object
    },
    methods:{
        goToMap(event){
            this.$root.goToMap(this.marker, this.marker.ubicacion.longitud, this.marker.ubicacion.latitud)
        }
    }
}
</script>

