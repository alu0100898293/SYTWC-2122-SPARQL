<template>  
  <Card>
    <template #content>
        <form @submit.prevent="send">
            <InputText placeholder="Author name" type="text" v-model="author"/>
            <InputText placeholder="Novel name" type="text" v-model="novelName"/>
            <InputText placeholder="Novel series name" type="text" v-model="novelSerie"/>
            <InputText placeholder="Novel genre" type="text" v-model="novelGenre"/>
            <InputText placeholder="Date from publish" type="text" v-model="publishDateFrom"/>
            <InputText placeholder="Date to publish" type="text" v-model="publishDateTo"/>
            <Button type="submit" label="Submit"/>
        </form>
        <DataTable :value="queryResult" responsiveLayout="scroll">
                        <Column field="novel" header="Id"></Column>
                        <Column field="novelLabel" header="Title"></Column>
                        <Column field="authorLabel" header="Author"></Column>
                        <Column field="genres" header="Genres"></Column>
                        <Column field="firstPublication" header="First Publication"></Column>
                        <Column field="serie_label" header="Serie"></Column>
        </DataTable>
    </template>
    </Card>
</template>

<script>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Query from '../service/Query';

export default {
    name: 'MainView',
    data() {
        return {
            author: null,
            novelName: null,
            novelSerie: null,
            novelGenre: null,
            publishDateFrom: null,
            publishDateTo: null, 
            queryResult: null
        }
    },
    query: null,
    components: {
        Card,
        DataTable,
        Column
    },
    created() {
        this.query = new Query();
    },
    methods: {
            send() {
                console.log(this.author)
                console.log(this.novelName)
                console.log(this.novelSerie)
                console.log(this.novelGenre)
                console.log(this.publishDateFrom)
                if(!this.publishDateTo)
                    console.log("publishDateTo es null")
                else
                    console.log(this.publishDateTo)

                this.query.fetchQuery().then(data => {
                    this.queryResult = data
                    console.log(data)
                });
            }
    }
  /*props: {
    parada: Number
  },
  created() {
    this.horarios = new Horarios();
  },
  watch : {
    parada: function() {
      const URL = "http://localhost:3000"
      return fetch(`${URL}/${this.parada}`, {
        method : "GET",
        mode: 'cors'
      })
      .then(res => res.json())
      .then(d => {
        this.lineas = d.lineas
        console.log("segundo fetch")
        var aux = new Object();
        aux.lineas = []
        aux.horarios = []

        for(var i=0; i < d.length ;i++ )
        {
          aux.lineas.push(d[i])
          this.horarios.getHorariosSmall(this.parada.shortName).then(data => {
            aux.horarios.push(data)
          });
        }

        this.horario = aux.horarios[0]
      });
    }
  }*/
}
</script>

<style scoped>
span {
  font-size: 200%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>