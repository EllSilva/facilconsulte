import get_template from '../../components/get_template.js'

export default {
    data: function () {
        return {
            especialidade: null,
            valor: null,
            pagamento: [],
            parcela: null,
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

                this.erro.push('erro');
                this.erro_especialidade.push('A especialidade é obrigatório.');
            }

            if (!this.pagamento.join()) {
                this.erro_pagamento.push('O pagamento é obrigatório.');
                this.erro.push('erro');
            }
           // if (!this.parcela) { 
             //    this.erro_parcela.push('O parcelamento é obrigatório.');
             //   this.erro.push('erro');
           // }

            if (!this.valor) {
                this.erro_valor.push('O Valor é obrigatório.');
                this.erro.push('erro');
            }
            else if (this.valor.replace(/[^\d]+/g, '') <= 3000) {
                this.erro_valor.push('O menor valor é 30,00');
                this.erro.push('erro');
            }
            else if (this.valor.replace(/[^\d]+/g, '') >= 35000) {
                this.erro_valor.push('O maior valor é válido. 350,00.');
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

        money() {
            let val = this.valor
            val = val.replace('.', '')
            val = val.replace(/\D/gi, '')
            val = val ? val : 0
            val = `${parseInt(val)}` ?? '0'
            switch (val.length) {
                case 0:
                    val = '00,00'
                    break;
                case 1:
                    val = val.replace(/(\d{1})/gi, '00,0$1')
                    break;
                case 2:
                    val = val.replace(/(\d{2})/gi, '00,$1')
                    break;
                case 3:
                    val = val.replace(/(\d{1})(\d{2})/gi, '0$1,$2')
                    break;
                case 4:
                    val = val.replace(/(\d{2})(\d{2})/gi, '$1,$2')
                    break;
                case 5:
                    val = val.replace(/(\d{3})(\d{2})/gi, '$1,$2')
                    break;
                case 6:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})/gi, '$1.$2,$3')
                    break;
                default:
                    val = val.replace(/(\d{1})(\d{3})(\d{2})(.*)/gi, '$1.$2,$3')
                    break;
            }
            this.valor = val
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

        this.especialidade = globalThis.especialidade || ''
        if (globalThis.especialidade) {
            this.valor = globalThis.valor
            var kim = globalThis.pagamento
            this.pagamento = kim.toString().split(/[.,!,?,;,...]/)
        }


    },

    template: await get_template('./assets/js/view/atendimento/home')
}