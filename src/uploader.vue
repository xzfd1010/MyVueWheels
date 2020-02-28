<template>
  <div class="my-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width:0;height: 0;overflow: hidden;"></div>
    <!--    <img :src="url"> &lt;!&ndash;为什么是about:blank&ndash;&gt;-->
    <ol>
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status==='uploading'">菊花</template>
        <img :src="file.url" width="100" height="100">
        {{file.name}}
        <button @click="onRemoveFile(file)">&times;</button>
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
      onRemoveFile (file) {
        let answer = window.confirm('你确定要删除这张图片吗？')
        if (answer) {
          let copy = [...this.fileList]
          let index = copy.indexOf(file)
          copy.splice(index, 1)
          this.$emit('update:fileList', copy)
        }
      },
      onClickUpload () {
        let input = this.createInput()
        input.addEventListener('change', () => {
          this.uploadFile(input.files[0])
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
      beforeUploadFile (rawFile, newName) {
        let { name, size, type } = rawFile
        this.$emit('update:fileList', [...this.fileList, { name: newName, size, type, status: 'uploading' }])
      },
      uploadFile (rawFile) {
        let { name, size, type } = rawFile
        let newName = this.generateNewName(name)
        this.beforeUploadFile(rawFile, newName)
        let formData = new FormData()
        //todo 服务器上传的文件名是name，而非newName，可能存在bug
        formData.append(this.name, rawFile)

        this.doUploadFile(formData, (response) => {
          let url = this.parseResponse(response)
          this.url = url
          this.afterUploadFile(newName, url)
        })
      },
      generateNewName (name) {
        while (this.fileList.filter(f => f.name === name).length > 0) {
          let dotIndex = name.lastIndexOf('.')
          let nameWithoutExtension = name.substring(0, dotIndex)
          let extension = name.substring(dotIndex)
          name = nameWithoutExtension + '(1)' + extension
        }
        return name
      },
      afterUploadFile (newName, url) {
        let file = this.fileList.filter(f => f.name === newName)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.url = url
        fileCopy.status = 'success'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, fileCopy)
        this.$emit('update:fileList', fileListCopy)
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
