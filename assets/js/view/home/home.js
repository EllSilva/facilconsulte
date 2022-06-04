import get_template from '../../components/get_template.js'

export default {
    data: function () {
        return {
            nome: null,
            cpf: null,
            telefone: null,
            estado: "",
            selet_estado: "",
            cidade: null, 
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

        escolher(elementos) {
            let nomesCertos = []

            this.todos_estado.filter(elemento => {
                if (elementos == elemento.id) {
                    nomesCertos.push(elemento.nome);
                    this.estado = elemento.nome
                }
            })

            this.cidades()
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
            if (!this.selet_estado) {
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

                    }
                }
                )
                .catch(error =>
                    error
                )
        },
 

        cidades() {
            axios.get(`https://api-teste-front-end-fc.herokuapp.com/cidades?estadoId=` + this.selet_estado)
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
           var verCpf = this.cpf.replace(/[^\d]+/g, '')

            axios.get(`https://api-teste-front-end-fc.herokuapp.com/profissionais?cpf=` + verCpf)
                .then(response => {

                    let config = response.data
                    this.erro_cpf2 = ""
                    for (var i = 0; i < config.length; i++) {
                   
                        var cpfTexte = config[i].cpf
                       
                        if (cpfTexte === verCpf) { 
                            this.erro_cpf2 = "CPF já cadastrado"
                        }  
                       
                    }
                }
                )
                .catch(error => 
                    error
                )
        },

        maskTel() {
            let mascara = this.telefone

            mascara = mascara.replace(/\D/gi, '')
            mascara = mascara.replace(/(\d{2})(.*)/gi, '($1) $2')
            mascara = mascara.replace(/\((\d{2})\)\s(\d{1})(.*)/gi, '($1) $2 $3')
            mascara = mascara.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})(.*)/gi, '($1) $2 $3-$4')
            mascara = mascara.replace(/\((\d{2})\)\s(\d{1})\s(\d{4})-(\d{4})(.*)/gi, '($1) $2 $3-$4')
            this.telefone = mascara
        },

        cpf(mascara) {
            // 000.000.000-00
            mascara = mascara.replace(/(\d{3})(.*)/gi, '$1.$2')
            mascara = mascara.replace(/(\d{3})\.(\d{3})(.*)/gi, '$1.$2.$3')
            mascara = mascara.replace(/(\d{3})\.(\d{3})\.(\d{3})(.*)/gi, '$1.$2.$3-$4')
            mascara = mascara.replace(/(\d{3})\.(\d{3})\.(\d{3})\-(\d{2})(.*)/gi, '$1.$2.$3-$4')

            return mascara
        }
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