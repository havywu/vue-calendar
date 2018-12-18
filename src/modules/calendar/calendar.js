import lunar from './lunar.js';
export default {
    methods: {
        // 每个月份的天数
        getMonthDays: function(year) {
            return [31, 28 + (this.isLeapYear(year) ? 1: 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        },
        // 是否闰年，能被4整除且不能被100整除或者能被400整除
        isLeapYear: function(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        },
        // 获取当月第一天周几
        getWeekDay: function(year, month) {
            return new Date(`${year}/${month}`).getDay();
        },
        // 获取上个月天数
        getLastMonthDays: function(year, month) {
            if (month === 1) {
                return 31;
            }
            return this.getMonthDays(year)[month - 2];
        },
        // 当月第一天之前应补的天数
        getAddDays: function(weekday, year, month, flag) {
            // 当月第一天为周日，不需补充
            if (weekday === 7) {
                return [];
            }
            let arr = [];
            let lastDays = this.getLastMonthDays(year, month);
            // 上个月的年月
            let nextY = month === 1 ? year - 1 : year;
            let nextM = month === 1 ? 12 : month - 1;
            for (let i = 0; i <= weekday - 1; i++) {
                let day = lastDays - (weekday - 1 - i);
                let lunarDate = lunar.solar2lunar(nextY, nextM, day);
                arr.push({
                    day: flag ? "" : day,
                    date: `${nextY}/${nextM}/${i}`,
                    gray: true,
                    lunarDate: !flag && this.showLunarDay(lunarDate),
                });
            }
            return arr;
        },
        // 当月最后一天应该补充的天数
        getLastAddDays: function(weekday, year, month, flag) {
            // 当月最后一天为周日，不需补充
            if (weekday === 6) {
                return [];
            }
            if (weekday === 7) {
                return [1, 2, 3, 4, 5, 6];
            }
            let arr = [];
            // 下个月的年月
            let nextY = month === 12 ? year + 1 : year;
            let nextM = month === 12 ? 1 : month + 1;
            for (let i = 1; i < 7 - weekday; i++) {
                let lunarDate = lunar.solar2lunar(nextY, nextM, i);
                arr.push({
                    day: flag ? "" : i,
                    date: `${nextY}/${nextM}/${i}`,
                    gray: true,
                    lunarDate: !flag && this.showLunarDay(lunarDate),
                });
            }
            return arr;
        },
        // 农历展示节气，还是月份，还是日
        showLunarDay: function(obj) {
            if (obj.isHoliday) {
                return obj.holidayName;
            }
            if (obj.isTerm) {
                return obj.Term;
            }
            if (obj.IDayCn === '初一') {
                return obj.IMonthCn;
            }
            return obj.IDayCn;
        },    
        /**
         * 获取当前面板展示的天数
         * @param {*} dateStr 
         * @param {*} flag 前后新增的日期是否隐藏，true为隐藏
         */
        getShowDays: function(dateStr, flag) {
            let dateArr = dateStr.split('/');
            let year = Number(dateArr[0]);
            let month = Number(dateArr[1]);
            let currentDate = new Date().getDate();
            // 当前月份
            let currentYear = new Date().getFullYear();
            // 当前月份
            let currentMonth = new Date().getMonth() + 1;
            let weekday = this.getWeekDay(year, month);
            let monthDays = this.getMonthDays(year)[month - 1];
            // 当月最后一天周几
            let lastWeekDay = new Date(`${year}/${month}/${monthDays}`).getDay();
            let temp = [];
            for (let i = 1; i <= monthDays; i++) {
                let lunarDate = lunar.solar2lunar(year, month, i);
                temp.push({
                    day: i,
                    date: `${year}/${month}/${i}`,
                    selected: currentYear === year && currentMonth === month && currentDate === i,
                    lunarDate: !flag && this.showLunarDay(lunarDate),
                });
            }
            let days = this.getAddDays(weekday, year, month, flag).concat(temp, this.getLastAddDays(lastWeekDay, year, month, flag));
            let len = days.length;
            // 永远展示6行数据
            if (len !== 42) {
                let tempDay = days[len - 1];
                let lastArr = tempDay.date.split('/');
                let lastYear = lastArr[0];
                let lastMonth = lastArr[1];
                for (let j = 1; j <= 42 - len; j++) {
                    let lunarDate = lunar.solar2lunar(lastYear, lastMonth + 1, j);
                    days.push({
                        day: flag ? "" : j,
                        date: `${lastYear}/${lastMonth + 1}/${j}`,
                        gray: true,
                        lunarDate: !flag && this.showLunarDay(lunarDate),
                    });
                }
            }
            return days;
        },
        // 手势左滑
        handleSwiperLeft: function() {
            let dateArr = this.currentDate.split('/');
            let year = Number(dateArr[0]);
            let month = Number(dateArr[1]);
            let currentDays = '';
            if (month === 12) {
                currentDays = `${year + 1}/1/1`;
            } else {
                currentDays = `${year}/${month + 1}/1`;
            }
            this.$emit('changeDate', currentDays);
        },
        // 手势右滑
        handleSwiperRight: function() {
            let dateArr = this.currentDate.split('/');
            let year = Number(dateArr[0]);
            let month = Number(dateArr[1]);
            let currentDays = '';
            if (month === 1) {
                currentDays = `${year - 1}/12/1`;
            } else {
                currentDays = `${year}/${month - 1}/1`;
            }
            this.$emit('changeDate', currentDays);
        }
    }
}