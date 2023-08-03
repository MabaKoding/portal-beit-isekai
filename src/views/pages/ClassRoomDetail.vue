<template>
    <div>
        <b-row class="mb-4">
            <b-col>
                <h3>Daftar Siswa Kelas {{ (this.type == "general" ? this.data[0].value.toString().substr(0, 1) : "Khusus (Prioritas)") }}</h3>
            </b-col>
            <b-col class="text-right">
                <b-button variant="outline-danger" size="sm" @click="upComponent()">
                    <b-icon icon="arrow-left" aria-hidden="true" class="mr-2"></b-icon>
                    <span>Kembali pada halaman sebelumnya</span>
                </b-button>
            </b-col>
        </b-row>
        <b-card class="shadow p-4">
            <b-row class="mb-3">
                <b-col>
                    <h6 class="text-danger">Jumlah siswa yang akan mati pada bulan ini : {{ sumDeath }}</h6>
                </b-col>
                <b-col v-if="this.type == 'priority'">
                    <h6 class="text-info">Jumlah siswa yang akan menikah di tahun depan : {{ sumMarried }}</h6>
                </b-col>
            </b-row>
            <b-table hover :items="itemsTable" :fields="fieldsTable" :current-page="currentPage" :per-page="perPage" small>
                <template #cell(keterangan)="itemsTable">
                    <p class="">{{ setDesciprion(itemsTable.item.value) }}</p>
                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="right" class="my-0"></b-pagination>
        </b-card>
    </div>
</template>
<script>
export default {
    props: ["data", "type"],
    data: function () {
        return {
            fieldsTable: [
                {
                    key: "name",
                    sortable: true,
                    thClass: "text-left text-nowrap",
                    tdClass: "text-left text-nowrap",
                    label: "Nama Siswa",
                    formatter: this.capitalizeText
                },
                {
                    key: "value",
                    sortable: true,
                    thClass: "text-center text-nowrap",
                    tdClass: "text-center text-nowrap",
                    label: "Nilai UAS",
                },
                {
                    key: "keterangan",
                    sortable: false,
                    thClass: "text-left text-nowrap",
                    tdClass: "text-left text-nowrap",
                }
            ],
            itemsTable: this.data,
            totalRows: this.data.length,
            currentPage: 1,
            perPage: 10,
            fullMonth: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
            sumDeath: 0,
            sumMarried: 0
        };
    },
    methods: {
        upComponent() {
            this.sumDeath = 0
            this.sumMarried = 0
            this.$root.$emit("backComponent", false);
        },
        capitalizeText(text) {
            let lower = text.toLowerCase()
            let capitalize = lower.replace(/^./, lower[0].toUpperCase())
            return capitalize
        },
        setDesciprion(value) {
            let result = "-"
            const valueMonth = value.toString().substr(1, 1) - 1
            const date = new Date();
            if (this.type == "general") {
                if (this.checkPrimaValue(value) == true) {
                    if (valueMonth >= date.getMonth()) {
                        result = `Siswa ini akan meninggal di Bulan ${this.fullMonth[valueMonth]} tahun ini`
                    } else if (valueMonth < date.getMonth()) {
                        result = `Siswa ini akan meninggal di Bulan ${this.fullMonth[valueMonth]} tahun depan`
                    }
                }
            } else {
                if ((value % 7) == 0) {
                    result = `Siswa ini akan menikah tahun depan`
                }

                if (this.checkPrimaValue(value) == true) {
                    if (valueMonth >= date.getMonth()) {
                        result = `Siswa ini akan meninggal di Bulan ${this.fullMonth[valueMonth]} tahun ini`
                    } else if (valueMonth < date.getMonth()) {
                        result = `Siswa ini akan meninggal di Bulan ${this.fullMonth[valueMonth]} tahun depan`
                    }
                }
            }

            return result
        },
        checkPrimaValue(value) {
            let divider = 0;
            for (let i = 1; i <= value; i++) {
                if (value % i == 0) {
                    divider++
                }
            }
            if (divider == 2) {
                return true
            }
            return false
        },
        findData() {
            const date = new Date();
            for (let i = 0; i < this.data.length; i++) {
                const valueMonth = this.data[i].value.toString().substr(1, 1) - 1
                if (this.checkPrimaValue(this.data[i].value) == true) {
                    if (valueMonth == date.getMonth()) {
                        this.sumDeath += 1
                    }
                }
                if (this.type == 'priority') {
                    if ((this.data[i].value % 7) == 0) {
                        this.sumMarried += 1
                    }
                }
            }
        }
    },
    created() {
        this.findData()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}
</script>
