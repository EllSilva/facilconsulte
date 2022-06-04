import get_template from '../../components/get_template.js'

export default {
  data: function () {
    return {
      search: 'Listar todos',
      todos_estado: [],
      errados: [], 
      items: [
        {name: 'Stackoverflow', type: 'development', year: '2005'},
        {name: 'Game of Thrones', type: 'serie', year: '2005'},
        {name: 'Jon lim', type: 'actor', year: '2012'},
        {name: 'kimm', type: 'actor', year: '2019'},
        {name: 'hmmmm lim', type: 'actor', year: '2022'}
      ]
    }
  },

  methods: {
    escolher(elementos) {
      let nomesCertos = []
      
      this.items.filter(elemento => {
        if(elementos == elemento.year) { 
          alert(elemento.year) 
        }
      })
     
    }
  },
 

  template: await get_template('./assets/js/view/mask/home')
}