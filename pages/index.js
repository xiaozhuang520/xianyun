export default {
    data() {
        return {
            // 轮播图数据
            banners: [
            ],
            options: [      // 搜索框tab选项
                {
                    name: "攻略",
                    placeholder: "搜索城市",
                    pageUrl: "/post?city="
                },
                {
                    name: "酒店",
                    placeholder: "请输入城市搜索酒店",
                    pageUrl: "/hotel?city="
                },
                {
                    name: "机票",
                    placeholder: "请输入出发地",
                    pageUrl: "/air"
                }
            ],
            searchValue: "",    // 搜索框的值
            currentOption: 0,   // 当前选中的选项        
        }
    },

    mounted() {
        this.$axios({
            url: '/scenics/banners'
        }).then(res => {
            const { data } = res.data;
            this.banners = data;
        })
    },
    methods: {
        handleOption(index){
            this.currentOption=index;
            if(index===2){
                this.$router.push(this.options[index].pageUrl)
            }
        },
        handleSearch(){}
    },
}