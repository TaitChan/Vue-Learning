<template>
  <ct-card title="Leaflet地图">
    <el-header class="header-container">
      <div>
        创建标点：
        <el-switch
          v-model="isOpenDialog"
          @click="handleOpen"
          :disabled="isCreateMarker || isDialogEdit"
        />
      </div>
      <el-alert
        v-if="isOpenDialog"
        style="max-width: 400px"
        effect="dark"
        :title="actionTip"
        type="success"
        show-icon
        :closable="false"
      />
    </el-header>
    <div class="map-container">
      <div
        class="edit-dialog"
        :class="isOpenDialog && (isCreateMarker || isDialogEdit) ? 'show' : ''"
      >
        <div class="dialog">
          <div class="dialog__header">
            <span>{{ dialogTitle }}</span>
            <span class="dialog__close" @click="handleClose">
              <svg-icon icon-class="close" />
            </span>
          </div>
          <div class="dialog__content">
            <div class="mode">
              <span>标点类型</span>
              <div>
                <icon-pane
                  v-model="activeIcon"
                  @select="setActiveMarkerIcon(activeIcon)"
                ></icon-pane>
              </div>
            </div>
            <div class="mode"><span>自定义标点类型</span></div>
            <div class="mode">
              <span>
                标点描述
                <el-divider direction="vertical" />
                最多300字符
              </span>
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入标点描述"
              ></el-input>
            </div>
          </div>
          <div class="dialog__footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button @click="handleSave" type="primary">确定</el-button>
          </div>
        </div>
      </div>
      <div id="map" class="map"></div>
    </div>
  </ct-card>
</template>
<script>
  import L from 'leaflet'
  import IconPane from './components/IconPane/index.vue'
  import { addClass, removeClass, deepClone } from '@/utils'
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      iconAnchor: [15, 35],
      popupAnchor: [0, -35],
    },
  })
  export default {
    name: 'Map',
    components: { IconPane },
    data() {
      return {
        addClass,
        removeClass,
        deepClone,
        isOpenDialog: false, //是否开启创建标点dialog
        isSaveForm: true, //是否保存配置标点form
        isCreateMarker: false, //是否创建标点
        isDialogEdit: false, //标点弹窗是否是编辑类型
        map: null,
        layoutUrl:
          'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        defaultIcon: require('./components/IconPane/icons/node1.png'), //创建时默认图标
        activeMarker: null, //当前选中的标点
        activeMarkerHis: { iconUrl: '' }, //当前选中的标点备份
        activeIcon: null, //配置标点form中当前选中的标点
        markerList: [
          {
            id: 1,
            lat: 30,
            lng: 120,
          },
          {
            id: 2,
            lat: 31,
            lng: 121,
          },
          {
            id: 3,
            lat: 32,
            lng: 122,
          },
        ],
      }
    },
    watch: {
      isOpenDialog: {
        handler(val) {
          if (val) {
            //打开dialog，隐藏popup操作区
            this.hidePopupFooter()
          } else {
            //关闭dialog，正常显示popup操作区
            this.showPopupFooter()
          }
        },
      },
    },
    computed: {
      actionTip() {
        //操作提示
        return this.isDialogEdit
          ? '现在，你可以对选中标点进行编辑和保存了'
          : this.isCreateMarker
          ? '现在，你可以对待创建标点进行配置和保存了'
          : '现在，你可以点击地图上任意一点来创建标点'
      },
      dialogTitle() {
        //dialog标题
        return this.isDialogEdit ? '编辑标点' : '创建标点'
      },
    },
    mounted() {
      this.initMap()
    },
    methods: {
      initMap() {
        this.map = L.map('map').setView([30, 120], 6)
        this.drawLayer(this.layoutUrl)
        this.markerList.forEach((item) => {
          let { id, lat, lng } = item
          this.drawMarker(id, lat, lng, this.defaultIcon)
        })
        this.map.on('click', (e) => {
          //绑定监听地图点击事件
          this.clickMap(e)
        })
      },
      drawLayer(url) {
        //高德瓦片地图
        L.tileLayer(url).addTo(this.map)
      },
      drawMarker(id, lat, lng, icon, empty) {
        //第一个数字:纬度lat,越大越往上（y轴），第二个数字:经度lng，越大越往右（x轴）
        let options = {
          markerId: id,
          icon: new LeafIcon({ iconUrl: icon }),
        }
        let marker = null
        if (empty === 'empty') {
          marker = L.marker([lat, lng], options).addTo(this.map)
        } else {
          let content =
            `<div style="color:red">标点ID:${id} </div>` +
            `<div class="popup__footer">
                <button id="btn-del" class="btn-del el-button">删除</button>
                <button id="btn-edit" class="btn-edit el-button el-button--primary">编辑</button>
            </div>`
          marker = L.marker([lat, lng], options)
            .bindPopup(content, { popupId: id })
            .addTo(this.map)
        }
        //绑定监听marker点击事件
        marker.on('click', (e) => {
          this.clickMarker(e)
        })
        return marker
      },

      setActiveMarkerIcon(iconUrl) {
        //改变选中marker的图标
        this.activeMarker.setIcon(new LeafIcon({ iconUrl: iconUrl }))
      },
      removeActiveMarker() {
        //移除选中的marker
        if (this.activeMarker) {
          this.activeMarker.closePopup()
          this.activeMarker.remove()
        }
      },
      clickMarker(e) {
        console.log('clickMarker')
        //绑定监听popup编辑、删除按钮点击事件
        setTimeout(() => {
          let editDom = document.getElementById('btn-edit')
          let delDom = document.getElementById('btn-del')
          //HTMLCollection对象
          editDom.onclick = () => {
            //将点击的标点设为选中marker
            this.activeMarker = e.sourceTarget
            this.openPopupEdit()
          }
          delDom.onclick = () => {
            //将点击的标点设为选中marker
            this.activeMarker = e.sourceTarget
            this.handleDel()
          }
        }, 500)

        let { lat, lng } = e.latlng
        if (!this.isOpenDialog) {
          //①不存在dialog。点击标点。
          //将点击的标点设为选中marker
          this.activeMarker = e.sourceTarget
          this.showPopupFooter()
        }
        if (this.isOpenDialog) {
          //①存在dialog
          this.hidePopupFooter()
        }
        if (this.isOpenDialog && !this.isDialogEdit && !this.isCreateMarker) {
          //①存在dialog为创建模式，②还没有点击创建标点时。点击标点。
          //将点击的标点设为选中marker
          this.activeMarker = e.sourceTarget
        }

        this.$notify({
          title: '点击标点操作',
          dangerouslyUseHTMLString: true,
          message: `纬度（lat）：${lat} <br> 经度（lng）：${lng}`,
          type: 'success',
          duration: 1000,
        })
      },
      clickMap(e) {
        let { lat, lng } = e.latlng
        if (!this.isOpenDialog) {
          //①不存在dialog
          this.$notify({
            title: '点击地图操作',
            dangerouslyUseHTMLString: true,
            message: `纬度（lat）：${lat} <br> 经度（lng）：${lng}`,
            type: 'success',
            duration: 1000,
          })
        }
        if (this.isOpenDialog && !this.isDialogEdit && !this.isCreateMarker) {
          //①存在dialog为创建模式，②还没有点击创建标点时。点击地图创建标点。
          this.activeIcon = null //初始化form中图标类型为未选中的空值
          this.activeMarker = this.drawMarker(
            //创建未绑定popup的marker且将其设为选中marker
            '',
            lat,
            lng,
            this.defaultIcon,
            'empty'
          )
          this.isCreateMarker = true
          this.$notify({
            title: '点击地图创建标点操作',
            dangerouslyUseHTMLString: true,
            message: `纬度（lat）：${lat} <br> 经度（lng）：${lng}`,
            type: 'success',
            duration: 1000,
          })
        }
      },

      openPopupEdit() {
        console.log('openPopupEdit')
        this.isOpenDialog = true
        this.isDialogEdit = true
        this.activeIcon = this.activeMarker.options.icon.options.iconUrl
        this.activeMarkerHis['iconUrl'] = this.activeIcon
        this.$notify({
          title: '点击操作',
          dangerouslyUseHTMLString: true,
          message: `已开启编辑标点弹窗`,
          type: 'success',
          duration: 1000,
        })
      },
      handleDel() {
        this.$confirm(`此标点将被删除，确定删除`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.removeActiveMarker()
            this.$notify({
              title: '删除操作',
              dangerouslyUseHTMLString: true,
              message: `已删除标点`,
              type: 'success',
              duration: 1000,
            })
          })
          .catch()
      },
      handleOpen() {
        this.$notify({
          title: '开关操作',
          dangerouslyUseHTMLString: true,
          message: `已${this.isOpenDialog ? '开启' : '关闭'}创建标点弹窗`,
          type: 'success',
          duration: 1000,
        })
      },
      handleSave() {
        this.$notify({
          title: '保存操作',
          dangerouslyUseHTMLString: true,
          message: `已${this.isCreateMarker ? '保存标点并' : ''}关闭弹窗`,
          type: 'success',
          duration: 1000,
        })
        let id = new Date().getTime()
        this.activeMarker.options.markerId = id
        let content =
          `<div style="color:red">标点ID:${id} </div>` +
          `<div class="popup__footer">
                <button id="btn-del" class="btn-del el-button">删除</button>
                <button id="btn-edit" class="btn-edit el-button el-button--primary">编辑</button>
            </div>`
        this.activeMarker.bindPopup(content, { popupId: id })
        this.isCreateMarker = false
        this.isOpenDialog = false
        this.isDialogEdit = false
      },
      handleClose() {
        this.$confirm(`未保存的内容将会丢失，确定退出`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            if (this.isCreateMarker) {
              this.removeActiveMarker()
            }
            if (this.isDialogEdit) {
              this.setActiveMarkerIcon(this.activeMarkerHis.iconUrl)
            }
            this.$notify({
              title: '取消操作',
              dangerouslyUseHTMLString: true,
              message: `已${this.isCreateMarker ? '取消标点并' : ''}关闭弹窗`,
              type: 'success',
              duration: 1000,
            })
            this.isCreateMarker = false
            this.isOpenDialog = false
            this.isDialogEdit = false
          })
          .catch()
      },

      showPopupFooter() {
        setTimeout(() => {
          let domList = document.getElementsByClassName('popup__footer')
          for (let i = 0; i < domList.length; i++) {
            if (domList[i]) {
              removeClass(domList[i], 'hidden')
            }
          }
        }, 0)
      },
      hidePopupFooter() {
        setTimeout(() => {
          let domList = document.getElementsByClassName('popup__footer')
          console.log(domList)
          for (let i = 0; i < domList.length; i++) {
            if (domList[i]) {
              addClass(domList[i], 'hidden')
            }
          }
        }, 0)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .map-container {
    position: relative;
    background: white;
  }
  .map {
    height: calc(100vh - 240px);
  }
  .edit-dialog {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300px;
    padding: 20px;
    z-index: 2000;
    transform: translate(-100%);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    &.show {
      transform: translate(0);
    }
    .dialog {
      background: white;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      border-radius: 20px;
      box-shadow: var(--el-box-shadow-light);
      &__header {
        height: 40px;
        background: white;
        border-bottom: 1px solid var(--el-border-color-extra-light);
        width: 100%;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        position: relative;
        font-weight: 500;
      }
      &__close {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
      }
      &__content {
        overflow: scroll;
        flex: 1;
        padding: 10px;
        font-size: 14px;
        color: var(--el-text-color-regular);
        display: flex;
        flex-direction: column;
        .mode {
          padding-bottom: 10px;
          span:first-child {
            margin-bottom: 10px;
            display: inline-block;
          }
        }
        .mode:not(:first-child) {
          padding-top: 10px;
        }
        .mode:not(:last-child) {
          border-bottom: 1px solid var(--el-border-color-extra-light);
        }
      }
      &__footer {
        height: 50px;
        background: var(--el-border-color-light);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        flex-shrink: 0;
        padding: 0 10px;
      }
    }
  }
</style>
<style lang="scss">
  .leaflet-control-attribution {
    display: none;
  }
  .popup__footer {
    //background: #409eff;
    border-top: 1px solid var(--el-border-color);
    padding-top: 10px;
    &.hidden {
      display: none;
    }
  }
</style>
