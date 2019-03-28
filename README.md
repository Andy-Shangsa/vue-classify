# v-classify

    一款基于vue可左右联动的商城分类插件

### Installation

##### install with NPM

    npm i v-classify -S

#### 引入插件

    import vClassify from "v-classify";
    Vue.use(vClassify);

#### 使用插件

    classifyList: 联动数据
    keyOptions: 对应key自定义
    height: 设置容器高度，不设置默认整屏，可以设置"100%"铺满内部容器

###### 常规

    <v-classify :classifyList="classifyList"></v-classify>

    data() {
        return {
            classifyList: [
               {
                    name: "苹果",
                    list: [{
                        name: "苹果 iPhone X"
                    },{
                        name: "苹果 iPhone XS Max"
                    }]
               },
               {
                    name: "小米",
                    list: [{
                        name: "小米 9"
                    },{
                        name: "小米 8"
                    }]
               }
            ]
        }
    }

###### 自定义字段

     <v-classify :classifyList="classifyList" :keyOptions="keyOptions" :height="height"></v-classify>

     data() {
        return {
            classifyList: [
                {
                    title: "苹果",
                    children: [{
                        title: "苹果 iPhone X"
                    },{
                        title: "苹果 iPhone XS Max"
                    }]
                },
                {
                    title: "小米",
                    children: [{
                        title: "小米 9"
                    },{
                        title: "小米 8"
                    }]
                }
            ],
            keyOptions: {
                key: "id",               // 当需要自定义右边内容时加一个key字段，抛出插槽，默认为：key
                menuNameKey: "title",    // 左侧菜单文字描述，默认为：name
                listKey: "children",     // 右侧内容，默认为：list
                listNameKey: "title"     // 右侧内容子项文字描述，默认为：name
            },
            height: "100%"               // 不设置铺满屏幕，可设置"100%"或具体像素值
        }
    }

###### 自定义右边显示

    <v-classify :classifyList="classifyList">
        <template v-for="list in classifyList" :key="list.key" :slot="item.key" slot-scope="props">
            <div :key="list.key">
                <!-- 此处加入对应逻辑 -->
            </div>
        </template>
    </v-classify>

#### 写在最后

    感谢阅读，待完善。。。
