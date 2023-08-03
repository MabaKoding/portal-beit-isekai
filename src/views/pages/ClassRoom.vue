<template>
    <div class="w-100">
        <div v-if="isDetail">
            <ClassRoomDetail :data="dataDetail" :type="typeData"></ClassRoomDetail>
        </div>
        <div v-else>
            <h3 class="mb-4">Daftar Kelas Sekolah Isekai</h3>
            <b-row cols="3" v-if="isBusy">
                <b-col v-for="n in 6" :key="n.index">
                    <b-card no-body img-top class="w-100 mb-4">
                        <b-skeleton-img card-img="top" aspect="2:1"></b-skeleton-img>
                        <b-card-body>
                            <b-skeleton type="input" width="40%" class="mb-3"></b-skeleton>
                            <b-skeleton animation="wave" width="95%"></b-skeleton>
                            <b-skeleton animation="wave" width="60%" class="mb-3"></b-skeleton>
                            <b-skeleton type="button"></b-skeleton>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
            <b-row cols="3" v-else>
                <b-col v-for="(data, index) in dataGeneral" :key="index">
                    <b-card :title="`Data Kelas ${data[index].value.toString().substr(0, 1)}`"
                        img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top class="w-100 mb-4 shadow">
                        <b-card-text>
                            Kelas ini merupakan kelas yang berisikan siswa dengan nilai
                            {{ data[index].value.toString().substr(0, 1) }}0 keatas.
                        </b-card-text>
                        <b-button @click="seeDetail(data, 'general')" variant="outline-info" size="sm">Lihat
                            Detail</b-button>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Data Kelas Khusus (Prioritas)" img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image" img-top class="w-100 mb-4 shadow">
                        <b-card-text>
                            Kelas ini merupakan kelas yang berisikan siswa yang memiliki nama dengan huruf "C" dan "O".
                        </b-card-text>
                        <b-button @click="seeDetail(dataPriority, 'priority')" variant="outline-info" size="sm">Lihat
                            Detail</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script>
import ClassRoomDetail from './ClassRoomDetail.vue'

export default {
    components: {
        ClassRoomDetail
    },
    data: function () {
        return {
            isBusy: true,
            isDetail: false,
            dataGeneral: [],
            dataPriority: [],
            dataDetail: [],
            typeData: ''
        };
    },
    methods: {
        async fetchData() {
            this.$axios.get("/api/classroom").then((response) => {
                const tmpData = response.data
                const tmpArr = []

                for (let i = 0; i < tmpData.listNama.length; i++) {
                    tmpArr.push({ "name": tmpData.listNama[i], "value": tmpData.listNilai[i] })
                }

                this.dataPriority = tmpArr.filter((item) => { return item.name.toLowerCase().includes("c") && item.name.toLowerCase().includes("o") })
                this.dataGeneral = tmpArr.filter(item => {
                    return !this.dataPriority.find(items => {
                        return items.name.toLowerCase() === item.name.toLowerCase()
                    })
                })

                this.dataGeneral = this.dataGeneral.reduce((acc, cur) => {
                    const value = cur.value.toString().substr(0, 1)
                    if (!acc[value]) { acc[value] = [] }
                    acc[value].push(cur)
                    return acc
                }, {})

                this.isBusy = false
            }).catch((error) => {
                this.isBusy = true
            })
        },
        seeDetail(data, type) {
            this.isDetail = true
            this.dataDetail = data
            this.typeData = type
        }
    },
    created() {
        this.fetchData()
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.$root.$on("backComponent", (option) => {
            this.isDetail = option
        });
    }
}
</script>