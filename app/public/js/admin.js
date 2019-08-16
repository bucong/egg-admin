$(function(){
  app.init();
})
let app = {
  init:function(){
    this.deleteConfirm();
  },
  deleteConfirm:function(){
    $('.delete').click(()=>{
      return confirm('您确定要删除吗？');
    })
  }
}