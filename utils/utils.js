export function getRankTime(start_time,end_time){
        if(!start_time || !end_time) return "";
           
            // 转化为分钟
            const dep = start_time.split(":");
            const arr = end_time.split(":");
            const depVal = dep[0] * 60 + +dep[1];
            const arrVal = arr[0] * 60 + +arr[1];

            // 到达时间相减得到分钟
            let dis = arrVal - depVal;

            // 如果是第二天凌晨时间段，需要加24小时
            if(dis < 0){
                dis = arrVal + 24 * 60 - depVal;
            }

            // 得到相差时间
            return `${ Math.floor(dis / 60)}时${dis % 60}分`
}