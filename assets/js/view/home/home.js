import get_template from '../../components/get_template.js'

export default {
    data: function () {
        return {
            nome: null,
            cpf: null,
            telefone: null,
            estado: "",
            cidade: null,
            xx: null,
            todos_estado: [],
            todos_cidade: [],

            erro_nome: [],
            erro_cpf: [],
            erro_cpf2: null,
            erro_tell: [],
            erro_estado: [],
            erro_cidade: [],
            erro: [],
            jms: false,

        }
    },

    methods: {

        onChange: function () {
            this.cidades()
            this.cidadesSelect()
        },

        async profisional(e) {
            this.erro_nome = [];
            this.erro_cpf = [];
            this.erro_tell = [];
            this.erro_estado = [];
            this.erro_cidade = [];
            this.erro = [];

            if (!this.nome) {
                this.erro_nome.push('O nome é obrigatório.');
                this.erro.push('erro');
            }

            if (!this.cpf) {
                this.erro_cpf.push('O cpf é obrigatório.');
                this.erro.push('erro');
            }

            if (!this.telefone) {
                this.erro_tell.push('O telefone é obrigatório.');
                this.erro.push('erro');
            }
            if (!this.estado) {
                this.erro_estado.push('O estado é obrigatório.');
                this.erro.push('erro');
            }

            if (!this.cidade) {
                this.erro_cidade.push('O cidade é obrigatório.');
                this.erro.push('erro');
            }



            if (!this.erro.length) {
                globalThis.nome = this.nome,
                    globalThis.cpf = this.cpf,
                    globalThis.telefone = this.telefone,
                    globalThis.estado = this.estado,
                    globalThis.cidade = this.cidade
                window.location.href = "#/atendimento"
                return true;

            }

            e.preventDefault();

        },


        estados() {
            axios.get(`https://api-teste-front-end-fc.herokuapp.com/estados`)
                .then(response => {

                    if (response.data) {
                        this.todos_estado = response.data
                        console.log(this.todos_estado)
                    }
                }
                )
                .catch(error =>
                    error
                )
        },

        cidadesSelect() {
            axios.get(`https://api-teste-front-end-fc.herokuapp.com/estados?id=2`)
                .then(response => {

                    if (response.data) {
                        this.xx = (response.data).nome

                    }
                }
                )
                .catch(error =>
                    error
                )
        },

        cidades() {
            axios.get(`https://api-teste-front-end-fc.herokuapp.com/cidades?estadoId=` + this.estado)
                .then(response => {

                    if (response.data) {
                        this.todos_cidade = response.data

                    }
                }
                )
                .catch(error =>
                    error
                )
        },

        validacpf() {
            axios.get(`https://api-teste-front-end-fc.herokuapp.com/profissionais?cpf=` + this.cpf)
                .then(response => {

                    let config = response.data
                    for (var i = 0; i < config.length; i++) {

                        var cpfTexte = config[i].cpf
                        if (cpfTexte === this.cpf) {
                            this.erro_cpf2 = "CPF já cadastrado"
                        }

                    }
                }
                )
                .catch(error =>
                    error
                )
        },

    },

    async mounted() {
        this.estados()
        this.cidades()
        this.nome = globalThis.nome,
            this.cpf = globalThis.cpf,
            this.telefone = globalThis.telefone,
            this.estado = globalThis.estado || '',
            this.cidade = globalThis.cidade || ''

    },

    template: await get_template('./assets/js/view/home/home')
}