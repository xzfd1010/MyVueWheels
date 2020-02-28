<template>
  <div>
    <my-uploader accept="image/*" method="POST" :action="uploadUrl" name="file"
                 :fileList.sync="fileList" :parse-response="parseResponse">
      <button>上传</button>
      <template slot="tips">
        <div>只能上传 300kb 以内的 png、jpg文件</div>
      </template>
    </my-uploader>
  </div>
</template>
<script>
  import MyUploader from './uploader'

  export default {
    name: 'demo',
    components: { MyUploader },
    data () {
      return {
        fileList: [],
        uploadUrl: 'http://127.0.0.1:3000/upload'
      }
    },
    methods: {
      parseResponse (response) {
        let object = JSON.parse(response)
        let url = `http://127.0.0.1:3000/preview/${object.id}`
        return url
      }
    }
  }
</script>
<style>

</style>
