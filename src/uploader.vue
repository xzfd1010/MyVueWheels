<template>
  <div class="my-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <ol class="my-uploader-fileList">
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status==='uploading'">
          <icon name="loading" class="my-uploader-spin"></icon>
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img :src="file.url" class="my-uploader-image">
        </template>
        <template v-else>
          <div class="my-uploader-defaultImage"></div>
        </template>
        <span :class="{[file.status]:file.status}" class="my-uploader-name">{{file.name}}</span>
        <button class="my-uploader-remove" @click="onRemoveFile(file)">&times;</button>
      </li>
    </ol>
    <div ref="temp" style="width:0;height: 0;overflow: hidden;"></div>
  </div>
</template>

<script>
  import Icon from './icon'

  export default {
    name: 'uploader',
    components: { Icon },
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
      },
      sizeLimit: {
        type: Number
      },
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
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
          // this.uploadFile(input.files[0])
          this.uploadFiles(input.files)
          input.remove()
        })
        input.click()
      },
      createInput () {
        this.$refs.temp.innerHTML = ''
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = this.accept
        input.multiple = this.multiple
        this.$refs.temp.appendChild(input)
        return input
      },
      // 更新状态
      beforeUploadFiles (rawFiles, newNames) {
        for (let i = 0; i < rawFiles.length; i++) {
          let rawFile = rawFiles[i]
          let { size } = rawFile
          // 处理尺寸过大的情况，这个size应该是外部传入的
          if (this.sizeLimit > 0 && size > this.sizeLimit) {
            this.$emit('error', '文件大于2Mb')
            return false
          }
        }
        let fileList = Array.from(rawFiles).map((rawFile, i) => {
          let { size, type } = rawFile
          return { name: newNames[i], type, size, status: 'uploading' }
        })
        // 一次性更新fileList
        this.$emit('update:fileList', [...this.fileList, ...fileList])
        return true
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
      uploadFiles (rawFiles) {
        let newNames = []
        // 处理文件名，并建立关联
        for (let i = 0; i < rawFiles.length; i++) {
          let rawFile = rawFiles[i]
          let { name } = rawFile
          let newName = this.generateNewName(name)
          newNames.push(newName)
        }
        if (!this.beforeUploadFiles(rawFiles, newNames)) return
        // 执行上传操作
        for (let i = 0; i < rawFiles.length; i++) {
          let rawFile = rawFiles[i]
          let newName = newNames[i]
          let formData = new FormData()
          //todo 服务器上传的文件名是name，而非newName，可能存在bug
          formData.append(this.name, rawFile)

          this.doUploadFile(formData, (response) => {
            let url = this.parseResponse(response)
            this.url = url
            this.afterUploadFile(newName, url)
          }, (xhr) => {
            this.uploadError(xhr, newName)
          })
        }
      },
      uploadError (xhr, newName) {
        let file = this.fileList.filter(f => f.name === newName)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.status = 'fail'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, fileCopy)
        this.$emit('update:fileList', fileListCopy)
        let error = ''
        if (xhr.status === 0) {
          error = '网络无法连接'
        }
        this.$emit('error', error)
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
      doUploadFile (formData, success, fail) {
        let xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          success(xhr.response)
        }
        xhr.onerror = () => {
          fail(xhr, xhr.status)
        }
        xhr.send(formData)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/var";
  .my-uploader {
    &-fileList {
      list-style: none;
      padding: 0;
      margin: 0;
      > li {
        display: flex;
        align-items: center;
        margin: 8px 0;
        border: 1px solid darken($grey, 20%);
      }
    }
    &-defaultImage {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    &-image {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    &-name {
      margin-right: auto;
      &.success {
        color: green;
      }
      &.fail {
        color: red;
      }
    }
    &-remove {
      width: 32px;
      height: 32px;
      background: none;
      border-radius: 5px;
      font-size: 16px;
    }
    &-spin {
      width: 32px;
      height: 32px;
      @include spin;
    }
  }
</style>
