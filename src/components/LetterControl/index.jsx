import React, { Component } from "react"
import {Input,Button,message,Select,Modal,Upload} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons";
import MarkdownIt from "markdown-it"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();
const { confirm } = Modal;
class LetterPublish extends Component{
    titleRef = React.createRef()
    typeRef = React.createRef()
    state = {
        letter: "",
        type: "",
        brief: "",
        imagebase64: ""
    }
    handleEditorChange = ({html, text}) => {
        this.setState({letter: text,brief: html.replace(/(<([^>]+)>)/ig, "").replace(/\n/ig,"").slice(0,50)})
    }
    handleTypeChange = (value) => {
        this.setState({type: value})
    }
    showConfirm = () => {
        confirm({
          title: "注意",
          icon: <ExclamationCircleOutlined />,
          content: "确认要提交吗?",
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            this.submitletter()
          },
          onCancel() {
            return
          },
        });
      }
    onImageUpload = (file) => {
        return new Promise(resolve => {
            resolve(123)
        })
    }
    submitletter = () => {
        let check = 0
        if(this.titleRef.current.input.value === ""){
            message.warn("标题不能为空")
            check = 1
        }
        if(this.state.type === ""){
            message.warn("类型不能为空")
            check = 1
        }
        if(this.state.letter === ""){
            message.warn("文章内容不能为空")
            check = 1
        }
        this.forceUpdate()
        if(check !== 1){
            this.axios.post("/users/paper/uploadletter",{
                username: this.props.username,
                useraccount: this.props.useraccount,
                title: this.titleRef.current.input.value,
                type: this.state.type,
                letter: this.state.letter,
                brief: this.state.brief,
                cover: this.state.imagebase64
            }).then((result)=>{
                if(result.data.msg === "error"){
                    message.warn("上传错误，请稍后上传")
                }else if(result.data.msg === "success"){
                    message.success("上传成功")
                }
            })
        }
    }
    customRequest = (option) => {
        const formData = new FormData();
        formData.append("files[]", option.file);
        const reader = new FileReader();
        reader.readAsDataURL(option.file);
        reader.onloadend = (e) => {
          console.log(e.target.result);// 打印图片的base64
          this.setState({imagebase64: e.target.result})
          if (e && e.target && e.target.result) {
            option.onSuccess();
          }
        };
      }
      
      beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          message.error("只能上传JPG或PNG文件!");
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error("图片大小需小于2MB!");
          return false;
        }
        return isJpgOrPng && isLt2M;
      }
    render(){
        let mainWidth = {
            width: "80%",
            margin: "auto"
        }
        let props = {
            customRequest: (option) => this.customRequest(option),
            maxCount: 1,
            showUploadList: false,
            beforeUpload: (file) => this.beforeUpload(file)
        };
        return(
            <div style={mainWidth}>
                <div>
                    <p>标题</p>
                    <Input ref={ this.titleRef }/>
                </div>
                <div>
                    <p>类型</p>
                    <Select mode="tags" style={{ width: "100%" }} onChange={(value) => this.handleTypeChange(value)}>
                        
                    </Select>
                </div>
                <div>
                    <p>封面</p>
                    <Upload {...props}>
                        <Button>
                            点击上传
                        </Button>
                    </Upload>
                    <img width={200} height={150} src={this.state.imagebase64} alt="图片"/>
                </div>
                <div>
                    <p>内容</p>
                    <MdEditor
                        style={{minHeight: "400px"}}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={({html, text}) => this.handleEditorChange({html, text})}
                        onImageUpload={() => this.onImageUpload()}
                    />
                </div>
                <Button onClick={() => this.showConfirm()}>提交</Button>
            </div>
        )
    }
}

export default class LetterControl extends Component{
    render(){
        return(
            <div>
                lettercontrol
                <LetterPublish username={this.props.username} useraccount={ this.props.useraccount }></LetterPublish>
            </div>
        )
    }
}