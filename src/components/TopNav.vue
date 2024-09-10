<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img :src="logoPEL" style="height: 100px;"/></a>
            <span style="font-size: .9em;"><i class="bi bi-info-circle"></i> Los precios publicados en el presente sitio web son de exclusiva responsabilidad de las estaciones de servicio informantes</span>
            <button v-if="!$isMobile()" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div v-if="!$isMobile()" class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-auto">
                    <a href="https://bencinaenlinea.cl/#/reporte_regional/4" target="_blank" class="btn btn-primary">Reporte de Precios</a>
                </div>
            </div>            
        </div>
    </nav>
</template>
<style>
.nav-link>img{
    height: 48px;
}
figcaption{
    color: var(--bs-secondary-color) !important
}
</style>
<script>
  import Logo_PEL from '../assets/Logo_PEL.png'
  import LogoCNE from '../assets/Logo_CNE.png'
  import LogoEA from '../assets/Logo_EA.png'
  import LogoER from '../assets/Logo_ER.png'
  import LogoGEL from '../assets/Logo_GEL.png'
  import LogoBEL from '../assets/Logo_BEL.png'
  import infoIcon from './../../node_modules/bootstrap-icons/icons/info-circle.svg'
  export default {
      components:{        
      },
      data(){
          return {
              logoPEL:Logo_PEL,
              logoCNE:LogoCNE,
              logoEA:LogoEA,
              logoER:LogoER,
              logoGEL:LogoGEL,
              logoBEL:LogoBEL,
              infoIcon:infoIcon
          }
          
      }
  }
</script>