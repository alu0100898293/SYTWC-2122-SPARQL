<template>  
  <Card>
    <template #content>
      <div class="flex-row">
        <div class="flex-col">
          <form @submit.prevent="send">
              <span class="p-float-label">
                <InputText :class="{'p-invalid': authorError}" type="text" v-model="data.author"/>
                <label >Author name</label>
              </span>
              <span class="p-float-label">
                <InputText type="text" v-model="data.novelName"/>
                <label>Novel name</label>
              </span>
              <span class="p-float-label">
                <InputText type="text" v-model="data.novelSerie"/>
                <label >Series name</label>
              </span>
              <span class="p-float-label">
                <InputText type="text" v-model="data.novelGenre"/>
                <label >Novel genre</label>
              </span>
              <span class="p-float-label">
                <InputText :class="{'p-invalid': dateFromError}" type="text" v-model="data.publishDateFrom"/>
                <label style="font-size:15px">Publish date from (yyyy-mm-dd)</label>
              </span>
              <span class="p-float-label">
                <InputText :class="{'p-invalid': dateToError}" type="text" v-model="data.publishDateTo"/>
                <label style="font-size:15px">Publish date to (yyyy-mm-dd)</label>
              </span>
              <Button type="submit" label="Submit"/>
          </form>
        </div>
        <div class="flex-col">
          <DataTable :value="queryResult" responsiveLayout="scroll">
                          <Column field="novel.value" header="Id">
                          <template #body="slotProps">
                            <a :href="slotProps.data.novel.value" v-text="slotProps.data.novel.value" />
                          </template>
                          </Column>
                          <Column field="novel_label.value" header="Title"></Column>
                          <Column field="authorLabel.value" header="Author"></Column>
                          <Column field="genres.value" header="Genres"></Column>
                          <Column field="firstPublication.value" header="First Publication"></Column>
                          <Column field="serie_label.value" header="Serie"></Column>
          </DataTable>
          <p style="color: red;" v-if="queryEmpty"> No results </p>
          <p style="color: blue;" v-if="queryInProgress"> Please be patient, the search is in progress</p>
        </div>
      </div>
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
            data: {},
            queryResult: [],
            queryEmpty: false,
            queryInProgress: false,
            authorError: false,
            dateFromError: false,
            dateToError: false,
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
        this.data.publishDateFrom = ""
        this.data.publishDateTo = ""
    },
    methods: {
            send() {
                this.queryEmpty = false
                this.queryInProgress = true
                this.queryResult = []
                
                if(this.data.author)
                    this.authorError = false
                else
                    this.authorError = true

                //Checking date format
                if(this.data.publishDateTo !== "")
                  this.query.isValidDate(this.data.publishDateTo).then(error => {
                    if(error)
                      this.dateToError = false
                    else
                      this.dateToError = true
                  })
                else
                  this.dateToError = false

                //Checking date format
                if(this.data.publishDateFrom !== "")
                  this.query.isValidDate(this.data.publishDateFrom).then(error => {
                    if(error)
                      this.dateFromError = false
                    else
                      this.dateFromError = true
                  })
                else
                  this.dateFromError = false
                
                if(!this.authorError && !this.dateToError && !this.dateFromError){
                  this.query.fetchQuery(this.data).then(data => {
                    this.queryInProgress = false
                      if(data.results.bindings.length > 0)
                        this.queryResult = data.results.bindings
                      else  
                        this.queryEmpty = true
                  });
                }
            },
            
    }
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