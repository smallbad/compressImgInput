import React, { Component } from 'react';

export default  class CompressImgInput extends Component{
    constructor(props){
        super(props)
    }
    resizeMe(img,type, max_width, max_height) {
        var canvas = document.createElement('canvas');
        var width = img.width;
        var height = img.height;
        // 在这里图片是等比例缩放的，调用方法时填入图片允许的最大宽度或者是最大的高度
        //如果最大宽度为0 则按照最大高度固定，宽度自适应的方式来实现
        //如果是最大高度为0，则按照最大的宽度来实现
        if(max_width==0){
            if (height > max_height) {
                width = Math.round(width *= max_height / height);
                height = max_height;
            }
        }
        if(max_height==0){
            if (width > max_width) {
                height = Math.round(height *= max_width / width);
                width = max_width;
            }
        }
        canvas.width =width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        canvas.width =width;
        canvas.height = height;
        ctx.drawImage(img,0,0, width, height);
        type = type === 'jpg'?"jpeg":type;
        return canvas.toDataURL("image/"+type, 0.7);//这里的0.7值的是图片的质量
    }
    selectFileImage(el){
        var reader = new FileReader();
        var file = el.target.files[0]
        var fileName = file.name;
        var fileType = file.name.split(".")[1];
        console.log(fileName)
        reader.readAsArrayBuffer(file);

        reader.onload = (ev) => {
            var blob = new Blob([ev.target['result']]);
            window['URL'] = window['URL'] || window['webkitURL'];
            var blobURL = window['URL'].createObjectURL(blob);
            var image = new Image();
            image.src = blobURL;
            image.onload = (e) => {
                var maxWidth = this.props.maxWidth?this.props.maxWidth:0;
                var maxHeight = this.props.maxHeight?this.props.maxHeight:0;
                var thumb = this.resizeMe(image,fileType, maxWidth, maxHeight);//获得的路径是将图片转换成了base64
                this.props.onChange(thumb,fileName);
            }
        }
    }
   render(){
        return (
                <input type="file" id={this.props.inputId} name={this.props.name} onChange={this.selectFileImage.bind(this)}/>
        )
   }
}