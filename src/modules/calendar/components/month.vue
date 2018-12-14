<template>
    <div class="month">
        <div class="flex-item font-16" v-for="item in monthData" :key="item">
            <span class="border" :class="{currentMonth: item == currentMonth, checkedMonth: item == checkedMonth}" @click.stop="changeMonth(item)">{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'month',
    props: ['currentDate'],
    data: function() {
        return {
            checkedMonth: this.currentDate ? this.currentDate.split('/')[1] : '',
            currentMonth: new Date().getMonth() + 1,
            monthData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
    },
    methods: {
        changeMonth: function(item) {
            this.checkedMonth = item;
            let date = this.currentDate.split('/');
            let newDate = `${date[0]}/${item}/${date[2]}`;
            this.$emit('changeMonthSelected', 'day');
            this.$emit('changeDate', newDate);
        }
    }
}
</script>

<style lang="css">
.month {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
}
.month .flex-item {
    width: 24%;
    padding: 20px 0;
    text-align: center;
}
.month .flex-item .border {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px solid #c7c7c7;/*no*/
    border-radius: 50px;
    display: inline-block;
}
.month .currentMonth {
    border-color: #1890ff !important;
}
.month .checkedMonth {
    border-color: #1890ff !important;
    background: #1890ff;
    color: #fff;
}
</style>
