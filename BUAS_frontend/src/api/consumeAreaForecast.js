import request from '@/utils/request' //utils是框架写好的 引入封装的axios

//方式
export default{
  //用户信息列表渲染接口
  getProvince(province){    //括号内为请求参数+页面对象（自取名）
    return request({
      //此处写后端接口路径
      // `@RequestMapping注解里面的路径+@PostMapping注解里面的路径(路径中参数用$拼接)`
      //``反引号表示模板字符串
      //示例：post方法：`接口url/${para1}/${para2}`   get方法：`接口url/?para1=${para1}&para2=${para2}`
      url: `area/predict/${province}`,
      method: 'get',      //提交方式
    })
  }

}







