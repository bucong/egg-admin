$(function(){
  app.init();
})
let app = {
  init:function(){
    this.deleteConfirm();
    this.resizeIframe();
    this.sideToggle();
    this.changeSkin();
  },
  // 设置iframe高度
  resizeIframe:function(){
    let iframeHeight = document.documentElement.clientHeight - 100;
    $('#rightMain').height(iframeHeight);
    $('#aside').height(iframeHeight);
  },
  // 删除确认框
  deleteConfirm:function(){
    $('.delete').click(()=>{
      return confirm('您确定要删除吗？');
    })
  },
  // 侧边栏展开收起
  sideToggle:function(){
    $('aside h2').click(function(){
      if($(this).parent().find('ul').hasClass('hide-list')){
        $(this).parent().find('ul').removeClass('hide-list');
      }else{
        $(this).parent().find('ul').addClass('hide-list');
      }
    })
  },
  // 切换主题
  changeSkin:function(){
    let adminSkin = window.localStorage.getItem('adminSkin');
    if (adminSkin) {
      $('header').css('background', adminSkin);
    }
    $('.skin-box li').click(function(e){
      let color = e.currentTarget.dataset.color;
      $('header').css('background', color);
      window.localStorage.setItem('adminSkin', color);
    })
  },
  // 改变状态
  changeStatus:function(el, model, id){
    $.get('/admin/changeStatus',{model:model,id:id},function(data) {
			if (data.code == 0) {
				if (el.src.indexOf('yes') != -1) {
					el.src = '/public/img/no.gif';
				} else {
					el.src = '/public/img/yes.gif';
				}
			}
		})
  }
}

$(window).resize(function(){
  app.resizeIframe();
})