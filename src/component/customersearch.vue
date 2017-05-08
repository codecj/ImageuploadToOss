<template>
    <div class="">
        <div class="heards">
            <span><img src="../assets/icon10.png"></span>
            <form @submit.prevent="submit">
                <div class="input-wrap">
                    <div>
                        <input type="text" v-model="newTodo"><img v-on:click="removeTodo" src="../assets/icon18.png"></div>
                </div>
            </form>
        </div>
        <div class="content-1"></div>
    </div>
</template>
<script type="text/javascript">
import {
    Toast,
    Indicator
} from 'mint-ui'
import Request from "../util/API";
export default {
    data() {
            return {
                newTodo: '',
                page: {
                    pageno: "1",
                    pagesize: "20"
                }
            }
        }, mounted: function() {

        },
        methods: {
            removeTodo: function() {
                this.newTodo = ''
            },
            submit: function() {
                let pargrm = {
                        pagination: JSON.stringify(this.page),
                        oper: 'getShopList',
                        type: 'wqCustomer',
                        para: '{"latitude": "30.32765","longitude": "120.17237", "keywords": "", "picno": "355328","type": 0}'
                    }
                    //ajax调用
                Request.post(pargrm).then(function(res) {
                    console.log(res)
                    Indicator.close();
                }).catch(function(error) {
                    Indicator.close();
                    if (error.response) {
                        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                        console.log(error.response.status);
                        Toast({
                            message: error.response.status,
                            duration: 2000
                        });
                    } else {
                        console.log('Error', error.message);
                        Toast({
                            message: error.message,
                            duration: 2000
                        });
                    }
                })
            }
        }
}
</script>
<style scoped>
.heards {
    width: 100%;
    height: 84px;
    background-color: #fff;
    position: absolute;
    top: 0;
}

.heards span img {
    height: 33.6px;
    float: left;
    padding: 28px 0 27.4px 37px;
}

.heards .input-wrap {
    border: 0;
    float: left;
}

.heards .input-wrap div {}

.heards .input-wrap input {
    border: none;
    background-color: #EBECF0;
    width: 490px;
    height: 62px;
    margin-left: 24px;
    font-size: 30px;
    color: #3B456C;
    line-height: 62px
}

.heards .input-wrap div {
    float: left;
    width: 548px;
    height: 62px;
    background-color: #EBECF0;
    margin-top: 11px;
    margin-left: 41.4px
}

.heards .input-wrap img {
    width: 20.4px;
    line-height: 62px
}

.content-1 {
    width: 100%;
    position: absolute;
    top: 84px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    bottom: 0;
}
</style>
