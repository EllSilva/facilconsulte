import get_template from '../../components/get_template.js'

export default {
  data: function () {
    return {
        errors: [],
        name: null,
        email: null,
        movie: null
    }
  },


  methods: {
  








    checkForm: function (e) {
        if (this.valor.replace(/[^\d]+/g,'') <= 3000) {
            this.erro_valor.push('O menor valor é 30,00');
            this.erro.push('erro');
          } 
          else if (this.valor.replace(/[^\d]+/g,'') >= 35000) {
            this.erro_valor.push('O maior valor é válido. 350,00.');
            this.erro.push('erro');
          }
    
        if (!this.pagamento) {
            this.erro_pagamento.push('O pagamento é obrigatório.');
            this.erro.push('erro');
        }
        if (!this.parcela) {
           
            this.erro_parcela.push('O parcelamento é obrigatório.');
            this.erro.push('erro');
        } 
    
      this.errors = [];

      if (!this.name) {
        this.errors.push('O nome é obrigatório.');
      }
      if (!this.email) {
        this.errors.push('O e-mail é obrigatório.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Utilize um e-mail válido.');
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },


 

  template: await get_template('./assets/js/view/mask/home')
}