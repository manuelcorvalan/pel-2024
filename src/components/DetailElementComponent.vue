<template>
  <!-- Detail Modal -->
  <div class="modal fade" id="DetailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="card">
          <img :src="marker.logo" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">{{ marker.marca }}</p>
            <p class="card-text">{{ marker.direccion }}</p>
            <p class="card-text">{{ marker.region }}, {{ marker.comuna }}</p>
            <p class="card-text">Ultima Actualización: {{ new Date(marker.fecha).toLocaleString('es-CL').slice(0,10) }} - {{ marker.hora }}</p>
            <p class="card-text">Métodos de Pago:              
              <div v-for="(value, index) in marker.metodos_de_pago">
                <div v-if="value === true">
                  <i class="bi bi-cash" v-if="index === 'Efectivo'"></i>
                  <i class="bi bi-credit-card" v-if="index === 'Tarjeta de Crédito'"></i>
                  <i class="bi bi-credit-card" v-if="index === 'Tarjeta de Débito'"></i>
                  <i class="bi bi-wallet2" v-if="index === 'App de pago'"></i>
                  <i class="bi bi-phone" v-if="index === 'Billetera Digital'"></i>                  
                  {{ index }}
                </div>
              </div>
            </p>
            <!-- <p class="card-text">Horario Atencion: {{ marker.horario_atencion }}</p> -->
            <div class="precio side-content">{{ Math.ceil(marker.precio/1).toLocaleString().replace(',','.') }} <br> $/litro</div>
            <br>
            <div class="alert alert-primary" role="alert">
              <i class="bi bi-info-circle"></i> Recuerda utilizar <span style="font-style: italic;">contenedores autorizados</span> para el transporte de parafina, no uses botellas ni envases de vidrio o plástico frágil, ya que estos pueden romperse con facilidad y derramar su contenido, provocando algún accidente.
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>

</template>
<style>

.logo-detail{
  height: 24px;
}

.precio{
    background-color: #006FB3;
    color:#ffffff;
    font-size: 1.3em;
}

.side-content{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: justify;
}

.alert.alert-primary{
  text-align: justify;
}

</style>

<script>

export default{
  props:{
    marker: Object,
    showMediosDePago: Boolean
  },
  data() { 
    
  },
  created() {
  
  }

}

</script>