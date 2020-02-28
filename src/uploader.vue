<template>
  <div class="my-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width:0;height: 0;overflow: hidden;"></div>
    <!--    <img :src="url"> &lt;!&ndash;为什么是about:blank&ndash;&gt;-->
    <ol>
      <li v-for="file in fileList" :key="file.name">
        <img :src="file.url" width="100" height="100">
        {{file.name}}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'uploader',
    props: {
      name: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      method: {
        type: String,
        default: 'POST'
      },
      parseResponse: {
        type: Function,
        required: true
      },
      fileList: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        url: 'about:blank',
      }
    },
    methods: {
      onClickUpload () {
        let input = this.createInput()
        input.addEventListener('change', () => {
          let file = input.files[0]
          this.uploadFile(file)
          input.remove()
        })
        input.click()
      },
      createInput () {
        let input = document.createElement('input')
        input.type = 'file'
        this.$refs.temp.appendChild(input)
        return input
      },
      uploadFile (file) {
        let formData = new FormData()
        formData.append(this.name, file)
        let { name, size, type } = file
        // 保证name的唯一性
        while (this.fileList.filter(f => f.name === name).length > 0) {
          let dotIndex = name.lastIndexOf('.')
          let nameWithoutExtension = name.substring(0, dotIndex)
          let extension = name.substring(dotIndex)
          name = nameWithoutExtension + '(1)' + extension
        }
        this.doUploadFile(formData, (response) => {
          let url = this.parseResponse(response)
          this.url = url
          this.$emit('update:fileList', [...this.fileList, { name, size, type, url }])
        })
      },
      doUploadFile (formData, success) {
        let xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          success(xhr.response)
        }
        xhr.send(formData)
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-uploader {
  }
  ol, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
