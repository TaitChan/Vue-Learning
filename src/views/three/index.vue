<template>
  <div>
    <ct-card title="three.js实践">
      <template #extra>
        <a :href="from" target="_blank">参考资料：Vue+Three.js，新手demo</a>
      </template>
      <div class="content">
        <div class="stats">
          <div ref="fps"></div>
          <div ref="ms"></div>
          <div ref="mb"></div>
        </div>
        <canvas ref="three" class="three"></canvas>
      </div>
    </ct-card>
  </div>
</template>

<script>
  import * as THREE from 'three'
  import * as Stats from 'stats.js'
  // glTF格式模型加载器
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  // 轨道控制器
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  export default {
    name: 'Three',
    data() {
      return {
        from: 'https://zhuanlan.zhihu.com/p/333615381',
      }
    },
    mounted() {
      this.initThree()
    },
    methods: {
      initThree() {
        console.log('initThree')
        // 性能监视器
        const fps = new Stats()
        fps.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        fps.dom.style.position = 'relative'
        this.$refs.fps.appendChild(fps.dom)
        const ms = new Stats()
        ms.showPanel(1)
        ms.dom.style.position = 'relative'
        this.$refs.ms.appendChild(ms.dom)
        const mb = new Stats()
        mb.showPanel(2)
        mb.dom.style.position = 'relative'
        this.$refs.mb.appendChild(mb.dom)

        const scene = new THREE.Scene()
        scene.background = new THREE.Color('#eee')
        // 雾化效果，场景中越远的位置看起来越模糊
        scene.fog = new THREE.Fog('#eee', 20, 100)
        // 用于简单模拟3个坐标轴的对象.
        // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
        // AxesHelper( size : Number )
        // size — (可选的) 表示代表轴的线段长度. 默认为 1.
        const axesHelper = new THREE.AxesHelper(1000)
        scene.add(axesHelper)

        const canvas = this.$refs.three
        //渲染器
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        //激活并使用阴影，在场景中使用阴影贴图
        renderer.shadowMap.enabled = true
        //摄像机，
        // PerspectiveCamera，透视摄像机（物体的大小受远近距离的影响)，
        // OrthographicCamera （正交投影摄像机）
        // fov — 摄像机视锥体垂直视野角度。可以理解为人类的视野广度。
        // aspect — 摄像机视锥体横纵比。渲染结果的横向尺寸和纵向尺寸的比值，这里我们使用的是 浏览器窗口的宽高比。
        // near — 摄像机视锥体近端面。一切比近面更近的事物将不被渲染。
        // far — 摄像机视锥体远端面。一切比远面更远的事物将不被渲染，但是设置过大可能会影响性能。
        //
        // 这些参数一起定义了摄像机的视锥体。
        const camera = new THREE.PerspectiveCamera(
          50,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        camera.position.z = 4
        camera.position.y = 1

        //轨道控制器
        const controls = new OrbitControls(camera, renderer.domElement)
        //阻尼感（稍许延迟，显的更真实）
        controls.enableDamping = true

        //创建一个Group 对象
        const group = new THREE.Group()
        //把group对象添加到场景中
        scene.add(group)
        //加载模型和纹理-萨勒芬妮
        const gltfLoader = new GLTFLoader()
        gltfLoader.load('/seraphine/scene.gltf', (gltf) => {
          const model = gltf.scene
          //遍历模型每部分
          model.traverse((o) => {
            //将图片作为纹理加载
            let explosionTexture = new THREE.TextureLoader().load(
              '/seraphine/textures/Mat_cwfyfr1_userboy17.bmp_diffuse.png'
            )
            //调整纹理图的方向
            explosionTexture.flipY = false
            //将纹理图生成基础网格材质(MeshBasicMaterial)，给模型每部分上材质
            o.material = new THREE.MeshBasicMaterial({
              map: explosionTexture,
            })
            //让模型每个部分都能产生阴影
            if (o.isMesh) {
              o.castShadow = true
              o.receiveShadow = true
            }
          })
          model.rotation.y += 90
          group.add(model)
        })

        //创建物体（地板）
        // Three.js里物体（一般叫网格Mesh）由两部分构成，一是它的形状，二是它的材质
        // 平面几何体，PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
        // 立方缓冲几何体,BoxGeometry
        // width — 平面沿着X轴的宽度。默认值是1。
        // height — 平面沿着Y轴的高度。默认值是1。
        // widthSegments — （可选）平面的宽度分段数，默认值是1。
        // heightSegments — （可选）平面的高度分段数，默认值是1。
        let floorGeometry = new THREE.PlaneGeometry(3000, 3000)
        // Phong网格材质(MeshPhongMaterial)
        // 是一种用于具有镜面高光的光泽表面的材质。
        // 0x800080紫色，0xff0000红色
        let floorMaterial = new THREE.MeshPhongMaterial({ color: '#994398' })
        let floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -0.5 * Math.PI
        floor.receiveShadow = true
        floor.position.y = -0.001
        scene.add(floor)
        // 坐标格辅助对象. 坐标格实际上是2维线数组.
        const gridHelper = new THREE.GridHelper(10, 10)
        scene.add(gridHelper)

        //添加光源
        // 平行光一般用来模拟太阳光，DirectionalLight( color : Integer, intensity : Float )
        // color - (可选参数) 16进制表示光的颜色。 缺省值为 0xffffff (白色)。
        // intensity - (可选参数) 光照的强度。缺省值为1。
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
        //光源的位置
        dirLight.position.set(-10, 8, -5)
        //可以产生阴影
        dirLight.castShadow = true
        //阴影贴图，数值越高，阴影拥有越清晰的细节，数值越低，阴影越模糊
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
        scene.add(dirLight)
        // 用于模拟场景中平行光 DirectionalLight 的辅助对象.其中包含了表示光位置的平面和表示光方向的线段.
        const dirHelper = new THREE.DirectionalLightHelper(dirLight, 5)
        scene.add(dirHelper)
        // HemisphereLight半球光光源
        // 光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
        // 半球光不能投射阴影。
        // skyColor – (可选参数) 天空中发出光线的颜色。 缺省值 0xffffff。
        // groundColor – (可选参数) 地面发出光线的颜色。 缺省值 0xffffff。
        // intensity – (可选参数) 光照强度。 缺省值 1。
        const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
        hemLight.position.set(0, 48, 0)
        scene.add(hemLight)

        function animate() {
          controls.update()
          fps.update()
          ms.update()
          mb.update()
          // 靠group对象作为中介，使obj模型旋转
          group.rotation.y -= 0.02
          renderer.render(scene, camera)
          requestAnimationFrame(animate)

          //设备的物理像素分辨率与CSS像素分辨率的比值的问题，
          //canvas绘制出来后图片因为高清屏设备的影响，导致图片变大，
          // 然而我们在浏览器的渲染窗口并没有变大，因此图片会挤压缩放使得canvas画布会变得模糊。
          if (resizeRendererToDisplaySize(renderer)) {
            console.log(resizeRendererToDisplaySize(renderer))
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
          }
        }
        animate()

        //devicePixelRatio
        // 此属性返回当前显示设备的物理像素分辨率与CSS像素分辨率的比值。
        // 该值也可以被解释为像素大小的比例：即一个CSS像素的大小相对于一个物理像素的大小的比值。
        function resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement
          const width = window.innerWidth
          const height = window.innerHeight
          const canvasPixelWidth = canvas.width / window.devicePixelRatio
          const canvasPixelHeight = canvas.height / window.devicePixelRatio

          const needResize =
            canvasPixelWidth !== width || canvasPixelHeight !== height
          if (needResize) {
            renderer.setSize(width, height, false)
          }
          return needResize
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    position: relative;
    .stats {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .three {
    height: 100%;
    width: 100%;
  }
</style>
