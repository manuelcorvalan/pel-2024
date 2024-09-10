<template>
<div class="bottom">
    <div class="container text-center">
        <div class="row row-bottom-nav">
            <div class="col">
                <p class="text-sm-end text-white">Otros Enlaces</p>
                <p class="text-sm-end text-white"><a href="https://www.cne.cl" target="_blank" class="text-decoration-none text-white">Comisión Nacional de Energia</a></p>
                <p class="text-sm-end text-white"><a href="https://bencinaenlinea.cl/#/politica" target="_blank" class="text-decoration-none text-white">Politica de Privacidad</a></p>
                <p class="text-sm-end text-white"><a href="https://bencinaenlinea.cl/" target="_blank" class="text-decoration-none text-white">Bencina en Linea</a></p>
                <p class="text-sm-end text-white"><a href="http://energiaabierta.cne.cl" target="_blank" class="text-decoration-none text-white">Energia Abierta</a></p>
            </div>
            <div class="col">
            </div>
            <div class="col">
                <p class="text-sm-end text-white">Comisión Nacional de Energía.<br>Gobierno de Chile</p>
                <p class="text-sm-end text-white">Avenida Libertador Bernardo O’Higgins 1449, Edificio Santiago DownTown, Torre 4, Piso 13, <br>Santiago Centro </p>
                <p class="text-sm-end text-white">Telefono: <a href="tel:+56 2279 7 2600" class="text-decoration-none text-white">+56 2279 7 2600</a> <br>
                    Contacto: <a href="mailto:soporteparafinaenlinea@cne.cl" class="text-decoration-none text-white">soporteparafinaenlinea@cne.cl</a></p>
            </div>
            <div v-if="!$isMobile()" class="col">
                <div><img :src="logoGOB" style="height: 160px;"></div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.bottom {
    height: 20vh;
    background-color: #001C41;
    font-size: .9em;
}

a {
    text-decoration: none;
}

.row-bottom-nav {
    padding-top: 15px;
}
</style>

<script>
import Logo_GOB from '../assets/Logo_GOB.png'

export default {

    data() {
        return {
            logoGOB: Logo_GOB
        }

    }

}
</script>
