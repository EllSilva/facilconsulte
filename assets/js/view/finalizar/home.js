import get_template from '../../components/get_template.js'

export default {
    data: function () {
        return {
            nome: null,
            cpf: null,
            telefone: null,
            estado: null,
            cidade: null, 

            especialidade: null,
            valor: null,
            pagamento: null,
            parcela: null
        }
    },

    methods: {

		async cadastrar() { 
              globalThis.nome = this.nome,
              globalThis.cpf = this.cpf ,
              globalThis.telefone = this.telefone,
              globalThis.estado = this.estado,
              globalThis.cidade = this.cidade,
            
              globalThis.especialidade = this.especialidade,
              globalThis.valor = this.valor ,
              globalThis.pagamento = this.pagamento,
              globalThis.parcela = this.parcela
		},
    },

    async mounted() {
        this.nome  = globalThis.nome,
        this.cpf = globalThis.cpf  ,
         this.telefone = globalThis.telefone ,
         this.estado = globalThis.estado,
          this.cidade = globalThis.cidade

          this.especialidade  = globalThis.especialidade,
        this.valor = globalThis.valor  ,
        this.pagamento = globalThis.pagamento.join() ,
         // this.pagamento = localStorage.getItem("pagamento").split(/[".,!,?,;,..."]/);
         this.parcela = globalThis.parcela
		 
	},
    
    template: await get_template('./assets/js/view/finalizar/home')
}