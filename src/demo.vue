<template>
  <div>
    {{error}}
    <div class="tips">只能上传 300kb 以内的 png、jpg文件</div>
    <my-uploader accept="image/*" method="POST" :action="uploadUrl" name="file"
                 :fileList.sync="fileList" :parse-response="parseResponse"
                 multiple
                 :size-limit="1024*1024"
                 @error="error=$event">
      <my-button icon="upload">上传</my-button>

    </my-uploader>
  </div>
</template>
<script>
  import MyUploader from './uploader'
  import MyButton from './button/button'

  export default {
    name: 'demo',
    components: { MyUploader, MyButton },
    data () {
      return {
        fileList: [],
        error: '',
        uploadUrl: 'http://127.0.0.1:3000/upload'
      }
    },
    methods: {
      parseResponse (response) {
        let object = JSON.parse(response)
        let url = `http://127.0.0.1:3000/preview/${object.id}`
        return url
      },
    }
  }
</script>
<style>

</style>
