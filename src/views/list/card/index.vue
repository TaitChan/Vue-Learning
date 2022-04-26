<template>
  <div>
    <ct-card title="卡片列表">
      <div class="search-container">
        <el-input v-model="search" placeholder="请输入卡片名称" clearable>
          <template #append>
            <el-button>
              <svg-icon icon-class="search"></svg-icon>
            </el-button>
          </template>
        </el-input>
        <el-radio-group v-model="confirmType">
          <el-radio label="none">None</el-radio>
          <el-radio label="message-box">Message Box</el-radio>
          <el-radio label="pop-confirm">Pop Confirm</el-radio>
        </el-radio-group>
      </div>
      <div class="grid">
        <ct-card
          v-for="item in filterList"
          :key="item.name"
          border
          :shadow="
            item.name === activeItem.name ? 'always float' : 'hover float'
          "
          style="cursor: pointer; font-size: 14px"
          @click="openDrawer(item)"
        >
          <template #title>
            {{ item.name }}
          </template>
          <template #extra>
            <el-tag type="success" v-if="item.status === 1">
              <svg-icon icon-class="success-filled"></svg-icon>
              已启用
            </el-tag>
          </template>
          <div class="content">
            <ct-ellipsis :line="3" placement="bottom">
              {{ item.zhDesc }}
            </ct-ellipsis>
          </div>
          <template #footer>
            <el-switch
              v-if="confirmType === 'none'"
              v-model="item.status"
              :active-value="1"
              :inactive-value="0"
              @click.stop=""
              @change="handleSwitch(item)"
              :loading="item.loading"
            />
            <el-switch
              v-if="confirmType === 'message-box'"
              v-model="item.status"
              :active-value="1"
              :inactive-value="0"
              @click.stop=""
              @change="handleSwitchForMessageBox(item)"
              :loading="item.loading"
            />
            <el-popconfirm
              v-if="confirmType === 'pop-confirm'"
              confirm-button-text="确定"
              cancel-button-text="取消"
              :title="`确定${item.status === 1 ? '停止' : '启用'}此卡片?`"
              @confirm="handleSwitchForPopConfirm(item)"
              @cancel="activeItem = {}"
              :disabled="item.loading"
            >
              <template #reference>
                <el-switch
                  v-model="item.status"
                  :active-value="1"
                  :inactive-value="0"
                  @click.stop=""
                  @change="rollSwitch(item)"
                  :loading="item.loading"
                />
              </template>
            </el-popconfirm>
          </template>
        </ct-card>
      </div>
    </ct-card>
    <el-drawer
      :title="drawer.title"
      size="40%"
      v-model="drawer.visible"
      @closed="closedDrawer"
    >
      <ct-card :title="activeItem.name" no-padding>
        <ct-card title="中文描述" no-padding style="font-size: 14px">
          {{ activeItem.zhDesc }}
        </ct-card>
        <el-divider border-style="dashed" />
        <ct-card title="英文描述" no-padding style="font-size: 14px">
          {{ activeItem.enDesc }}
        </ct-card>
        <el-divider border-style="dashed" />
        <ct-card title="使用示例" no-padding style="font-size: 14px">
          {{ activeItem.example }}
        </ct-card>
      </ct-card>
      <template #footer>
        <el-button @click="drawer.visible = false">关闭</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    components: {},
    data() {
      return {
        drawer: {
          title: '卡片详情',
          visible: false,
        },
        activeItem: {},
        confirmType: 'none',
        list: [
          {
            name: 'AddRequestHeader',
            status: 1,
            example: 'red,blue;',
            zhDesc:
              '此插件由键值对方式构成，插件中的URI变量用于匹配某个请求的主机地址，并在运行时生效',
            enDesc:
              'The AddRequestHeader GatewayFilter factory takes a name and value parameter, AddRequestHeader is aware of the URI variables used to match a path or host. URI variables may be used in the value and are expanded at runtime',
          },
          {
            name: 'AddRequestParameter',
            status: 1,
            example: 'red,blue;',
            zhDesc:
              '此插件由键值对组成，对满足匹配条件的下游请求参数，更改为 key = value 形式',
            enDesc:
              'The AddRequestParameter GatewayFilter Factory takes a name and value parameter, This will add key=value to the downstream request’s query string for all matching requests.',
          },
          {
            name: 'AddResponseHeader',
            status: 0,
            example: 'red,blue;',
            zhDesc:
              '此插件由键值对组成，对满足匹配条件的下游返回的 header 信息，更改为 key = value 形式',
            enDesc:
              'The AddResponseHeader GatewayFilter Factory takes a name and value parameter, This adds X-Response-Foo:Bar header to the downstream response’s headers for all matching requests.',
          },
          {
            name: 'DedupeResponseHeader',
            status: 0,
            example:
              'Access-Control-Allow-Credentials,Access-Control-Allow-Origin;',
            zhDesc:
              '此插件由 name 参数和一个可选的 strategy 参数组成，多个 name 参数用空格分隔，strategy 参数为 RETAIN_FIRST、RETAIN_LAST 或 RETAIN_UNIQUE，对满足条件的请求头，在网关 CORS 和 下游请求同时添加请求头的情况下，此插件将删除 name 参数中指定的重复值',
            enDesc:
              'The DedupeResponseHeader GatewayFilter factory takes a name parameter and an optional strategy parameter. name can contain a space-separated list of header names, This removes duplicate values of Access-Control-Allow-Credentials and Access-Control-Allow-Origin response headers in cases when both the gateway CORS logic and the downstream logic add them, The DedupeResponseHeader filter also accepts an optional strategy parameter. The accepted values are RETAIN_FIRST (default), RETAIN_LAST, and RETAIN_UNIQUE.',
          },
          {
            name: 'MapRequestHeader',
            status: 0,
            example: 'Blue,X-Request-Red;',
            zhDesc:
              '此插件由 fromHeader 和 toHeader 两个参数构成，将fromHeader 的值映射成 toHeader的值，如果 fromHeader 不存在，则此过滤器没有影响',
            enDesc:
              'The MapRequestHeader GatewayFilter factory takes fromHeader and toHeader parameters. It creates a new named header (toHeader), and the value is extracted out of an existing named header (fromHeader) from the incoming http request. If the input header does not exist, the filter has no impact. If the new named header already exists, its values are augmented with the new values.',
          },
          {
            name: 'PreserveHostHeader',
            status: 0,
            example: '无参数',
            zhDesc:
              '此插件无参数。此插件将在request请求中设置一个属性，以确定是发送原始Header，还是是由 HTTP客户端确定的Header。',
            enDesc:
              'The PreserveHostHeader GatewayFilter factory has no parameters. This filter sets a request attribute that the routing filter inspects to determine if the original host header should be sent, rather than the host header determined by the HTTP client.',
          },
          {
            name: 'RequestRateLimiter',
            status: 0,
            example:
              'redis-rate-limiter.replenishRate,10;redis-rate-limiter.burstCapacity,20;redis-rate-limiter.requestedTokens,1;',
            zhDesc:
              '此插件使用RateLimiter来确定是否继续处理当前请求。如果不处理，则返回状态码 HTTP 429 - Too Many Requests（by default）。此插件采用可选的 keyResolver 参数和特定的rate limiter的参数。keyResolver 是一个实现 KeyResolver 接口的 bean。 在配置中，使用 SpEL表达式按名称引用 bean。 #{@myKeyResolver} 是一个SpEL表达式，它引用名称为myKeyResolver的bean。',
            enDesc:
              'The RequestRateLimiter GatewayFilter factory uses a RateLimiter implementation to determine if the current request is allowed to proceed. If it is not, a status of HTTP 429 - Too Many Requests (by default) is returned.\\n\\nThis filter takes an optional keyResolver parameter and parameters specific to the rate limiter (described later in this section).\\n\\nkeyResolver is a bean that implements the KeyResolver interface. In configuration, reference the bean by name using SpEL. #{@myKeyResolver} is a SpEL expression that references a bean named myKeyResolver.',
          },
          {
            name: 'FallbackHeaders',
            status: 0,
            example: 'executionExceptionTypeHeaderName,Test-Header;',
            zhDesc:
              '此插件允许您在转发到外部应用程序中的 fallbackUri 的请求头中添加 Hystrix 或 Spring Cloud CircuitBreaker 执行异常详细信息',
            enDesc:
              'The FallbackHeaders factory lets you add Hystrix or Spring Cloud CircuitBreaker execution exception details in the headers of a request forwarded to a fallbackUri in an external application',
          },
          {
            name: 'PrefixPath',
            status: 0,
            example: '/mypath;',
            zhDesc: '此插件采用单个前缀参数',
            enDesc:
              'The PrefixPath GatewayFilter factory takes a single prefix parameter.',
          },
          {
            name: 'RedirectTo',
            status: 0,
            example: '302,https://acme.org;',
            zhDesc:
              '此插件接受两个参数，status 和 url。 status 参数应该是一个 300 系列的重定向 HTTP 状态码，比如 301。url 参数应该是一个有效的 URL。 这里是 Location头部的值。相对重定向应该使用 uri: no://op 作为路由定义的 uri。',
            enDesc:
              'The RedirectTo GatewayFilter factory takes two parameters, status and url. The status parameter should be a 300 series redirect HTTP code, such as 301. The url parameter should be a valid URL. This is the value of the Location header. For relative redirects, you should use uri: no://op as the uri of your route definition.',
          },
        ],
      }
    },
    computed: {
      search: {
        get() {
          return this.$route.query.search || ''
        },
        set(value) {
          this.$router.push({
            path: this.$route.path,
            query: { ...this.$route.query, search: value },
          })
        },
      },
      name: {
        get() {
          return this.$route.query.name || ''
        },
        set(value) {
          this.$router.push({
            path: this.$route.path,
            query: { ...this.$route.query, name: value },
          })
        },
      },
      filterList() {
        return this.list.filter((v) => {
          return v.name.includes(this.search)
        })
      },
    },
    methods: {
      rollSwitch(item) {
        item.status = item.status === 1 ? 0 : 1
        this.activeItem = item
      },
      handleSwitchForPopConfirm(item) {
        item.loading = true
        setTimeout(() => {
          const randomBoolean = Math.random() >= 0.5
          if (randomBoolean) {
            item.status = item.status === 1 ? 0 : 1
            this.$message.success('操作成功')
          } else {
            this.$message.error('操作失败')
          }
          item.loading = false
          this.activeItem = {}
        }, 500)
      },
      handleSwitch(item) {
        this.rollSwitch(item)
        this.handleSwitchForPopConfirm(item)
      },
      handleSwitchForMessageBox(item) {
        this.rollSwitch(item)
        let text = item.status === 1 ? '停止' : '启用'
        this.$confirm(`确定${text}此卡片?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            this.handleSwitchForPopConfirm(item)
          })
          .catch(() => {
            this.activeItem = {}
          })
      },
      openDrawer(item) {
        this.name = item.name
        this.drawer.visible = true
        this.activeItem = item
      },
      closedDrawer() {
        this.name = ''
        this.activeItem = {}
      },
    },
    created() {
      let active = this.list.find((v) => {
        return v.name === this.name
      })
      if (active) {
        this.openDrawer(active)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: $space-sm;
    .content {
      font-size: 12px;
    }
  }
</style>
