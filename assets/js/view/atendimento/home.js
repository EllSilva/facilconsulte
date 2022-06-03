import get_template from '../../components/get_template.js'

export default {
    data: function () {
        return {
            especialidade: null,
            valor: null,
            pagamento: [],
            parcela: [],
            todos_especialidade: [],

            erro_especialidade: [],
            erro_valor: [],
            erro_pagamento: [],
            erro_parcela: [],
            erro: [],
            jms: false,

            mostrar: false,
            checkedNames: []
        }
    },

    methods: {

        async atendente(e) {
            this.erro_especialidade = [];
            this.erro_valor = [];
            this.erro_pagamento = [];
            this.erro_parcela = [];
            this.erro = [];

            if (!this.especialidade) {
                this.erro_especialidade.push('A especialidade é obrigatório.');
                this.erro.push('erro');
            }
 
            if (this.valor <= 3000) {
                this.erro_valor.push('O menor valor é 30,00');
                this.erro.push('erro');
              } 
              else if (this.valor >= 35000) {
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


            if (!this.erro.length) {

                globalThis.especialidade = this.especialidade,
                    globalThis.valor = this.valor,
                    globalThis.pagamento = this.pagamento,
                    globalThis.parcela = this.parcela,
                    window.location.href = "#/finalizar"
                    return true;
            }
            e.preventDefault();
        },

        especialidades() {
            axios.get(`https://api-teste-front-end-fc.herokuapp.com/especialidades`)
                .then(response => {

                    if (response.data) {
                        this.todos_especialidade = response.data
                    }
                }
                )
                .catch(error =>
                    error
                )
        },
    },

    async mounted() {
        this.especialidades()

        this.especialidade = globalThis.especialidade || '',
            this.valor = globalThis.valor
           
    },

    template: await get_template('./assets/js/view/atendimento/home')
}