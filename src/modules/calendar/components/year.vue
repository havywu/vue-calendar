<template>
    <v-touch @swipeleft="handleSwiperLeft" @swiperight="handleSwiperRight">
        <div class="year">
            <div class="flex-item font-16" v-for="item in data" :key="item">
                <span class="border" :class="{currentYear: item == currentYear, checkedYear: item == checkedYear}" @click.stop="changeYear(item)">{{item}}</span>
            </div>
        </div>
    </v-touch>
</template>

<script>
export default {
    name: 'year',
    props: ['currentDate'],
    computed: {
        data: function() {
            let year = Number(this.currentYear);
            let arr = [year];
            for (let i = 7; i > 0; i--) {
                arr.push(year - i);//前七年，共展示15年
                arr.push(Number(year) + 8 - i);
            }
            return arr.sort((a, b) => a-b);
        },
    },
    data: function() {
        return {
            checkedYear: this.currentDate ? this.currentDate.split('/')[0] : '',
            currentYear: this.currentDate ? this.currentDate.split('/')[0] : new Date().getFullYear(),
        }
    },
    methods: {
        changeYear: function(item) {
            this.checkedYear = item;
            let date = this.currentDate.split('/');
            let newDate = `${item}/${date[1]}/${date[2]}`;
            this.$emit('changeMonthSelected', 'month');
            this.$emit('changeDate', newDate);
        },
        // 手势左滑
        handleSwiperLeft: function() {
            this.currentYear = Number(this.currentYear) + 15;
        },
        // 手势右滑
        handleSwiperRight: function() {
            this.currentYear = Number(this.currentYear) - 15;
        }
    }
}
</script>

<style lang="css">
.year {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
}
.year .flex-item {
    width: 33%;
    padding: 20px 0;
    text-align: center;
}
.year .flex-item .border {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px solid #c7c7c7;/*no*/
    border-radius: 50px;
    display: inline-block;
}
.year .currentYear {
    border-color: #1890ff !important;
}
.year .checkedYear {
    border-color: #1890ff !important;
    background: #1890ff;
    color: #fff;
}
</style>
